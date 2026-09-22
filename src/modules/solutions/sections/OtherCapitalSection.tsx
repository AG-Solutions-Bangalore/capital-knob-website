/**
 * OtherCapitalSection — "Other Capital Solutions"
 * Four horizontal (wide) cards: Real Estate Finance, Private Credit,
 * Growth Capital, Capital Connect.
 *
 * A card that matches the active URL hash receives `highlighted` so the
 * user can see at a glance which capital solution they came here for.
 * The arrow button on each card opens the enquiry modal via `onEnquire`.
 */

import { useLocation } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { WideServiceCard } from '../components/ServiceCard'
import { useCategoryQuery } from '@/modules/category/hooks/useCategoryQuery'
import { otherCapitalCards } from '../constants'
import { liveCategoryCards } from '../liveCards'

interface OtherCapitalSectionProps {
  onEnquire?: (title: string) => void
}

/** Live slugs that keep their old footer-link DOM ids. */
const KEEP_IDS: Record<string, string> = {
  'real-estate-project-finance': 'real-estate',
  'private-credit': 'private-credit',
  'growth-capital-pe-vc': 'growth-capital',
}

export function OtherCapitalSection({ onEnquire }: OtherCapitalSectionProps) {
  const { hash } = useLocation()
  const activeId = hash ? hash.slice(1) : ''

  // Same old wide cards, same style — titles, descriptions and images
  // come live from every category except home/business (those have their
  // own sections above). Static `otherCapitalCards` stay only as the
  // loading/empty fallback.
  const { data } = useCategoryQuery()
  const live = (data?.data ?? []).filter(
    (c) => c.category_slug !== 'home-finance' && c.category_slug !== 'business-loan',
  )
  const cards =
    live.length > 0
      ? liveCategoryCards(live, data?.image_url, otherCapitalCards, KEEP_IDS)
      : otherCapitalCards

  return (
    <section id="other-solutions" className="bg-surface py-16 md:py-20">
      <Container size="4xl">
        <SectionHeading
          title="Other Capital Solutions"
          description="Specialised financing for investors, developers and large capital requirements."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card) => (
            <WideServiceCard
              key={card.id}
              {...card}
              highlighted={activeId === card.id}
              onEnquire={onEnquire}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}