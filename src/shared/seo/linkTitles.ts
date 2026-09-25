/**
 * Centralized <a title="..."> map keyed by destination URL.
 *
 * Recommended by the CapitalKnob on-page SEO audit (5-page PDF covering
 * Home, About, Home Finance, Business Loan, Real Estate Project Finance,
 * Blogs, Contact).
 *
 * NOTE — conflicting recommendations: the same href has different
 * recommended titles on different pages:
 *   - Home / About / Home-Finance / Business-Loan want the SHORT forms:
 *       "Real Estate Project Finance", "Email CapitalKnob Advisory",
 *       "Call CapitalKnob"
 *   - REPF / Blogs / Contact want the LONG forms:
 *       "Real Estate Project Finance Services",
 *       "Email CapitalKnob Advisory Team",
 *       "Call CapitalKnob Financial Advisors"
 * `TITLE_BY_HREF` holds the SHORT defaults; `LONG_TITLE_BY_HREF` holds
 * the overrides applied only on the long pages via `linkTitleForPage`.
 *
 * Lookup helpers:
 *   - `linkTitleFor(href)`  → default (short) match + generic fallback
 *   - `linkTitleForOr(href, fallback)` → default match or fallback
 *   - `linkTitleForPage(href, pathname)` → long override on REPF/Blogs/
 *     Contact pages, else default. Use this in shared chrome (Footer)
 *     so every page matches its audit table literally.
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
  '/business-finance': 'Business Finance Services',
  '/business-finance#loan-against-property': 'Business Loan Against Property',
  '/contact': 'Contact CapitalKnob',
  '/disclaimer': 'CapitalKnob Website Disclaimer',
  '/privacy-policy': 'CapitalKnob Privacy Policy',
  '/home-finance': 'Home Finance Services',
  '/home-finance#balance-transfer': 'Home Loan Balance Transfer',
  '/home-finance#home-loans': 'Home Loan Services',
  '/home-finance#loan-against-property': 'Loan Against Property',
  '/home-finance#renovation': 'Home Renovation Finance',
  '/home-finance#top-up': 'Home Loan Top-Up',
  '/private-credit': 'Private Credit Services',
  '/real-estate-finance': 'Real Estate Finance Services',
  '/real-estate-finance#construction': 'Construction Finance',
  '/services': 'Financial Services – CapitalKnob',
  '/services#home-loans': 'Home Loan Services – CapitalKnob',
  '/services#balance-transfer': 'Home Loan Balance Transfer – CapitalKnob',
  '/services#top-up': 'Home Loan Top-Up – CapitalKnob',
  '/services#construction': 'Construction Finance – CapitalKnob',
  '/services#loan-against-property': 'Loan Against Property – CapitalKnob',
  '/services#individuals': 'Financing Services for Individuals – CapitalKnob',
  '/services#working-capital': 'Working Capital Finance – CapitalKnob',
  '/services#real-estate': 'Real Estate Finance – CapitalKnob',
  '/services#private-credit': 'Private Credit – CapitalKnob',

  // ── Live service-detail pages: SHORT defaults (Home/About/Home-Finance/
  // Business-Loan audit tables). REPF/Blogs/Contact use the LONG overrides
  // in LONG_TITLE_BY_HREF below.
  '/business-loan': 'Business Loan Services',
  '/distressed-assets-and-special-situations': 'Distressed Assets & Special Situations',
  '/export-finance': 'Export Finance Solutions',
  '/growth-capital-pe-vc': 'Growth Capital, PE & VC Funding',
  '/import-finance': 'Import Finance Solutions',
  '/pre-ipo-and-ipo-capital': 'Pre-IPO & IPO Funding Solutions',
  '/real-estate-project-finance': 'Real Estate Project Finance',
  '/structured-trade-finance': 'Structured Trade Finance Solutions',

  // ── Contact / communication: SHORT defaults ──────────────────────
  'mailto:advisory@capitalknob.com': 'Email CapitalKnob Advisory',
  'tel:+919986900144': 'Call CapitalKnob',
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

/**
 * LONG overrides for REPF / Blogs / Contact pages — same hrefs, longer
 * recommended titles per audit PDF pages 4–5.
 */
const LONG_TITLE_BY_HREF: Record<string, string> = {
  '/real-estate-project-finance': 'Real Estate Project Finance Services',
  'mailto:advisory@capitalknob.com': 'Email CapitalKnob Advisory Team',
  'tel:+919986900144': 'Call CapitalKnob Financial Advisors',
}

const LONG_TEL_TITLE = 'Call CapitalKnob Financial Advisors'
const LONG_ADVISORY_TITLE = 'Email CapitalKnob Advisory Team'

/** Pages whose audit tables require the LONG title variants. */
function isLongTitlePage(pathname: string | undefined | null): boolean {
  if (!pathname) return false
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/$/, '') || '/'
  return (
    clean === '/real-estate-project-finance' ||
    clean === '/blogs' ||
    clean.startsWith('/blogs/') ||
    clean === '/contact'
  )
}

/**
 * Page-aware title lookup. On REPF / Blogs / Contact pages returns the
 * LONG audit titles; everywhere else returns the SHORT defaults.
 * Generic tel:/mailto: fallbacks follow the same page rule so live
 * company contact details match the audit on every page.
 */
export function linkTitleForPage(
  href: string | undefined | null,
  pathname: string | undefined | null,
): string | undefined {
  if (!href) return undefined
  const target = href.startsWith('/') ? (href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/') : href
  const long = isLongTitlePage(pathname)
  if (long && LONG_TITLE_BY_HREF[target]) return LONG_TITLE_BY_HREF[target]
  if (TITLE_BY_HREF[target]) {
    // On long pages the generic fallback-number tel: href (used while the
    // company API loads) must still render the LONG title.
    if (long && target === 'tel:+919876543210') return LONG_TEL_TITLE
    return TITLE_BY_HREF[target]
  }
  const lower = target.toLowerCase()
  if (lower.startsWith('tel:')) {
    return long ? LONG_TEL_TITLE : 'Call CapitalKnob'
  }
  if (lower.startsWith('mailto:')) {
    if (lower.includes('advisory')) {
      return long ? LONG_ADVISORY_TITLE : 'Email CapitalKnob Advisory'
    }
    return long ? LONG_ADVISORY_TITLE : 'Email CapitalKnob'
  }
  return undefined
}

/** Exact-match title lookup (plus generic tel:/mailto: fallback). */
export function linkTitleFor(href: string | undefined | null): string | undefined {
  if (!href) return undefined
  const target = href.startsWith('/') ? (href.split('?')[0].split('#')[0].replace(/\/$/, '') || '/') : href
  if (TITLE_BY_HREF[target]) return TITLE_BY_HREF[target]
  const lower = target.toLowerCase()
  if (lower.startsWith('tel:')) return 'Call CapitalKnob'
  if (lower.startsWith('mailto:')) {
    return lower.includes('advisory') ? 'Email CapitalKnob Advisory' : 'Email CapitalKnob'
  }
  return undefined
}

/**
 * Per-blog link titles from the on-page audit. `demoblogs` /
 * `demoblogs123` must read "CapitalKnob Financial Insights Blog";
 * everything else falls back to "{blog title} – CapitalKnob" so no
 * `/blogs/:slug` link ever renders without a title attribute.
 */
const BLOG_LINK_TITLES: Record<string, string> = {
  demoblogs: 'CapitalKnob Financial Insights Blog',
  demoblogs123: 'CapitalKnob Financial Insights Blog',
}

export function blogLinkTitle(slug: string | null | undefined, blogTitle?: string | null): string {
  const clean = (slug ?? '').trim()
  if (clean && BLOG_LINK_TITLES[clean]) return BLOG_LINK_TITLES[clean]
  const t = (blogTitle ?? '').trim()
  return t ? `${t} – CapitalKnob` : 'CapitalKnob Financial Insights Blog'
}

/**
 * Returns the audit-recommended title for `href`, or `fallback` if
 * the destination is not in the audit table. Generic tel:/mailto: and
 * Google Maps links are resolved even when not listed explicitly, so
 * live company contact details never render without a title.
 */
export function linkTitleForOr(
  href: string | undefined | null,
  fallback?: string,
): string | undefined {
  if (!href) return fallback
  if (TITLE_BY_HREF[href]) return TITLE_BY_HREF[href]
  const lower = href.toLowerCase()
  if (lower.startsWith('tel:')) return 'Call CapitalKnob'
  if (lower.startsWith('mailto:')) {
    return lower.includes('advisory') ? 'Email CapitalKnob Advisory' : 'Email CapitalKnob'
  }
  if (/^https?:\/\/(www\.)?google\.[^/]+\/maps/i.test(href)) {
    return OFFICE_LOCATION_TITLE
  }
  return fallback
}

/** Title used for the directions link on the Contact page. */
export const OFFICE_LOCATION_LINK_TITLE = OFFICE_LOCATION_TITLE
