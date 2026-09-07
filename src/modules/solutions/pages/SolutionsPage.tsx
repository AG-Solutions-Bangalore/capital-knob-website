/**
 * SolutionsPage — composes all the solution sections in display order.
 * Each section lives in its own file under `../sections/*`.
 */

import { SectionReveal } from '@/shared/components/SectionReveal'
import { SolutionsHeroSection } from '../sections/SolutionsHeroSection'
import { IndividualsSection } from '../sections/IndividualsSection'
import { BusinessesSection } from '../sections/BusinessesSection'
import { OtherCapitalSection } from '../sections/OtherCapitalSection'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { StepsSection } from '../sections/StepsSection'

export function SolutionsPage() {
  return (
    <>
      <SolutionsHeroSection />
      <SectionReveal as="section">
        <IndividualsSection />
      </SectionReveal>
      <SectionReveal as="section">
        <BusinessesSection />
      </SectionReveal>
      <SectionReveal as="section">
        <OtherCapitalSection />
      </SectionReveal>
      <SectionReveal as="section">
        <WhyChooseSection />
      </SectionReveal>
      <SectionReveal as="section">
        <StepsSection />
      </SectionReveal>
    </>
  )
}

export const SolutionPage = SolutionsPage
export default SolutionsPage
