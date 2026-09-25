/**
 * TestimonialSection — reusable slug-driven testimonials block.
 *
 * Mirrors `FaqSection`: fetches `GET /getTestimonial/{slug}` (with an
 * optional `fallbackSlug`) and renders nothing when no usable rows exist,
 * so every page shows testimonials "according to the params" — only when
 * the backend actually has data for that slug.
 *
 * Cards loop in the existing infinite `TestimonialsMarquee` (same component
 * as the homepage) in light tone with the section's own header.
 */

import { Container } from '@/shared/components/Container'
import {
  TestimonialsMarquee,
  type MarqueeTestimonial,
} from '@/modules/home/components/TestimonialsMarquee'
import { resolveEffectiveTestimonials } from '@/shared/seo/dynamicData'
import { useTestimonialsQuery } from '../hooks/useTestimonialQuery'
import type { Testimonial } from '../api/testimonial.types'

export interface TestimonialSectionProps {
  /** Page slug to fetch testimonials for, e.g. 'home', 'blogs', or a blog slug. */
  slug?: string
  /**
   * Fallback slug fetched when the primary `slug` has no usable rows
   * (e.g. blog detail pages fall back to the shared `'blogs'` testimonials).
   * Ignored when it matches `slug`.
   */
  fallbackSlug?: string
  /** Direct testimonial rows from a parent response (wins over fetched rows). */
  items?: Testimonial[]
  /** Section title override. Defaults to "What Our Customers Say". */
  title?: string
  /** Eyebrow text above the title. Defaults to "CLIENT STORIES". */
  eyebrow?: string
  /** Optional custom section class names. */
  className?: string
}

function parseRating(value: string | number | null | undefined): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : value
  if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0) return 5
  return Math.min(5, Math.max(1, Math.round(n)))
}

/** "2026-09-25" → "25 SEP 2026" without timezone pitfalls. */
function formatTestimonialDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim())
  if (!m) return value.trim() || undefined
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const month = months[Math.min(11, Math.max(0, parseInt(m[2], 10) - 1))]
  return `${m[3]} ${month} ${m[1]}`
}

export function TestimonialSection({
  slug,
  fallbackSlug,
  items: directItems,
  title = 'What Our Customers Say',
  eyebrow = 'CLIENT STORIES',
  className = 'bg-surface py-16 lg:py-20 border-t border-line/60',
}: TestimonialSectionProps) {
  const { data: liveData } = useTestimonialsQuery(slug)
  const effectiveFallback = fallbackSlug && fallbackSlug !== slug ? fallbackSlug : undefined
  const { data: fallbackData } = useTestimonialsQuery(effectiveFallback)

  const rawRows =
    directItems && directItems.length > 0
      ? directItems
      : (liveData?.data?.length ? liveData.data : (fallbackData?.data ?? []))

  // Real rows only — same rule as the homepage marquee & JSON-LD schema.
  const rows = resolveEffectiveTestimonials(rawRows)

  if (rows.length === 0) {
    return null
  }

  const marqueeItems: MarqueeTestimonial[] = rows
    .map((t) => {
      const date = formatTestimonialDate(t.testimonial_created_date)
      return {
        name: t.testimonial_client_name?.trim() || 'CapitalKnob Customer',
        detail: t.testimonial_description?.trim() || undefined,
        rating: parseRating(t.testimonial_rating),
        footer: date ? `Verified Client · ${date}` : 'Verified Client',
      }
    })
    .filter((t) => t.name !== 'CapitalKnob Customer' || t.detail)

  if (marqueeItems.length === 0) {
    return null
  }

  // Cycle rows to fill the strip so the infinite loop stays seamless even
  // with few backend rows (same approach as the homepage marquee).
  const MIN_MARQUEE_CARDS = 8
  const loopItems: MarqueeTestimonial[] = []
  for (let i = 0; loopItems.length < MIN_MARQUEE_CARDS; i++) {
    loopItems.push(marqueeItems[i % marqueeItems.length])
  }

  return (
    <section className={className} aria-label={title}>
      <Container size="4xl">
        <div>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy md:text-4xl">
            {title}
          </h2>
          <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
        </div>
      </Container>

      {/* Full-bleed infinite loop — same edge-to-edge marquee as the homepage */}
      <div className="mt-8 overflow-hidden">
        <TestimonialsMarquee
          testimonials={loopItems}
          tone="light"
          hideHeader
          className="w-full"
        />
      </div>
    </section>
  )
}
