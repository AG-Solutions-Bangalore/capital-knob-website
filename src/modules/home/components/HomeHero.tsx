import { Container } from '@/shared/components/Container'
import { homeHeroData } from '../constants'
import { EmiCalculator } from './EmiCalculator'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Villa background image with seamless dark gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home/hero_villa.jpg"
          alt="Luxury modern villa at dusk"
          className="h-full w-full object-cover object-[center_right] lg:object-right"
        />
        {/* Navy gradient mask: dark on the left for crisp typography, gentle vignette across the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40 lg:via-navy/85 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
      </div>

      <Container size="4xl" className="relative z-10 w-full max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column — Value proposition & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-300 sm:text-sm">
              {homeHeroData.eyebrow}
            </p>

            {/* Handwritten cursive script accent */}
            <div className="relative mt-2 inline-block">
              <span className="font-script text-2xl font-bold tracking-wide text-gold sm:text-3xl lg:text-4xl">
                {homeHeroData.handwrittenScript}
              </span>
              <svg
                viewBox="0 0 220 20"
                className="absolute -bottom-2.5 left-0 h-4 w-48 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 12 Q 100 2, 210 10" />
              </svg>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Home Loans <br />
              <span className="text-white">Made Simple</span>
            </h1>

            {/* Tagline */}
            <p className="mt-4 text-lg font-bold text-gold sm:text-xl">
              {homeHeroData.tagline}
            </p>

            {/* Subcopy */}
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {homeHeroData.description}
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={homeHeroData.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-bold text-navy shadow-gold transition-all duration-200 hover:bg-gold-hover"
              >
                <span>{homeHeroData.primaryCta.label}</span>
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

              <a
                href={homeHeroData.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-navy/60 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-navy/80"
              >
                <span>{homeHeroData.secondaryCta.label}</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4 sm:gap-6">
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                    <circle cx="6.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                </span>
                <span className="mt-2.5 text-xs font-medium text-slate-200">
                  Best Interest<br />Rates
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 2 7h20L12 2z" />
                  </svg>
                </span>
                <span className="mt-2.5 text-xs font-medium text-slate-200">
                  Multiple<br />Lenders
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span className="mt-2.5 text-xs font-medium text-slate-200">
                  Expert<br />Guidance
                </span>
              </div>

              {/* Badge 4 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    <polyline points="21 3 21 9 15 9" />
                  </svg>
                </span>
                <span className="mt-2.5 text-xs font-medium text-slate-200">
                  Hassle-Free<br />Process
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — EMI Calculator */}
          <div className="flex justify-center lg:col-span-5 xl:col-span-5 lg:justify-end">
            <EmiCalculator />
          </div>
        </div>
      </Container>
    </section>
  )
}
