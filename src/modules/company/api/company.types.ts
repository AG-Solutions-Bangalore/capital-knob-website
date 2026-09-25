/**
 * Company API contracts (`GET /getCompany`).
 *
 * Live shape: `{ data: { company_name, company_email, ... }, image_url: [...] }`.
 * Every field stays optional — the backend may add/remove columns.
 */

/** Asset base URL entry, e.g. `{ image_for: "Company", image_url: "..." }`. */
export interface ImageUrlEntry {
  image_for?: string
  image_url?: string
  [key: string]: unknown
}

export interface CompanyInfo {
  company_name?: string | null
  company_email?: string | null
  company_gst?: string | null
  company_pan_no?: string | null
  company_mobile_no?: string | null
  company_landline_no?: string | null
  company_address?: string | null
  company_place?: string | null
  company_logo?: string | null
  [key: string]: unknown
}

export interface CompanyResponse {
  data: CompanyInfo
  image_url: ImageUrlEntry[]
}
