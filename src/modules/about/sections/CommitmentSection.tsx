/**
 * CommitmentSection — "Our Commitment"
 * Four-up grid of icon + title + tagline items: Ethical Practices, Client
 * Success, Sustainable Growth, Responsible Advisory.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '@/modules/service/components/icons'
import { commitments } from '../constants'

export function CommitmentSection() {
  return (
    <section className="border-t border-line/60 bg-white py-10 md:py-12">
      <Container size="4xl">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Section heading */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-bold leading-tight text-navy md:text-3xl">
              Our Commitment
            </h2>
            <div className="mt-2 h-1 w-10 bg-gold" />
          </div>

          {/* 4 commitment items: 1-col cards on mobile (<sm) to prevent word wrapping/hyphenation, 4-col inline on desktop */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-6 lg:col-span-9">
            {commitments.map((item) => {
              const Icon = iconRegistry[item.icon]
              return (
                <li
                  key={item.title}
                  className="flex items-center gap-3.5 rounded-xl border border-line/60 bg-line-soft/30 p-3 sm:rounded-none sm:border-0 sm:border-r sm:border-line/70 sm:bg-transparent sm:p-0 sm:pr-4 sm:last:border-r-0"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight text-navy">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}