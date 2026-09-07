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
    <section className="bg-navy-deep py-14 text-white md:py-16">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Our Simple <br />
              5-Step Approach
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              From requirement to reality — we stay with you at every step.
            </p>
          </div>

          {/* Right Column: 5 Steps Horizontal Flow */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-2">
              {processSteps.map((step, idx) => (
                <div key={step.stepNumber} className="flex items-center">
                  <div className="flex flex-col items-center text-center">
                    {/* Circle icon with clean ring */}
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold">
                      <StepIcon icon={step.icon} />
                    </span>

                    {/* Step number and text */}
                    <div className="mt-3 flex items-center gap-1 text-xs">
                      <span className="font-bold text-slate-300">
                        {step.stepNumber}
                      </span>
                      <span className="font-bold text-white">
                        {step.action}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-300">
                      {step.target}
                    </span>
                  </div>

                  {/* Chevron divider between steps */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden mb-11 ml-8 px-2 text-slate-500 lg:block">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
