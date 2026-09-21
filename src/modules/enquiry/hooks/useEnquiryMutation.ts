/**
 * `useEnquiryMutation` — React Query mutation hook for the contact form.
 *
 * Wraps `submitEnquiry` with caching defaults so the form component can
 * stay focused on UX (loading state, success/error feedback).
 */

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { submitEnquiry } from '../api/enquiry.api'
import type { EnquiryPayload, EnquiryResponse } from '../api/enquiry.types'

export function useEnquiryMutation(): UseMutationResult<
  EnquiryResponse,
  Error,
  EnquiryPayload
> {
  return useMutation({
    mutationKey: ['contact', 'enquiry'],
    mutationFn: submitEnquiry,
  })
}
