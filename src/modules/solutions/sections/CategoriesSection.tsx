/**
 * CategoriesSection — live service categories on the Solutions page.
 *
 * Renders `CategoryGrid` (`GET /getCategory`) under a section heading.
 * Loading, error, and empty states are handled inside the grid, so this
 * section never breaks the page when the API is down.
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { CategoryGrid } from '@/modules/category/components/CategoryGrid'

interface CategoriesSectionProps {
  onEnquire: (title: string) => void
}

export function CategoriesSection({ onEnquire }: CategoriesSectionProps) {
  // Deep-link support: `#category-{slug}` (e.g. from the nav mega-menu)
  // scrolls to the matching live card and highlights it.
  const { hash } = useLocation()
  const highlightSlug = hash.startsWith('#category-')
    ? decodeURIComponent(hash.replace('#category-', ''))
    : null

  useEffect(() => {
    if (!highlightSlug) return
    // Wait a tick so the live grid has rendered before scrolling.
    const t = window.setTimeout(() => {
      document
        .getElementById(`category-${highlightSlug}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    return () => window.clearTimeout(t)
  }, [highlightSlug, hash])
  return (
    <section className="bg-surface py-16 md:py-20">
      <Container size="4xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Browse Categories
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Explore Every Financing Category
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Live categories from our advisory desk — pick one to see its
            sub-categories at a glance.
          </p>
        </div>
        <div className="mt-8 sm:mt-10">
          <CategoryGrid onEnquire={onEnquire} highlightSlug={highlightSlug} />
        </div>
      </Container>
    </section>
  )
}
