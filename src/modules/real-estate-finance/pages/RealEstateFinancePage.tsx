import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
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
      <section className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Real Estate Finance content coming up.</p>
        </Container>
      </section>
    </>
  )
}