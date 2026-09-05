/**
 * AboutHero — "More Than Loans. A Stronger Tomorrow."
 * Light hero section featuring high-fidelity architectural skyline terrace
 * backdrop, soft airy mask on the left for crisp typography, and dark navy
 * luxury serif headline + "Our Story" CTA.
 */

import { Container } from '@/shared/components/Container'
import { aboutHero } from '../constants'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fa]">
      {/* High-rise executive terrace & city skyline backdrop */}
      <img
        src={aboutHero.image}
        alt="Modern executive office terrace and city skyline"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      {/* Light gradient overlay: solid light on the left, softly revealing the office terrace on the right */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white lg:via-white/45" />
      
      <Container size="4xl" className="relative w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy">
              {aboutHero.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-extrabold leading-[1.12] text-navy md:text-5xl lg:text-[54px]">
              {aboutHero.titleLead}
              <br />
              {aboutHero.titleAccent}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
              {aboutHero.description}
            </p>
            <a
              href={aboutHero.ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white shadow-card transition-colors hover:bg-navy-soft"
            >
              {aboutHero.ctaLabel}
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
            </a>
          </div>

          {/* Right area allows the office terrace and glass partitions to display prominently */}
          <div className="hidden lg:col-span-5 xl:col-span-6 lg:block" aria-hidden="true" />
        </div>
      </Container>
    </section>
  )
}