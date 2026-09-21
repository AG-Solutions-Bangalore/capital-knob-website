/**
 * CategoryMegaMenu — live Solutions mega-menu content (`GET /getCategory`).
 *
 * `SolutionsMegaPanel` reproduces the approved mega-menu layout: one column
 * per category with its sub-category links, Export + Import combined into a
 * single wide cell, and Structured Trade Finance as a full-width inline row.
 * Every link points at `/solutions#category-{slug}` so the Solutions page
 * scrolls to and highlights the matching live card.
 *
 * `SolutionsMobileLinks` is the compact sidebar version: "View All
 * Solutions" plus one link per live category. Both fall back to `null`
 * (callers render the static children instead) while loading, on error, or
 * when the backend has no categories.
 */

import { Link, useLocation } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useCategoryQuery } from '../hooks/useCategoryQuery'
import { categoryAnchor } from '../categoryAnchor'
import type { Category, CategorySub } from '../api/category.types'

/** One deep-blue tone per parent heading, in render order. */
const HEADING_BLUES = [
  '#16265c',
  '#1e3a8a',
  '#1e40af',
  '#1d4ed8',
  '#0c4a6e',
  '#075985',
  '#0369a1',
  '#155e75',
  '#274b73',
  '#2f5aa8',
]

function useActiveTo(to: string): boolean {
  const { pathname, hash } = useLocation()
  return `${pathname}${hash}` === to
}

function SubLink({ to, label, onNavigate }: { to: string; label: string; onNavigate: () => void }) {
  const active = useActiveTo(to)
  return (
    <Link
      to={to}
      title={linkTitleFor(to)}
      onClick={onNavigate}
      aria-current={active ? 'true' : undefined}
      className={`text-xs transition-colors hover:text-navy hover:underline hover:underline-offset-4 ${
        active ? 'font-semibold text-navy' : 'text-muted'
      }`}
    >
      {label}
    </Link>
  )
}

function HeadingLink({
  to,
  label,
  onNavigate,
  tone,
}: {
  to: string
  label: string
  onNavigate: () => void
  tone?: string
}) {
  const active = useActiveTo(to)
  return (
    <Link
      to={to}
      title={linkTitleFor(to)}
      onClick={onNavigate}
      aria-current={active ? 'true' : undefined}
      style={tone ? ({ '--heading': tone } as CSSProperties) : undefined}
      className={`text-[13px] font-bold transition-colors hover:text-gold hover:underline hover:underline-offset-4 ${
        active ? 'text-gold' : tone ? 'text-[var(--heading)]' : 'text-navy'
      }`}
    >
      {label}
    </Link>
  )
}

function MegaCell({
  category,
  onNavigate,
  tone,
}: {
  category: Category
  onNavigate: () => void
  tone?: string
}) {
  const slug = category.category_slug ?? ''
  const subs = category.category_subs ?? []

  return (
    <div className="min-w-0">
      <HeadingLink
        to={categoryAnchor(slug)}
        label={category.category_name ?? 'Untitled'}
        onNavigate={onNavigate}
        tone={tone}
      />
      <ul className="mt-2 space-y-1">
        {subs.map((sub: CategorySub) => (
          <li key={sub.id ?? sub.category_sub_name}>
            <SubLink
              to={categoryAnchor(slug)}
              label={sub.category_sub_name ?? ''}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SolutionsMegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const { data, isPending, isError } = useCategoryQuery()

  if (isPending) {
    return (
      <div role="status" aria-label="Loading categories" className="grid animate-pulse grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-line-soft" />
            <div className="h-3 w-full rounded bg-line-soft" />
            <div className="h-3 w-5/6 rounded bg-line-soft" />
          </div>
        ))}
      </div>
    )
  }

  const cats = data?.data ?? []
  if (isError || cats.length === 0) return null

  return (
    <div className="space-y-6">
      {/* 4-5 menus in one line (grid-cols-5 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-7 gap-y-6">
        {cats.map((cat, idx) => (
          <MegaCell
            key={cat.id ?? cat.category_slug}
            category={cat}
            onNavigate={onNavigate}
            tone={HEADING_BLUES[idx % HEADING_BLUES.length]}
          />
        ))}
      </div>

      {/* Footer info bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-line pt-3.5 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Institutional &amp; corporate financing solutions across India &amp; overseas</span>
        </div>
        <Link
          to={ROUTES.solutions}
          onClick={onNavigate}
          className="font-semibold text-navy hover:text-gold hover:underline"
        >
          View all {cats.length} Solutions &amp; 60+ Products →
        </Link>
      </div>
    </div>
  )
}

export function SolutionsMobileLinks({ onPick }: { onPick: () => void }) {
  const { data, isPending, isError } = useCategoryQuery()

  if (isPending) {
    return (
      <div role="status" aria-label="Loading categories" className="flex animate-pulse flex-col gap-2 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-8 rounded-button bg-line-soft" />
        ))}
      </div>
    )
  }

  const cats = data?.data ?? []
  if (isError || cats.length === 0) return null

  return (
    <ul className="flex flex-col gap-1">
      <li>
        <Link
          to={ROUTES.solutions}
          title={linkTitleFor(ROUTES.solutions)}
          onClick={onPick}
          className="flex items-center justify-between rounded-button px-3 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:bg-line-soft"
        >
          <span>View All Solutions</span>
        </Link>
      </li>
      {cats.map((cat) => (
        <li key={cat.id ?? cat.category_slug}>
          <Link
            to={categoryAnchor(cat.category_slug)}
            title={linkTitleFor(categoryAnchor(cat.category_slug ?? ''))}
            onClick={onPick}
            className="flex items-center justify-between rounded-button px-3 py-2.5 text-[13px] text-ink-soft transition-colors hover:bg-line-soft hover:text-ink"
          >
            <span>
              {cat.category_name}
              <span className="ml-1.5 text-[11px] text-muted">
                {(cat.category_subs ?? []).length}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
