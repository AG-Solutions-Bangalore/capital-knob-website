/**
 * Centralized route paths. Imported by the router, the Header, and any
 *   internal links — never hard-code a path string twice.
 */
export const ROUTES = {
  home: '/',
  services: '/services',
  homeFinance: '/home-finance',
  businessFinance: '/business-finance',
  realEstateFinance: '/real-estate-finance',
  privateCredit: '/private-credit',
  about: '/about-us',
  contact: '/contact',
  blogs: '/blogs',
  disclaimer: '/disclaimer',
  privacyPolicy: '/privacy-policy',
  /** Blog detail pattern — build concrete URLs with `blogPath(slug)`. */
  blogDetail: '/blogs/:slug',
  /** Service detail pattern — build concrete URLs with `servicePath(slug)`. */
  serviceDetail: '/:slug',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

/** Concrete blog-detail URL for a slug, e.g. `/blogs/my-post`. */
export function blogPath(slug: string): string {
  return `/blogs/${encodeURIComponent(slug)}`
}

/** Concrete service-detail URL for a category slug, e.g. `/home-finance`. */
export function servicePath(slug: string): string {
  return `/${encodeURIComponent(slug)}`
}