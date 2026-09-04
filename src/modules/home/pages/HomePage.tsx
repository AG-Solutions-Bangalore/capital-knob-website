/**
 * HomePage — composes all the home sections in display order.
 * Each section lives in its own file under `../sections/*`.
 */

import { HeroSection } from '../sections/HeroSection'
import { IndividualsSection } from '../sections/IndividualsSection'
import { BusinessesSection } from '../sections/BusinessesSection'
import { OtherCapitalSection } from '../sections/OtherCapitalSection'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { StepsSection } from '../sections/StepsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <IndividualsSection />
      <BusinessesSection />
      <OtherCapitalSection />
      <WhyChooseSection />
      <StepsSection />
    </>
  )
}