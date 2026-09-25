/**
 * FAQ API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type { FaqBySlugResponse, FaqItem } from './faq.types'

const FAQ_BY_SLUG_ENDPOINT = '/getFAQBySlug'

/**
 * Fetch FAQs for a page slug. Unknown slugs resolve to `{ data: [] }`.
 *
 * @throws {ApiError} on network/HTTP failure (normalised by interceptor).
 */
export async function fetchFaqBySlug(slug: string): Promise<FaqBySlugResponse> {
  const { data } = await api.get(
    `${FAQ_BY_SLUG_ENDPOINT}/${encodeURIComponent(slug)}`,
  )
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: arrayOf<FaqItem>(body.data),
  }
}
