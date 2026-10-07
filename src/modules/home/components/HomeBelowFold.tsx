import { LendingPartnersBanner } from './LendingPartnersBanner'
import { HomeSolutionsSection } from './HomeSolutionsSection'
import { HomeWhyChooseSection } from './HomeWhyChooseSection'
import { HomeStepsSection } from './HomeStepsSection'
import { HomeFrontBlogSection } from './HomeBlogSection'
import { FaqSection } from '@/modules/faq'
import { HomeCtaSection } from './HomeCtaSection'

export function HomeBelowFold() {
  return (
    <>
      {/* 2. Lending Partners Bar */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_140px]">
        <LendingPartnersBanner />
      </div>

      {/* 3. Solutions for Every Capital Need */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <HomeSolutionsSection />
      </div>

      {/* 4. Why Choose CapitalKnob? Benefit Grid */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_700px]">
        <HomeWhyChooseSection />
      </div>

      {/* 5. Our Simple 5-Step Approach */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_650px]">
        <HomeStepsSection />
      </div>

      {/* 7. Front Blogs */}
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
    </>
  )
}

export default HomeBelowFold
