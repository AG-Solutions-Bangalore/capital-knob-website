/**
 * Centralized route paths. Imported by the router, the Header, and any
 *   internal links — never hard-code a path string twice.
 */
export const ROUTES = {
  home: '/',
  homeFinance: '/home-finance',
  businessFinance: '/business-finance',
  realEstateFinance: '/real-estate-finance',
  privateCredit: '/private-credit',
  about: '/about-us',
  contact: '/contact',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]