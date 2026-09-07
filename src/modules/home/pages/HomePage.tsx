/**
 * HomePage — high-fidelity homepage module adhering strictly to visual layout
 * and design specifications with Nanao Banna / Nano Banana custom visual assets.
 */

import { usePageSeo } from '@/shared/seo/usePageSeo'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { HomeHero } from '../components/HomeHero'
import { LendingPartnersBanner } from '../components/LendingPartnersBanner'
import { HomeSolutionsSection } from '../components/HomeSolutionsSection'
import { HomeWhyChooseSection } from '../components/HomeWhyChooseSection'
import { HomeStepsSection } from '../components/HomeStepsSection'
import { HomeCtaSection } from '../components/HomeCtaSection'

export function HomePage() {
  usePageSeo('home')

  return (
    <div className="flex flex-col bg-page">
      {/* 1. Hero with modern luxury villa visual & live EMI Calculator */}
      <HomeHero />

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
    </div>
  )
}

export default HomePage