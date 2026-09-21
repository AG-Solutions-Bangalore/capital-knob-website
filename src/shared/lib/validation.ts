/**
 * Shared form validation helpers.
 *
 * Mirrors the rules already used by the contact/enquiry forms so every
 * form in the app validates email (and mobile) identically.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** True when `value` looks like a deliverable email address. */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

/** Strip a phone input down to digits only. */
export function toPhoneDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** The app's mobile rule: exactly 10 digits (existing convention). */
export function isValidIndianMobile(value: string): boolean {
  return toPhoneDigits(value).length === 10
}
