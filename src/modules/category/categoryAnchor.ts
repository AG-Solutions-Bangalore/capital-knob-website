/**
 * Category link helpers (no components — see `components/CategoryMegaMenu`).
 */

import { ROUTES } from '@/app/routes'

/**
 * Deep link to a live category card on the Solutions page,
 * e.g. `/solutions#category-home-finance`.
 */
export function categoryAnchor(slug: string | null | undefined): string {
  return `${ROUTES.services}#category-${slug ?? ''}`
}
