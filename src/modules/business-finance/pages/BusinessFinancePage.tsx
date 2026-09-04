import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { businessFinanceCopy } from '../constants'

export function BusinessFinancePage() {
  return (
    <>
      <PageHero
        eyebrow={businessFinanceCopy.hero.eyebrow}
        title={businessFinanceCopy.hero.title}
        subtitle={businessFinanceCopy.hero.description}
      />
      <section className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Business Finance content coming up.</p>
        </Container>
      </section>
    </>
  )
}