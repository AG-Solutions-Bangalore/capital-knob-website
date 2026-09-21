/**
 * `useSitemapQuery` — React Query hook for sitemap data.
 *
 * Wraps `fetchSitemap` so components stay focused on rendering
 * (loading state, error feedback, data display).
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchSitemap } from '../api/sitemap.api'
import type { SitemapResponse } from '../api/sitemap.types'

export function useSitemapQuery(): UseQueryResult<SitemapResponse, Error> {
  return useQuery({
    queryKey: ['website', 'sitemap'],
    queryFn: fetchSitemap,
    staleTime: 30 * 60 * 1000, // 30 min — reference content rarely changes
  })
}
