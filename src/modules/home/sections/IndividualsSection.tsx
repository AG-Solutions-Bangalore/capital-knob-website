/**
 * IndividualsSection — "Financing Solutions for Individuals"
 * Six-card grid: Home Loans, Balance Transfer, Top-Up, Construction,
 * Renovation, Loan Against Property.
 */

import { Container } from '@/shared/components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { SolutionsTabs } from '../components/SolutionsTabs'
import { individualsCards } from '../constants'

export function IndividualsSection() {
  return (
    <section id="individuals" className="bg-surface py-16 md:py-20">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <SolutionsTabs defaultTab="individuals" />

        <div className="pt-10">
          <SectionHeading
            title="Financing Solutions for Individuals"
            subtitle="Turn your aspirations into reality with the right home and personal financing solutions."
            description="Whether you are buying, building, renovating or unlocking the value of your property, we help you explore suitable financing options through our network of trusted lenders."
          />

          <div className="grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {individualsCards.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}