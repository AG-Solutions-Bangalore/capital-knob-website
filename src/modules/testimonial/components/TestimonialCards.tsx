/**
 * TestimonialCards — live testimonial cards for a page slug.
 *
 * Loading, error, and empty states included. Rating renders as stars when
 * the backend value parses as a number.
 */

import { useTestimonialsQuery } from '../hooks/useTestimonialQuery'

interface TestimonialCardsProps {
  slug: string
}

function Stars({ rating }: { rating: string | number | null | undefined }) {
  const value = typeof rating === 'string' ? parseInt(rating, 10) : (rating ?? 0)
  if (!Number.isFinite(value) || value <= 0) return null
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i <= Math.min(5, Math.max(0, value)) ? 'currentColor' : 'none'}
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

export function TestimonialCards({ slug }: TestimonialCardsProps) {
  const { data, isPending, isError } = useTestimonialsQuery(slug || undefined)

  if (isPending) {
    return (
      <div role="status" className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-5 shadow-soft">
            <div className="h-4 w-full rounded bg-line-soft" />
            <div className="mt-2 h-4 w-5/6 rounded bg-line-soft" />
            <div className="mt-4 h-5 w-32 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load testimonials. Please try again later.
      </div>
    )
  }

  const items = data?.data ?? []
  if (items.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No testimonials published for “{slug}” yet.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((t, idx) => (
        <li key={`${t.testimonial_client_name ?? 't'}-${idx}`} className="rounded-xl border border-line bg-white p-5 shadow-soft">
          <Stars rating={t.testimonial_rating} />
          {t.testimonial_description && (
            <blockquote className="mt-2 text-sm leading-relaxed text-ink">
              “{t.testimonial_description}”
            </blockquote>
          )}
          <p className="mt-3 text-xs font-bold text-navy">
            {t.testimonial_client_name ?? 'Anonymous'}
          </p>
          {t.testimonial_created_date && (
            <p className="text-[11px] text-muted">{t.testimonial_created_date}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
