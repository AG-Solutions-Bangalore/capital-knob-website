/**
 * Contact enquiry API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { parseBody } from '@/shared/lib/parse'
import type { EnquiryPayload, EnquiryResponse } from './enquiry.types'

const ENQUIRY_ENDPOINT = '/createEnquiry'

function toFormData(payload: EnquiryPayload): FormData {
  const form = new FormData()
  form.append('enquiryFullName', payload.enquiryFullName)
  form.append('enquiryMobile', payload.enquiryMobile)
  form.append('enquiryEmail', payload.enquiryEmail)
  form.append('enquiryService', payload.enquiryService)
  form.append('enquiryMessage', payload.enquiryMessage)
  form.append('enquiryFrom', payload.enquiryFrom)
  form.append('utm_medium', payload.utm_medium)
  form.append('utm_source', payload.utm_source)
  form.append('utm_campaign', payload.utm_campaign)
  return form
}

/**
 * Submit a contact form enquiry as `multipart/form-data`.
 *
 * The backend currently documents no response contract, so an empty body
 * resolves to `{}` instead of throwing.
 *
 * @throws {ApiError} when the request fails or the server returns a non-2xx
 *         response. The shared response interceptor normalises the error.
 */
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResponse> {
  const { data } = await api.post<EnquiryResponse>(
    ENQUIRY_ENDPOINT,
    toFormData(payload),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )
  return parseBody<EnquiryResponse>(data, {})
}
