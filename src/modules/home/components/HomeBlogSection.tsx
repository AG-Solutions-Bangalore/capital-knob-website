/**
 * HomeBlogSection — displays two distinct API-driven blog sections on the homepage:
 * 1. Featured Blogs (`GET /getFeaturedBlogs` via `useFeaturedBlogsQuery`)
 * 2. Front Blogs (`GET /getFrontBlogs` via `useFrontBlogsQuery`)
 *
 * Strictly reflects the exact data from each API.
 * If data comes, it shows the component; if no data (empty or null), it completely hides the component.
 */

import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import {
  useFeaturedBlogsQuery,
  useFrontBlogsQuery,
} from '@/modules/blogs/hooks/useBlogsQueries'
import { BlogCarousel } from '@/modules/blogs/components/BlogCarousel'

/** Featured Blogs Section — strictly powered by GET /getFeaturedBlogs (hidden if no data) */
export function HomeFeaturedBlogSection() {
  const { data: featuredData, isPending } = useFeaturedBlogsQuery()

  const featuredBlogs = featuredData?.data ?? []
  const featuredBase = featuredData?.image_url ?? []

  // If loading or if API returns no data, hide component completely
  if (isPending || featuredBlogs.length === 0) {
    return null
  }

  return (
    <SectionReveal as="div">
      <section className="bg-surface py-16 lg:py-24 border-t border-line/60">
        <Container size="4xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                FEATURED ARTICLES
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                Featured Blogs
              </h2>
              <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Handpicked perspectives, strategic insights, and high-value advisory analyses.
              </p>
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

          <BlogCarousel
            blogs={featuredBlogs}
            base={featuredBase}
            ariaLabel="Featured blogs"
          />
        </Container>
      </section>
    </SectionReveal>
  )
}

/** Front Blogs Section — strictly powered by GET /getFrontBlogs (hidden if no data) */
export function HomeFrontBlogSection() {
  const { data: frontData, isPending } = useFrontBlogsQuery()

  const frontBlogs = frontData?.data ?? []
  const frontBase = frontData?.image_url ?? []

  // If loading or if API returns no data, hide component completely
  if (isPending || frontBlogs.length === 0) {
    return null
  }

  return (
    <SectionReveal as="div">
      <section className="bg-white py-16 lg:py-24 border-t border-line/60">
        <Container size="4xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                LATEST ARTICLES &amp; INSIGHTS
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                Front Blogs
              </h2>
              <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Explore market intelligence, financing options, and actionable capital growth guides.
              </p>
            </div>

            <Link
              to={ROUTES.blogs}
              title={linkTitleFor(ROUTES.blogs)}
              className="group inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-2.5 text-xs font-bold text-navy shadow-soft transition-all duration-200 hover:border-gold hover:text-gold hover:shadow-md"
            >
              <span>Browse All Blogs</span>
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

          <BlogCarousel
            blogs={frontBlogs}
            base={frontBase}
            ariaLabel="Front blogs"
          />
        </Container>
      </section>
    </SectionReveal>
  )
}

/** Default export renders both conditionally */
export function HomeBlogSection() {
  return (
    <>
      <HomeFeaturedBlogSection />
      <HomeFrontBlogSection />
    </>
  )
}

export default HomeBlogSection
