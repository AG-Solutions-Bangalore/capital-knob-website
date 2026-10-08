import { useState, useId, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'

type LoanType = 'home' | 'topup' | 'transfer'

export function EmiCalculator() {
  const [loanType, setLoanType] = useState<LoanType>('home')
  const [loanAmount, setLoanAmount] = useState<number>(5000000)
  const [interestRate, setInterestRate] = useState<number>(8.5)
  const [tenureYears, setTenureYears] = useState<number>(20)

  const amountId = useId()
  const rateId = useId()
  const tenureId = useId()

  // Calculate EMI: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEmi = (p: number, annualRate: number, years: number) => {
    if (p <= 0 || annualRate <= 0 || years <= 0) return 0
    const r = annualRate / 12 / 100
    const n = years * 12
    const factor = Math.pow(1 + r, n)
    const emi = (p * r * factor) / (factor - 1)
    return Math.round(emi)
  }

  const emi = calculateEmi(loanAmount, interestRate, tenureYears)

  const formatIndianCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '')
    const val = rawVal ? parseInt(rawVal, 10) : 0
    setLoanAmount(Math.min(50000000, Math.max(0, val)))
  }

  const handleRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '')
    const val = rawVal ? parseFloat(rawVal) : 0
    if (Number.isNaN(val)) return
    setInterestRate(Math.min(15, Math.max(0, val)))
  }

  const handleTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '')
    const val = rawVal ? parseInt(rawVal, 10) : 0
    setTenureYears(Math.min(30, Math.max(0, val)))
  }

  const ctaText =
    loanType === 'home'
      ? 'Apply for Home Loan'
      : loanType === 'topup'
        ? 'Apply for Home Loan Top-Up'
        : 'Apply for Balance Transfer'

  // Fill % for the premium track (navy fill -> slate remainder, like reference)
  const amountPct = ((loanAmount - 500000) / (50000000 - 500000)) * 100
  const ratePct = ((interestRate - 6) / (15 - 6)) * 100
  const tenurePct = ((tenureYears - 1) / (30 - 1)) * 100
  const trackStyle = (pct: number): CSSProperties => ({
    background: `linear-gradient(to right, #0b1d3a ${Math.min(100, Math.max(0, pct))}%, #e2e8f0 ${Math.min(100, Math.max(0, pct))}%)`,
  })

  return (
    <div className="box-border w-full max-w-[400px] mx-auto rounded-2xl bg-white px-3.5 py-3 shadow-2xl ring-1 ring-slate-900/5 sm:px-4 sm:py-3.5">
      {/* Title (slider styling lives in src/index.css as .ck-range) */}
      <h2 className="font-display text-base font-bold text-ink sm:text-lg leading-tight">
        EMI Calculator
      </h2>

      {/* Tabs */}
      <div className="mt-2 flex rounded-lg bg-slate-100 p-1 text-[11px] sm:text-xs font-semibold text-muted">
        <button
          type="button"
          onClick={() => setLoanType('home')}
          className={`flex-1 rounded-md px-1.5 py-1.5 text-center transition-all ${
            loanType === 'home'
              ? 'bg-navy font-bold text-white shadow-sm'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          Home Loan
        </button>
        <button
          type="button"
          onClick={() => setLoanType('topup')}
          className={`flex-1 rounded-md px-1.5 py-1.5 text-center transition-all ${
            loanType === 'topup'
              ? 'bg-navy font-bold text-white shadow-sm'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          Top-Up
        </button>
        <button
          type="button"
          onClick={() => setLoanType('transfer')}
          className={`flex-1 rounded-md px-1.5 py-1.5 text-center transition-all ${
            loanType === 'transfer'
              ? 'bg-navy font-bold text-white shadow-sm'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          Balance Transfer
        </button>
      </div>

      {/* Slider 1: Loan Amount — compact card like reference (label + value, divider, slider) */}
      <div className="mt-2.5 rounded-xl border border-line">
        <div className="flex items-center justify-between gap-2 px-3 pt-2">
          <label htmlFor={amountId} className="text-xs font-bold text-navy sm:text-[13px]">
            Loan Amount
          </label>
          <span className="flex items-baseline gap-1 text-base font-extrabold text-navy sm:text-lg leading-none">
            <span className="text-sm font-bold">₹</span>
            <input
              id={amountId}
              type="text"
              inputMode="numeric"
              value={formatIndianCurrency(loanAmount)}
              onChange={handleAmountInputChange}
              aria-label="Loan Amount value"
              className="w-[7.5rem] bg-transparent text-right font-extrabold text-navy outline-none sm:w-32"
            />
          </span>
        </div>
        <div className="mx-3 border-b border-line/80" />
        <div className="px-3 pb-2 pt-1.5">
          <input
            type="range"
            min={500000}
            max={50000000}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            style={trackStyle(amountPct)}
            className="ck-range w-full cursor-pointer"
            aria-label="Loan Amount Slider"
          />
          <div className="mt-1 flex justify-between text-[11px] font-medium text-muted">
            <span>₹5 L</span>
            <span>₹5 Cr</span>
          </div>
        </div>
      </div>

      {/* Slider 2: Interest Rate — same compact card */}
      <div className="mt-2 rounded-xl border border-line">
        <div className="flex items-center justify-between gap-2 px-3 pt-2">
          <label htmlFor={rateId} className="text-xs font-bold text-navy sm:text-[13px]">
            Interest Rate (% p.a.)
          </label>
          <span className="flex items-baseline gap-0.5 text-base font-extrabold text-navy sm:text-lg leading-none">
            <input
              id={rateId}
              type="text"
              inputMode="decimal"
              value={String(interestRate)}
              onChange={handleRateInputChange}
              aria-label="Interest rate value"
              className="w-10 bg-transparent text-right font-extrabold text-navy outline-none"
            />
            <span className="text-sm font-bold">%</span>
          </span>
        </div>
        <div className="mx-3 border-b border-line/80" />
        <div className="px-3 pb-2 pt-1.5">
          <input
            type="range"
            min={6}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={trackStyle(ratePct)}
            className="ck-range w-full cursor-pointer"
            aria-label="Interest Rate Slider"
          />
          <div className="mt-1 flex justify-between text-[11px] font-medium text-muted">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>
      </div>

      {/* Slider 3: Loan Tenure — same compact card */}
      <div className="mt-2 rounded-xl border border-line">
        <div className="flex items-center justify-between gap-2 px-3 pt-2">
          <label htmlFor={tenureId} className="text-xs font-bold text-navy sm:text-[13px]">
            Loan Tenure (Years)
          </label>
          <span className="flex items-baseline gap-1 text-base font-extrabold text-navy sm:text-lg leading-none">
            <input
              id={tenureId}
              type="text"
              inputMode="numeric"
              value={String(tenureYears)}
              onChange={handleTenureInputChange}
              aria-label="Loan tenure value"
              className="w-8 bg-transparent text-right font-extrabold text-navy outline-none"
            />
            <span className="text-[11px] font-semibold text-muted">Yrs</span>
          </span>
        </div>
        <div className="mx-3 border-b border-line/80" />
        <div className="px-3 pb-2 pt-1.5">
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            style={trackStyle(tenurePct)}
            className="ck-range w-full cursor-pointer"
            aria-label="Tenure Slider"
          />
          <div className="mt-1 flex justify-between text-[11px] font-medium text-muted">
            <span>1</span>
            <span>30</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="mt-2.5 rounded-xl bg-slate-50 px-3 py-2 sm:py-2.5">
        <p className="text-[11px] font-medium text-muted leading-none">Your Estimated EMI</p>
        <p className="mt-1 font-display text-[1.4rem] font-black text-navy sm:text-2xl leading-none">
          ₹ {formatIndianCurrency(emi)}{' '}
          <span className="text-xs font-semibold text-muted">/ month</span>
        </p>
      </div>

      {/* Action Button */}
      <Link
        to={ROUTES.contact}
        title={linkTitleFor(ROUTES.contact)}
        className="mt-2.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-navy py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-navy-soft active:scale-[0.98]"
      >
        <span>{ctaText}</span>
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
      </Link>

      {/* Footnote */}
      <p className="mt-1.5 text-center text-[10px] leading-tight text-muted">
        *This is an indicative estimate. Actual EMI may vary as per lender terms.
      </p>
    </div>
  )
}
