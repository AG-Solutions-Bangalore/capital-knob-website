/**
 * Sitemap API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type { SitemapEntry, SitemapResponse } from './sitemap.types'
import type { Blog } from '@/modules/blogs/api/blogs.types'

const SITEMAP_ENDPOINT = '/getSitemap'

/**
 * Fetch sitemap pages + blog entries. Empty bodies resolve to
 * `{ data: [], blog: [] }` instead of throwing.
 *
 * @throws {ApiError} on network/HTTP failure (normalised by interceptor).
 */
export async function fetchSitemap(): Promise<SitemapResponse> {
  const { data } = await api.get(SITEMAP_ENDPOINT)
  const body = objectOf<Record<string, unknown>>(data, { data: [], blog: [] })
  return {
    data: arrayOf<SitemapEntry>(body.data),
    blog: arrayOf<Blog>(body.blog),
  }
}
