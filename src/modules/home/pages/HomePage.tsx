import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { homeCopy } from '../constants'

export function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={homeCopy.hero.eyebrow}
        title={
          <>
            Solutions for <span className="text-gold">Every Capital Need</span>
          </>
        }
        subtitle={homeCopy.hero.description}
      />
      <section className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Home page content coming up — sections, cards, CTAs.</p>
        </Container>
      </section>
    </>
  )
}