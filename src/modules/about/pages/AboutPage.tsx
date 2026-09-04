import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { aboutCopy } from '../constants'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutCopy.hero.eyebrow}
        title={aboutCopy.hero.title}
        subtitle={aboutCopy.hero.description}
      />
      <section className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">About content coming up.</p>
        </Container>
      </section>
    </>
  )
}