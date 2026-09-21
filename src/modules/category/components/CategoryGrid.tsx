/**
 * CategoryGrid — displays live service categories with sub-category counts.
 *
 * Loading, error, and empty states included.
 */

import { useCategoryQuery } from '../hooks/useCategoryQuery'

export function CategoryGrid() {
  const { data, isPending, isError } = useCategoryQuery()

  if (isPending) {
    return (
      <div role="status" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-5 shadow-soft">
            <div className="h-5 w-3/4 rounded bg-line-soft" />
            <div className="mt-3 h-4 w-full rounded bg-line-soft" />
            <div className="mt-2 h-4 w-1/2 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700">
        Could not load categories. Please try again later.
      </div>
    )
  }

  const categories = data?.data ?? []
  if (categories.length === 0) {
    return (
      <p role="status" className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
        No categories published yet.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <li
          key={cat.id ?? cat.category_slug ?? cat.category_name}
          className="rounded-xl border border-line bg-white p-5 shadow-soft transition-shadow hover:shadow-md"
        >
          <h3 className="font-display text-base font-bold text-navy">
            {cat.category_name ?? 'Untitled'}
          </h3>
          {cat.category_description && (
            <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">
              {cat.category_description}
            </p>
          )}
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-gold">
            {(cat.category_subs ?? []).length} sub-categories
          </p>
          {(cat.category_subs ?? []).length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {(cat.category_subs ?? []).slice(0, 4).map((sub) => (
                <li
                  key={sub.id ?? sub.category_sub_name}
                  className="rounded-full bg-line-soft px-2.5 py-1 text-[11px] font-medium text-ink"
                >
                  {sub.category_sub_name}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
