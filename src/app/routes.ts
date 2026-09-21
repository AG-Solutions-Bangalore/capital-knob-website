/**
 * Centralized route paths. Imported by the router, the Header, and any
 *   internal links — never hard-code a path string twice.
 */
export const ROUTES = {
  home: '/',
  solutions: '/solutions',
  homeFinance: '/home-finance',
  businessFinance: '/business-finance',
  realEstateFinance: '/real-estate-finance',
  privateCredit: '/private-credit',
  about: '/about-us',
  contact: '/contact',
  blogs: '/blogs',
  /** Blog detail pattern — build concrete URLs with `blogPath(slug)`. */
  blogDetail: '/blogs/:slug',
  /** Dev-only API verification dashboard (registered only in dev builds). */
  apiCheck: '/api-check',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

/** Concrete blog-detail URL for a slug, e.g. `/blogs/my-post`. */
export function blogPath(slug: string): string {
  return `/blogs/${encodeURIComponent(slug)}`
}