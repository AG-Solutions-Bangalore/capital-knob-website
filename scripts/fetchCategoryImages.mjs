#!/usr/bin/env node
/**
 * Build-time category image optimizer.
 *
 * Downloads remote `category_banner_image` files (typically 90-200KB each,
 * no resizing on the backend) and writes 640w WebP versions (~25-35KB) to
 * `public/images/categories/<slug>.webp`, plus a slug→URL map consumed by
 * `HomeSolutionsSection` (local first, remote fallback).
 *
 * Usage: `node scripts/fetchCategoryImages.mjs` (runs before `vite build`,
 * safe to re-run; skips up-to-date files; never fails the build offline).
 */
import fs from 'node:fs'
import path from 'node:path'

const API_BASE = process.env.VITE_API_BASE_URL || 'https://capitalknob.com/crmapi/public/api';
const OUT_DIR = path.resolve(process.cwd(), 'public/images/categories');
const MAP_PATH = path.resolve(process.cwd(), 'src/generated/categoryImages.json');

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });

  let sharp = null;
  try {
    const m = await import('sharp');
    sharp = m.default ?? m;
  } catch {
    console.warn('[category-images] sharp not available — skipping optimization.');
    return;
  }

  let categoriesRes;
  try {
    categoriesRes = await fetchJson(`${API_BASE}/getCategory`);
  } catch (err) {
    console.warn('[category-images] API unreachable, keeping previous outputs:', err.message);
    return;
  }

  const imageBase =
    categoriesRes?.image_url?.find?.((e) => e.image_for === 'Category')?.image_url ?? '';
  const rows = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const map = {};
  let done = 0;

  for (const cat of rows) {
    const slug = (cat.category_slug ?? '').trim().toLowerCase();
    const banner = (cat.category_banner_image ?? '').trim();
    if (!slug || !banner) continue;
    const remote = `${imageBase}${banner}`;
    const outFile = path.join(OUT_DIR, `${slug}.webp`);
    map[slug] = `/images/categories/${slug}.webp`;

    // Skip if already optimized (banner filename unchanged for this slug).
    const stampFile = `${outFile}.src`;
    try {
      if (fs.existsSync(outFile) && fs.existsSync(stampFile) && fs.readFileSync(stampFile, 'utf8') === remote) {
        done += 1;
        continue;
      }
    } catch { /* regenerate */ }

    try {
      const res = await fetch(remote, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) {
        console.warn(`[category-images] skip ${slug}: HTTP ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      // 640x480 cover (matches aspect-[4/3] card) @ quality 75.
      await sharp(buf).resize(640, 480, { fit: 'cover' }).webp({ quality: 75 }).toFile(outFile);
      fs.writeFileSync(stampFile, remote);
      done += 1;
      const kb = Math.round(fs.statSync(outFile).size / 1024);
      console.log(`[category-images] ${slug}.webp ${kb}KB (was ~${Math.round(buf.length / 1024)}KB remote)`);
    } catch (err) {
      console.warn(`[category-images] skip ${slug}:`, err.message);
    }
  }

  // Merge with previous map so slugs removed from the API keep working.
  let prev = {};
  try {
    prev = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  } catch { /* first run */ }
  fs.writeFileSync(MAP_PATH, JSON.stringify({ ...prev, ...map }, null, 2));
  console.log(`[category-images] done: ${done}/${rows.length} slugs → public/images/categories/`);
}

main().catch((err) => {
  console.warn('[category-images] failed (non-fatal):', err.message);
});
