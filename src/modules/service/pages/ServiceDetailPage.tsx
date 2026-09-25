/**
 * ServiceDetailPage — one live page per service (`GET /getCategory`).
 *
 * URL is driven by the category slug, e.g. `/services/home-finance`.
 * The hero shows the live category name/description/banner; sub-services
 * render 3-per-row in the old `ServiceCard` style with fully dynamic
 * image paths (live file, else the backend No Image placeholder).
 *
 * `WhyChooseSection` + `StepsSection` are the same fixed shared sections
 * used everywhere — identical on every service page.
 */

import { Suspense, lazy, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { ROUTES, servicePath } from '@/app/routes'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useCategoryQuery } from '@/modules/category/hooks/useCategoryQuery'
import { ServiceCard } from '../components/ServiceCard'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { StepsSection } from '../sections/StepsSection'
import { FaqSection } from '@/modules/faq'
import { TestimonialSection } from '@/modules/testimonial/components/TestimonialSection'
import {
  businessesCards,
  individualsCards,
  otherCapitalCards,
  type ServiceCard as ServiceCardData,
} from '../constants'

// Visual pool for sub-service cards — old icons/illustrations cycled in
// order. Only visuals come from here; all text + images are live.
const VISUAL_POOL: Pick<ServiceCardData, 'iconKey' | 'art'>[] = [
  ...individualsCards.map((c) => ({ iconKey: c.iconKey, art: c.art })),
  ...businessesCards.map((c) => ({ iconKey: c.iconKey, art: c.art })),
  ...otherCapitalCards.map((c) => ({ iconKey: c.iconKey, art: c.art })),
]

// Per-service hero image SEO overrides from the on-page audit.
// Falls back to the live category name so no service banner ever
// renders without alt/title.
const HERO_IMAGE_SEO: Record<string, { alt: string; title: string }> = {
  'home-finance': {
    alt: 'Home Finance Services in Bangalore',
    title: 'Home Finance Services',
  },
  'business-loan': {
    alt: 'Business Loan Services in Bangalore',
    title: 'Business Loan Services',
  },
  'real-estate-project-finance': {
    alt: 'Real Estate Project Finance',
    title: 'Real Estate Project Finance',
  },
}

const HERO_IMAGE_SEO_BY_FILE: Record<string, { alt: string; title: string }> = {
  '1.webp': {
    alt: 'Home Finance Services in Bangalore',
    title: 'Home Finance Services',
  },
  '2.webp': {
    alt: 'Business Loan Services in Bangalore',
    title: 'Business Loan Services',
  },
  '3.webp': {
    alt: 'Real Estate Project Finance',
    title: 'Real Estate Project Finance',
  },
}

const EnquiryModal = lazy(() =>
  import('../components/EnquiryModal').then((m) => ({ default: m.EnquiryModal })),
)


export function ServiceDetailPage({ categorySlug }: { categorySlug?: string } = {}) {
  const { slug: paramSlug = '' } = useParams<{ slug: string }>()
  const location = useLocation()
  const pathSlug = location.pathname.replace(/^\//, '').split('/')[0]
  const rawSlug = categorySlug || paramSlug || pathSlug || ''
  const decoded = decodeURIComponent(rawSlug)
  const { data, isPending, isError } = useCategoryQuery()
  const [enquirySubject, setEnquirySubject] = useState<string | null>(null)
  const [hasOpened, setHasOpened] = useState(false)

  const category = (data?.data ?? []).find((c) => c.category_slug === decoded)
  const subs = category?.category_subs ?? []

  const categoryBase =
    data?.image_url?.find((e) => e.image_for === 'Category')?.image_url ?? ''
  const subBase =
    data?.image_url?.find((e) => e.image_for === 'Category Sub')?.image_url ?? ''
  const noImage =
    data?.image_url?.find((e) => e.image_for === 'No Image')?.image_url ?? null

  const bannerFile = category?.category_banner_image?.trim()
  const bannerSrc = bannerFile ? `${categoryBase}${bannerFile}` : noImage

  function openEnquiry(title: string) {
    setHasOpened(true)
    setEnquirySubject(title)
  }

  if (isPending) {
    return (
      <section className="bg-surface py-16">
        <Container size="4xl">
          <div role="status" aria-label="Loading service" className="animate-pulse">
            <div className="h-8 w-2/3 rounded bg-line-soft" />
            <div className="mt-4 h-4 w-full rounded bg-line-soft" />
            <div className="mt-2 h-4 w-5/6 rounded bg-line-soft" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-64 rounded-card border border-line bg-white" />
              ))}
            </div>
          </div>
        </Container>
      </section>
    )
  }

  if (isError || !category) {
    return (
      <section className="bg-surface py-16">
        <Container size="4xl">
          <div className="rounded-xl border border-line bg-white p-8 text-center shadow-soft">
            <h1 className="font-display text-2xl font-extrabold text-ink">
              Service not found
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              We couldn&rsquo;t find a service for &ldquo;{decoded}&rdquo;. It may
              have been renamed — browse all live services instead.
            </p>
            <Link
              to={ROUTES.services}
              title={linkTitleFor(ROUTES.services)}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gold-hover"
            >
              View All Services
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  const name = category.category_name ?? 'Service'
  const heroImageSeo =
    (bannerFile ? HERO_IMAGE_SEO_BY_FILE[bannerFile] : undefined) ??
    HERO_IMAGE_SEO[decoded] ?? {
      alt: name,
      title: `${name} – CapitalKnob`,
    }

  return (
    <>
      {/* Hero — live category identity */}
      <section className="bg-navy py-10 text-white md:py-14">
        <Container size="4xl">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/70">
                  <li>
                    <Link
                      to={ROUTES.home}
                      title={linkTitleFor(ROUTES.home)}
                      className="transition-colors hover:text-gold"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      to={ROUTES.services}
                      title={linkTitleFor(ROUTES.services)}
                      className="transition-colors hover:text-gold"
                    >
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-gold">
                    {name}
                  </li>
                </ol>
              </nav>
              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                {name}
              </h1>
              {category.category_description && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {category.category_description}
                </p>
              )}
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                {subs.length} financing option{subs.length === 1 ? '' : 's'} available
              </p>
            </div>
            <div className="lg:col-span-5">
              {bannerSrc && (
                <div className="overflow-hidden rounded-card border border-white/10 shadow-card">
                  <img
                    src={bannerSrc}
                    alt={heroImageSeo.alt}
                    title={heroImageSeo.title}
                    className="aspect-[16/9] w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Sub-services — 3 per row, old card style, live data */}
      <section className="bg-surface py-12 md:py-16">
        <Container size="4xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {name} Options
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Explore {name} Financing
            </h2>
          </div>
          {subs.length === 0 ? (
            <p role="status" className="mt-6 rounded-xl border border-line bg-white p-6 text-sm text-muted">
              Options for {name} are being published — check back soon, or
              talk to an advisor today.
            </p>
          ) : (
            <div className="mt-8 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subs.map((sub, idx) => {
                const visual = VISUAL_POOL[idx % VISUAL_POOL.length]
                const file = sub.category_sub_image?.trim()
                return (
                  <ServiceCard
                    key={sub.id ?? sub.category_sub_name ?? idx}
                    id={`${decoded}-${sub.id ?? idx}`}
                    title={sub.category_sub_name?.trim() || name}
                    description={sub.category_sub_description?.trim() || category.category_description || ''}
                    iconKey={visual.iconKey}
                    art={visual.art}
                    imageSrc={file ? `${subBase}${file}` : (noImage ?? undefined)}
                    imageTitle={`${sub.category_sub_name} – CapitalKnob`}
                    href={servicePath(decoded)}
                    onEnquire={openEnquiry}
                  />
                )
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Fixed shared sections — identical on every service page */}
      <SectionReveal as="section">
        <WhyChooseSection />
      </SectionReveal>
      <SectionReveal as="section">
        <StepsSection />
      </SectionReveal>
      <SectionReveal as="section">
        <TestimonialSection slug={decoded} />
      </SectionReveal>
      <SectionReveal as="section">
        <FaqSection slug={decoded} title="FAQ" />
      </SectionReveal>

      {hasOpened && (
        <Suspense fallback={null}>
          <EnquiryModal
            subject={enquirySubject}
            onClose={() => setEnquirySubject(null)}
          />
        </Suspense>
      )}
    </>
  )
}

export default ServiceDetailPage
