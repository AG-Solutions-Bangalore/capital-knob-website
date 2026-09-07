import { useState } from 'react'
import { Container } from '@/shared/components/Container'
import { contactCopy } from '../constants'

export function FaqSection() {
  const { faq } = contactCopy
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="bg-brand-blue-soft/30 py-16 lg:py-20">
      <Container size="4xl">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy">
            {faq.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy md:text-4xl">
            {faq.title}
          </h2>
          <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
        </div>

        <div className="mt-8 space-y-3">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-line-soft/40"
                >
                  <span className="font-display text-base font-bold text-navy md:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-navy transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-line/60 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted md:text-base">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
