/**
 * HeroSection — "Home Loans Made Simple"
 * Dark navy backdrop with a high-fidelity evening villa + reflective pool
 * image, eyebrow + serif headline, two CTAs (Check Eligibility + Talk to
 * Expert), four feature pillars, and a live EMI calculator card floating
 * on the right.
 */

import { useMemo, useState } from 'react'
import { Container } from '@/shared/components/Container'
import { iconRegistry } from '../components/icons'
import { homeCopy } from '../constants'

type EmiTab = 'home' | 'topUp' | 'balance'

const EMI_TABS: { id: EmiTab; label: string }[] = [
  { id: 'home', label: 'Home Loan' },
  { id: 'topUp', label: 'Top-Up' },
  { id: 'balance', label: 'Balance Transfer' },
]

function ArrowRightSm() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function EmiCalculator() {
  const [tab, setTab] = useState<EmiTab>('home')
  const [amount, setAmount] = useState(50_00_000) // ₹ 50,00,000
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const emi = useMemo(() => {
    const principal = amount
    const r = rate / 12 / 100
    const n = tenure * 12
    if (r === 0) return Math.round(principal / n)
    const v = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return Math.round(v)
  }, [amount, rate, tenure])

  const amountLakh = Math.round(amount / 100000)
  const amountCr = (amount / 10000000).toFixed(2)

  return (
    <div className="w-full max-w-md rounded-card bg-white p-6 text-ink shadow-card md:p-7">
      <h3 className="font-serif text-lg font-bold leading-tight text-navy">
        EMI Calculator
      </h3>

      {/* Tabs */}
      <div className="mt-4 inline-flex rounded-button bg-line-soft p-1 text-xs font-semibold">
        {EMI_TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                'rounded-button px-3 py-1.5 transition-colors ' +
                (active
                  ? 'bg-navy text-white shadow-soft'
                  : 'text-muted hover:text-ink')
              }
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Loan Amount */}
      <div className="mt-5">
        <label className="text-xs font-semibold text-navy">Loan Amount</label>
        <div className="mt-2 flex items-center gap-2 rounded-button border border-line bg-white px-3 py-2.5">
          <span className="text-sm font-semibold text-muted">₹</span>
          <input
            type="number"
            inputMode="numeric"
            value={amountLakh}
            onChange={(e) =>
              setAmount(Math.max(0, Number(e.target.value) * 100000))
            }
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
          />
        </div>
        <input
          type="range"
          min={5_00_000}
          max={5_00_00_000}
          step={1_00_000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-[11px] text-muted">
          <span>₹ 5 L</span>
          <span>₹ {amountCr} Cr</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-navy">Interest Rate (% p.a.)</label>
        <div className="mt-2 flex items-center gap-2 rounded-button border border-line bg-white px-3 py-2.5">
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) =>
              setRate(Math.min(15, Math.max(6, Number(e.target.value))))
            }
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
          />
          <span className="text-sm font-semibold text-muted">%</span>
        </div>
        <input
          type="range"
          min={6}
          max={15}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-[11px] text-muted">
          <span>6%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Loan Tenure */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-navy">Loan Tenure (Years)</label>
        <div className="mt-2 flex items-center gap-2 rounded-button border border-line bg-white px-3 py-2.5">
          <input
            type="number"
            value={tenure}
            onChange={(e) =>
              setTenure(Math.min(30, Math.max(1, Number(e.target.value))))
            }
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
          />
          <span className="text-xs font-semibold text-muted">yrs</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-[11px] text-muted">
          <span>1</span>
          <span>30</span>
        </div>
      </div>

      {/* Estimated EMI */}
      <div className="mt-5 rounded-button bg-line-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Your Estimated EMI
        </p>
        <p className="mt-1 font-serif text-2xl font-extrabold text-navy">
          ₹ {emi.toLocaleString('en-IN')}
          <span className="ml-1 text-xs font-medium text-muted">/ month</span>
        </p>
      </div>

      {/* Apply CTA */}
      <a
        href="#apply-home-loan"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-button bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-soft"
      >
        Apply for Home Loan
        <ArrowRightSm />
      </a>

      <p className="mt-3 text-[10px] leading-relaxed text-muted">
        *This is an indicative estimate. Actual EMI may vary as per lender terms.
      </p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Evening villa + reflective pool backdrop */}
      <img
        src={homeCopy.hero.image}
        alt="Modern luxury villa at dusk with reflective pool"
        className="absolute inset-0 h-full w-full object-cover object-center"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />

      {/* Dark gradient overlay for text readability (heavier on left, fading right) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

      <Container size="4xl" className="relative w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-14 md:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Left column — eyebrow + headline + CTAs + pillars */}
          <div className="relative lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
              {homeCopy.hero.eyebrow}
            </p>

            <h1 className="mt-4 font-serif text-4xl font-extrabold leading-[1.08] md:text-5xl lg:text-[56px]">
              <span className="block text-white">{homeCopy.hero.titleLead}</span>
              <span className="mt-2 block text-white">
                Made <span className="text-gold">Simple.</span>
              </span>
            </h1>

            {/* Italic accent on right of headline area */}
            <div className="pointer-events-none absolute right-2 top-2 hidden font-serif text-2xl italic leading-snug text-white/90 lg:block xl:text-[26px]">
              {homeCopy.hero.accentTagline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-2 block h-1 w-12 bg-gold" />
            </div>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              <span className="text-gold">{homeCopy.hero.description.split('.')[0]}.</span>{' '}
              {homeCopy.hero.description.split('.').slice(1).join('.').trim()}
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={homeCopy.hero.ctaPrimary.href}
                className="inline-flex items-center gap-2 rounded-button bg-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-colors hover:bg-gold-hover"
              >
                {homeCopy.hero.ctaPrimary.label}
                <ArrowRightSm />
              </a>
              <a
                href={homeCopy.hero.ctaSecondary.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {homeCopy.hero.ctaSecondary.label}
              </a>
            </div>

            {/* Pillars */}
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-lg sm:grid-cols-4">
              {homeCopy.pillars.map((pillar) => {
                const Icon = iconRegistry[pillar.icon]
                return (
                  <li key={pillar.title} className="flex flex-col items-start gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-white">
                      {pillar.title}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right column — EMI Calculator */}
          <div className="relative lg:col-span-5">
            <div className="ml-auto w-full">
              <EmiCalculator />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
