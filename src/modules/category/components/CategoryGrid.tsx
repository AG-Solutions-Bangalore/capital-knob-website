/**
 * CategoryGrid — live service categories in the app's solution-card style.
 *
 * Mirrors the Solutions/Home card language: image banner, icon + title row,
 * description, expandable sub-category options, and the circular gold
 * enquiry arrow (wired through `onEnquire` so the Solutions page modal
 * opens with the category pre-filled). Banners resolve against the
 * `Category` asset base URL and fall back to a navy gradient with the
 * category icon while `category_banner_image` is null.
 *
 * Loading, error, and empty states included.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { servicePath } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useCategoryQuery } from '../hooks/useCategoryQuery'
import type { Category } from '../api/category.types'

interface CategoryGridProps {
  /** Opens the enquiry modal for a category. Hides the arrow when omitted. */
  onEnquire?: (title: string) => void
  /** Backend slug of the card to highlight (driven by the URL hash). */
  highlightSlug?: string | null
}

/** Slug → app icon language (same set as the solution cards). */
function iconFor(slug: string | null | undefined): string {
  const s = (slug ?? '').toLowerCase()
  if (s.includes('home')) return 'home'
  if (s.includes('business') || s.includes('growth') || s.includes('capital')) return 'stack'
  if (s.includes('real-estate') || s.includes('distressed')) return 'crane'
  if (s.includes('private') || s.includes('ipo')) return 'document'
  if (s.includes('export') || s.includes('import') || s.includes('trade')) return 'refresh'
  return 'tools'
}

function CategoryIcon({ name }: { name: string }) {
  const size = 20
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const
  switch (name) {
    case 'home':
      return (
        <svg {...common} aria-hidden="true">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'refresh':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      )
    case 'stack':
      return (
        <svg {...common} aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    case 'crane':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2 4h15l5 7H10" />
          <path d="M6 4v16" />
          <path d="M22 11v9" />
          <path d="M2 20h20" />
        </svg>
      )
    case 'document':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    default:
      return (
        <svg {...common} aria-hidden="true">
          <path d="m14.7 10.8 4.6-4.6a2 2 0 1 0-2.8-2.8l-4.6 4.6" />
          <path d="M18.5 2.5 12 9l-4 4-5 5a2 2 0 0 0 2.8 2.8l5-5 4-4 6.5-6.5" />
          <path d="m10 14 4 4" />
        </svg>
      )
  }
}

function GoldArrow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="absolute bottom-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white group-hover:rotate-[-45deg] group-hover:border-gold group-hover:bg-gold group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  )
}

function CategoryCard({
  category,
  onEnquire,
  highlighted,
  imageBase,
  noImage,
}: {
  category: Category
  onEnquire?: (title: string) => void
  highlighted?: boolean
  imageBase?: string
  noImage?: string | null
}) {
  const [expanded, setExpanded] = useState(false)
  const subs = category.category_subs ?? []
  const icon = iconFor(category.category_slug)
  const title = category.category_name ?? 'Untitled'
  // Dynamic image: live banner when uploaded, else the backend No Image
  // placeholder. Path always comes from the API `image_url` entries.
  const file = category.category_banner_image?.trim()
  const bannerSrc = file
    ? `${imageBase ?? ''}${file}`
    : noImage

  return (
    <div
      id={`category-${category.category_slug ?? ''}`}
      aria-current={highlighted ? 'true' : undefined}
      className={`group relative flex scroll-mt-28 flex-col overflow-hidden rounded-xl border bg-white transition-all duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg ${
        highlighted ? 'border-gold ring-2 ring-gold/40 shadow-card' : 'border-line'
      }`}
    >
      {bannerSrc && (
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-100">
          <img
            src={bannerSrc}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
      {/* Icon + Title */}
      <div className="flex items-center gap-2.5 text-navy transition-colors group-hover:text-gold">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <CategoryIcon name={icon} />
        </span>
        <h3 className="font-display text-base font-bold leading-tight text-ink transition-colors group-hover:text-gold">
          {title}
        </h3>
      </div>

      {category.category_description && (
        <p className="mt-3 flex-1 text-xs leading-relaxed text-muted">
          {category.category_description}
        </p>
      )}

      {/* Explore link — opens this service's own live detail page */}
      {category.category_slug && (
        <Link
          to={servicePath(category.category_slug)}
          title={linkTitleFor(servicePath(category.category_slug))}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-colors hover:text-gold"
        >
          Explore {title}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      )}

      {/* Sub-category options */}
      {subs.length > 0 && (
        <div className="mt-4 border-t border-line pt-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition-colors hover:text-gold"
          >
            {expanded ? 'Hide options' : `View ${subs.length} options`}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {expanded && (
            <ul className="mt-2.5 space-y-1.5">
              {subs.map((sub) => (
                <li
                  key={sub.id ?? sub.category_sub_name}
                  className="flex items-start gap-2 text-xs text-muted"
                >
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="font-medium text-ink">{sub.category_sub_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {onEnquire && (
        <GoldArrow
          label={`Enquire about ${title}`}
          onClick={() => onEnquire(title)}
        />
      )}
      </div>
    </div>
  )
}

export function CategoryGrid({ onEnquire, highlightSlug }: CategoryGridProps = {}) {
  const { data, isPending, isError } = useCategoryQuery()

  if (isPending) {
    return (
      <div role="status" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-5">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-line-soft" />
              <div className="h-5 w-2/3 rounded bg-line-soft" />
            </div>
            <div className="mt-3 h-4 w-full rounded bg-line-soft" />
            <div className="mt-2 h-4 w-5/6 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load categories. Please try again later.
      </div>
    )
  }

  const categories = data?.data ?? []
  if (categories.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No categories published yet.
      </p>
    )
  }

  const imageBase =
    data?.image_url?.find((e) => e.image_for === 'Category')?.image_url ?? ''
  const noImage =
    data?.image_url?.find((e) => e.image_for === 'No Image')?.image_url ?? null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id ?? cat.category_slug ?? cat.category_name}
          category={cat}
          onEnquire={onEnquire}
          highlighted={!!highlightSlug && cat.category_slug === highlightSlug}
          imageBase={imageBase}
          noImage={noImage}
        />
      ))}
    </div>
  )
}
