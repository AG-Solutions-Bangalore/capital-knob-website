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
  /** Dev-only API verification dashboard (registered only in dev builds). */
  apiCheck: '/api-check',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]