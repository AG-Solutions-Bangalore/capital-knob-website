/**
 * SitemapList — live sitemap page list.
 *
 * Loading, error, and empty states included. Entries link to the matching
 * frontend route when one exists, otherwise render as plain text.
 */

import { Link } from 'react-router-dom'
import { useSitemapQuery } from '../hooks/useSitemapQuery'

/** Backend page slugs → known frontend routes (partial on purpose). */
const KNOWN_ROUTES: Record<string, string> = {
  'about-us': '/about-us',
  blogs: '/blogs',
  contacts: '/contact',
  'home-finance': '/home-finance',
  'business-loan': '/business-finance',
  'real-estate-project-finance': '/real-estate-finance',
  'private-credit': '/private-credit',
}

export function SitemapList() {
  const { data, isPending, isError } = useSitemapQuery()

  if (isPending) {
    return (
      <div role="status" className="animate-pulse space-y-2 rounded-xl border border-line bg-white p-5 shadow-soft">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-2/3 rounded bg-line-soft" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load the sitemap. Please try again later.
      </div>
    )
  }

  const entries = (data?.data ?? []).filter((e) => e.page_two_status === 'Active')
  if (entries.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No sitemap pages published yet.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-line rounded-xl border border-line bg-white shadow-soft">
      {entries.map((entry) => {
        const slug = entry.page_two_url ?? ''
        const href = KNOWN_ROUTES[slug]
        return (
          <li key={entry.id ?? slug} className="flex items-center justify-between gap-3 px-5 py-3">
            {href ? (
              <Link to={href} className="text-sm font-semibold text-navy hover:text-brand-blue hover:underline">
                {entry.page_two_name ?? slug}
              </Link>
            ) : (
              <span className="text-sm font-semibold text-ink">{entry.page_two_name ?? slug}</span>
            )}
            <span className="shrink-0 rounded-full bg-line-soft px-2.5 py-1 font-mono text-[11px] text-muted">
              /{slug}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
