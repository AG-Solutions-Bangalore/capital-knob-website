/**
 * UTM tracking helpers.
 *
 * Campaign params arrive on the landing URL (`?utm_source=...`). Because
 * users may navigate across pages before submitting a form, we persist the
 * first-seen triplet in `sessionStorage` so it survives in-app navigation
 * and is still attached to enquiry submissions.
 */

export interface UtmParams {
  utm_medium: string
  utm_source: string
  utm_campaign: string
}

const STORAGE_KEY = 'ck_utm'

const DEFAULT_UTM: UtmParams = {
  utm_medium: 'website',
  utm_source: 'google',
  utm_campaign: 'test',
}

function readStored(): Partial<UtmParams> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Partial<UtmParams>
    return {
      utm_medium: typeof parsed.utm_medium === 'string' ? parsed.utm_medium : undefined,
      utm_source: typeof parsed.utm_source === 'string' ? parsed.utm_source : undefined,
      utm_campaign:
        typeof parsed.utm_campaign === 'string' ? parsed.utm_campaign : undefined,
    }
  } catch {
    return {}
  }
}

/**
 * Return the effective UTM triplet: URL params win, then stored values,
 * then static defaults. Any non-empty URL values are persisted so later
 * page views / submissions keep the attribution.
 */
export function getUtmParams(): UtmParams {
  const stored = readStored()

  let fromUrl: Partial<UtmParams> = {}
  try {
    const search = new URLSearchParams(window.location.search)
    const medium = search.get('utm_medium')?.trim()
    const source = search.get('utm_source')?.trim()
    const campaign = search.get('utm_campaign')?.trim()
    if (medium) fromUrl.utm_medium = medium
    if (source) fromUrl.utm_source = source
    if (campaign) fromUrl.utm_campaign = campaign
  } catch {
    fromUrl = {}
  }

  const merged: UtmParams = {
    utm_medium: fromUrl.utm_medium ?? stored.utm_medium ?? DEFAULT_UTM.utm_medium,
    utm_source: fromUrl.utm_source ?? stored.utm_source ?? DEFAULT_UTM.utm_source,
    utm_campaign:
      fromUrl.utm_campaign ?? stored.utm_campaign ?? DEFAULT_UTM.utm_campaign,
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // Storage may be unavailable (private mode) — attribution just won't persist.
  }

  return merged
}

/**
 * Best-effort label for `enquiryFrom`: the caller's context plus the
 * current pathname so the backend team can route the lead.
 */
export function getEnquiryFrom(context: string): string {
  try {
    const path = window.location.pathname || '/'
    return context ? `${context} (${path})` : path
  } catch {
    return context || '/'
  }
}
