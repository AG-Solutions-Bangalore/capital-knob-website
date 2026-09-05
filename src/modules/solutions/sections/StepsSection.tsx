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
      className="mx-2 mt-4.25 hidden text-muted/40 lg:block"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function StepsSection() {
  return (
    <section id="our-process" className="bg-white py-16 md:py-20">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-extrabold text-ink md:text-4xl">
              Our 5-Step Approach
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted md:text-base">
              From requirement to reality — we stay with you at every step.
            </p>
          </div>

          <ol className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-8 lg:flex lg:items-start lg:justify-between lg:gap-0">
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
      </Container>
    </section>
  )
}