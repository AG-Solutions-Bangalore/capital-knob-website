/**
 * @file scripts/generateSitemap.mjs
 * Automated build-time sitemap & robots generator.
 *
 * URLs come from TWO sources, merged and deduped:
 *   1. `GET {API_BASE_URL}/getSitemap` — backend-managed pages + blogs
 *      (`page_two_url`, `page_two_priority`, `page_two_status`, timestamps).
 *   2. Pre-rendered HTML files in `dist/` (catches static routes).
 *
 * Plain Node (no bun/TS) so it runs in CI and anywhere `npm run build` runs.
 * SITE_ORIGIN must match `src/shared/seo/site.ts` — update both together.
 * API_BASE_URL must match `src/shared/lib/env.ts` (`VITE_API_BASE_URL`).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://ck.agsdemo.in';
const API_BASE_URL =
  process.env.VITE_API_BASE_URL ?? 'https://agsdemo.in/ckapi/public/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

function getHtmlRoutes(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getHtmlRoutes(fullPath, baseDir));
    } else if (item.name === 'index.html') {
      const rel = path
        .relative(baseDir, fullPath)
        .replace(/\\/g, '/')
        .replace(/index\.html$/, '');
      const route = rel === '' ? '/' : `/${rel.replace(/\/$/, '')}`;
      results.push(route);
    }
  }
  return results;
}

function getPriority(route) {
  if (route === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (route.startsWith('/blogs')) return { priority: '0.8', changefreq: 'weekly' };
  if (route === '/about-us' || route === '/contact')
    return { priority: '0.7', changefreq: 'monthly' };
  return { priority: '0.8', changefreq: 'monthly' };
}

const REDIRECT_ROUTES = new Set(['/about', '/services', '/solution', '/solutions']);

/**
 * Fetch backend sitemap rows (`{ data: [...pages], blog: [...blogs] }`).
 * Returns `{ url, priority, lastmod }` entries. Never throws — on any
 * failure returns [] so the build still succeeds with dist-only URLs.
 */
async function fetchApiSitemap() {
  try {
    const res = await fetch(`${API_BASE_URL}/getSitemap`, {
      signal: AbortSignal.timeout(15000),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    const pages = Array.isArray(body?.data) ? body.data : [];
    const blogs = Array.isArray(body?.blog) ? body.blog : [];

    const toEntry = (row, prefix = '') => {
      if (!row || row.page_two_status !== 'Active') return null;
      const slug = String(row.page_two_url ?? '').trim();
      if (!slug) return null;
      const url = `${prefix}/${slug}`.replace(/\/+/g, '/');
      const priorityNum = parseFloat(row.page_two_priority);
      const priority =
        Number.isFinite(priorityNum) && priorityNum > 0 && priorityNum <= 1
          ? priorityNum.toFixed(2).replace(/0$/, '')
          : undefined;
      const stamp = row.updated_at || row.created_at;
      const lastmod =
        typeof stamp === 'string' && /^\d{4}-\d{2}-\d{2}/.test(stamp)
          ? stamp.slice(0, 10)
          : undefined;
      return { url, priority, lastmod };
    };

    const entries = [
      ...pages.map((r) => toEntry(r)),
      ...blogs.map((r) => toEntry(r, '/blogs')),
    ].filter(Boolean);
    console.log(`✅ [Sitemap Generator] Fetched ${entries.length} URLs from getSitemap API.`);
    return entries;
  } catch (err) {
    console.warn(`⚠️ [Sitemap Generator] getSitemap API unavailable (${err.message}) — using dist routes only.`);
    return [];
  }
}

const today = new Date().toISOString().split('T')[0];
const apiEntries = await fetchApiSitemap();
const apiByUrl = new Map(apiEntries.map((e) => [e.url, e]));

const routes = Array.from(
  new Set([...apiEntries.map((e) => e.url), ...getHtmlRoutes(distDir)]),
)
  .filter((r) => !REDIRECT_ROUTES.has(r))
  .sort();

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map((route) => {
      const api = apiByUrl.get(route);
      const fallback = getPriority(route);
      const priority = api?.priority ?? fallback.priority;
      const lastmod = api?.lastmod ?? today;
      const loc = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${fallback.changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
}

const robotsTxt = `# CapitalKnob Robots Configuration
User-agent: *
Allow: /

# Dedicated permissions for AI and Agentic Search Crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt.trim(), 'utf8');
if (fs.existsSync(publicDir)) {
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim(), 'utf8');
}

console.log(
  `✅ [Sitemap Generator] Generated sitemap.xml with ${routes.length} pre-rendered URLs.`,
);
