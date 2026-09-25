/**
 * Company API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type {
  CompanyInfo,
  CompanyResponse,
  ImageUrlEntry,
} from './company.types'

const COMPANY_ENDPOINT = '/getCompany'

/**
 * Fetch public company profile + asset base URLs.
 *
 * @throws {ApiError} on network/HTTP failure (normalised by interceptor).
 */
export async function fetchCompany(): Promise<CompanyResponse> {
  const { data } = await api.get(COMPANY_ENDPOINT)
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: objectOf<CompanyInfo>(body.data, {}),
    image_url: arrayOf<ImageUrlEntry>(body.image_url),
  }
}
