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
                title={linkTitleFor(location.directionsUrl)}
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
                title="CapitalKnob Office Location at Prestige Tech Park, Bengaluru"
                src="https://maps.google.com/maps?q=Prestige+Tech+Park,+Outer+Ring+Road,+Marathahalli,+Bengaluru,+Karnataka+560037&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />

              {/* Pin badge overlay */}
              <div className="pointer-events-none absolute left-4 top-4 hidden items-center gap-2 rounded-xl border border-line/60 bg-white/95 px-3.5 py-2 shadow-soft backdrop-blur-xs sm:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white">
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
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold text-navy">CapitalKnob</p>
                  <p className="text-[11px] text-muted">Prestige Tech Park, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
