import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { privateCreditCopy } from '../constants'

export function PrivateCreditPage() {
  usePageSeo('privateCredit')

  return (
    <>
      <PageHero
        eyebrow={privateCreditCopy.hero.eyebrow}
        title={privateCreditCopy.hero.title}
        subtitle={privateCreditCopy.hero.description}
      />
      <section className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Private Credit content coming up.</p>
        </Container>
      </section>
    </>
  )
}