/**
 * Client API functions.
 *
 * The component layer never calls axios directly — it goes through these
 * thin wrappers so the wire format stays in one place.
 */

import { api } from '@/shared/lib/axios'
import { arrayOf, objectOf } from '@/shared/lib/parse'
import type { Client, ClientResponse } from './client.types'
import type { ImageUrlEntry } from './company.types'

const CLIENT_ENDPOINT = '/getClient'

/**
 * Fetch client/lending-partner entries + asset base URLs.
 *
 * @throws {ApiError} on network/HTTP failure (normalised by interceptor).
 */
export async function fetchClients(): Promise<ClientResponse> {
  const { data } = await api.get(CLIENT_ENDPOINT)
  const body = objectOf<Record<string, unknown>>(data, {})
  return {
    data: arrayOf<Client>(body.data),
    image_url: arrayOf<ImageUrlEntry>(body.image_url),
  }
}
