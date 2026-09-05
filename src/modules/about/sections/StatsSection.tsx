/**
 * StatsSection — four KPI tiles in soft blue circles + the right-aligned
 * "Built on Trust. Driven by Possibilities." quote band.
 *
 * Mirrors the rhythm in the reference: a thin light strip directly under
 * the dark hero, with a vertical divider before the quote.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '@/modules/solutions/components/icons'
import { aboutQuote, aboutStats } from '../constants'

export function StatsSection() {
  return (
    <section className="border-b border-line bg-[#f1f6fc] py-8 md:py-10">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Stats grid */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:col-span-9">
            {aboutStats.map((stat) => {
              const Icon = iconRegistry[stat.icon]
              return (
                <li
                  key={stat.label}
                  className="flex items-center gap-3.5 border-r border-line/70 pr-4 last:border-r-0"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <Icon size={20} />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-display text-2xl font-bold text-navy md:text-[28px]">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-xs font-medium text-slate-500 md:text-sm">
                      {stat.label}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Quote column */}
          <div className="relative flex items-start gap-3 lg:col-span-3 lg:border-l lg:border-line lg:pl-8">
            <svg
              viewBox="0 0 60 60"
              className="h-8 w-8 shrink-0 text-gold"
              aria-hidden="true"
            >
              <path
                d="M22 12c-7 2-13 9-13 18 0 8 5 13 12 13 6 0 10-4 10-9 0-5-3-9-8-9-1 0-2 0-3 1 1-5 5-9 10-10l-8-4zm28 0c-7 2-13 9-13 18 0 8 5 13 12 13 6 0 10-4 10-9 0-5-3-9-8-9-1 0-2 0-3 1 1-5 5-9 10-10l-8-4z"
                fill="currentColor"
              />
            </svg>
            <div>
              <p className="font-serif text-lg leading-snug text-navy md:text-xl">
                <span className="font-bold">{aboutQuote.line1}</span>
                <br />
                <span className="italic">{aboutQuote.line2}</span>
              </p>
              <div className="mt-2 h-1 w-10 bg-gold" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}