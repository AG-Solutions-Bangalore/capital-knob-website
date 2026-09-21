/**
 * Client API contracts (`GET /getClient`).
 *
 * Live shape: `{ data: [], image_url: [...] }` — no client rows exist yet,
 * so item fields stay permissive until verified.
 */

import type { ImageUrlEntry } from '@/modules/company/api/company.types'

export interface Client {
  id?: string | number
  client_name?: string | null
  client_image?: string | null
  [key: string]: unknown
}

export interface ClientResponse {
  data: Client[]
  image_url: ImageUrlEntry[]
}
