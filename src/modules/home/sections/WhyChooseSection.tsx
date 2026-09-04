/**
 * WhyChooseSection — "Why Choose CapitalKnob?"
 * 6 feature badges in a horizontal grid + a navy CTA panel on the right.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '../components/icons'
import { whyChooseFeatures } from '../constants'

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="bg-brand-blue-soft py-16 md:py-20">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Features column */}
          <div className="lg:col-span-9">
            <h2 className="font-display text-3xl font-extrabold text-ink md:text-4xl">
              Why Choose CapitalKnob?
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {whyChooseFeatures.map((feat) => {
                const Icon = iconRegistry[feat.icon]
                return (
                  <div
                    key={feat.title}
                    className="flex flex-col items-center text-center lg:border-r lg:border-navy/25 lg:pr-6 lg:last:border-r-0"
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-navy/15 bg-white text-navy">
                      <Icon size={22} />
                    </span>
                    <span className="mt-4 text-sm font-medium leading-snug text-ink">
                      {feat.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA card */}
          <div className="relative lg:col-span-3">
            <div className="relative overflow-hidden rounded-card bg-navy p-7 text-white md:p-8">
              {/* Decorative geometric mark */}
              <svg
                viewBox="0 0 200 200"
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 text-white/5"
                aria-hidden="true"
              >
                <polygon points="100,10 190,180 10,180" fill="currentColor" />
                <polygon points="60,60 140,60 100,160" fill="#c9a961" opacity="0.18" />
              </svg>

              <div className="relative">
                <h3 className="font-display text-2xl font-extrabold leading-tight">
                  Let&rsquo;s Find the Right Solution for You
                </h3>
                <p className="mt-3 text-sm text-white/75">
                  Speak with our experts and explore the best financing options for your goals.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-button bg-gold px-5 py-3 text-sm font-semibold text-white shadow-gold transition-colors hover:bg-gold-hover"
                >
                  Get a Free Consultation
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}