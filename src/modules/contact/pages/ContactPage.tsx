/**
 * ContactPage — combines ContactHeroSection, ContactFormSection,
 * LocationSection, and FaqSection.
 */

import { SectionReveal } from '@/shared/components/SectionReveal'
import { ContactHeroSection } from '../sections/ContactHeroSection'
import { ContactFormSection } from '../sections/ContactFormSection'
import { LocationSection } from '../sections/LocationSection'
import { FaqSection } from '../sections/FaqSection'
import { TestimonialSection } from '@/modules/testimonial/components/TestimonialSection'

export function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <SectionReveal>
        <ContactFormSection />
      </SectionReveal>
      <SectionReveal>
        <LocationSection />
      </SectionReveal>
      <SectionReveal>
        <TestimonialSection slug="contact" />
      </SectionReveal>
      <SectionReveal>
        <FaqSection />
      </SectionReveal>
    </>
  )
}