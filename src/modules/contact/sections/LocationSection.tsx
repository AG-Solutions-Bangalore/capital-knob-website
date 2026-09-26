import { Container } from '@/shared/components/Container'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { contactCopy } from '../constants'

export function LocationSection() {
  const { location } = contactCopy

  return (
    <section className="bg-white py-12 lg:py-16">
      <Container size="4xl">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading and Directions CTA */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy">
              {location.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy md:text-4xl">
              {location.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {location.description}
            </p>
            <div className="mt-8">
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={linkTitleFor(location.directionsUrl) ?? 'View CapitalKnob Office Location on Google Maps'}
                className="inline-flex items-center gap-2 rounded-button bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-navy-soft hover:shadow-md"
              >
                {location.buttonText}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Real Interactive Google Map */}
          <div className="lg:col-span-7">
            <div className="group relative h-[340px] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-soft sm:h-[380px] lg:h-[420px]">
              <iframe
                title="CapitalKnob Office Location at JP Nagar, Bengaluru"
                src="https://maps.google.com/maps?q=No.+8,+1st+Floor,+24th+Main,+5th+Phase,+JP+Nagar,+Bengaluru,+Karnataka+560078&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />

            
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
