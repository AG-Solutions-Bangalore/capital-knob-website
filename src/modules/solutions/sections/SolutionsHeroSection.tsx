/**
 * SolutionsHeroSection — "Solutions for Every Capital Need"
 * Dark navy panel with a stylised skyline behind the copy, four pillar
 * features along the bottom-left, a quote card on the right, and a
 * vertical brand-tagline running up the right edge.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '../components/icons'
import { solutionsCopy } from '../constants'

/* Decorative oversized quote mark (serif, navy) — used in the quote card. */
function BigQuoteMark() {
  return (
    <svg
      viewBox="0 0 60 60"
      className="h-12 w-12 text-gold"
      aria-hidden="true"
    >
      <path
        d="M22 12c-7 2-13 9-13 18 0 8 5 13 12 13 6 0 10-4 10-9 0-5-3-9-8-9-1 0-2 0-3 1 1-5 5-9 10-10l-8-4zm28 0c-7 2-13 9-13 18 0 8 5 13 12 13 6 0 10-4 10-9 0-5-3-9-8-9-1 0-2 0-3 1 1-5 5-9 10-10l-8-4z"
        fill="currentColor"
      />
    </svg>
  )
}

export function SolutionsHeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* High-fidelity architectural skyline backdrop */}
      <img
        src="/images/solutions/hero-top-banner.webp"
        alt="CapitalKnob Skyline"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Elegant navy gradient overlays for text readability and premium depth */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/95 via-navy/70 to-navy/20" />

      <Container size="3xl" className="relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
          {/* Left column — copy + pillars */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {solutionsCopy.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {solutionsCopy.hero.titleLead}
              <br />
              <span className="text-gold">{solutionsCopy.hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
              {solutionsCopy.hero.description}
            </p>

            {/* Pillars */}
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-md sm:grid-cols-4">
              {solutionsCopy.pillars.map((pillar) => {
                const Icon = iconRegistry[pillar.icon]
                return (
                  <li key={pillar.title} className="flex flex-col items-start gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-white">
                      {pillar.title}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right column — quote card + vertical tagline */}
          <div className="relative lg:col-span-5">
            {/* Quote card */}
            <div className="relative ml-auto w-full max-w-md rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <BigQuoteMark />
              <p className="mt-4 font-display text-xl italic text-white md:text-2xl">
                {solutionsCopy.hero.quote}
              </p>
              <div className="mt-5 h-0.5 w-12 bg-gold" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export const HeroSection = SolutionsHeroSection
export const SolutionHeroSection = SolutionsHeroSection
