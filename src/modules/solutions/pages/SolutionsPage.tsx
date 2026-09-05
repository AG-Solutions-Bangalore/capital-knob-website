/**
 * SolutionsPage — composes all the solution sections in display order.
 * Each section lives in its own file under `../sections/*`.
 */

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
      <IndividualsSection />
      <BusinessesSection />
      <OtherCapitalSection />
      <WhyChooseSection />
      <StepsSection />
    </>
  )
}

export const SolutionPage = SolutionsPage
export default SolutionsPage
