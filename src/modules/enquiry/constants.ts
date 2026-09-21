/**
 * Enquiry module constants.
 *
 * Wire values for `POST /createEnquiry` live here so the contact page,
 * the solutions modal, or any future form can share them.
 */

/**
 * Fallback UTM defaults attached to every enquiry submission. At submit
 * time `getUtmParams()` (shared/lib/utm) overrides these with the live
 * URL params / session-stored values so campaign attribution survives
 * in-app navigation.
 */
export const ENQUIRY_UTM = {
  utm_medium: 'website',
  utm_source: 'google',
  utm_campaign: 'test',
} as const

/** Human-readable source labels sent as `enquiryFrom` (pathname appended). */
export const ENQUIRY_FROM_CONTACT = 'Contact Page'
export const ENQUIRY_FROM_SOLUTIONS = 'Solutions Page'
