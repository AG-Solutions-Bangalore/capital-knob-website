/**
 * BlogCarousel — reusable horizontal carousel for blog cards.
 *
 * Uses the exact same `BlogCard` design as the listing / homepage so every
 * carousel across the site looks identical. Behaviour: snap scrolling,
 * prev/next arrows, dots, counter, auto-play (pauses on hover / touch),
 * swipe natively via overflow-x.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Blog } from '../api/blogs.types'
import type { ImageUrlEntry } from '@/modules/company/api/company.types'
import { BlogCard } from './BlogList'

function blogKey(blog: Blog, index: number) {
  return `${blog.id ?? blog.blog_slug ?? blog.blog_title ?? 'blog'}-${index}`
}

interface BlogCarouselProps {
  blogs: Blog[]
  base: ImageUrlEntry[]
  ariaLabel?: string
  autoplayMs?: number
}

export function BlogCarousel({
  blogs,
  base,
  ariaLabel = 'Blog articles',
  autoplayMs = 5000,
}: BlogCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const updateState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 8)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8)
    const maxScroll = Math.max(1, scrollWidth - clientWidth)
    const progress = Math.min(1, Math.max(0, scrollLeft / maxScroll))
    setActiveIndex(Math.round(progress * Math.max(0, blogs.length - 1)))
  }, [blogs.length])

  useEffect(() => {
    // Reset position whenever the underlying list changes (e.g. slug change).
    // The deferred `updateState` below re-derives the active index (0) from
    // the reset scroll position, so no direct setState is needed here.
    trackRef.current?.scrollTo({ left: 0 })
    // Defer measurement until layout settles
    const raf = requestAnimationFrame(updateState)
    window.addEventListener('resize', updateState)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateState)
    }
  }, [blogs, updateState])

  const scrollByPage = useCallback((dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current
      if (!el || blogs.length <= 1) return
      const maxScroll = el.scrollWidth - el.clientWidth
      el.scrollTo({
        left: (maxScroll * index) / (blogs.length - 1),
        behavior: 'smooth',
      })
    },
    [blogs.length],
  )

  useEffect(() => {
    if (isPaused || blogs.length <= 1) return
    const timer = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const { scrollLeft, scrollWidth, clientWidth } = el
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 16
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' })
      }
    }, autoplayMs)
    return () => clearInterval(timer)
  }, [isPaused, blogs.length, autoplayMs])

  if (blogs.length === 0) return null

  const showControls = blogs.length > 1

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={updateState}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-2"
      >
        {blogs.map((blog, i) => (
          <div
            key={blogKey(blog, i)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${blogs.length}`}
            className="w-full shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <BlogCard blog={blog} base={base} />
          </div>
        ))}
      </div>

      {showControls && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label={`Choose ${ariaLabel}`}
          >
            {blogs.map((blog, i) => (
              <button
                key={`dot-${blogKey(blog, i)}`}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to article ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 bg-gold'
                    : 'w-2 bg-line hover:bg-gold/60'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-slate-400">
              <span className="text-gold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              {' / '}
              {String(blogs.length).padStart(2, '0')}
            </span>
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Carousel controls"
            >
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label="Previous articles"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-navy shadow-soft transition-all hover:border-gold hover:bg-gold hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-white disabled:hover:text-navy"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label="Next articles"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-navy shadow-soft transition-all hover:border-gold hover:bg-gold hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-white disabled:hover:text-navy"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
