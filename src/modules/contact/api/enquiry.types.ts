/**
 * Contact enquiry — request/response contracts for the public enquiry API.
 *
 * Keep these types close to the API module that uses them so the wire shape
 * is easy to evolve without breaking consumers.
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
 * Payload posted to `enquiry.php`. The server expects `enquiryMobile` /
 * `enquiryProduct` plus the UTM triplet on every request.
 */
export interface EnquiryPayload {
  enquiryFullName: string
  enquiryEmail: string
  enquiryMobile: string
  enquiryProduct: string
  enquiryMessage: string
  utm_medium: string
  utm_source: string
  utm_campaign: string
}

/** Shape of the JSON we get back from the enquiry endpoint. */
export interface EnquiryResponse {
  status?: string
  message?: string
  data?: {
    id?: string | number
    [key: string]: unknown
  }
}
