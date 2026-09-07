/**
 * Centralized on-page SEO configuration for every indexable route.
 *
 * Source of truth for the values recommended by the on-page SEO audit.
 * Each entry matches the recommendations table in the audit PDF
 * (Meta Title, Meta Description, Canonical URL, Robots Tag, Author, Publisher).
 *
 * The `usePageSeo` hook applies these values to <title> + <meta> tags in
 * the document head whenever a page mounts.
 */

export const SITE_NAME = 'CapitalKnob'
export const SITE_AUTHOR = 'CapitalKnob'
export const SITE_PUBLISHER = 'CapitalKnob'

/** Origin used when building the canonical URL for the current page. */
export const SITE_ORIGIN = 'https://ck.agsdemo.in'

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
      'CapitalKnob helps businesses unlock their capital potential with smart financial solutions, funding support, and strategic capital guidance.',
    path: '/',
    robots: 'index, follow',
  },
  homeFinance: {
    title: 'Home Finance & Home Loans in India | CapitalKnob',
    description:
      'Explore flexible home finance solutions with CapitalKnob, including home loans, balance transfers, top-up loans, renovation finance and property loans.',
    path: '/home-finance',
    robots: 'index, follow',
  },
  businessFinance: {
    title: 'Business Finance Solutions in India | CapitalKnob',
    description:
      'Explore flexible business finance solutions from CapitalKnob, designed to help businesses access funding for growth, expansion, working capital and more.',
    path: '/business-finance',
    robots: 'index, follow',
  },
  realEstateFinance: {
    title: 'Real Estate Finance Solutions in India | CapitalKnob',
    description:
      'Get flexible real estate finance solutions from CapitalKnob for property acquisition, construction, development and other real estate funding needs.',
    path: '/real-estate-finance',
    robots: 'index, follow',
  },
  privateCredit: {
    title: 'Private Credit Solutions in India | CapitalKnob',
    description:
      'Access flexible private credit solutions from CapitalKnob for businesses, investors and property needs with tailored funding options and strategic support.',
    path: '/private-credit',
    robots: 'index, follow',
  },
  about: {
    title: 'About CapitalKnob – Smarter Capital Solutions in India',
    description:
      'Learn about CapitalKnob and our approach to providing smart, flexible capital and financing solutions for businesses, property and investment needs.',
    path: '/about-us',
    robots: 'index, follow',
  },
  contact: {
    title: 'Contact CapitalKnob – Get in Touch for Finance Solutions',
    description:
      'Contact CapitalKnob for business finance, home loans, real estate finance and private credit solutions. Get in touch with our team today.',
    path: '/contact',
    robots: 'index, follow',
  },
}
