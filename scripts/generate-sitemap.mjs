/**
 * Build-time sitemap generator.
 *
 * Fetches the live `GET /getSitemap` API, maps backend page slugs to real
 * frontend routes, and writes `dist/sitemap.xml` — overwriting the static
 * copy from `public/`. Runs as the last step of `npm run build`.
 *
 * The build NEVER fails because of this script: if the API is unreachable,
 * a corrected static fallback (all frontend routes) is written instead.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const outFile = path.join(root, 'dist', 'sitemap.xml')

const API_BASE_URL =
  process.env.VITE_API_BASE_URL ?? 'https://agsdemo.in/ckapi/public/api'
const SITE_ORIGIN = 'https://ck.agsdemo.in'

/** Backend page slug → frontend path. Unmapped slugs have no page → skipped. */
const SLUG_TO_PATH = {
  'about-us': '/about-us',
  blogs: '/blogs',
  contacts: '/contact',
  'home-finance': '/home-finance',
  'business-loan': '/business-finance',
  'real-estate-project-finance': '/real-estate-finance',
  'private-credit': '/private-credit',
}

const STATIC_FALLBACK = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/solutions', priority: '0.9', changefreq: 'weekly' },
  { loc: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { loc: '/home-finance', priority: '0.8', changefreq: 'monthly' },
  { loc: '/business-finance', priority: '0.8', changefreq: 'monthly' },
  { loc: '/real-estate-finance', priority: '0.8', changefreq: 'monthly' },
  { loc: '/private-credit', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
]

function today() {
  return new Date().toISOString().slice(0, 10)
}

function toDate(value) {
  if (typeof value !== 'string' || !value) return today()
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? today() : d.toISOString().slice(0, 10)
}

function toPriority(value, fallback = '0.8') {
  const n = parseFloat(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(1, Math.max(0.1, n)).toFixed(1)
}

function toXml(urls) {
  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${SITE_ORIGIN}${u.loc}</loc>
    <lastmod>${u.lastmod ?? today()}</lastmod>
    <changefreq>${u.changefreq ?? 'monthly'}</changefreq>
    <priority>${u.priority ?? '0.8'}</priority>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

async function fetchLiveUrls() {
  const res = await fetch(`${API_BASE_URL}/getSitemap`, {
    signal: AbortSignal.timeout(15_000),
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const body = await res.json()
  const entries = Array.isArray(body?.data) ? body.data : []

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: today() },
    { loc: '/solutions', priority: '0.9', changefreq: 'weekly', lastmod: today() },
  ]
  const seen = new Set(urls.map((u) => u.loc))

  for (const e of entries) {
    if (e?.page_two_status && e.page_two_status !== 'Active') continue
    const frontendPath = SLUG_TO_PATH[e?.page_two_url]
    if (!frontendPath || seen.has(frontendPath)) continue
    seen.add(frontendPath)
    const priority = toPriority(e?.page_two_priority)
    urls.push({
      loc: frontendPath,
      priority,
      changefreq: parseFloat(priority) >= 0.9 ? 'weekly' : 'monthly',
      lastmod: toDate(e?.updated_at ?? e?.created_at),
    })
  }
  return urls
}

try {
  const urls = await fetchLiveUrls()
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, toXml(urls))
  console.log(`[sitemap] wrote ${urls.length} URLs from live API → ${outFile}`)
} catch (err) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, toXml(STATIC_FALLBACK))
  console.warn(
    `[sitemap] live API unreachable (${err?.message ?? err}); wrote ${STATIC_FALLBACK.length} static fallback URLs → ${outFile}`,
  )
}
