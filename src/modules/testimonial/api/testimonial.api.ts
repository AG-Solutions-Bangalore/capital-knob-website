/**
 * Testimonial API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type { Testimonial, TestimonialResponse } from './testimonial.types'

const TESTIMONIAL_ENDPOINT = '/getTestimonial'

/**
 * Fetch testimonials for a page slug. Unknown slugs resolve to `{ data: [] }`.
 *
 * @throws {ApiError} on network/HTTP failure (normalised by interceptor).
 */
export async function fetchTestimonialsBySlug(
  slug: string,
): Promise<TestimonialResponse> {
  const { data } = await api.get(
    `${TESTIMONIAL_ENDPOINT}/${encodeURIComponent(slug)}`,
  )
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: arrayOf<Testimonial>(body.data),
  }
}
