import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'
import path from 'node:path'
import fs from 'node:fs'
import zlib from 'node:zlib'

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
// plus router/query/helmet/react/themes splits.
function manualChunks(id: string) {
  if (
    id.includes('framer-motion') ||
    id.includes('motion-dom') ||
    id.includes('motion-utils') ||
    id.includes('/motion/')
  ) {
    return 'motion'
  }
  if (id.includes('node_modules/lenis') || id.includes('/lenis/')) return 'lenis'
  if (
    id.includes('lucide-react') ||
    id.includes('@radix-ui') ||
    id.includes('radix-ui')
  ) {
    return 'ui-vendor'
  }
  if (id.includes('react-router')) return 'router'
  if (id.includes('@tanstack/react-query')) return 'query'
  if (id.includes('react-helmet')) return 'helmet'
  if (id.includes('next-themes')) return 'themes'
  if (
    id.includes('node_modules/react/') ||
    id.includes('node_modules/react-dom/') ||
    id.includes('node_modules/scheduler/')
  ) {
    return 'react'
  }
  return undefined
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
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