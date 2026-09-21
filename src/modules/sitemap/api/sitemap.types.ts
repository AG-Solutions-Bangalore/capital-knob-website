/**
 * Sitemap API contracts (`GET /getSitemap`).
 *
 * Live shape: `{ data: [{ page_two_url, page_two_name, ... }], blog: [] }`.
 */

import type { Blog } from './blogs.types'

export interface SitemapEntry {
  id?: number
  page_two_url?: string | null
  page_two_name?: string | null
  page_two_type?: string | null
  page_two_priority?: string | null
  page_two_status?: string | null
  created_at?: string | null
  updated_at?: string | null
  [key: string]: unknown
}

export interface SitemapResponse {
  data: SitemapEntry[]
  blog: Blog[]
}
