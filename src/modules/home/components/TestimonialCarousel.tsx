/**
 * TestimonialCarousel — auto-scrolling, infinite-loop testimonial ticker.
 *
 * Renders the testimonial list twice in a single flex row and animates `x`
 * from 0 → -50% (the width of one full copy). Because the second copy starts
 * exactly where the first one ends, the loop is visually seamless: the
 * animation resets to 0 the moment it reaches -50%, and the user never sees
 * a gap or a jump.
 *
 * Pauses on hover/focus for accessibility, respects `prefers-reduced-motion`
 * by showing a static snapshot instead of animating.
 */

import { useMemo, useState } from 'react'
import { cn } from '@/shared/lib/cn'
import type { HomeTestimonial } from '../constants'

interface TestimonialCarouselProps {
  testimonials: HomeTestimonial[]
  /** Seconds for one full pass of one testimonial set. Lower = faster. */
  duration?: number
}

const TONE_BG: Record<NonNullable<HomeTestimonial['tone']>, string> = {
  navy: 'bg-navy text-white',
  gold: 'bg-gold text-ink',
  brandBlue: 'bg-brand-blue text-white',
  slate: 'bg-slate-700 text-white',
}

function initialsFor(name: string): string {
  // Take the first letter of the first two words. For "Rohan & Priya Mehta"
  // we want "RM" — skip the "&" connector so the avatar reads naturally.
  const words = name
    .split(/\s+/)
    .filter((w) => w !== '&' && w.length > 0)
  const first = words[0]?.[0] ?? ''
  const second = words[1]?.[0] ?? ''
  return (first + second).toUpperCase() || 'CK'
}

function TestimonialCard({
  testimonial,
  toneBg,
}: {
  testimonial: HomeTestimonial
  toneBg: string
}) {
  const hasPhoto = Boolean(testimonial.avatar)

  return (
    <article
      className={cn(
        'flex h-full w-75 shrink-0 flex-col justify-between rounded-2xl bg-white p-5 text-ink shadow-2xl sm:w-85 md:w-95 sm:p-6',
      )}
    >
      {/* Gold quote glyph */}
      <span
        aria-hidden="true"
        className="font-serif text-4xl font-bold leading-none text-gold"
      >
        &ldquo;
      </span>

      <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
        {testimonial.quote}
      </p>

      {/* Author row */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-bold text-ink">
            {testimonial.name}
          </h3>
          <p className="truncate text-xs font-medium text-muted">
            {testimonial.role}
          </p>
        </div>

        {hasPhoto ? (
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/30 sm:h-14 sm:w-14">
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
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ring-gold/30 sm:h-14 sm:w-14 sm:text-base',
              toneBg,
            )}
            aria-hidden="true"
          >
            {initialsFor(testimonial.name)}
          </div>
        )}
      </div>
    </article>
  )
}

export function TestimonialCarousel({
  testimonials,
  duration = 40,
}: TestimonialCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  // We render the list twice so animating -50% loops seamlessly.
  const loopedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  )

  return (
    <div
      className={`testimonial-root relative w-full overflow-hidden ${isPaused ? 'testimonial-paused' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Customer testimonials, auto-scrolling"
      role="region"
    >
      <div
        className="testimonial-track flex w-max gap-4 sm:gap-5"
        style={{ animationDuration: `${duration}s` }}
      >
        {loopedTestimonials.map((t, idx) => (
          <TestimonialCard
            // The duplicate set reuses the same id suffix ("-loop") so React
            // doesn't unmount/remount when items shift between copies.
            key={`${t.name}-${idx}`}
            testimonial={t}
            toneBg={TONE_BG[t.tone ?? 'navy']}
          />
        ))}
      </div>
    </div>
  )
}