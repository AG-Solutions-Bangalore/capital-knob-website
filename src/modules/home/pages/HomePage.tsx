/**
 * HomePage — Hero eager; EVERY below-fold section lazy inside one Suspense
 * so the initial bundle stays lean and first paint is instant.
 */

import { Suspense, lazy } from 'react'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { HomeHero } from '../components/HomeHero'

const LendingPartnersBanner = lazy(() =>
  import('../components/LendingPartnersBanner').then((m) => ({
    default: m.LendingPartnersBanner,
  })),
)
const HomeSolutionsSection = lazy(() =>
  import('../components/HomeSolutionsSection').then((m) => ({
    default: m.HomeSolutionsSection,
  })),
)
const HomeWhyChooseSection = lazy(() =>
  import('../components/HomeWhyChooseSection').then((m) => ({
    default: m.HomeWhyChooseSection,
  })),
)
const HomeStepsSection = lazy(() =>
  import('../components/HomeStepsSection').then((m) => ({
    default: m.HomeStepsSection,
  })),
)
const HomeCtaSection = lazy(() =>
  import('../components/HomeCtaSection').then((m) => ({
    default: m.HomeCtaSection,
  })),
)
const HomeFeaturedBlogSection = lazy(() =>
  import('../components/HomeBlogSection').then((m) => ({
    default: m.HomeFeaturedBlogSection,
  })),
)
const HomeFrontBlogSection = lazy(() =>
  import('../components/HomeBlogSection').then((m) => ({
    default: m.HomeFrontBlogSection,
  })),
)
const FaqSection = lazy(() =>
  import('@/modules/faq').then((m) => ({
    default: m.FaqSection,
  })),
)

export function HomePage() {
  return (
    <div className="flex flex-col bg-page">
      {/* 1. Hero with modern luxury villa visual & live EMI Calculator */}
      <HomeHero />

      <Suspense fallback={null}>
        {/* 2. Lending Partners Bar */}
        <SectionReveal>
          <LendingPartnersBanner />
        </SectionReveal>

        {/* 3. Solutions for Every Capital Need with Nanao Banna imagery */}
        <SectionReveal>
          <HomeSolutionsSection />
        </SectionReveal>

        {/* 4. Why Choose CapitalKnob? Benefit Grid */}
        <SectionReveal>
          <HomeWhyChooseSection />
        </SectionReveal>

        {/* 5. Our Simple 5-Step Approach */}
        <SectionReveal>
          <HomeStepsSection />
        </SectionReveal>

        {/* 6. Featured Blogs (strictly rendered if GET /getFeaturedBlogs returns data) */}
        <HomeFeaturedBlogSection />

        {/* 7. Front Blogs (strictly rendered if GET /getFrontBlogs returns data) */}
        <HomeFrontBlogSection />

        {/* 8. Frequently Asked Questions */}
        <SectionReveal>
          <FaqSection slug="home" title="FAQ" />
        </SectionReveal>

        {/* 9. High-Rise Dusk Banner, Testimonial & Social Proof Metrics */}
        <SectionReveal>
          <HomeCtaSection />
        </SectionReveal>
      </Suspense>
    </div>
  )
}

export default HomePage