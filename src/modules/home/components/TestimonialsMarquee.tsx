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
import { CertificateCardColor } from './CertificateCardColor'

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
}

/** All seals use the green verified tick. */
const SEAL = 'green' as const

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
}: TestimonialsMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(40)

  useEffect(() => {
    if (!marqueeRef.current) return
    const width = marqueeRef.current.scrollWidth
    if (width > 0 && speed > 0) setDuration(width / speed)
  }, [testimonials, speed])

  if (!testimonials || testimonials.length === 0) return null

  const cardClass = cn('h-[180px] w-[280px] md:h-[220px] md:w-[340px]', cardClassName)

  return (
    <div className={cn('flex flex-col items-center gap-4 text-center sm:gap-6', className)}>
      <div className="px-4">
        <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
          {title}
        </h3>
        {description ? (
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/80">
            {description}
          </p>
        ) : null}
        <span aria-hidden="true" className="mx-auto mt-3 block h-0.5 w-16 bg-gold" />
      </div>

      <div className="relative flex w-full overflow-hidden">
        <div
          className="ck-marquee-group flex gap-4"
          style={{ ['--ck-duration' as string]: `${duration}s` }}
        >
          {/* FIRST SET */}
          <div ref={marqueeRef} className="ck-marquee-track flex shrink-0 gap-4">
            {testimonials.map((t, i) => (
              <CertificateCardColor
                key={`first-${t.name}-${i}`}
                name={t.name}
                detail={t.detail}
                rating={t.rating}
                footer={t.footer}
                seal={SEAL}
                href={t.href}
                target="_blank"
                className={cardClass}
              />
            ))}
          </div>

          {/* DUPLICATE SET */}
          <div className="ck-marquee-track flex shrink-0 gap-4" aria-hidden="true">
            {testimonials.map((t, i) => (
              <CertificateCardColor
                key={`second-${t.name}-${i}`}
                name={t.name}
                detail={t.detail}
                rating={t.rating}
                footer={t.footer}
                seal={SEAL}
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
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-navy to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-navy to-transparent md:block"
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
