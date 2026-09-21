/**
 * Contact enquiry — request/response contracts for the public enquiry API.
 *
 * Keep these types close to the API module that uses them so the wire shape
 * is easy to evolve without breaking consumers. Field names must match the
 * backend documentation exactly (`POST /createEnquiry`, multipart/form-data).
 */

/** Fields the user fills in on the contact form. */
export interface EnquiryFormValues {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

/**
 * Payload posted to `POST /createEnquiry` as `multipart/form-data`.
 * `enquiryService` carries the selected subject/service and `enquiryFrom`
 * carries the originating page/form so leads can be routed correctly.
 */
export interface EnquiryPayload {
  enquiryFullName: string
  enquiryEmail: string
  enquiryMobile: string
  enquiryService: string
  enquiryMessage: string
  enquiryFrom: string
  utm_medium: string
  utm_source: string
  utm_campaign: string
}

/**
 * Success shape returned by the backend (`{"code":201,"message":"..."}`).
 * All fields are optional — the docs provide no response contract, so we
 * tolerate empty or unexpected bodies rather than assuming a structure.
 */
export interface EnquiryResponse {
  code?: number
  status?: string
  message?: string | null
  data?: {
    id?: string | number
    [key: string]: unknown
  }
  [key: string]: unknown
}
