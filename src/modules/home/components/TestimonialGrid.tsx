/**
 * TestimonialGrid — showcase grid matching the approved customer-voice
 * design: gold quote glyph + 5-star row on top, quote, author photo with
 * name + gold verified check. Middle card elevates on desktop.
 */

import { cn } from '@/shared/lib/cn'
import type { HomeTestimonial } from '../constants'

function Stars({ rating }: { rating?: number }) {
  if (!rating || !Number.isFinite(rating) || rating <= 0) return null
  const value = Math.min(5, Math.max(1, Math.round(rating)))
  return (
    <div className="flex items-center gap-0.5 text-gold" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i <= value ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.95 6.02 6.55.95-4.75 4.63 1.12 6.53L12 17.57l-5.87 3.06 1.12-6.53L2.5 9.47l6.55-.95L12 2.5z" />
        </svg>
      ))}
    </div>
  )
}

function VerifiedCheck() {
  return (
    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold text-navy" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  )
}

function TestimonialCard({
  testimonial,
  elevated,
}: {
  testimonial: HomeTestimonial
  elevated?: boolean
}) {
  const hasPhoto = Boolean(testimonial.avatar)

  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-7',
        elevated && 'lg:-translate-y-5 lg:shadow-gold/20',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden="true" className="font-serif text-4xl font-bold leading-none text-gold">
          &ldquo;
        </span>
        <Stars rating={testimonial.rating ?? 5} />
      </div>

      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        {hasPhoto ? (
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              title={testimonial.avatarTitle ?? testimonial.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white ring-2 ring-gold/40"
            aria-hidden="true"
          >
            {(testimonial.name.trim()[0] ?? 'C').toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-bold text-ink">
            {testimonial.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-muted">
            <VerifiedCheck />
            {testimonial.role || 'Verified Customer'}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialGrid({ testimonials }: { testimonials: HomeTestimonial[] }) {
  const items = testimonials.slice(0, 3)
  return (
    <div
      role="region"
      aria-label="Customer testimonials"
      className={cn(
        'grid items-stretch gap-5',
        items.length > 1 && 'sm:grid-cols-2',
        items.length > 2 && 'lg:grid-cols-3',
        items.length === 1 && 'mx-auto max-w-xl',
        items.length === 2 && 'mx-auto max-w-3xl lg:max-w-4xl',
      )}
    >
      {items.map((t, idx) => (
        <TestimonialCard
          key={`${t.name}-${idx}`}
          testimonial={t}
          elevated={items.length > 2 && idx === 1}
        />
      ))}
    </div>
  )
}
