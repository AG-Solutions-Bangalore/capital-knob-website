/**
 * FAQ API contracts (`GET /getFAQBySlug/{slug}`).
 *
 * Live shape: `{ data: [] }` for unknown slugs. Item fields stay
 * permissive until a populated FAQ response is verified.
 */

export interface FaqItem {
  id?: string | number
  faq_question?: string | null
  faq_answer?: string | null
  [key: string]: unknown
}

export interface FaqBySlugResponse {
  data: FaqItem[]
}
