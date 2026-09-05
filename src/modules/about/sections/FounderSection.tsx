/**
 * FounderSection — "Founder's Message" + "About Our Founder"
 * Three-column block: founder portrait (Unsplash mock) on the left,
 * handwritten-style message with signature in the middle, and a white
 * sidebar listing the founder's credentials on the right.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '@/modules/home/components/icons'
import { founder } from '../constants'

export function FounderSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Founder portrait */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-card border border-line bg-line-soft shadow-soft">
              <img
                src={founder.image}
                alt={`${founder.name}, Founder & CEO of CapitalKnob`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover lg:h-[430px]"
              />
            </div>
          </div>

          {/* Founder's Message */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-extrabold leading-tight text-navy md:text-4xl">
              Founder&rsquo;s Message
            </h2>
            <div className="mt-2.5 h-1 w-12 bg-gold" />

            <div className="relative mt-6 pl-9">
              {/* Decorative oversized gold quote */}
              <svg
                viewBox="0 0 60 60"
                className="absolute -left-1 -top-1.5 h-8 w-8 text-gold"
                aria-hidden="true"
              >
                <path
                  d="M22 12c-7 2-13 9-13 18 0 8 5 13 12 13 6 0 10-4 10-9 0-5-3-9-8-9-1 0-2 0-3 1 1-5 5-9 10-10l-8-4zm28 0c-7 2-13 9-13 18 0 8 5 13 12 13 6 0 10-4 10-9 0-5-3-9-8-9-1 0-2 0-3 1 1-5 5-9 10-10l-8-4z"
                  fill="currentColor"
                />
              </svg>

              <div className="space-y-3.5 font-serif text-sm italic leading-relaxed text-slate-700 md:text-[15px]">
                {founder.message.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-500">{founder.signoff}</p>
                <p className="mt-1 font-serif text-base font-bold text-navy md:text-lg">
                  {founder.name}
                </p>
                <p className="text-xs text-slate-500">{founder.role}</p>
              </div>
            </div>
          </div>

          {/* About Our Founder column */}
          <aside className="lg:col-span-3">
            <h3 className="font-serif text-xl font-bold leading-tight text-navy">
              About Our Founder
            </h3>

            <ul className="mt-6 space-y-5">
              {founder.highlights.map((item) => {
                const Icon = iconRegistry[item.icon]
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-sm leading-tight text-navy">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  )
}