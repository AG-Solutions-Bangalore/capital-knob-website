/**
 * ServiceCard — uniform card for the Individuals / Businesses / Other
 * sections. Renders an illustration on top, an outlined icon, the title,
 * description, and a "Know More" link with the gold circular CTA chip on
 * the right.
 *
 * When `highlighted` is true (driven by a matching URL hash on the
 * Solutions page), the card gets a gold ring + a one-shot pulse animation
 * so the user can see at a glance which solution they selected from the
 * footer.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { ServiceCard as ServiceCardData } from '../constants'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { iconRegistry } from './icons'
import { Illustration } from './illustrations'
import { cn } from '@/shared/lib/cn'

interface ServiceCardProps extends ServiceCardData {
  className?: string
  /** True when this card matches the active URL hash (highlight + pulse). */
  highlighted?: boolean
}

function CardMedia({
  imageSrc,
  art,
  alt,
  className,
}: {
  imageSrc?: string
  art: ServiceCardData['art']
  alt: string
  className?: string
}) {
  const [imgError, setImgError] = useState(false)

  if (imageSrc && !imgError) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onError={() => setImgError(true)}
        className={cn(
          'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
          className,
        )}
      />
    )
  }

  return <Illustration art={art} className="h-full w-full" />
}

/** Shared classes applied to every card root. */
const baseCardClasses =
  'group relative flex flex-col overflow-hidden rounded-card border bg-surface transition-all duration-200 scroll-mt-28'

/** Extra classes when a card is the active/highlighted one. */
const highlightClasses =
  'border-gold ring-2 ring-gold/40 shadow-card animate-[solutionPulse_1.6s_ease-out_1]'

export function ServiceCard({ id, title, description, iconKey, art, imageSrc, href, className, highlighted }: ServiceCardProps) {
  const Icon = iconRegistry[iconKey]

  return (
    <Link
      to={href}
      id={id}
      title={linkTitleFor(href)}
      aria-current={highlighted ? 'true' : undefined}
      className={cn(
        baseCardClasses,
        highlighted
          ? highlightClasses
          : 'border-line hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-card',
        className,
      )}
    >
      {/* Visual media banner */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-line-soft">
        <CardMedia imageSrc={imageSrc} art={art} alt={title} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
            <Icon size={18} />
          </span>
          <h3 className="font-display text-lg font-extrabold leading-tight text-ink">{title}</h3>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>

        {/* Footer link row */}
        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-gold">
            Know More
            <svg
              width="14"
              height="14"
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
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white transition-transform group-hover:translate-x-0.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-rotate-45"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

/**
 * WideCard — horizontal variant used in the "Other Capital Solutions"
 * section. Image on the left, copy on the right.
 */
export function WideServiceCard({ id, title, description, iconKey, art, imageSrc, href, className, highlighted }: ServiceCardProps) {
  const Icon = iconRegistry[iconKey]

  return (
    <Link
      to={href}
      id={id}
      title={linkTitleFor(href)}
      aria-current={highlighted ? 'true' : undefined}
      className={cn(
        baseCardClasses,
        'sm:flex-row',
        highlighted
          ? highlightClasses
          : 'border-line hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-card',
        className,
      )}
    >
      <div className="relative aspect-[16/9] sm:aspect-[8/5] w-full sm:w-2/5 shrink-0 overflow-hidden bg-line-soft">
        <CardMedia imageSrc={imageSrc} art={art} alt={title} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
            <Icon size={18} />
          </span>
          <h3 className="font-display text-lg font-extrabold text-ink">{title}</h3>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-gold">
            Know More
            <svg
              width="14"
              height="14"
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
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white transition-transform group-hover:translate-x-0.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-rotate-45"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}