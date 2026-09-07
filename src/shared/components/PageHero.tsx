import type { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeroProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}

/**
 * Reusable page-top hero. Use this on every routed page so the
 * top-of-page rhythm is the same while you fill in real sections.
 */
export function PageHero({ eyebrow, title, subtitle, align = 'left' }: PageHeroProps) {
  return (
    <section className="bg-navy py-16 text-white md:py-20">
      <Container size="4xl">
        <div className={align === 'center' ? 'text-center' : ''}>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  )
}