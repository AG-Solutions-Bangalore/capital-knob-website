import { Container } from '@/shared/components/Container'
import { contactCopy } from '../constants'

export function ContactHeroSection() {
  const { hero } = contactCopy

  const copy = (
    <div className="max-w-xl">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy">
        {hero.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
        {hero.titleLead}
        <br />
        {hero.titleAccent}
      </h1>
      <div className="mt-4 h-1 w-12 bg-gold" aria-hidden="true" />
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
        {hero.description}
      </p>
    </div>
  )

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Desktop: full-width image, headline overlaid on the left with a
          left-to-right white wash so the navy copy stays legible. */}
      <div className="relative hidden lg:block">
        <img
          src={hero.receptionImage}
          alt="CapitalKnob Corporate Reception Lobby"
          className="block h-auto w-full"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-white via-white/25 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center">
          <Container
            size="4xl"
            className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8"
          >
            {copy}
          </Container>
        </div>
      </div>

      {/* Mobile: white panel + full-width image strip below */}
      <div className="lg:hidden">
        <Container
          size="4xl"
          className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8"
        >
          <div className="py-12 sm:py-14">{copy}</div>
        </Container>
        <img
          src={hero.receptionImage}
          alt="CapitalKnob Corporate Reception Lobby"
          className="block h-auto w-full"
        />
      </div>
    </section>
  )
}
