/**
 * @file src/config/site.ts
 * Single source of truth for canonical URLs, domain origin, and site branding.
 */
export const SITE_NAME = 'CapitalKnob';
/** The one public hostname used by canonicals, sitemap URLs, and JSON-LD IDs. */
export const SITE_ORIGIN = 'https://www.capitalknob.com';
export const SITE_LOGO = `${SITE_ORIGIN}/favicon.png`;
export const SITE_PHONE = '+91-9986900144';
export const SITE_EMAIL = 'advisory@capitalknob.com';

export const SITE_ADDRESS = {
  streetAddress: 'No. 8, 1st Floor, 24th Main, 5th Phase, JP Nagar',
  addressLocality: 'Bengaluru',
  addressRegion: 'Karnataka',
  postalCode: '560078',
  addressCountry: 'IN',
} as const;

export const SITE_GEO = {
  latitude: 12.9081,
  longitude: 77.5838,
} as const;

/**
 * Deterministically formats any path into an absolute canonical URL without duplicate slashes.
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return cleanPath ? `${SITE_ORIGIN}/${cleanPath}` : `${SITE_ORIGIN}/`;
}
