import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { contactCopy } from '../constants'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactCopy.hero.eyebrow}
        title={contactCopy.hero.title}
        subtitle={contactCopy.hero.description}
      />
      <section className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Contact form coming up.</p>
        </Container>
      </section>
    </>
  )
}