/**
 * `useNewsletterMutation` — React Query mutation hook for subscriptions.
 *
 * Wraps `subscribeNewsletter` with caching defaults so the form component
 * can stay focused on UX (loading state, success/error feedback).
 */

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { subscribeNewsletter } from '../api/newsletter.api'
import type {
  NewsletterPayload,
  NewsletterResponse,
} from '../api/newsletter.types'

export function useNewsletterMutation(): UseMutationResult<
  NewsletterResponse,
  Error,
  NewsletterPayload
> {
  return useMutation({
    mutationKey: ['website', 'newsletter'],
    mutationFn: subscribeNewsletter,
  })
}
