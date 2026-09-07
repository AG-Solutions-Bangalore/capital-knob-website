/**
 * BusinessesSection — "Financing Solutions for Businesses & MSMEs"
 * Seven-card grid covering working capital, expansion, machinery, etc.
 */

import { Container } from '@/shared/components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { businessesCards } from '../constants'

export function BusinessesSection() {
  return (
    <section id="businesses" className="bg-line-soft/40 py-16 md:py-20">
      <Container size="4xl">
        <SectionHeading
          title={
            <>
              Financing Solutions for{' '}
              <span className="text-navy">Businesses &amp; MSMEs</span>
            </>
          }
          subtitle="Power your business ambitions with trusted and flexible financing solutions."
          description="From working capital to expansion, equipment finance to refinancing, we help businesses access capital at every stage of growth."
        />

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businessesCards.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>
      </Container>
    </section>
  )
}