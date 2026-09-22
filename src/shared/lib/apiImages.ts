import type { ImageUrlEntry } from '@/modules/company/api/company.types'

/**
 * Dynamic API image resolution.
 *
 * Every image URL is built from the backend's own `image_url` entries —
 * never hardcoded — so hosts/paths stay correct across environments.
 * When a row has no file, the backend's `No Image` placeholder is used.
 */

export function imageBase(
  entries: ImageUrlEntry[] | undefined,
  key: string,
): string {
  return entries?.find((e) => e.image_for === key)?.image_url ?? ''
}

export function noImageSrc(
  entries: ImageUrlEntry[] | undefined,
): string | null {
  const src =
    entries?.find((e) => e.image_for === 'No Image')?.image_url ?? null
  return src && src.trim() ? src : null
}

/**
 * Resolve `file` against the `key` asset base. Returns the live URL when
 * `file` is present, otherwise the backend `No Image` placeholder,
 * otherwise `null` when the backend gave us no usable path at all.
 */
export function resolveApiImage(
  entries: ImageUrlEntry[] | undefined,
  key: string,
  file: string | null | undefined,
): string | null {
  const name = file?.trim()
  if (name) return `${imageBase(entries, key)}${name}`
  return noImageSrc(entries)
}
