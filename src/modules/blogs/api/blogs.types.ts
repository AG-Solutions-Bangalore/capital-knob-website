/**
 * Blog API contracts.
 *
 * - `GET /getFrontBlogs`, `/getFeaturedBlogs`, `/getBlogs` return
 *   `{ data: Blog[], image_url: [...] }` (currently empty arrays).
 * - `GET /getBlogsBySlug/{slug}` returns
 *   `{ data: BlogDetail | null, image_url, previous, next }`.
 *
 * Blog item fields are permissive: no blog rows exist in the backend yet,
 * so the exact item shape is still unverified.
 */

import type { ImageUrlEntry } from '@/modules/company/api/company.types'

/** A blog list item. Fields optional until the item shape is verified. */
export interface Blog {
  id?: string | number
  blog_slug?: string | null
  blog_title?: string | null
  blog_description?: string | null
  blog_image?: string | null
  /** Live wire format (`GET /getBlogs`, `/getBlogsBySlug/{slug}`). */
  blog_banner_image?: string | null
  blog_banner_image_alt?: string | null
  blog_short_description?: string | null
  blog_created_date?: string | null
  categories?: string | null
  [key: string]: unknown
}

/** A single blog with prev/next navigation (both null when absent). */
export interface BlogDetail extends Blog {
  blog_content?: string | null
}

export interface BlogListResponse {
  data: Blog[]
  image_url: ImageUrlEntry[]
}

export interface BlogBySlugResponse {
  data: BlogDetail | null
  image_url: ImageUrlEntry[]
  previous: Blog | null
  next: Blog | null
}
