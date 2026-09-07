import { Container } from '@/shared/components/Container'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { homeStats, homeTestimonial } from '../constants'

export function HomeCtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
      {/* Background Skyline Image with moody twilight overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home/cta_skyline.jpg"
          alt="Modern metropolitan skyscraper skyline at dusk"
          title="Modern Metropolitan Skyline – CapitalKnob"
          className="h-full w-full object-cover object-center"
        />
        {/* Navy gradient dark overlay */}
        <div className="absolute inset-0 bg-navy/85 backdrop-brightness-75" />
      </div>

      <Container size="4xl" className="relative z-10 w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column — CTA Narrative */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
              MORE THAN LOANS <br />
              A STRONGER TOMORROW
            </p>

            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Let&rsquo;s Build Your <br />
              Capital Journey Together
            </h2>

            <div className="mt-6">
              <a
                href="/contact"
                title={linkTitleFor('/contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-white shadow-gold transition-all duration-200 hover:bg-gold-hover"
              >
                <span>Get Started Today</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Center Column — Testimonial Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white p-6 text-ink shadow-2xl">
              {/* Gold Quote Mark */}
              <span className="font-serif text-4xl font-bold leading-none text-gold">
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                {homeTestimonial.quote}
              </p>

              {/* Author info with avatar */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">
                    {homeTestimonial.name}
                  </h4>
                  <p className="text-xs font-medium text-muted">
                    {homeTestimonial.role}
                  </p>
                </div>

                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/30">
                  <img
                    src={homeTestimonial.avatar}
                    alt={homeTestimonial.name}
                    title={homeTestimonial.avatarTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Stats Metrics */}
          <div className="space-y-4 divide-y divide-white/15 lg:col-span-3 lg:space-y-5">
            {homeStats.map((stat, idx) => (
              <div key={stat.label} className={idx > 0 ? 'pt-4' : ''}>
                <div className="font-display text-2xl font-black text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
