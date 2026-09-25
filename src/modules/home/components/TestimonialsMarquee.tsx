/**
 * TestimonialsMarquee — infinite success-story marquee.
 *
 * Mirrors igli's `TestimonialsSectionColor`: centered heading, TWO
 * identical tracks each animating its own width + gap
 * (`translateX(calc(-100% - 1rem))`), duration = measured width / 140px/s,
 * pause on hover, optional CTA button. CapitalKnob tokens (navy / gold).
 *
 * Data comes ONLY via props — the homepage maps live
 * `GET /getTestimonial/home` rows (name, description, rating, date) into
 * `testimonials`. Null when the list is empty (same as igli).
 */

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { TestimonialCard } from './TestimonialCard'

export interface MarqueeTestimonial {
  name: string
  detail?: string
  rating?: number
  footer?: string
  href?: string
}

interface TestimonialsMarqueeProps {
  title?: string
  description?: string
  testimonials?: MarqueeTestimonial[]
  className?: string
  cardClassName?: string
  /** px per second — matches igli's SPEED = 140. */
  speed?: number
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
  /**
   * Color tone — `'dark'` (default) for navy backgrounds, `'light'` for
   * light sections (edge fades + header text adapt, animation unchanged).
   */
  tone?: 'dark' | 'light'
  /** Hide the built-in title/description header (parent renders its own). */
  hideHeader?: boolean
}

export function TestimonialsMarquee({
  title = 'Success Stories',
  description = '',
  testimonials = [],
  className,
  cardClassName,
  speed = 140,
  showButton = false,
  buttonText = 'View All Success Stories',
  buttonLink = '#',
  tone = 'dark',
  hideHeader = false,
}: TestimonialsMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(40)

  useEffect(() => {
    if (!marqueeRef.current) return
    const width = marqueeRef.current.scrollWidth
    if (width > 0 && speed > 0) setDuration(width / speed)
  }, [testimonials, speed])

  if (!testimonials || testimonials.length === 0) return null

  const cardClass = cn('h-[200px] w-[300px] sm:h-[210px] sm:w-[340px] md:h-[220px] md:w-[360px]', cardClassName)
  const isLight = tone === 'light'

  return (
    <div className={cn('flex flex-col items-center gap-4 text-center sm:gap-6', className)}>
      {!hideHeader && (
      <div className="px-4">
        <h3 className={cn('text-xl font-bold sm:text-2xl md:text-3xl', isLight ? 'text-navy' : 'text-white')}>
          {title}
        </h3>
        {description ? (
          <p className={cn('mx-auto mt-2 max-w-2xl text-sm', isLight ? 'text-muted' : 'text-white/80')}>
            {description}
          </p>
        ) : null}
        <span aria-hidden="true" className="mx-auto mt-3 block h-0.5 w-16 bg-gold" />
      </div>
      )}

      <div className="relative flex w-full overflow-hidden">
        <div
          className="ck-marquee-group flex gap-4"
          style={{ ['--ck-duration' as string]: `${duration}s` }}
        >
          {/* FIRST SET */}
          <div ref={marqueeRef} className="ck-marquee-track flex shrink-0 gap-4">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={`first-${t.name}-${i}`}
                name={t.name}
                detail={t.detail}
                rating={t.rating}
                footer={t.footer}
                href={t.href}
                target="_blank"
                className={cardClass}
              />
            ))}
          </div>

          {/* DUPLICATE SET */}
          <div className="ck-marquee-track flex shrink-0 gap-4" aria-hidden="true">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={`second-${t.name}-${i}`}
                name={t.name}
                detail={t.detail}
                rating={t.rating}
                footer={t.footer}
                href={t.href}
                target="_blank"
                className={cardClass}
              />
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r to-transparent md:block',
            isLight ? 'from-surface' : 'from-navy',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l to-transparent md:block',
            isLight ? 'from-surface' : 'from-navy',
          )}
        />
      </div>

      {showButton && (
        <div className="flex justify-center">
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-block cursor-pointer bg-gold px-4 py-2 text-xs font-semibold text-white transition-colors duration-300 hover:bg-gold-hover"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  )
}

export default TestimonialsMarquee
