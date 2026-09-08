import { Container } from '@/shared/components/Container'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { homeStats, homeTestimonials } from '../constants'
import { TestimonialCarousel } from './TestimonialCarousel'
import { IMAGE_BASE_URL } from "@/lib/images";

export function HomeCtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-16 md:py-20">
      {/* Background Skyline Image with moody twilight overlay */}
      <div className="absolute inset-0 z-0 bg-navy">
        <img
          src={`${IMAGE_BASE_URL}/home/cta_skyline.webp`}
          alt="Modern metropolitan skyscraper skyline at dusk"
          title="Modern Metropolitan Skyline – CapitalKnob"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        {/* Navy gradient dark overlay */}
        <div className="absolute inset-0 bg-navy/85 backdrop-brightness-75" />
      </div>

      <Container size="4xl" className="relative z-10">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left Column — CTA Narrative */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
              MORE THAN LOANS <br />
              A STRONGER TOMORROW
            </p>

            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              Let&rsquo;s Build Your <br className="hidden sm:inline" />
              Capital Journey Together
            </h2>

            <div className="mt-6">
              <a
                href="/contact"
                title={linkTitleFor('/contact')}
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-ink shadow-gold transition-all duration-200 hover:bg-gold-hover active:scale-[0.98]"
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

          {/* Center Column — Auto-scrolling Infinite-loop Testimonial Carousel */}
          <div className="min-w-0 lg:col-span-7">
            <TestimonialCarousel testimonials={homeTestimonials} />
          </div>

          {/* Right Column — Stats Metrics (narrower, left-aligned so the
              carousel can claim more horizontal space) */}
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/15 border-t border-white/15 pt-6 sm:grid-cols-4 lg:grid-cols-1 lg:text-left lg:divide-x-0 lg:divide-y lg:border-t-0 lg:pt-0 lg:space-y-5 lg:col-span-2">
            {homeStats.map((stat) => (
              <div
                key={stat.label}
                className="px-2 first:pl-0 lg:px-0 lg:pt-4 lg:first:pt-0"
              >
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] sm:text-xs font-medium text-slate-300">
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
