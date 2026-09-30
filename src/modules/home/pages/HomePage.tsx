import { HomeHero } from '../components/HomeHero'
import { LendingPartnersBanner } from '../components/LendingPartnersBanner'
import { HomeSolutionsSection } from '../components/HomeSolutionsSection'
import { HomeWhyChooseSection } from '../components/HomeWhyChooseSection'
import { HomeStepsSection } from '../components/HomeStepsSection'
import { HomeCtaSection } from '../components/HomeCtaSection'
import { HomeFrontBlogSection } from '../components/HomeBlogSection'
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

      {/* 6. Featured Blogs REMOVED (2026-09-30): GET /getFeaturedBlogs returns
          0 rows, so the section rendered null on every visit while still
          firing a wasted API query + shipping BlogCarousel JS. Re-add when
          the backend has featured rows. (Kept: component + hook intact for
          BlogDetailCard which consumes the same endpoint.) */}

      {/* 7. Front Blogs (strictly rendered if GET /getFrontBlogs returns data) */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_800px]">
        <HomeFrontBlogSection />
      </div>

      {/* 8. Frequently Asked Questions */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_600px]">
        <FaqSection slug="home" title="FAQ" />
      </div>

      {/* 9. High-Rise Dusk Banner, Testimonial & Social Proof Metrics */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_700px]">
        <HomeCtaSection />
      </div>
    </div>
  )
}

export default HomePage

