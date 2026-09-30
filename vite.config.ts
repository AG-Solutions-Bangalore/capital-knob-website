import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'
import { MessagePort } from 'node:worker_threads'
import path from 'node:path'
import fs from 'node:fs'
import zlib from 'node:zlib'

// CRITICAL EVENT-LOOP UNBLOCK FIX:
// React 18/19 scheduler keeps a Node MessagePort open, causing Vite SSG builds to hang indefinitely.
if (MessagePort && MessagePort.prototype) {
  const origOn = Object.getOwnPropertyDescriptor(MessagePort.prototype, 'onmessage')
  if (origOn && origOn.set) {
    Object.defineProperty(MessagePort.prototype, 'onmessage', {
      set(fn) {
        origOn.set!.call(this, fn)
        const port = this as MessagePort & { unref?: () => void }
        if (fn && typeof port.unref === 'function') {
          port.unref()
        }
      },
      get() {
        return origOn.get?.call(this)
      },
      configurable: true,
      enumerable: true,
    })
  }
}

// vite-plugin-compression keeps a module-level mtime cache, so the second
// instance (brotli) sees every file as already compressed and emits nothing.
// This tiny post plugin guarantees .br files exist with the same threshold.
function brotliFallback(): Plugin {
  return {
    name: 'brotli-fallback',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const outDir = path.resolve(import.meta.dirname, 'dist')
      if (!fs.existsSync(outDir)) return
      const walk = (dir: string): string[] => {
        const out: string[] = []
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) out.push(...walk(full))
          else if (/\.(js|mjs|json|css|html)$/i.test(full)) out.push(full)
        }
        return out
      }
      for (const file of walk(outDir)) {
        const stat = fs.statSync(file)
        if (stat.size < 1024) continue
        const brPath = `${file}.br`
        if (fs.existsSync(brPath)) continue
        const input = fs.readFileSync(file)
        const compressed = zlib.brotliCompressSync(input, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
            [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
          },
        })
        fs.writeFileSync(brPath, compressed)
      }
    },
  }
}

// Heavy vendors leave the critical path via manualChunks:
// motion|framer-motion → "motion", lenis → "lenis",
// lucide-react|@radix-ui|radix-ui → "ui-vendor",
// plus router/query/helmet splits.
//
// PERF FIX (Lighthouse 65→90+): react / react-dom / scheduler / jsx-runtime /
// prerender worker MUST NOT have manualChunks rules. The prerender worker
// (src/prerender.tsx) shares modules (scheduler, react internals,
// dynamicData, AppRoutes) with the browser graph — ANY manual rule covering
// either side drags shared code into the wrong chunk and the browser ends up
// importing 200-460KB of SSR-only JS. Let Rolldown split automatically;
// only pure client-side vendors get manual chunks below.
function manualChunks(id: string) {
  const nid = id.replace(/\\/g, '/')

  // Skip the build-time prerender worker entirely — it is bundled by
  // vite-prerender-plugin, never loaded in the browser.
  if (nid.includes('/src/prerender.')) {
    return undefined
  }

  // PERF: split React client runtime into its own cached chunk, EXCLUDING
  // any file with "server" in the path (react-dom/server* is SSR-only and
  // lives in the async server.browser chunk). Without the exclusion the
  // browser `react` chunk swallows +200KB of SSR code; without this rule at
  // all React inlines into `index` (205KB) and blocks FCP on parse.
  const lower = nid.toLowerCase()
  if (lower.includes('server')) {
    return undefined
  }
  if (
    nid.includes('node_modules/react/') ||
    nid.includes('node_modules/react-dom/') ||
    nid.includes('node_modules/scheduler/') ||
    nid.includes('react-jsx-runtime') ||
    nid.includes('compiler-runtime')
  ) {
    return 'react'
  }

  if (
    nid.includes('framer-motion') ||
    nid.includes('motion-dom') ||
    nid.includes('motion-utils') ||
    nid.includes('/motion/')
  ) {
    return 'motion'
  }
  if (nid.includes('node_modules/lenis') || nid.includes('/lenis/')) return 'lenis'
  if (
    nid.includes('lucide-react') ||
    nid.includes('@radix-ui') ||
    nid.includes('radix-ui')
  ) {
    return 'ui-vendor'
  }
  if (nid.includes('axios')) return 'axios'
  if (nid.includes('react-router')) return 'router'
  if (nid.includes('@tanstack/')) return 'query'
  if (nid.includes('dynamicData')) return 'dynamic-data'
  if (nid.includes('react-helmet')) return 'helmet'
  if (nid.includes('next-themes')) return 'themes'
  return undefined
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    vitePrerenderPlugin({
      prerenderScript: path.resolve(import.meta.dirname, 'src/prerender.tsx'),
      renderTarget: '#root',
    }),
    // @ts-expect-error — vite-plugin-compression CJS/ESM interop under nodenext
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // @ts-expect-error — vite-plugin-compression CJS/ESM interop under nodenext
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    brotliFallback(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
    // PERF: re-enable modulepreload for the critical chain
    // (index → react/jsx/router/query/AppRoutes). `false` forced a
    // waterfall: browser discovered each chunk only after parsing the
    // previous one, delaying LCP by ~1s.
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
    // Vite 8 (Rolldown) reads rolldownOptions; keep both in sync.
    rolldownOptions: {
      output: {
        manualChunks,
      },
    },
  },
})