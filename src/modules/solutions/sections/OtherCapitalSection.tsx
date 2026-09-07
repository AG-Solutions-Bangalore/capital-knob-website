/**
 * OtherCapitalSection — "Other Capital Solutions"
 * Four horizontal (wide) cards: Real Estate Finance, Private Credit,
 * Growth Capital, Capital Connect.
 */

import { Container } from '@/shared/components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { WideServiceCard } from '../components/ServiceCard'
import { otherCapitalCards } from '../constants'

export function OtherCapitalSection() {
  return (
    <section id="other-solutions" className="bg-surface py-16 md:py-20">
      <Container size="4xl">
        <SectionHeading
          title="Other Capital Solutions"
          description="Specialised financing for investors, developers and large capital requirements."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {otherCapitalCards.map((card) => (
            <WideServiceCard key={card.title} {...card} />
          ))}
        </div>
      </Container>
    </section>
  )
}