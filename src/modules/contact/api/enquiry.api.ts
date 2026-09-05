/**
 * Contact enquiry API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import type { EnquiryPayload, EnquiryResponse } from './enquiry.types'

const ENQUIRY_ENDPOINT = '/enquiry.php'

/**
 * Submit a contact form enquiry.
 *
 * @throws {ApiError} when the request fails or the server returns a non-2xx
 *         response. The shared response interceptor normalises the error.
 */
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResponse> {
  const { data } = await api.post<EnquiryResponse>(ENQUIRY_ENDPOINT, payload)
  return data
}
