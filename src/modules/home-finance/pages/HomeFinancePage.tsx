import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { homeFinanceCopy } from '../constants'

export function HomeFinancePage() {
  usePageSeo('homeFinance')

  return (
    <>
      <PageHero
        eyebrow={homeFinanceCopy.hero.eyebrow}
        title={homeFinanceCopy.hero.title}
        subtitle={homeFinanceCopy.hero.description}
      />
      <SectionReveal as="section" className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Home Finance content coming up.</p>
        </Container>
      </SectionReveal>
    </>
  )
}