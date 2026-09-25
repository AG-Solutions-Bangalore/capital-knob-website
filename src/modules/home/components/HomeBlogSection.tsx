/**
 * HomeBlogSection — displays front/featured blogs on the homepage (`GET /getFrontBlogs`).
 *
 * If no blogs are published or returned by the API, gracefully returns null.
 */

import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useFrontBlogsQuery, useBlogsQuery } from '@/modules/blogs/hooks/useBlogsQueries'
import { BlogCard } from '@/modules/blogs/components/BlogList'

export function HomeBlogSection() {
  const { data: frontData, isPending: isFrontPending, isError: isFrontError } = useFrontBlogsQuery()
  const { data: listData, isPending: isListPending } = useBlogsQuery()

  const isPending = isFrontPending && isListPending

  // Primary source is front blogs; fallback to list blogs if front is empty
  const blogs =
    (frontData?.data && frontData.data.length > 0)
      ? frontData.data
      : (listData?.data ?? [])

  const base =
    (frontData?.image_url && frontData.image_url.length > 0)
      ? frontData.image_url
      : (listData?.image_url ?? [])

  if (isPending) {
    return (
      <section className="bg-surface py-16 lg:py-24">
        <Container size="4xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="h-4 w-32 animate-pulse rounded bg-line-soft" />
              <div className="mt-3 h-8 w-64 animate-pulse rounded bg-line-soft" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-line bg-white p-5 shadow-soft">
                <div className="h-44 rounded-xl bg-line-soft" />
                <div className="mt-4 h-5 w-3/4 rounded bg-line-soft" />
                <div className="mt-2 h-4 w-1/2 rounded bg-line-soft" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  // Gracefully hide if no blogs exist or error
  if ((isFrontError && blogs.length === 0) || blogs.length === 0) {
    return null
  }

  // Show up to 3 blogs on the homepage
  const displayedBlogs = blogs.slice(0, 3)

  return (
    <section className="bg-surface py-16 lg:py-24 border-t border-line/60">
      <Container size="4xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              LATEST ARTICLES &amp; INSIGHTS
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Market Intelligence &amp; Advisory
            </h2>
            <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
          </div>

          <Link
            to={ROUTES.blogs}
            title={linkTitleFor(ROUTES.blogs)}
            className="group inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-bold text-navy shadow-soft transition-all duration-200 hover:border-gold hover:text-gold hover:shadow-md"
          >
            <span>View All Insights</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedBlogs.map((blog) => (
            <BlogCard
              key={blog.id ?? blog.blog_slug ?? blog.blog_title}
              blog={blog}
              base={base}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
