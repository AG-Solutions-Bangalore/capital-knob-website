/**
 * ServiceCard — uniform card for the Individuals / Businesses / Other
 * sections. Renders an illustration on top, an outlined icon, the title,
 * and the description.
 *
 * Interaction model:
 *   - Clicking anywhere on the card (body, image, or gold arrow button)
 *     opens the enquiry modal with the card title pre-filled in the
 *     Subject field.
 *
 * When `highlighted` is true (driven by a matching URL hash on the
 * Solutions page), the card gets a gold ring + a one-shot pulse animation
 * so the user can see at a glance which solution they selected from the
 * footer.
 */

import { useState, type KeyboardEvent } from 'react'
import type { ServiceCard as ServiceCardData } from '../constants'
import { iconRegistry } from './icons'
import { Illustration } from './illustrations'
import { cn } from '@/shared/lib/cn'

interface ServiceCardProps extends ServiceCardData {
  className?: string
  /** True when this card matches the active URL hash (highlight + pulse). */
  highlighted?: boolean
  /** Triggered when the user clicks the gold arrow button. */
  onEnquire?: (title: string) => void
}

function CardMedia({
  imageSrc,
  art,
  alt,
  imageTitle,
  className,
}: {
  imageSrc?: string
  art: ServiceCardData['art']
  alt: string
  imageTitle?: string
  className?: string
}) {
  const [imgError, setImgError] = useState(false)

  if (imageSrc && !imgError) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        title={imageTitle ?? `${alt} – CapitalKnob`}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
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

/**
 * Gold circular arrow button shared by both card variants. Sits as a
 * sibling of the navigation <Link> so we never nest <button> inside <a>,
 * which is invalid HTML and confuses screen readers.
 */
function EnquireArrowButton({
  title,
  onClick,
}: {
  title: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Enquire about ${title}`}
      title={`Enquire about ${title}`}
      className={cn(
        'absolute right-4 bottom-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink shadow-soft transition-all duration-200',
        'hover:scale-105 hover:bg-gold-hover hover:shadow-gold active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
      )}
    >
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
    </button>
  )
}

/** Shared classes applied to every card root. */
const baseCardClasses =
  'group relative flex flex-col overflow-hidden rounded-card border bg-surface transition-all duration-200 scroll-mt-28 cursor-pointer'

/**
 * Keyboard + click-to-enquire wiring shared by both card variants. The
 * whole card behaves as one large button that opens the enquiry popup.
 */
function useEnquireCard(title: string, onEnquire?: (title: string) => void) {
  const open = () => onEnquire?.(title)

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
  }

  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': `Enquire about ${title}`,
    onClick: open,
    onKeyDown,
  }
}

/** Extra classes when a card is the active/highlighted one. */
const highlightClasses =
  'border-gold ring-2 ring-gold/40 shadow-card animate-[solutionPulse_1.6s_ease-out_1]'

export function ServiceCard({
  id,
  title,
  description,
  iconKey,
  art,
  imageSrc,
  imageTitle,
  className,
  highlighted,
  onEnquire,
}: ServiceCardProps) {
  const Icon = iconRegistry[iconKey]
  const enquireProps = useEnquireCard(title, onEnquire)

  return (
    <div
      id={id}
      aria-current={highlighted ? 'true' : undefined}
      {...enquireProps}
      className={cn(
        baseCardClasses,
        highlighted
          ? highlightClasses
          : 'border-line hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-card',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      )}
    >
      <div className="flex flex-1 flex-col">
        {/* Visual media banner */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-line-soft">
          <CardMedia imageSrc={imageSrc} art={art} alt={title} imageTitle={imageTitle} />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 pb-16">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
              <Icon size={18} />
            </span>
            <h3 className="font-display text-lg font-extrabold leading-tight text-ink">{title}</h3>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </div>

      <EnquireArrowButton
        title={title}
        onClick={() => onEnquire?.(title)}
      />
    </div>
  )
}

/**
 * WideCard — horizontal variant used in the "Other Capital Solutions"
 * section. Image on the left, copy on the right.
 */
export function WideServiceCard({
  id,
  title,
  description,
  iconKey,
  art,
  imageSrc,
  imageTitle,
  className,
  highlighted,
  onEnquire,
}: ServiceCardProps) {
  const Icon = iconRegistry[iconKey]
  const enquireProps = useEnquireCard(title, onEnquire)

  return (
    <div
      id={id}
      aria-current={highlighted ? 'true' : undefined}
      {...enquireProps}
      className={cn(
        baseCardClasses,
        'sm:flex-row',
        highlighted
          ? highlightClasses
          : 'border-line hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-card',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      )}
    >
      <div
        className="flex flex-1 flex-col sm:flex-row"
      >
        <div className="relative aspect-[16/9] sm:aspect-[8/5] w-full sm:w-2/5 shrink-0 overflow-hidden bg-line-soft">
          <CardMedia imageSrc={imageSrc} art={art} alt={title} imageTitle={imageTitle} />
        </div>
        <div className="flex flex-1 flex-col p-5 pb-16 sm:pb-20">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
              <Icon size={18} />
            </span>
            <h3 className="font-display text-lg font-extrabold text-ink">{title}</h3>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </div>

      <EnquireArrowButton
        title={title}
        onClick={() => onEnquire?.(title)}
      />
    </div>
  )
}