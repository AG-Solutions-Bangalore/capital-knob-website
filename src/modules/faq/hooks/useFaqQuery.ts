/**
 * `useFaqBySlugQuery` — React Query hook for page FAQs.
 *
 * Wraps `fetchFaqBySlug` so components stay focused on rendering.
 * Disabled until a slug is provided; unknown slugs resolve to `{ data: [] }`.
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchFaqBySlug } from '../api/faq.api'
import type { FaqBySlugResponse } from '../api/faq.types'

export function useFaqBySlugQuery(
  slug: string | undefined,
): UseQueryResult<FaqBySlugResponse, Error> {
  return useQuery({
    queryKey: ['website', 'faq', slug],
    queryFn: () => fetchFaqBySlug(slug as string),
    enabled: Boolean(slug),
  })
}
