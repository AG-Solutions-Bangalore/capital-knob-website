/**
 * Newsletter API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { parseBody } from '@/shared/lib/parse'
import type { NewsletterPayload, NewsletterResponse } from './newsletter.types'

const NEWSLETTER_ENDPOINT = '/createNewsletter'

/**
 * Subscribe an email to the newsletter as `multipart/form-data`.
 *
 * The backend documents no response contract, so an empty body resolves
 * to `{}` instead of throwing.
 *
 * @throws {ApiError} when the request fails or the server returns a non-2xx
 *         response. The shared response interceptor normalises the error.
 */
export async function subscribeNewsletter(
  payload: NewsletterPayload,
): Promise<NewsletterResponse> {
  const form = new FormData()
  form.append('newsletter_email', payload.newsletter_email)

  const { data } = await api.post<NewsletterResponse>(
    NEWSLETTER_ENDPOINT,
    form,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )
  return parseBody<NewsletterResponse>(data, {})
}
