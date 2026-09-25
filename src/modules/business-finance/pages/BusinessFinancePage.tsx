import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { FaqSection } from '@/modules/faq'
import { TestimonialSection } from '@/modules/testimonial/components/TestimonialSection'
import { businessFinanceCopy } from '../constants'

export function BusinessFinancePage() {
  return (
    <>
      <PageHero
        eyebrow={businessFinanceCopy.hero.eyebrow}
        title={businessFinanceCopy.hero.title}
        subtitle={businessFinanceCopy.hero.description}
      />
      <SectionReveal className="py-16">
        <Container size="4xl">
          <p className="text-center text-muted">Business Finance content coming up.</p>
        </Container>
      </SectionReveal>
      <TestimonialSection slug="business-finance" />
      <FaqSection slug="business-finance" title="FAQ" />
    </>
  )
}