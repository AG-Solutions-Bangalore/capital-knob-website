/**
 * Testimonial API contracts (`GET /getTestimonial/{slug}`).
 *
 * Live shape: `{ data: [{ testimonial_for, testimonial_client_name,
 * testimonial_description, testimonial_created_date, testimonial_rating }] }`.
 */

export interface Testimonial {
  testimonial_for?: string | null
  testimonial_client_name?: string | null
  testimonial_description?: string | null
  testimonial_created_date?: string | null
  testimonial_rating?: string | number | null
  [key: string]: unknown
}

export interface TestimonialResponse {
  data: Testimonial[]
}
