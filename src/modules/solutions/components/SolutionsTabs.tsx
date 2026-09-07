/**
 * SolutionsTabs — the segmented tab bar at the top of the solutions
 * sections (Individuals / Businesses / Investors / Developers).
 * Visual only on the home page (each section is rendered separately
 * below), but the active state still updates so the bar feels alive.
 */

import { useState } from 'react'
import { cn } from '@/shared/lib/cn'
import type { AudienceTab } from '../constants'
import { audienceTabs } from '../constants'

interface SolutionsTabsProps {
  /** Tab to show as active on first render. */
  defaultTab?: AudienceTab
}

export function SolutionsTabs({ defaultTab = 'individuals' }: SolutionsTabsProps) {
  const [active, setActive] = useState<AudienceTab>(defaultTab)

  return (
    <div className="border-b border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul
          role="tablist"
          className="flex flex-wrap gap-1 text-sm font-semibold sm:gap-10"
        >
          {audienceTabs.map((tab) => {
            const isActive = tab.id === active
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    'relative -mb-px border-b-2 px-1 py-3 transition-colors',
                    isActive
                      ? 'border-gold text-navy'
                      : 'border-transparent text-muted hover:text-ink',
                  )}
                >
                  {tab.label}
                </button>
              </li>
            )
          })}
        </ul>

        <a
          href="#talk-to-expert"
          className="inline-flex items-center gap-2 rounded-button border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
        >
          Talk to an Expert
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
  )
}