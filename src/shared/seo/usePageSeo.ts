/**
 * @file src/shared/seo/usePageSeo.ts
 * Deprecated: SEO metadata and schemas are now centrally managed by SEOPageLayout.
 * Kept as a no-op hook for backward compatibility.
 */
import { PAGE_SEO } from './pageSeo';

export function usePageSeo(_key: keyof typeof PAGE_SEO) {
  // Managed centrally by SEOPageLayout & HelmetProvider
}
