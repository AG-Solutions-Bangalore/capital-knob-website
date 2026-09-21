/**
 * BlogDetailPage — public single-blog view (`GET /getBlogsBySlug/{slug}`).
 *
 * Unknown slugs render the card's "not found" state instead of crashing.
 */

import { Link, useParams } from 'react-router-dom'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Container } from '@/shared/components/Container'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { BlogDetailCard } from '../components/BlogDetailCard'

export function BlogDetailPage() {
  usePageSeo('blogs')
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <>
      <section className="bg-navy py-10 text-white md:py-12">
        <Container size="4xl">
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
            All Blogs
          </Link>
          <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Blog
          </h1>
        </Container>
      </section>
      <section className="bg-surface py-10 md:py-14">
        <Container size="4xl">
          <BlogDetailCard slug={slug} />
        </Container>
      </section>
    </>
  )
}
