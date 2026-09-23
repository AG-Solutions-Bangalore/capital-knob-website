/**
 * @file src/config/site.ts
 * Single source of truth for canonical URLs, domain origin, and site branding.
 */
export const SITE_NAME = 'CapitalKnob';
export const SITE_ORIGIN = 'https://ck.agsdemo.in';
export const SITE_LOGO = `${SITE_ORIGIN}/favicon.png`;
export const SITE_PHONE = '+91-9876543210';
export const SITE_EMAIL = 'hello@capitalknob.com';

/**
 * Deterministically formats any path into an absolute canonical URL without duplicate slashes.
 */
export function getCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return cleanPath ? `${SITE_ORIGIN}/${cleanPath}` : `${SITE_ORIGIN}/`;
}
