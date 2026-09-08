/**
 * HomePage — Hero eager; EVERY below-fold section lazy inside one Suspense
 * so the initial bundle stays lean and first paint is instant.
 */

import { Suspense, lazy } from 'react'
import { usePageSeo } from '@/shared/seo/usePageSeo'
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

export function HomePage() {
  usePageSeo('home')

  return (
    <div className="flex flex-col bg-page">
      {/* 1. Hero with modern luxury villa visual & live EMI Calculator */}
      <HomeHero />

      <Suspense fallback={null}>
        {/* 2. Lending Partners Bar */}
        <SectionReveal as="section">
          <LendingPartnersBanner />
        </SectionReveal>

        {/* 3. Solutions for Every Capital Need with Nanao Banna imagery */}
        <SectionReveal as="section">
          <HomeSolutionsSection />
        </SectionReveal>

        {/* 4. Why Choose CapitalKnob? Benefit Grid */}
        <SectionReveal as="section">
          <HomeWhyChooseSection />
        </SectionReveal>

        {/* 5. Our Simple 5-Step Approach */}
        <SectionReveal as="section">
          <HomeStepsSection />
        </SectionReveal>

        {/* 6. High-Rise Dusk Banner, Testimonial & Social Proof Metrics */}
        <SectionReveal as="section">
          <HomeCtaSection />
        </SectionReveal>
      </Suspense>
    </div>
  )
}

export default HomePage