/**
 * `useCategoryQuery` — React Query hook for service categories.
 *
 * Wraps `fetchCategories` so components stay focused on rendering
 * (loading state, error feedback, data display).
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchCategories } from '../api/category.api'
import type { CategoryResponse } from '../api/category.types'

export function useCategoryQuery(): UseQueryResult<CategoryResponse, Error> {
  return useQuery({
    queryKey: ['website', 'categories'],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000, // 30 min — reference content rarely changes
  })
}
