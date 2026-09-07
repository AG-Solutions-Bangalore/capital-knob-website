/**
 * AboutPage — composes every about-page section in display order.
 * Each section lives in its own file under `../sections/*` so copy,
 * layout, and imagery stay easy to evolve.
 */

import { usePageSeo } from '@/shared/seo/usePageSeo'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { AboutHero } from '../sections/AboutHero'
import { StatsSection } from '../sections/StatsSection'
import { OurStorySection } from '../sections/OurStorySection'
import { VisionMissionSection } from '../sections/VisionMissionSection'
import { FounderSection } from '../sections/FounderSection'
import { CommitmentSection } from '../sections/CommitmentSection'
import { AboutCta } from '../sections/AboutCta'

export function AboutPage() {
  usePageSeo('about')

  return (
    <>
      <AboutHero />
      <SectionReveal as="section">
        <StatsSection />
      </SectionReveal>
      <SectionReveal as="section">
        <OurStorySection />
      </SectionReveal>
      <SectionReveal as="section">
        <VisionMissionSection />
      </SectionReveal>
      <SectionReveal as="section">
        <FounderSection />
      </SectionReveal>
      <SectionReveal as="section">
        <CommitmentSection />
      </SectionReveal>
      <SectionReveal as="section">
        <AboutCta />
      </SectionReveal>
    </>
  )
}