/**
 * ApiCheckPage — DEV-ONLY backend verification dashboard.
 *
 * Registered in the router only when `import.meta.env.DEV` is true, so it
 * never ships to production. It fires every Website GET endpoint through
 * its real React Query hook and reports live status, letting you verify
 * all integrations from a single route (`/api-check`) instead of curl.
 *
 * The two mutations are verified through their UI (links below) — they
 * are not auto-submitted here to avoid creating junk leads.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { ROUTES } from '@/app/routes'
import { env } from '@/shared/lib/env'
import { useCompanyQuery } from '@/modules/company/hooks/useCompanyQuery'
import { useCategoryQuery } from '@/modules/category/hooks/useCategoryQuery'
import {
  useBlogBySlugQuery,
  useBlogsQuery,
  useFeaturedBlogsQuery,
  useFrontBlogsQuery,
} from '@/modules/blogs/hooks/useBlogsQueries'
import { useFaqBySlugQuery } from '@/modules/faq/hooks/useFaqQuery'
import { useTestimonialsQuery } from '@/modules/testimonial/hooks/useTestimonialQuery'
import { useClientsQuery } from '@/modules/client/hooks/useClientQuery'
import { useSitemapQuery } from '@/modules/sitemap/hooks/useSitemapQuery'
import { CompanyCard } from '@/modules/company/components/CompanyCard'
import { CategoryGrid } from '@/modules/category/components/CategoryGrid'
import { BlogDetailCard, BlogList } from '@/modules/blogs/components/BlogList'
import { FaqAccordion } from '@/modules/faq/components/FaqAccordion'
import { TestimonialCards } from '@/modules/testimonial/components/TestimonialCards'
import { ClientGrid } from '@/modules/client/components/ClientGrid'
import { SitemapList } from '@/modules/sitemap/components/SitemapList'

type Status = 'loading' | 'success' | 'error' | 'idle'

interface CardProps {
  method: string
  endpoint: string
  status: Status
  detail: string
  error?: string
}

function EndpointCard({ method, endpoint, status, detail, error }: CardProps) {
  const badge =
    status === 'success'
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : status === 'error'
        ? 'bg-rose-100 text-rose-700 border-rose-200'
        : status === 'loading'
          ? 'bg-amber-100 text-amber-800 border-amber-200'
          : 'bg-slate-100 text-slate-600 border-slate-200'
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-navy px-2 py-0.5 font-mono text-[11px] font-bold text-white">
          {method}
        </span>
        <code className="min-w-0 flex-1 break-all font-mono text-xs text-ink">
          {endpoint}
        </code>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${badge}`}
        >
          {status}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{detail}</p>
      {error && (
        <p className="mt-1 break-words text-xs text-rose-600">{error}</p>
      )}
    </div>
  )
}

function summarize(query: {
  isPending: boolean
  isError: boolean
  error: Error | null
}): { status: Status; error?: string } {
  if (query.isPending) return { status: 'loading' }
  if (query.isError)
    return { status: 'error', error: query.error?.message ?? 'Request failed' }
  return { status: 'success' }
}

export function ApiCheckPage() {
  const [slug, setSlug] = useState('about-us')

  const company = useCompanyQuery()
  const categories = useCategoryQuery()
  const frontBlogs = useFrontBlogsQuery()
  const featuredBlogs = useFeaturedBlogsQuery()
  const blogs = useBlogsQuery()
  const blogBySlug = useBlogBySlugQuery(slug || undefined)
  const faqBySlug = useFaqBySlugQuery(slug || undefined)
  const testimonials = useTestimonialsQuery(slug || undefined)
  const clients = useClientsQuery()
  const sitemap = useSitemapQuery()

  const c = summarize(company)
  const cat = summarize(categories)
  const fb = summarize(frontBlogs)
  const ftb = summarize(featuredBlogs)
  const bl = summarize(blogs)
  const bbs = summarize(blogBySlug)
  const faq = summarize(faqBySlug)
  const tst = summarize(testimonials)
  const cli = summarize(clients)
  const sm = summarize(sitemap)

  return (
    <section className="bg-surface py-10">
      <Container size="4xl">
        <p className="inline-block rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-900">
          Dev only — hidden in production builds
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-navy md:text-3xl">
          API Verification
        </h1>
        <p className="mt-1 font-mono text-xs text-muted">
          Base URL: {env.apiBaseUrl}
        </p>

        <div className="mt-6">
          <label
            htmlFor="api-check-slug"
            className="block text-xs font-semibold text-ink"
          >
            Slug for the slug-based endpoints (try{' '}
            <span className="font-mono">about-us</span>,{' '}
            <span className="font-mono">blogs</span>)
          </label>
          <input
            id="api-check-slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.trim())}
            placeholder="about-us"
            className="mt-1 h-10 w-full max-w-xs rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <EndpointCard
            method="GET"
            endpoint="/getCompany"
            status={c.status}
            error={c.error}
            detail={
              c.status === 'success'
                ? `Name: ${company.data?.data.company_name ?? '—'} · Email: ${company.data?.data.company_email ?? '—'} · Mobile: ${company.data?.data.company_mobile_no ?? '—'}`
                : 'Company profile + asset base URLs.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint="/getCategory"
            status={cat.status}
            error={cat.error}
            detail={
              cat.status === 'success'
                ? `${categories.data?.data.length ?? 0} categories: ${(categories.data?.data ?? []).map((x) => x.category_slug ?? '?').join(', ')}`
                : 'Service categories with sub-categories.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint="/getFrontBlogs"
            status={fb.status}
            error={fb.error}
            detail={
              fb.status === 'success'
                ? `${frontBlogs.data?.data.length ?? 0} front blogs returned.`
                : 'Homepage blog feed.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint="/getFeaturedBlogs"
            status={ftb.status}
            error={ftb.error}
            detail={
              ftb.status === 'success'
                ? `${featuredBlogs.data?.data.length ?? 0} featured blogs returned.`
                : 'Featured blogs.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint="/getBlogs"
            status={bl.status}
            error={bl.error}
            detail={
              bl.status === 'success'
                ? `${blogs.data?.data.length ?? 0} blogs returned.`
                : 'Full blog listing.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint={`/getBlogsBySlug/${slug || '{slug}'}`}
            status={bbs.status}
            error={bbs.error}
            detail={
              bbs.status === 'success'
                ? (blogBySlug.data?.data
                    ? `Found: ${blogBySlug.data.data.blog_title ?? blogBySlug.data.data.id ?? slug}`
                    : `No blog for slug "${slug}" (data: null — expected for unknown slugs).`)
                : 'Single blog + prev/next navigation.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint={`/getFAQBySlug/${slug || '{slug}'}`}
            status={faq.status}
            error={faq.error}
            detail={
              faq.status === 'success'
                ? `${faqBySlug.data?.data.length ?? 0} FAQ items for slug "${slug}".`
                : 'FAQs for a page slug.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint={`/getTestimonial/${slug || '{slug}'}`}
            status={tst.status}
            error={tst.error}
            detail={
              tst.status === 'success'
                ? `${testimonials.data?.data.length ?? 0} testimonials for slug "${slug}".`
                : 'Testimonials for a page slug.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint="/getClient"
            status={cli.status}
            error={cli.error}
            detail={
              cli.status === 'success'
                ? `${clients.data?.data.length ?? 0} clients returned.`
                : 'Client / lending-partner entries.'
            }
          />
          <EndpointCard
            method="GET"
            endpoint="/getSitemap"
            status={sm.status}
            error={sm.error}
            detail={
              sm.status === 'success'
                ? `${sitemap.data?.data.length ?? 0} pages, ${sitemap.data?.blog.length ?? 0} blog entries.`
                : 'Sitemap pages + blog entries.'
            }
          />
        </div>

        <h2 className="mt-10 font-display text-xl font-bold text-navy">
          Live components
        </h2>
        <p className="mt-1 text-sm text-muted">
          The same display components the site uses, rendered with live data.
          Slug-based components follow the slug input above.
        </p>

        <div className="mt-4 space-y-8">
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              CompanyCard — GET /getCompany
            </h3>
            <CompanyCard />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              CategoryGrid — GET /getCategory
            </h3>
            <CategoryGrid />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              BlogList — GET /getBlogs
            </h3>
            <BlogList />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              BlogDetailCard — GET /getBlogsBySlug/{slug || '{slug}'}
            </h3>
            <BlogDetailCard slug={slug} />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              FaqAccordion — GET /getFAQBySlug/{slug || '{slug}'}
            </h3>
            <FaqAccordion slug={slug} />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              TestimonialCards — GET /getTestimonial/{slug || '{slug}'}
            </h3>
            <TestimonialCards slug={slug} />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              ClientGrid — GET /getClient
            </h3>
            <ClientGrid />
          </section>
          <section>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              SitemapList — GET /getSitemap
            </h3>
            <SitemapList />
          </section>
        </div>

        <h2 className="mt-10 font-display text-xl font-bold text-navy">
          Mutations — verify through the UI
        </h2>
        <p className="mt-1 text-sm text-muted">
          These are intentionally not auto-submitted here. Use the live forms —
          backend currently returns HTTP 500 for real payloads (missing mail
          views), so expect the friendly error message until that is fixed
          server-side.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-white p-4 shadow-soft">
            <p className="font-mono text-xs font-bold text-ink">
              POST /createNewsletter
            </p>
            <p className="mt-1 text-xs text-muted">
              Newsletter form lives in the site footer on every page — scroll
              down on this very page and subscribe.
            </p>
            <a
              href="#footer-newsletter-email"
              className="mt-3 inline-flex min-h-[40px] items-center rounded-button bg-navy px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-soft"
            >
              Go to footer form
            </a>
          </div>
          <div className="rounded-xl border border-line bg-white p-4 shadow-soft">
            <p className="font-mono text-xs font-bold text-ink">
              POST /createEnquiry
            </p>
            <p className="mt-1 text-xs text-muted">
              Enquiry form on the Contact page, plus the Enquire modal behind
              every Solutions card.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={ROUTES.contact}
                className="inline-flex min-h-[40px] items-center rounded-button bg-navy px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-soft"
              >
                Open Contact form
              </Link>
              <Link
                to={ROUTES.solutions}
                className="inline-flex min-h-[40px] items-center rounded-button bg-gold px-5 py-2 text-xs font-bold text-ink transition-colors hover:bg-gold-hover"
              >
                Open Solutions modal
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
