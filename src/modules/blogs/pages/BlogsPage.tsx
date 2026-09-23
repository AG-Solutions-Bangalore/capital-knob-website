/**
 * BlogsPage — public blog listing fed by live data (`GET /getBlogs`).
 */

import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Container } from '@/shared/components/Container'
import { PageHero } from '@/shared/components/PageHero'
import { SectionReveal } from '@/shared/components/SectionReveal'
import { FaqSection } from '@/modules/faq'
import { BlogList } from '../components/BlogList'

export function BlogsPage() {
  usePageSeo('blogs')

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Blogs & Insights"
        subtitle="Financing guides, market perspectives, and practical explainers from our advisory team."
      />
      <section className="bg-surface py-10 md:py-14">
        <Container size="4xl">
          <BlogList />
        </Container>
      </section>
      <SectionReveal as="section">
        <FaqSection slug="blogs" />
      </SectionReveal>
    </>
  )
}

