/**
 * VisionMissionSection — "Our Vision, Mission & Values"
 * Left column holds three white cards (Vision, Mission, Values list with
 * gold checkmarks). Right column holds a navy highlight card with a
 * mountain image overlay, eyebrow + "A Brighter Tomorrow" headline.
 */

import { Container } from '@/shared/components/Container'
import { visionMissionValues } from '../constants'

export function VisionMissionSection() {
  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <Container size="4xl">
        <div>
          <h2 className="font-serif text-3xl font-extrabold leading-tight text-navy md:text-4xl">
            {visionMissionValues.title}
          </h2>
          <div className="mt-2.5 h-1 w-12 bg-gold" />
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            {visionMissionValues.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left: 3 white cards */}
          <div className="lg:col-span-8">
            <div className="grid h-full gap-5 sm:grid-cols-3">
              {/* Vision */}
              <article className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <h3 className="font-serif text-base font-bold text-navy">
                    {visionMissionValues.vision.title}
                  </h3>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                  {visionMissionValues.vision.description}
                </p>
              </article>

              {/* Mission */}
              <article className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="12" cy="12" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <h3 className="font-serif text-base font-bold text-navy">
                    {visionMissionValues.mission.title}
                  </h3>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                  {visionMissionValues.mission.description}
                </p>
              </article>

              {/* Values */}
              <article className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 3h12l3 5-9 13L3 8z" />
                      <path d="M12 22V8" />
                    </svg>
                  </span>
                  <h3 className="font-serif text-base font-bold text-navy">
                    Our Values
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                  {visionMissionValues.values.map((value) => (
                    <li key={value} className="flex items-start gap-2">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0 text-gold"
                        aria-hidden="true"
                      >
                        <path d="m5 12 4.5 4.5L19 7" />
                      </svg>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          {/* Right: highlight card with mountain sunrise image */}
          <div className="lg:col-span-4">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-card border border-line bg-navy text-white shadow-card md:min-h-[420px]">
              <img
                src={visionMissionValues.highlight.image}
                alt="Person standing on a mountain peak looking at sunrise"
                title="CapitalKnob Vision – Reaching New Heights"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              {/* Soft dark vignette on top for text contrast */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-navy/80 via-navy/30 to-navy/70" />

              <div className="relative flex h-full flex-col justify-start p-7 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90">
                  {visionMissionValues.highlight.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold leading-tight uppercase tracking-wider text-white md:text-3xl">
                  {visionMissionValues.highlight.title}
                </h3>
                <div className="mt-4 h-1 w-10 bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}