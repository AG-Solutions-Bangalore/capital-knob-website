/**
 * Centralized on-page SEO configuration for every indexable route.
 *
 * Source of truth for the values recommended by the on-page SEO audit.
 * Each entry matches the recommendations table in the audit PDF
 * (Meta Title, Meta Description, Canonical URL, Robots Tag, Author, Publisher).
 *
 * SEO metadata and schemas are centrally managed by SEOPageLayout
 * (via seoEngine.getSeoForRoute) — pages must not set <title>/<meta> themselves.
 */

import { SITE_ORIGIN } from "./site"



/**
 * Absolutize a `"/"`-rooted path via the site URL for crawlers.
 * OG/Twitter meta must stay on absolute remote URLs — never emit
 * `"/images/..."` directly to crawlers.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const clean = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_ORIGIN}${clean}`
}

export interface PageSeo {
  /** <title> content for the route. */
  title: string
  /** <meta name="description"> content for the route. */
  description: string
  /** Path portion of the canonical URL (e.g. "/home-finance"). */
  path: string
  /** "index, follow" is applied for indexable routes. */
  robots: 'index, follow' | 'noindex, nofollow'
}

export const PAGE_SEO: Record<string, PageSeo> = {
  home: {
    title: 'CapitalKnob – Unlock Your Capital Potential',
    description:
      'CapitalKnob helps businesses unlock their capital potential with smart financial services, funding support, and strategic capital guidance.',
    path: '/',
    robots: 'index, follow',
  },
  homeFinance: {
    title: 'Home Finance Services in Bangalore | CapitalKnob',
    description:
      'Home finance solutions in Bangalore for home purchase, construction, balance transfer, top-up loans and property-backed funding.',
    path: '/home-finance',
    robots: 'index, follow',
  },
  businessFinance: {
    title: 'Business Finance Services in India | CapitalKnob',
    description:
      'Explore flexible business finance services from CapitalKnob, designed to help businesses access funding for growth, expansion, working capital and more.',
    path: '/business-finance',
    robots: 'index, follow',
  },
  businessLoan: {
    title: 'Business Loan Services in Bangalore | CapitalKnob',
    description:
      'Business loan solutions in Bangalore for working capital, business expansion, secured funding, project finance and growth needs.',
    path: '/business-loan',
    robots: 'index, follow',
  },
  realEstateFinance: {
    title: 'Real Estate Finance Services in India | CapitalKnob',
    description:
      'Get flexible real estate finance services from CapitalKnob for property acquisition, construction, development and other real estate funding needs.',
    path: '/real-estate-finance',
    robots: 'index, follow',
  },
  realEstateProjectFinance: {
    title: 'Real Estate Project Finance in Bangalore | CapitalKnob',
    description:
      'Real estate project finance solutions in Bangalore for land acquisition, construction, completion, inventory and stalled projects.',
    path: '/real-estate-project-finance',
    robots: 'index, follow',
  },
  privateCredit: {
    title: 'Private Credit Services in India | CapitalKnob',
    description:
      'Access flexible private credit services from CapitalKnob for businesses, investors and property needs with tailored funding options and strategic support.',
    path: '/private-credit',
    robots: 'index, follow',
  },
  about: {
    title: 'About CapitalKnob – Smarter Capital Services in India',
    description:
      'Learn about CapitalKnob and our approach to providing smart, flexible capital and financing services for businesses, property and investment needs.',
    path: '/about-us',
    robots: 'index, follow',
  },
  contact: {
    title: 'Contact CapitalKnob – Get in Touch for Finance Services',
    description:
      'Contact CapitalKnob for business finance, home loans, real estate finance and private credit services. Get in touch with our team today.',
    path: '/contact',
    robots: 'index, follow',
  },
  blogs: {
    title: 'Financial Insights & Financing Guides | CapitalKnob',
    description:
      'Explore CapitalKnob financing guides, real estate finance insights, business loans, private credit and market perspectives.',
    path: '/blogs',
    robots: 'index, follow',
  },
}
