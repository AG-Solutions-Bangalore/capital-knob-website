/**
 * HomePage — high-fidelity homepage module adhering strictly to visual layout
 * and design specifications with Nanao Banna / Nano Banana custom visual assets.
 */

import { usePageSeo } from '@/shared/seo/usePageSeo'
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
      <LendingPartnersBanner />

      {/* 3. Solutions for Every Capital Need with Nanao Banna imagery */}
      <HomeSolutionsSection />

      {/* 4. Why Choose CapitalKnob? Benefit Grid */}
      <HomeWhyChooseSection />

      {/* 5. Our Simple 5-Step Approach */}
      <HomeStepsSection />

      {/* 6. High-Rise Dusk Banner, Testimonial & Social Proof Metrics */}
      <HomeCtaSection />
    </div>
  )
}

export default HomePage