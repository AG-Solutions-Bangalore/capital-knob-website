/**
 * @file src/components/SEOPageLayout.tsx
 * Bulletproof SEO page wrapper: <Helmet> handles meta/canonical; dedicated useEffect manages exactly ONE #schema-jsonld.
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Thing } from 'schema-dts';
import { getCanonicalUrl, SITE_LOGO } from '@/config/site';
import { type RouteSeoEntry } from '@/config/seoEngine';
import { createCompositeGraph } from '@/config/schemaExamples';

export default function SEOPageLayout({
  seo,
  structuredSchemas = [],
  children,
}: {
  seo: RouteSeoEntry;
  structuredSchemas?: Thing[];
  children: React.ReactNode;
}): React.JSX.Element {
  const finalCanonical = getCanonicalUrl(seo.canonicalPath);
  const pageGraphPayload =
    structuredSchemas.length > 0 ? createCompositeGraph(structuredSchemas) : null;

  // On first client render after SSR hydration, the browser-side SEO engine has
  // no build-time API cache (testimonials/FAQs/blogs are empty client-side), so
  // its graph is a subset of what the SSG pre-renderer injected. Overwriting
  // unconditionally would wipe Review/FAQ/BlogPosting nodes that Google already
  // sees in the static HTML. Preserve the richer SSG graph on first sync only;
  // subsequent SPA navigations always sync to the new route's graph.
  const isFirstSync = React.useRef(true);

  React.useEffect(() => {
    if (!pageGraphPayload || typeof document === 'undefined') return;
    const jsonStr = JSON.stringify(pageGraphPayload);
    const existing = document.getElementById('schema-jsonld') as HTMLScriptElement | null;

    if (isFirstSync.current) {
      isFirstSync.current = false;
      if (existing && existing.textContent) {
        try {
          const existingJson = JSON.parse(existing.textContent) as {
            '@graph'?: unknown[];
          };
          const existingCount = Array.isArray(existingJson['@graph'])
            ? existingJson['@graph'].length
            : 0;
          const newCount = Array.isArray(pageGraphPayload['@graph'])
            ? pageGraphPayload['@graph'].length
            : 0;
          if (existingCount > newCount) return;
        } catch {
          // Malformed existing script — fall through and overwrite below.
        }
      }
    }

    if (existing) {
      if (existing.textContent !== jsonStr) existing.textContent = jsonStr;
    } else {
      const script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = jsonStr;
      document.head.appendChild(script);
    }

    // Safety deduplication: Purge any stray duplicate application/ld+json scripts
    const allLdScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    if (allLdScripts.length > 1) {
      for (let i = 1; i < allLdScripts.length; i++) allLdScripts[i].remove();
    }
  }, [pageGraphPayload]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
        <link rel="canonical" href={finalCanonical} />
        <meta name="robots" content={seo.noIndex ? 'noindex, nofollow' : 'index, follow'} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={finalCanonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={SITE_LOGO} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={SITE_LOGO} />
      </Helmet>
      {children}
    </>
  );
}
