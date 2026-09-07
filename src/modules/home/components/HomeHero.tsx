import { useState, useEffect, useCallback, useRef } from 'react'
import { Container } from '@/shared/components/Container'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { heroSlides } from '../constants'
import { EmiCalculator } from './EmiCalculator'

export function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isPaused, setIsPaused] = useState(false)
  const touchStartXRef = useRef<number | null>(null)

  const totalSlides = heroSlides.length
  const SLIDE_DURATION = 6000 // 6 seconds per slide

  const nextSlide = useCallback(() => {
    setDirection('next')
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setDirection('prev')
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback((index: number) => {
    setDirection(index >= currentSlide ? 'next' : 'prev')
    setCurrentSlide(index)
  }, [currentSlide])

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartXRef.current - touchEndX
      if (diff > 50) {
        nextSlide()
      } else if (diff < -50) {
        prevSlide()
      }
    }
    touchStartXRef.current = null
  }

  return (
    <section
      className="relative overflow-hidden bg-navy text-white select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="CapitalKnob Financing Solutions"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with smooth cinematic slide + dissolve */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide
          const isPrev =
            (currentSlide - 1 + totalSlides) % totalSlides === index

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                isActive
                  ? 'opacity-100 translate-x-0 scale-100 z-10'
                  : isPrev
                    ? 'opacity-0 -translate-x-12 scale-105 z-0'
                    : 'opacity-0 translate-x-12 scale-105 z-0'
              }`}
            >
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                title={slide.imageTitle}
                className="h-full w-full object-cover object-center lg:object-right transition-transform duration-[6000ms] ease-linear"
                style={{
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Navy gradient masks — seamlessly blend with page & guarantee contrast */}
              <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/95 to-navy/80 lg:from-navy lg:via-navy/88 lg:to-transparent" />
            </div>
          )
        })}
      </div>

      <Container
        size="4xl"
        className="relative z-10 py-12 md:py-16 lg:py-20"
      >
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column — Value proposition & CTAs */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-7">
            {/* Sliding text content area */}
            <div className="relative min-h-[440px] xs:min-h-[400px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[450px]">
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlide
                const isNext = direction === 'next'

                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isActive}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'relative opacity-100 translate-x-0 pointer-events-auto z-10'
                        : `absolute inset-0 opacity-0 pointer-events-none z-0 ${
                            isNext ? '-translate-x-10' : 'translate-x-10'
                          }`
                    }`}
                  >
                    {/* Eyebrow */}
                    <div
                      className={`transition-all duration-500 delay-100 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-300 sm:text-sm">
                        {slide.eyebrow}
                      </p>
                    </div>

                    {/* Handwritten cursive script accent */}
                    <div
                      className={`relative mt-2 inline-block transition-all duration-500 delay-150 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <span className="font-script text-2xl font-bold tracking-wide text-gold sm:text-3xl lg:text-4xl">
                        {slide.handwrittenScript}
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
                    <div
                      className={`transition-all duration-600 delay-200 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-3'
                      }`}
                    >
                      <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {slide.titleLine1} <br className="hidden sm:inline" />
                        <span className="text-white">{slide.titleLine2}</span>
                      </h1>
                    </div>

                    {/* Tagline */}
                    <div
                      className={`transition-all duration-500 delay-250 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <p className="mt-4 text-base font-bold text-gold sm:text-lg lg:text-xl">
                        {slide.tagline}
                      </p>
                    </div>

                    {/* Subcopy */}
                    <div
                      className={`transition-all duration-500 delay-300 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-300 md:text-base">
                        {slide.description}
                      </p>
                    </div>

                    {/* CTA row */}
                    <div
                      className={`mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 transition-all duration-500 delay-350 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      <a
                        href={slide.primaryCta.href}
                        title={linkTitleFor(slide.primaryCta.href)}
                        className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-white shadow-gold transition-all duration-200 hover:bg-gold-hover hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{slide.primaryCta.label}</span>
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
                        href={slide.secondaryCta.href}
                        title={linkTitleFor(slide.secondaryCta.href)}
                        className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/25 bg-navy/60 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-navy/80 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{slide.secondaryCta.label}</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Slider Navigation: Interactive Slide Tabs + Prev/Next Controls */}
            <div
              className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-white/10 pt-4"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Slide Tabs */}
              <div
                className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 pb-2 sm:pb-1"
                role="tablist"
                aria-label="Financing categories"
              >
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === currentSlide
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Switch to ${slide.titleLine1}`}
                      onClick={() => goToSlide(idx)}
                      className={`group overflow-hidden relative shrink-0 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isActive
                          ? 'bg-white/15 text-gold border border-gold/40 shadow-sm'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                     
                      <span>{slide.titleLine1.split('&')[0].trim()}</span>

                      
                    </button>
                  )
                })}
              </div>

              {/* Prev / Next Chevrons & Slide Number */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
                <span className="mr-1 font-mono text-xs font-semibold tracking-wider text-slate-300">
                  <span className="text-gold">0{currentSlide + 1}</span> / 0{totalSlides}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border border-white/20 bg-navy/70 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-gold hover:text-navy active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
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
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border border-white/20 bg-navy/70 text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-gold hover:text-navy active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
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
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 sm:gap-6">
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                    <circle cx="6.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                </span>
                <span className="mt-2 text-xs font-medium text-slate-200">
                  Best Interest<br />Rates
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 2 7h20L12 2z" />
                  </svg>
                </span>
                <span className="mt-2 text-xs font-medium text-slate-200">
                  Multiple<br />Lenders
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span className="mt-2 text-xs font-medium text-slate-200">
                  Expert<br />Guidance
                </span>
              </div>

              {/* Badge 4 */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gold backdrop-blur-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    <polyline points="21 3 21 9 15 9" />
                  </svg>
                </span>
                <span className="mt-2 text-xs font-medium text-slate-200">
                  Hassle-Free<br />Process
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — EMI Calculator */}
          <div className="flex justify-center md:justify-end lg:col-span-5 xl:col-span-5">
            <EmiCalculator />
          </div>
        </div>
      </Container>
    </section>
  )
}
