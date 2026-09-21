/**
 * FaqAccordion — accessible FAQ accordion fed by live FAQs for a page slug.
 *
 * Loading, error, and empty states included. Only one item open at a time.
 */

import { useState } from 'react'
import { useFaqBySlugQuery } from '../hooks/useFaqQuery'

interface FaqAccordionProps {
  slug: string
}

export function FaqAccordion({ slug }: FaqAccordionProps) {
  const { data, isPending, isError } = useFaqBySlugQuery(slug || undefined)
  const [openId, setOpenId] = useState<string | number | null>(null)

  if (isPending) {
    return (
      <div role="status" className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-5 shadow-soft">
            <div className="h-5 w-2/3 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load FAQs. Please try again later.
      </div>
    )
  }

  const items = data?.data ?? []
  if (items.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No FAQs published for “{slug}” yet.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const id = item.id ?? idx
        const open = openId === id
        return (
          <div key={id} className="overflow-hidden rounded-xl border border-line bg-white shadow-soft">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-sm font-bold text-navy md:text-base">
                {item.faq_question ?? `Question ${idx + 1}`}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-line-soft text-navy transition-transform ${open ? 'rotate-45' : ''}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            {open && item.faq_answer && (
              <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                {item.faq_answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
