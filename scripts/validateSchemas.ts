/**
 * @file scripts/validateSchemas.ts
 * Offline Schema Validator: audits all pre-rendered HTML files in dist/ for valid Schema.org graphs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const CANONICAL_ORIGIN = 'https://www.capitalknob.com';

function findHtmlFiles(dir: string): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(findHtmlFiles(fullPath));
    } else if (item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = findHtmlFiles(distDir);
let hasError = false;

if (htmlFiles.length === 0) {
  console.error('❌ No HTML files found in dist/! Did you run build first?');
  process.exit(1);
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const root = parse(content);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');
  const canonicalLinks = root.querySelectorAll('link[rel="canonical"]');

  const relFile = path.relative(distDir, file);

  if (canonicalLinks.length !== 1) {
    console.error(`❌ [${relFile}] Expected exactly one canonical link; found ${canonicalLinks.length}.`);
    hasError = true;
  } else {
    const canonical = canonicalLinks[0].getAttribute('href') || '';
    if (!canonical.startsWith(`${CANONICAL_ORIGIN}/`)) {
      console.error(`❌ [${relFile}] Canonical must use ${CANONICAL_ORIGIN}: ${canonical}`);
      hasError = true;
    }
  }

  if (content.includes('ck.agsdemo.in')) {
    console.error(`❌ [${relFile}] Contains the retired ck.agsdemo.in hostname.`);
    hasError = true;
  }

  if (scripts.length === 0) {
    console.error(`❌ [${relFile}] Missing JSON-LD script!`);
    hasError = true;
  } else if (scripts.length > 1) {
    console.error(`❌ [${relFile}] DUPLICATE SCRIPTS FOUND (${scripts.length})!`);
    hasError = true;
  } else {
    try {
      const json = JSON.parse(scripts[0].text);
      if (scripts[0].text.includes('ck.agsdemo.in')) {
        console.error(`❌ [${relFile}] JSON-LD contains the retired ck.agsdemo.in hostname.`);
        hasError = true;
      }
      if (!json['@context'] || !json['@graph']) {
        console.error(`❌ [${relFile}] Missing @context or @graph!`);
        hasError = true;
      } else {
        // Validate Google Rich Results datetime rules (strict ISO 8601 with timezone offset)
        for (const item of json['@graph']) {
          if (item.datePublished) {
            const hasTz =
              item.datePublished.includes('T') &&
              (item.datePublished.includes('+') || item.datePublished.endsWith('Z'));
            if (!hasTz || isNaN(new Date(item.datePublished).getTime())) {
              console.error(
                `❌ [${relFile}] datePublished "${item.datePublished}" missing timezone or invalid ISO!`,
              );
              hasError = true;
            }
          }
          if (item.dateModified) {
            const hasTz =
              item.dateModified.includes('T') &&
              (item.dateModified.includes('+') || item.dateModified.endsWith('Z'));
            if (!hasTz || isNaN(new Date(item.dateModified).getTime())) {
              console.error(
                `❌ [${relFile}] dateModified "${item.dateModified}" missing timezone or invalid ISO!`,
              );
              hasError = true;
            }
          }
        }
      }
    } catch {
      console.error(`❌ [${relFile}] Malformed JSON-LD!`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\n❌ Schema validation failed. Review the errors above.');
  process.exit(1);
}

console.log(`🎉 Success! All ${htmlFiles.length} HTML schemas passed validation.`);
