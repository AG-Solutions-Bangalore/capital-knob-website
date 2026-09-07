/**
 * AboutCta — dark band sitting just above the footer.
 * Title + supporting copy on the left, gold "Get in Touch" pill on the right.
 */

import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/Container'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { aboutCta } from '../constants'

export function AboutCta() {
  return (
    <section className="bg-navy-deep text-white">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
          <div>
            <h2 className="font-serif text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-[30px]">
              {aboutCta.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
              {aboutCta.description}
            </p>
          </div>

          <Link
            to={aboutCta.ctaHref}
            title={linkTitleFor(aboutCta.ctaHref)}
            className="inline-flex shrink-0 items-center gap-2 rounded-button bg-gold px-7 py-3.5 text-sm font-bold text-navy shadow-gold transition-colors hover:bg-gold-hover"
          >
            {aboutCta.ctaLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}