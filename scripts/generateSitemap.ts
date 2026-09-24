/**
 * @file scripts/generateSitemap.ts
 * Automated build-time sitemap & robots generator based on pre-rendered HTML files.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN } from '../src/shared/seo/site';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

function getHtmlRoutes(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
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

function getPriority(route: string) {
  if (route === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (route.startsWith('/blogs')) return { priority: '0.8', changefreq: 'weekly' };
  if (route === '/about-us' || route === '/contact')
    return { priority: '0.7', changefreq: 'monthly' };
  return { priority: '0.8', changefreq: 'monthly' };
}

const REDIRECT_ROUTES = new Set(['/about', '/services', '/solution', '/solutions']);

const routes = Array.from(new Set(getHtmlRoutes(distDir)))
  .filter((r) => !REDIRECT_ROUTES.has(r))
  .sort();
const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map((route) => {
      const { priority, changefreq } = getPriority(route);
      const loc = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
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
