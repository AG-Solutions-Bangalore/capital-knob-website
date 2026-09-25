/**
 * Newsletter API contracts (`POST /createNewsletter`, multipart/form-data).
 *
 * Field name must match the backend documentation exactly:
 * `newsletter_email`. The backend documents no response contract — the
 * observed success shape is `{"code":201,"message":...}` — so every field
 * stays optional and empty bodies resolve to `{}`.
 */

export interface NewsletterPayload {
  newsletter_email: string
}

/** Observed success shape; tolerant of empty/unexpected bodies. */
export interface NewsletterResponse {
  code?: number
  status?: string
  message?: string | null
  [key: string]: unknown
}
