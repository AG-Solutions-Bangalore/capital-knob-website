/**
 * Category API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type { Category, CategoryResponse } from './category.types'

const CATEGORY_ENDPOINT = '/getCategory'

/**
 * Fetch service categories with their sub-categories.
 *
 * @throws {ApiError} on network/HTTP failure (normalised by interceptor).
 */
export async function fetchCategories(): Promise<CategoryResponse> {
  const { data } = await api.get(CATEGORY_ENDPOINT)
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: arrayOf<Category>(body.data),
  }
}
