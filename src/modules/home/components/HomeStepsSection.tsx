import { Container } from '@/shared/components/Container'
import { processSteps } from '../constants'

function StepIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'target':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    case 'profile':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'options':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'lenders':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      )
    case 'closure':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    default:
      return null
  }
}

export function HomeStepsSection() {
  return (
    <section className="bg-navy-deep py-12 text-white sm:py-14 md:py-16">
      <Container size="4xl">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column */}
          <div className="text-center sm:text-left lg:col-span-4">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Our Simple <br />
              5-Step Approach
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              From requirement to reality — we stay with you at every step.
            </p>
          </div>

          {/* Right Column: 5 Steps flow.
              Mobile: 1 column stacked list. Small: 2 columns. Tablet: 3 columns.
              Desktop: single row with chevron dividers. */}
          <div className="min-w-0 lg:col-span-8">
            <ol
              className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 lg:flex lg:items-start lg:justify-between lg:gap-2"
              aria-label="CapitalKnob 5-step process"
            >
              {processSteps.map((step, idx) => (
                <li
                  key={step.stepNumber}
                  className="relative flex items-center last:col-span-2 sm:last:col-span-1"
                >
                  <div className="flex w-full min-w-0 flex-col items-center text-center">
                    {/* Circle icon with clean ring */}
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold">
                      <StepIcon icon={step.icon} />
                    </span>

                    {/* Step number and text */}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-xs">
                      <span className="font-bold text-slate-300">
                        {step.stepNumber}
                      </span>
                      <span className="font-bold text-white">
                        {step.action}
                      </span>
                    </div>
                    <span className="mt-0.5 text-[11px] font-medium text-slate-300">
                      {step.target}
                    </span>
                  </div>

                  {/* Chevron divider between steps (desktop only) */}
                  {idx < processSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-3 top-6 hidden text-slate-500 lg:block"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
