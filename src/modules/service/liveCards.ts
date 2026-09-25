import type { ImageUrlEntry } from '@/modules/company/api/company.types'
import type { Category, CategorySub } from '@/modules/category/api/category.types'
import type { ServiceCard } from './constants'

/**
 * Fill the OLD card designs with LIVE api data.
 *
 * Style/layout/props stay exactly as before (`ServiceCard` /
 * `WideServiceCard`) — only `title`, `description` and `imageSrc` come
 * from the backend. Image paths are fully dynamic: the live file against
 * the API `image_url` base when uploaded, else the backend `No Image`
 * placeholder.
 */

function baseFor(entries: ImageUrlEntry[] | undefined, key: string): string {
  return entries?.find((e) => e.image_for === key)?.image_url ?? ''
}

export function noImageFor(entries: ImageUrlEntry[] | undefined): string | null {
  return entries?.find((e) => e.image_for === 'No Image')?.image_url ?? null
}

function liveImage(
  entries: ImageUrlEntry[] | undefined,
  key: string,
  file: string | null | undefined,
  fallback: string | undefined,
): string | undefined {
  const name = file?.trim()
  if (name) return `${baseFor(entries, key)}${name}`
  return noImageFor(entries) ?? fallback
}

/** Map a live category's sub-categories onto old-style cards. */
export function liveSubCards(
  category: Category | undefined,
  entries: ImageUrlEntry[] | undefined,
  visuals: ServiceCard[],
): ServiceCard[] {
  const subs: CategorySub[] = category?.category_subs ?? []
  if (subs.length === 0 || visuals.length === 0) return visuals
  return subs.map((sub, idx) => {
    const v = visuals[idx % visuals.length]
    return {
      ...v,
      title: sub.category_sub_name?.trim() || v.title,
      description: sub.category_sub_description?.trim() || v.description,
      imageSrc: liveImage(entries, 'Category Sub', sub.category_sub_image, v.imageSrc),
    }
  })
}

/** Map live categories onto old-style cards. */
export function liveCategoryCards(
  categories: Category[],
  entries: ImageUrlEntry[] | undefined,
  visuals: ServiceCard[],
  keepIdFor?: Record<string, string>,
): ServiceCard[] {
  if (categories.length === 0 || visuals.length === 0) return visuals
  return categories.map((cat, idx) => {
    const v = visuals[idx % visuals.length]
    const slug = cat.category_slug ?? ''
    return {
      ...v,
      id: (keepIdFor?.[slug] ?? slug) || v.id,
      title: cat.category_name?.trim() || v.title,
      description: cat.category_description?.trim() || v.description,
      imageSrc: liveImage(entries, 'Category', cat.category_banner_image, v.imageSrc),
    }
  })
}
