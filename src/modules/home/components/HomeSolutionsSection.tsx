import { useState } from 'react'
import { Container } from '@/shared/components/Container'
import { homeSolutionsTabs, individualSolutions } from '../constants'

// SVG icons for each service
function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case 'home':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'refresh':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      )
    case 'stack':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    case 'crane':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 4h15l5 7H10" />
          <path d="M6 4v16" />
          <path d="M22 11v9" />
          <path d="M2 20h20" />
        </svg>
      )
    case 'tools':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m14.7 10.8 4.6-4.6a2 2 0 1 0-2.8-2.8l-4.6 4.6" />
          <path d="M18.5 2.5 12 9l-4 4-5 5a2 2 0 0 0 2.8 2.8l5-5 4-4 6.5-6.5" />
          <path d="m10 14 4 4" />
        </svg>
      )
    case 'document':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    default:
      return null
  }
}

export function HomeSolutionsSection() {
  const [activeTab, setActiveTab] = useState('individuals')

  return (
    <section className="bg-white py-16 md:py-20">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Solutions for <br className="hidden sm:inline" />
              Every Capital Need
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              From buying your first home to growing your business, CapitalKnob
              helps you explore the right financing options based on your goals.
            </p>
          </div>

          {/* Right Tabs & Explore Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:gap-6">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-200 pb-2 sm:border-none sm:pb-0">
              {homeSolutionsTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'font-bold text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-navy'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Explore All CTA */}
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-2xs transition-colors hover:border-navy hover:text-navy"
            >
              <span>Explore All Solutions</span>
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* 6 Cards Grid strictly conforming to reference design */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {individualSolutions.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-4">
                {/* Icon */}
                <div className="text-navy transition-colors group-hover:text-gold">
                  <ServiceIcon name={card.icon} />
                </div>

                {/* Title */}
                <h3 className="mt-3 font-display text-sm font-bold text-ink sm:text-[15px]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">
                  {card.description}
                </p>

                {/* Circular Arrow Button at bottom right */}
                <div className="mt-4 flex justify-end">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
