/**
 * BlogDetailPage — public single-blog view (`GET /getBlogsBySlug/{slug}`).
 *
 * Unknown slugs render the card's "not found" state instead of crashing.
 * FAQ renders as a full-width sibling below the article (same band layout
 * as every other page), driven by the blog slug with fallback to the
 * shared `blogs` data. No testimonial section on this page by design.
 */

import { Link, useParams } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { FaqSection } from '@/modules/faq'
import { useBlogBySlugQuery } from '../hooks/useBlogsQueries'
import { BlogDetailCard } from '../components/BlogDetailCard'

export function BlogDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  // Same query key as BlogDetailCard — cached, no extra network request.
  // Only needed for the direct `faq` items embedded in the detail response.
  const { data } = useBlogBySlugQuery(slug || undefined)

  return (
    <>
      <section className="bg-navy py-6 text-white md:py-8">
        <Container size="4xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-white/70">
              <Link to={ROUTES.home} className="transition-colors hover:text-gold">Home</Link>
              <span className="text-white/30">/</span>
              <Link to={ROUTES.blogs} className="transition-colors hover:text-gold">Blogs &amp; Insights</Link>
              <span className="text-white/30">/</span>
              <span className="truncate text-gold max-w-[200px] sm:max-w-md">Details</span>
            </nav>
            <Link
              to={ROUTES.blogs}
              title={linkTitleFor(ROUTES.blogs)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-gold"
            >
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
                <path d="M19 12H5" />
                <path d="m11 18-6-6 6-6" />
              </svg>
              All Articles
            </Link>
          </div>
        </Container>
      </section>
      <section className="bg-surface py-10 md:py-14">
        <Container size="4xl">
          <BlogDetailCard slug={slug} />
        </Container>
      </section>
      <FaqSection slug={slug} fallbackSlug="blogs" items={data?.faq} title="FAQ" />
    </>
  )
}
