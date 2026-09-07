import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { SectionReveal } from '@/shared/components/SectionReveal'
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
      <SectionReveal as="section" className="py-16">
        <Container size="lg">
          <p className="text-center text-muted">Private Credit content coming up.</p>
        </Container>
      </SectionReveal>
    </>
  )
}