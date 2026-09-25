/**
 * StepsSection — "Our 5-Step Approach"
 * Five numbered steps laid out horizontally with chevron dividers
 * between each step.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '../components/icons'
import { steps } from '../constants'

function Chevron() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-2 mt-4 text-muted/40"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function StepsSection() {
  return (
    <section id="our-process" className="bg-white py-16 md:py-20">
      <Container size="4xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-extrabold text-ink md:text-4xl">
              Our 5-Step Approach
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted md:text-base">
              From requirement to reality — we stay with you at every step.
            </p>
          </div>

          <div className="lg:col-span-8">
            {/* Mobile View (< lg): Clean vertical connected timeline */}
            <ol className="relative flex flex-col gap-3.5 lg:hidden">
              {steps.map((step, idx) => {
                const Icon = iconRegistry[step.icon]
                const isLast = idx === steps.length - 1

                return (
                  <li key={step.number} className="relative flex items-center gap-3.5">
                    {/* Vertical connector line */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-6 top-10 h-full w-0.5 bg-line"
                      />
                    )}

                    {/* Step Icon Node */}
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-brand-blue-soft text-navy shadow-xs">
                      <Icon size={20} />
                    </span>

                    {/* Step Content Card */}
                    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-line bg-surface px-4 py-3 shadow-xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
                        Step {String(step.number).padStart(2, '0')}
                      </span>
                      <span className="mt-0.5 font-display text-sm font-extrabold leading-snug text-ink">
                        {step.title} {step.subtitle}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Desktop View (lg+): Horizontal layout with chevron dividers */}
            <ol className="hidden lg:flex lg:items-start lg:justify-between lg:gap-0">
              {steps.map((step, idx) => {
                const Icon = iconRegistry[step.icon]
                return (
                  <li
                    key={step.number}
                    className="flex items-start lg:flex-1"
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-navy/15 bg-brand-blue-soft text-navy">
                        <Icon size={22} />
                      </span>
                      <span className="mt-3 text-xs font-bold text-gold">
                        {String(step.number).padStart(2, '0')}
                      </span>
                      <span className="mt-1 font-display text-sm font-extrabold leading-tight text-ink">
                        {step.title}
                        <br />
                        {step.subtitle}
                      </span>
                    </div>
                    {idx < steps.length - 1 && <Chevron />}
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}