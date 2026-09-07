/**
 * ContactPage — combines ContactHeroSection, ContactFormSection,
 * LocationSection, and FaqSection.
 */

import { usePageSeo } from '@/shared/seo/usePageSeo'
import { ContactHeroSection } from '../sections/ContactHeroSection'
import { ContactFormSection } from '../sections/ContactFormSection'
import { LocationSection } from '../sections/LocationSection'
import { FaqSection } from '../sections/FaqSection'

export function ContactPage() {
  usePageSeo('contact')

  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <LocationSection />
      <FaqSection />
    </>
  )
}