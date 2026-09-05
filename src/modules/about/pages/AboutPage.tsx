/**
 * AboutPage — composes every about-page section in display order.
 * Each section lives in its own file under `../sections/*` so copy,
 * layout, and imagery stay easy to evolve.
 */

import { AboutHero } from '../sections/AboutHero'
import { StatsSection } from '../sections/StatsSection'
import { OurStorySection } from '../sections/OurStorySection'
import { VisionMissionSection } from '../sections/VisionMissionSection'
import { FounderSection } from '../sections/FounderSection'
import { CommitmentSection } from '../sections/CommitmentSection'
import { AboutCta } from '../sections/AboutCta'

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatsSection />
      <OurStorySection />
      <VisionMissionSection />
      <FounderSection />
      <CommitmentSection />
      <AboutCta />
    </>
  )
}