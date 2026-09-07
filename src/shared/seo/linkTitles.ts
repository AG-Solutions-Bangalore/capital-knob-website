/**
 * Centralized <a title="..."> map keyed by destination URL.
 *
 * Recommended by the CapitalKnob on-page SEO audit. Every link in the
 * audit's "Links missing titles" table maps to one entry here. For
 * repeated destinations, the same title is reused — exactly as the
 * audit specifies.
 *
 * Lookup helpers:
 *   - `linkTitleFor(href)`  → exact match
 *   - `linkTitleForOr(href, fallback)` → exact match or fallback
 *
 * `href` values are normalized so callers can pass either the raw value
 * or its hash-prefixed variant (e.g. "/contact" vs "/contact#form").
 */

const TITLE_BY_HREF: Record<string, string> = {
  // ── Same-page anchors ────────────────────────────────────────────
  '#': 'CapitalKnob Home',
  '#contact': 'Contact CapitalKnob',
  '#our-story': 'Our Story – CapitalKnob',

  // ── Home + scroll targets ────────────────────────────────────────
  '/': 'CapitalKnob Home',
  '/#calculator': 'Calculate Your Financing Options',
  '/#partners': 'CapitalKnob Financial Partners',
  '/#steps': 'How CapitalKnob Financing Works',
  '/#why-choose': 'Why Choose CapitalKnob',

  // ── Routes (the audit's raw + canonical form) ─────────────────────
  '/about': 'About CapitalKnob',
  '/about-us': 'About Us – CapitalKnob',
  '/business-finance': 'Business Finance Solutions',
  '/business-finance#loan-against-property': 'Business Loan Against Property',
  '/contact': 'Contact CapitalKnob',
  '/home-finance': 'Home Finance Solutions',
  '/home-finance#balance-transfer': 'Home Loan Balance Transfer',
  '/home-finance#home-loans': 'Home Loan Solutions',
  '/home-finance#loan-against-property': 'Loan Against Property',
  '/home-finance#renovation': 'Home Renovation Finance',
  '/home-finance#top-up': 'Home Loan Top-Up',
  '/private-credit': 'Private Credit Solutions',
  '/real-estate-finance': 'Real Estate Finance Solutions',
  '/real-estate-finance#construction': 'Construction Finance',
  '/solutions': 'Financial Solutions – CapitalKnob',

  // ── Contact / communication ─────────────────────────────────────
  'mailto:info@capitalknob.com': 'Email CapitalKnob',
  'mailto:hello@capitalknob.com': 'Email CapitalKnob',
  'tel:+919876543210': 'Call CapitalKnob',
  'https://maps.google.com/?q=Prestige+Tech+Park,+Marathahalli,+Bengaluru':
    'View CapitalKnob Office Location on Google Maps',
}

/**
 * Google Maps / directions link used on the Contact page. The audit
 * recommends the explicit title: View CapitalKnob Office Location on Google Maps.
 */
const OFFICE_LOCATION_TITLE = 'View CapitalKnob Office Location on Google Maps'

/** Exact-match title lookup. */
export function linkTitleFor(href: string | undefined | null): string | undefined {
  if (!href) return undefined
  return TITLE_BY_HREF[href]
}

/**
 * Returns the audit-recommended title for `href`, or `fallback` if
 * the destination is not in the audit table. For the directions
 * link on the contact page, the office-location title is returned
 * whenever the URL is a Google Maps link.
 */
export function linkTitleForOr(
  href: string | undefined | null,
  fallback?: string,
): string | undefined {
  if (!href) return fallback
  if (TITLE_BY_HREF[href]) return TITLE_BY_HREF[href]
  if (/^https?:\/\/(www\.)?google\.[^/]+\/maps/i.test(href)) {
    return OFFICE_LOCATION_TITLE
  }
  return fallback
}

/** Title used for the directions link on the Contact page. */
export const OFFICE_LOCATION_LINK_TITLE = OFFICE_LOCATION_TITLE
