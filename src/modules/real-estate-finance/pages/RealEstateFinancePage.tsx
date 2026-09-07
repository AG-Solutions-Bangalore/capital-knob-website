import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { realEstateFinanceCopy } from '../constants'

export function RealEstateFinancePage() {
  usePageSeo('realEstateFinance')

  return (
    <>
      <PageHero
        eyebrow={realEstateFinanceCopy.hero.eyebrow}
        title={realEstateFinanceCopy.hero.title}
        subtitle={realEstateFinanceCopy.hero.description}
      />
      <SectionReveal as="section" className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Real Estate Finance content coming up.</p>
        </Container>
      </SectionReveal>
    </>
  )
}