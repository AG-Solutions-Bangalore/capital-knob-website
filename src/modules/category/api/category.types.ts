/**
 * Category API contracts (`GET /getCategory`).
 *
 * Live shape: `{ data: [{ category_slug, category_name, ..., category_subs: [...] }] }`.
 */

export interface CategorySub {
  id?: number
  category_id?: number
  category_sub_name?: string | null
  category_sub_description?: string | null
  category_sub_image?: string | null
  [key: string]: unknown
}

export interface Category {
  id?: number
  category_slug?: string | null
  category_name?: string | null
  category_description?: string | null
  category_meta_title?: string | null
  category_meta_description?: string | null
  category_meta_primary_keywords?: string | null
  category_meta_secondary_keywords?: string | null
  category_banner_image?: string | null
  category_subs?: CategorySub[]
  [key: string]: unknown
}

import type { ImageUrlEntry } from '@/modules/company/api/company.types'

export interface CategoryResponse {
  data: Category[]
  image_url: ImageUrlEntry[]
}
