/**
 * ContactPage — combines ContactHeroSection, ContactFormSection,
 * LocationSection, and FaqSection.
 */

import { ContactHeroSection } from '../sections/ContactHeroSection'
import { ContactFormSection } from '../sections/ContactFormSection'
import { LocationSection } from '../sections/LocationSection'
import { FaqSection } from '../sections/FaqSection'
import { TestimonialSection } from '@/modules/testimonial/components/TestimonialSection'

export function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      
        <ContactFormSection />
      
      
        <LocationSection />
      
      
        <TestimonialSection slug="contact" />
      
      
        <FaqSection />
      
    </>
  )
}