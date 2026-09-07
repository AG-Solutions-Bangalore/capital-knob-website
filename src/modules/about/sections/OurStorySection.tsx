/**
 * OurStorySection — "A Platform Built for a Bigger Purpose"
 * Two-column layout: office interior image on the left, narrative copy on
 * the right, followed by a 4-pillar strip (Customer First, Expert Guidance,
 * Transparent Process, Stronger Together) underneath.
 */

import { Container } from '@/shared/components/Container'
import { iconRegistry } from '@/modules/solutions/components/icons'
import { ourStory } from '../constants'

export function OurStorySection() {
  return (
    <section id="our-story" className="bg-white py-16 md:py-20">
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Reception Lobby Image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-card border border-line bg-line-soft shadow-soft">
              <img
                src={ourStory.image}
                alt="CapitalKnob corporate office reception lobby"
                title="CapitalKnob Corporate Office Reception"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover lg:h-[460px]"
              />
            </div>
          </div>

          {/* Narrative copy & pillars */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy">
              {ourStory.eyebrow}
            </p>
            <h2 className="mt-2.5 font-serif text-3xl font-extrabold leading-tight text-navy md:text-4xl">
              {ourStory.title}
            </h2>
            <div className="mt-2.5 h-1 w-12 bg-gold" />

            <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600 md:text-[15px]">
              {ourStory.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* 4-pillar strip */}
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {ourStory.pillars.map((pillar) => {
                const Icon = iconRegistry[pillar.icon]
                return (
                  <li key={pillar.title} className="flex flex-col items-start gap-2.5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-sm leading-tight text-navy">
                        {pillar.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}