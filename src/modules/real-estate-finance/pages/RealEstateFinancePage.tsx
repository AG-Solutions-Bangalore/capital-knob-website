import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { FaqSection } from '@/modules/faq'
import { TestimonialSection } from '@/modules/testimonial/components/TestimonialSection'
import { realEstateFinanceCopy } from '../constants'

export function RealEstateFinancePage() {
  return (
    <>
      <PageHero
        eyebrow={realEstateFinanceCopy.hero.eyebrow}
        title={realEstateFinanceCopy.hero.title}
        subtitle={realEstateFinanceCopy.hero.description}
      />
      <SectionReveal className="py-16">
        <Container size="4xl">
          <p className="text-center text-muted">Real Estate Finance content coming up.</p>
        </Container>
      </SectionReveal>
      <TestimonialSection slug="real-estate-finance" />
      <FaqSection slug="real-estate-finance" title="FAQ" />
    </>
  )
}