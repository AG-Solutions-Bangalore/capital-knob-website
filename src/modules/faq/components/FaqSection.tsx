import { Fragment, useState } from 'react'
import { Container } from '@/shared/components/Container'
import { useFaqBySlugQuery } from '../hooks/useFaqQuery'


import type { FaqItem } from '../api/faq.types'

export interface FaqSectionProps {
  /** Page or category slug to fetch FAQs for, e.g. 'home', 'contact', 'about-us', 'blogs', or service slugs. */
  slug?: string
  /**
   * Fallback slug fetched when both `items` and the primary `slug` FAQs are
   * empty (e.g. blog detail pages fall back to the shared `'blogs'` FAQs).
   * Ignored when it matches `slug`.
   */
  fallbackSlug?: string
  /** Direct FAQ items from parent response (e.g. blog.faq) */
  items?: FaqItem[]
  /** Section title override. Defaults to first live item's `faq_heading`, or "Frequently Asked Questions". */
  title?: string
  /** Eyebrow text above the title. Defaults to "STILL HAVE QUESTIONS?". */
  eyebrow?: string
  /** Optional custom container/section class names. */
  className?: string
}

export function FaqSection({
  slug,
  fallbackSlug,
  items: directItems,
  title,
  eyebrow = 'STILL HAVE QUESTIONS?',
  className = 'bg-brand-blue-soft/30 py-16 lg:py-20',
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [lastSlug, setLastSlug] = useState(slug)

  const { data: liveFaq } = useFaqBySlugQuery(slug)
  const effectiveFallback = fallbackSlug && fallbackSlug !== slug ? fallbackSlug : undefined
  const { data: fallbackFaq } = useFaqBySlugQuery(effectiveFallback)

  // Reset the open accordion when navigating between slugs (render-phase
  // adjustment — the documented alternative to setState inside an effect).
  if (lastSlug !== slug) {
    setLastSlug(slug)
    setOpenIndex(null)
  }

  const rawList =
    directItems && directItems.length > 0
      ? directItems
      : (liveFaq?.data?.length ? liveFaq.data : (fallbackFaq?.data ?? []))

  const items = rawList
    .map((item) => {
      const rawQ = typeof item.question === 'string' ? item.question : (item.faq_que ?? item.faq_question ?? '')
      const rawA = typeof item.answer === 'string' ? item.answer : (item.faq_ans ?? item.faq_answer ?? '')
      const question = rawQ ? String(rawQ).trim() : ''
      const answer = rawA ? String(rawA).trim() : ''
      const heading = item.faq_heading ? String(item.faq_heading).trim() : null
      const sort = typeof item.faq_sort === 'number' ? item.faq_sort : Number(item.faq_sort) || 0
      return { question, answer, heading, sort }
    })
    .filter((item) => item.question && item.answer)
    .sort((a, b) => a.sort - b.sort)

  // If no data received from API, do not render the FAQ component
  if (items.length === 0) {
    return null
  }

  const resolvedTitle = title ?? items.find((i) => i.heading)?.heading ?? 'Frequently Asked Questions'

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className={className}>
      <Container size="4xl">
        <div>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy md:text-4xl">
            {resolvedTitle}
          </h2>
          <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
        </div>

        <div className="mt-8 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const questionId = `faq-${slug}-question-${index}`
            const answerId = `faq-${slug}-answer-${index}`
            // Show each distinct `faq_heading` from the API as a group label,
            // except when it duplicates the section title resolved above.
            const prevHeading = index > 0 ? items[index - 1].heading : null
            const showGroupHeading =
              !!item.heading &&
              item.heading !== resolvedTitle &&
              item.heading !== prevHeading

            return (
              <Fragment key={`${item.question}-${index}`}>
                {showGroupHeading && (
                  <h3 className="px-1 pt-5 font-display text-base font-bold text-navy first:pt-0 md:text-lg">
                    {item.heading}
                  </h3>
                )}
              <div
                className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${isOpen
                    ? 'border-gold/50 shadow-md ring-1 ring-gold/20'
                    : 'border-line shadow-soft hover:border-gold/30 hover:shadow-md'
                  }`}
              >
                <button
                  type="button"
                  id={questionId}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="group flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-line-soft/30 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  <span
                    className={`font-display text-base font-bold transition-colors duration-200 md:text-lg ${isOpen ? 'text-navy' : 'text-navy/90 group-hover:text-navy'
                      }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-xs transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 bg-[#0b1d3a] text-[#c9a961]'
                        : 'rotate-0 bg-[#f1f5f9] text-[#0b1d3a]'
                    }`}
                    aria-hidden="true"
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

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-line/60 px-5 pb-5 pt-3.5 text-sm leading-relaxed text-muted md:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
              </Fragment>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
