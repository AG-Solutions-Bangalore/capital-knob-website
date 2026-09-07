/**
 * usePageSeo — apply per-page <title>, <meta> and canonical <link> tags
 * for an SPA without pulling in a head-management library.
 *
 * It mutates `document.title` and creates / updates the following tags
 * in <head>:
 *   - <meta name="description">
 *   - <meta name="robots">
 *   - <meta name="author">
 *   - <meta name="publisher">
 *   - <link rel="canonical">
 *
 * Each managed tag is identified by a stable `data-seo` attribute so
 * subsequent calls (or React StrictMode double-effects) update the
 * same node instead of stacking duplicates.
 */

import { useEffect } from 'react'
import {
  PAGE_SEO,
  SITE_AUTHOR,
  SITE_ORIGIN,
  SITE_PUBLISHER,
  type PageSeo,
} from './pageSeo'

const TAG_KEYS = {
  description: 'seo-meta-description',
  robots: 'seo-meta-robots',
  author: 'seo-meta-author',
  publisher: 'seo-meta-publisher',
  canonical: 'seo-link-canonical',
} as const

function upsertMeta(name: string, content: string, key: string) {
  if (typeof document === 'undefined') return
  const head = document.head
  let tag = head.querySelector<HTMLMetaElement>(`meta[name="${name}"][data-seo="${key}"]`)

  if (!tag) {
    // Remove any pre-existing unmanaged <meta name="x"> to avoid duplicates.
    const existing = head.querySelectorAll(`meta[name="${name}"]:not([data-seo])`)
    existing.forEach((el) => el.remove())

    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    tag.setAttribute('data-seo', key)
    head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function upsertLink(rel: string, href: string, key: string) {
  if (typeof document === 'undefined') return
  const head = document.head
  let tag = head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][data-seo="${key}"]`)

  if (!tag) {
    const existing = head.querySelectorAll(`link[rel="${rel}"]:not([data-seo])`)
    existing.forEach((el) => el.remove())

    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    tag.setAttribute('data-seo', key)
    head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

function applySeo(seo: PageSeo) {
  if (typeof document === 'undefined') return

  document.title = seo.title

  upsertMeta('description', seo.description, TAG_KEYS.description)
  upsertMeta('robots', seo.robots, TAG_KEYS.robots)
  upsertMeta('author', SITE_AUTHOR, TAG_KEYS.author)
  upsertMeta('publisher', SITE_PUBLISHER, TAG_KEYS.publisher)

  const canonicalHref = `${SITE_ORIGIN}${seo.path}`
  upsertLink('canonical', canonicalHref, TAG_KEYS.canonical)
}

export function usePageSeo(key: keyof typeof PAGE_SEO) {
  const seo = PAGE_SEO[key]
  useEffect(() => {
    applySeo(seo)
  }, [seo])
}
