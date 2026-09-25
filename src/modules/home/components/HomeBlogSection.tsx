/**
 * HomeBlogSection — displays front/featured blogs on the homepage (`GET /getFrontBlogs`).
 *
 * Block 1 is a carousel of front blogs (auto-play, arrows, dots, swipe).
 * Block 2 is an "Other Blogs" carousel with the remaining `GET /getBlogs`
 * articles. Both carousels share the same `BlogCard` design via
 * the reusable `BlogCarousel` component (also used on the blog detail page).
 *
 * If no blogs are published or returned by the API, gracefully returns null.
 */

import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useFrontBlogsQuery, useBlogsQuery } from '@/modules/blogs/hooks/useBlogsQueries'
import { BlogCarousel } from '@/modules/blogs/components/BlogCarousel'

export function HomeBlogSection() {
  const { data: frontData, isPending: isFrontPending, isError: isFrontError } = useFrontBlogsQuery()
  const { data: listData, isPending: isListPending } = useBlogsQuery()

  const isPending = isFrontPending && isListPending

  // Carousel source: front blogs first, fallback to latest list blogs
  const carouselBlogs =
    (frontData?.data && frontData.data.length > 0)
      ? frontData.data
      : (listData?.data ?? [])

  const carouselBase =
    (frontData?.image_url && frontData.image_url.length > 0)
      ? frontData.image_url
      : (listData?.image_url ?? [])

  // "Other blogs": every list blog NOT already shown in the carousel
  const carouselSlugs = new Set(
    carouselBlogs.map((b) => b.blog_slug || String(b.id || '')),
  )
  const otherBlogs = (listData?.data ?? []).filter((b) => {
    const slug = b.blog_slug || String(b.id || '')
    // When the carousel itself fell back to list blogs, only treat the
    // overflow (beyond the first 3) as "other" so nothing duplicates.
    if (!frontData?.data || frontData.data.length === 0) {
      return false
    }
    return !carouselSlugs.has(slug)
  })
  const fallbackOthers =
    (!frontData?.data || frontData.data.length === 0)
      ? (listData?.data ?? []).slice(3)
      : []
  const otherBlogsToShow = otherBlogs.length > 0 ? otherBlogs : fallbackOthers
  const otherBase = listData?.image_url ?? []

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
  if ((isFrontError && carouselBlogs.length === 0) || carouselBlogs.length === 0) {
    return null
  }

  return (
    <section className="bg-surface py-16 lg:py-24 border-t border-line/60">
      <Container size="4xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
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

        {/* ---- Carousel 1: featured / front blogs ---- */}
        <BlogCarousel
          blogs={carouselBlogs}
          base={carouselBase}
          ariaLabel="Featured articles"
        />

        {/* ---- Carousel 2: Other blogs ---- */}
        {otherBlogsToShow.length > 0 && (
          <div className="mt-16 border-t border-line/60 pt-12">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                  KEEP EXPLORING
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
                  Other Blogs
                </h3>
                <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                More guides and perspectives from our advisory team — beyond the featured stories above.
              </p>
            </div>

            <BlogCarousel
              blogs={otherBlogsToShow}
              base={otherBase}
              ariaLabel="Other blogs"
            />
          </div>
        )}
      </Container>
    </section>
  )
}
