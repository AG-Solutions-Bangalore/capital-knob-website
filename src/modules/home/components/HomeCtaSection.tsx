import { Container } from '@/shared/components/Container'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { homeStats } from '../constants'
import { TestimonialsMarquee, type MarqueeTestimonial } from './TestimonialsMarquee'
import { useTestimonialsQuery } from '@/modules/testimonial/hooks/useTestimonialQuery'
import { IMAGE_BASE_URL } from "@/lib/images";

function parseRating(value: string | number | null | undefined): number | undefined {
  const n = typeof value === 'string' ? parseInt(value, 10) : value
  if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0) return undefined
  return Math.min(5, Math.max(1, Math.round(n)))
}

/** "2026-09-22" → "22 SEP 2026" without timezone pitfalls. */
function formatCertDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim())
  if (!m) return value.trim() || undefined
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const month = months[Math.min(11, Math.max(0, parseInt(m[2], 10) - 1))]
  return `${m[3]} ${month} ${m[1]}`
}

/** Gold outline icons for the stats band. */
function StatIcon({ name }: { name: string }) {
  const props = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const
  switch (name) {
    case 'people':
      return (
        <svg {...props} aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'handshake':
      return (
        <svg {...props} aria-hidden="true">
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>
      )
    case 'coins':
      return (
        <svg {...props} aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    default:
      return (
        <svg {...props} aria-hidden="true">
          <path d="M12 2.5l2.95 6.02 6.55.95-4.75 4.63 1.12 6.53L12 17.57l-5.87 3.06 1.12-6.53L2.5 9.47l6.55-.95L12 2.5z" />
        </svg>
      )
  }
}

const STAT_ICONS = ['people', 'handshake', 'coins', 'star']

export function HomeCtaSection() {
  // Homepage testimonials — LIVE from GET /getTestimonial/home.
  // EVERY row is rendered (name, description, rating, date); nothing is
  // mocked. The marquee renders null until at least one live row exists.
  const { data: liveData, isPending, isError } = useTestimonialsQuery('home')
  const liveRows = liveData?.data ?? []
  const marqueeItems: MarqueeTestimonial[] = liveRows
    .map((t) => {
      const date = formatCertDate(t.testimonial_created_date)
      return {
        name: t.testimonial_client_name?.trim() || 'CapitalKnob Customer',
        detail: t.testimonial_description?.trim() || undefined,
        rating: parseRating(t.testimonial_rating) ?? 5,
        footer: date ? `VERIFIED · ${date}` : 'VERIFIED CUSTOMER',
      }
    })
    .filter((t) => t.name !== 'CapitalKnob Customer' || t.detail)

  // Only 1 live row exists right now — cycle it to fill the strip
  // (8 cards) so the marquee loops seamlessly. New backend rows join
  // the rotation automatically; the loop shrinks as real data grows.
  const MIN_MARQUEE_CARDS = 8
  const loopItems: MarqueeTestimonial[] = []
  for (let i = 0; marqueeItems.length > 0 && loopItems.length < MIN_MARQUEE_CARDS; i++) {
    loopItems.push(marqueeItems[i % marqueeItems.length])
  }
  const [primaryStat] = homeStats

  return (
    <section className="relative overflow-hidden bg-navy py-14 text-white sm:py-16 md:py-20">
      {/* Night-city background with deep navy overlay */}
      <div className="absolute inset-0 z-0 bg-navy">
        <img
          src={`${IMAGE_BASE_URL}/home/cta_skyline.webp`}
          alt="City skyline at night with illuminated towers"
          title="City Skyline at Night – CapitalKnob"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/60 via-transparent to-navy/70" />
      </div>

      <Container size="4xl" className="relative z-10">
        {/* Header: headline left, CTA + badge right */}
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-200">
              <span>More Than Loans — A Stronger Tomorrow</span>
              <span aria-hidden="true" className="hidden h-px w-24 bg-gold/70 sm:inline-block" />
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              What Our
              <br />
              <span className="text-gold">Customers Say</span>
            </h2>

          </div>

          <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-end lg:pt-2">
            <a
              href="/contact"
              title={linkTitleFor('/contact')}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-3.5 text-[15px] font-bold text-white shadow-gold transition-all duration-200 hover:bg-gold-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started Today</span>
              <svg
                width="18"
                height="18"
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Your Goals. Our Commitment.
            </p>
            <p className="mt-2 inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-navy/60 px-5 py-2.5 text-sm backdrop-blur-sm">
              <span className="text-gold" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-display text-base font-extrabold text-white">
                {primaryStat.value}
              </span>
              <span className="text-[13px] font-medium text-slate-300">
                {primaryStat.label}
              </span>
            </p>
          </div>
        </div>

        {/* Success-story marquee — live API rows via the reusable cert SVG */}
        {!isPending && !isError && loopItems.length > 0 && (
          <div className="mt-12 lg:mt-14">
            <TestimonialsMarquee
              title="We Stand by Results — Real Stories, Real Sanctions"

              testimonials={loopItems}
            />
          </div>
        )}

        {/* Stats band with gold icons and dividers */}
        <div className="mt-12 border-t border-white/15 pt-8">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {homeStats.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 lg:justify-center lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-white/15 lg:[&:not(:first-child)]:pl-8"
              >
                <span className="shrink-0 text-gold" aria-hidden="true">
                  <StatIcon name={STAT_ICONS[idx % STAT_ICONS.length]} />
                </span>
                <div className="text-left">
                  <dd className="font-display text-xl font-extrabold text-white sm:text-2xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-0.5 text-xs font-medium text-slate-300">
                    {stat.label}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </div>


      </Container>
    </section>
  )
}
