/**
 * `useTestimonialsQuery` — React Query hook for page testimonials.
 *
 * Wraps `fetchTestimonialsBySlug` so components stay focused on rendering.
 * Disabled until a slug is provided; unknown slugs resolve to `{ data: [] }`.
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchTestimonialsBySlug } from '../api/testimonial.api'
import type { TestimonialResponse } from '../api/testimonial.types'

export function useTestimonialsQuery(
  slug: string | undefined,
): UseQueryResult<TestimonialResponse, Error> {
  return useQuery({
    queryKey: ['website', 'testimonials', slug],
    queryFn: () => fetchTestimonialsBySlug(slug as string),
    enabled: Boolean(slug),
  })
}
