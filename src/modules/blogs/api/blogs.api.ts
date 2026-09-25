/**
 * Blog API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type {
  Blog,
  BlogBySlugResponse,
  BlogDetail,
  BlogListResponse,
} from './blogs.types'
import type { ImageUrlEntry } from '@/modules/company/api/company.types'

const FRONT_BLOGS_ENDPOINT = '/getFrontBlogs'
const FEATURED_BLOGS_ENDPOINT = '/getFeaturedBlogs'
const BLOGS_ENDPOINT = '/getBlogs'
const BLOG_BY_SLUG_ENDPOINT = '/getBlogsBySlug'

function toBlogList(data: unknown): BlogListResponse {
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: arrayOf<Blog>(body.data),
    image_url: arrayOf<ImageUrlEntry>(body.image_url),
  }
}

function toNullableBlog(value: unknown): Blog | null {
  if (typeof value !== 'object' || value === null) return null
  return value as Blog
}

/** Fetch homepage blog feed. @throws {ApiError} on network/HTTP failure. */
export async function fetchFrontBlogs(): Promise<BlogListResponse> {
  const { data } = await api.get(FRONT_BLOGS_ENDPOINT)
  return toBlogList(data)
}

/** Fetch featured blogs. @throws {ApiError} on network/HTTP failure. */
export async function fetchFeaturedBlogs(): Promise<BlogListResponse> {
  const { data } = await api.get(FEATURED_BLOGS_ENDPOINT)
  return toBlogList(data)
}

/** Fetch the full blog listing. @throws {ApiError} on network/HTTP failure. */
export async function fetchBlogs(): Promise<BlogListResponse> {
  const { data } = await api.get(BLOGS_ENDPOINT)
  return toBlogList(data)
}

/**
 * Fetch a single blog by slug with prev/next navigation.
 * Unknown slugs resolve to `{ data: null, ... }` — not an error.
 *
 * @throws {ApiError} on network/HTTP failure.
 */
import type { FaqItem } from '@/modules/faq/api/faq.types'

export async function fetchBlogBySlug(slug: string): Promise<BlogBySlugResponse> {
  const { data } = await api.get(
    `${BLOG_BY_SLUG_ENDPOINT}/${encodeURIComponent(slug)}`,
  )
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: toNullableBlog(body.data) as BlogDetail | null,
    image_url: arrayOf<ImageUrlEntry>(body.image_url),
    previous: toNullableBlog(body.previous),
    next: toNullableBlog(body.next),
    featured: arrayOf<Blog>(body.featured),
    faq: arrayOf<FaqItem>(body.faq),
  }
}
