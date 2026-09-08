import { useState, useId } from 'react'
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

  const ctaText =
    loanType === 'home'
      ? 'Apply for Home Loan'
      : loanType === 'topup'
        ? 'Apply for Home Loan Top-Up'
        : 'Apply for Balance Transfer'

  return (
    <div className="box-border w-full max-w-[430px] mx-auto rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-900/5 sm:p-5">
      {/* Title */}
      <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
        EMI Calculator
      </h2>

      {/* Tabs */}
      <div className="mt-4 flex rounded-lg bg-slate-100 p-1 text-[11px] sm:text-xs font-semibold text-muted">
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

      {/* Slider 1: Loan Amount */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-ink">
          <label htmlFor={amountId}>Loan Amount</label>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-sm">
          <span className="font-semibold text-muted">₹</span>
          <input
            id={amountId}
            type="text"
            value={formatIndianCurrency(loanAmount)}
            onChange={handleAmountInputChange}
            className="w-full text-right font-bold text-ink outline-none"
          />
        </div>
        <input
          type="range"
          min={500000}
          max={50000000}
          step={50000}
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-navy"
          aria-label="Loan Amount Slider"
        />
        <div className="flex justify-between text-[11px] font-medium text-muted">
          <span>₹5 L</span>
          <span>₹5 Cr</span>
        </div>
      </div>

      {/* Slider 2: Interest Rate */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-ink">
          <label htmlFor={rateId}>Interest Rate (% p.a.)</label>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-sm">
          <input
            id={rateId}
            type="number"
            step="0.1"
            min="6"
            max="15"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full text-left font-bold text-ink outline-none"
          />
          <span className="font-semibold text-muted">%</span>
        </div>
        <input
          type="range"
          min={6}
          max={15}
          step={0.1}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-navy"
          aria-label="Interest Rate Slider"
        />
        <div className="flex justify-between text-[11px] font-medium text-muted">
          <span>6%</span>
          <span>15%</span>
        </div>
      </div>

      {/* Slider 3: Loan Tenure */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-ink">
          <label htmlFor={tenureId}>Loan Tenure (Years)</label>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-sm">
          <input
            id={tenureId}
            type="number"
            min="1"
            max="30"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full text-left font-bold text-ink outline-none"
          />
          <span className="text-xs text-muted">Yrs</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={tenureYears}
          onChange={(e) => setTenureYears(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-navy"
          aria-label="Tenure Slider"
        />
        <div className="flex justify-between text-[11px] font-medium text-muted">
          <span>1</span>
          <span>30</span>
        </div>
      </div>

      {/* Result Card */}
      <div className="mt-5 rounded-xl bg-slate-50 p-3.5 sm:p-4">
        <p className="text-xs font-medium text-muted">Your Estimated EMI</p>
        <p className="mt-1 font-display text-2xl font-black text-navy sm:text-3xl">
          ₹ {formatIndianCurrency(emi)}{' '}
          <span className="text-sm font-semibold text-muted">/ month</span>
        </p>
      </div>

      {/* Action Button */}
      <Link
        to={ROUTES.contact}
        title={linkTitleFor(ROUTES.contact)}
        className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-navy py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-navy-soft active:scale-[0.98]"
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
      <p className="mt-2.5 text-center text-[10.5px] leading-tight text-muted">
        *This is an indicative estimate. Actual EMI may vary as per lender terms.
      </p>
    </div>
  )
}
