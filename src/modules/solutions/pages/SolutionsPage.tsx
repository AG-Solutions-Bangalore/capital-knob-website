/**
 * SolutionsPage — composes all the solution sections in display order.
 * Each section lives in its own file under `../sections/*`.
 *
 * Owns the enquiry-modal state: when any card's arrow button is clicked,
 * the page opens the modal with the card title pre-filled as the
 * Subject so the user knows exactly which solution they are enquiring
 * about.
 */

import { useCallback, useState } from 'react'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { SolutionsHeroSection } from '../sections/SolutionsHeroSection'
import { IndividualsSection } from '../sections/IndividualsSection'
import { BusinessesSection } from '../sections/BusinessesSection'
import { OtherCapitalSection } from '../sections/OtherCapitalSection'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { StepsSection } from '../sections/StepsSection'
import { EnquiryModal } from '../components/EnquiryModal'

export function SolutionsPage() {
  const [enquirySubject, setEnquirySubject] = useState<string | null>(null)

  const handleEnquire = useCallback((title: string) => {
    setEnquirySubject(title)
  }, [])

  const handleClose = useCallback(() => {
    setEnquirySubject(null)
  }, [])

  return (
    <>
      <SolutionsHeroSection />
      <SectionReveal as="section">
        <IndividualsSection onEnquire={handleEnquire} />
      </SectionReveal>
      <SectionReveal as="section">
        <BusinessesSection onEnquire={handleEnquire} />
      </SectionReveal>
      <SectionReveal as="section">
        <OtherCapitalSection onEnquire={handleEnquire} />
      </SectionReveal>
      <SectionReveal as="section">
        <WhyChooseSection />
      </SectionReveal>
      <SectionReveal as="section">
        <StepsSection />
      </SectionReveal>

      <EnquiryModal subject={enquirySubject} onClose={handleClose} />
    </>
  )
}

export const SolutionPage = SolutionsPage
export default SolutionsPage
