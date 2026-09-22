/**
 * IndividualsSection — "Financing Solutions for Individuals"
 * Six-card grid: Home Loans, Balance Transfer, Top-Up, Construction,
 * Renovation, Loan Against Property.
 *
 * When the user lands here via a footer link that targets a specific
 * solution, the matching card receives `highlighted` so the URL hash
 * drives a gold ring + pulse animation on that card. The arrow button on
 * each card triggers the Solutions-page enquiry modal via `onEnquire`.
 */

import { useLocation } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { useCategoryQuery } from '@/modules/category/hooks/useCategoryQuery'
import { individualsCards } from '../constants'
import { liveSubCards } from '../liveCards'

interface IndividualsSectionProps {
  onEnquire?: (title: string) => void
}

export function IndividualsSection({ onEnquire }: IndividualsSectionProps) {
  const { hash } = useLocation()
  const activeId = hash ? hash.slice(1) : ''

  // Same old cards, same style — titles, descriptions and images come
  // live from the `home-finance` category's sub-categories. Static
  // `individualsCards` stay only as the loading/empty fallback.
  const { data } = useCategoryQuery()
  const live = data?.data.find((c) => c.category_slug === 'home-finance')
  const cards =
    (live?.category_subs?.length ?? 0) > 0
      ? liveSubCards(live, data?.image_url, individualsCards)
      : individualsCards

  return (
    <section id="individuals" className="bg-surface py-16 md:py-20">
      <Container size="4xl">
        <div className="pt-10">
          <SectionHeading
            title="Financing Services for Individuals"
            subtitle="Turn your aspirations into reality with the right home and personal financing services."
            description="Whether you are buying, building, renovating or unlocking the value of your property, we help you explore suitable financing options through our network of trusted lenders."
          />

          <div className="grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {cards.map((card) => (
              <ServiceCard
                key={card.id}
                {...card}
                highlighted={activeId === card.id}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}