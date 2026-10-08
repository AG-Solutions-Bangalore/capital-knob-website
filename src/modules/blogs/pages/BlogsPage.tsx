/**
 * BlogsPage — public blog listing fed by live data (`GET /getBlogs`).
 */

import { Container } from '@/shared/components/Container'
import { PageHero } from '@/shared/components/PageHero'
import { FaqSection } from '@/modules/faq'
import { TestimonialSection } from '@/modules/testimonial/components/TestimonialSection'
import { BlogList } from '../components/BlogList'

export function BlogsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Blogs & Insights"
        subtitle="Financing guides, market perspectives, and practical explainers from our advisory team."
      />
      <section aria-labelledby="blog-articles-heading" className="bg-surface py-10 md:py-14">
        <Container size="4xl">
          {/* Visually hidden: preserves the h1 > h2 > h3 outline for the
            card titles below without changing the visual design. */}
          <h2 id="blog-articles-heading" className="sr-only">
            Blog articles
          </h2>
          <BlogList />
        </Container>
      </section>
      
        <TestimonialSection slug="blogs" />
      
      
        <FaqSection slug="blogs" title="FAQ" />
      
    </>
  )
}

