import { HomeHero } from '../components/HomeHero'
import { LendingPartnersBanner } from '../components/LendingPartnersBanner'
import { HomeSolutionsSection } from '../components/HomeSolutionsSection'
import { HomeWhyChooseSection } from '../components/HomeWhyChooseSection'
import { HomeStepsSection } from '../components/HomeStepsSection'
import { HomeCtaSection } from '../components/HomeCtaSection'
import { HomeFeaturedBlogSection, HomeFrontBlogSection } from '../components/HomeBlogSection'
import { FaqSection } from '@/modules/faq'

export function HomePage() {
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

      {/* 6. Featured Blogs (strictly rendered if GET /getFeaturedBlogs returns data) */}
      <HomeFeaturedBlogSection />

      {/* 7. Front Blogs (strictly rendered if GET /getFrontBlogs returns data) */}
      <HomeFrontBlogSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection slug="home" title="FAQ" />

      {/* 9. High-Rise Dusk Banner, Testimonial & Social Proof Metrics */}
      <HomeCtaSection />
    </div>
  )
}

export default HomePage
