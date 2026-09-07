/**
 * EnquiryModal — popup enquiry form used on the Solutions page.
 *
 * Triggered when the user clicks the gold arrow on a Solution card. The
 * card title is passed in as `subject` and pre-fills the Subject field so
 * the user knows exactly what they're enquiring about. Submission reuses
 * the same enquiry mutation as the Contact page so the payload shape
 * stays consistent.
 *
 * Rendered through a React portal so its z-index escapes any local
 * stacking context, and locks page scroll while open. Closes on Escape
 * and on backdrop click; the form reset happens on close so a fresh open
 * always starts blank except for the pre-filled subject.
 */

import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ENQUIRY_PRODUCT,
  ENQUIRY_UTM,
} from '@/modules/contact/constants'
import { useEnquiryMutation } from '@/modules/contact/hooks/useEnquiryMutation'
import type { EnquiryPayload } from '@/modules/contact/api/enquiry.types'

interface EnquiryModalProps {
  /** Pre-fills the Subject field. `null` keeps the modal closed. */
  subject: string | null
  onClose: () => void
}

interface FormState {
  fullName: string
  phone: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM: FormState = {
  fullName: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

export function EnquiryModal({ subject, onClose }: EnquiryModalProps) {
  const isOpen = subject !== null
  const prefersReducedMotion = useReducedMotion()

  const [values, setValues] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const enquiryMutation = useEnquiryMutation()
  const isSubmitting = enquiryMutation.isPending || status === 'submitting'

  // Sync the pre-filled subject whenever the modal opens, and reset
  // everything else so back-to-back opens don't carry stale state.
  useEffect(() => {
    if (subject !== null) {
      setValues({ ...INITIAL_FORM, subject })
      setErrors({})
      setServerError(null)
      setStatus('idle')
      enquiryMutation.reset()
    }
    // We intentionally exclude enquiryMutation.reset to avoid resetting
    // on every render of the hook; it only needs to fire on open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject])

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  function validate(): boolean {
    const errs: Partial<FormState> = {}

    if (!values.fullName.trim()) {
      errs.fullName = 'Please enter your full name.'
    } else if (values.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.'
    }

    const cleanedPhone = values.phone.replace(/\D/g, '')
    if (!cleanedPhone) {
      errs.phone = 'Please enter your mobile number.'
    } else if (cleanedPhone.length !== 10) {
      errs.phone = 'Mobile number must be exactly 10 digits.'
    }

    if (!values.email.trim()) {
      errs.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!values.message.trim()) {
      errs.message = 'Please enter your message.'
    } else if (values.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setServerError(null)

    const payload: EnquiryPayload = {
      enquiryFullName: values.fullName.trim(),
      enquiryEmail: values.email.trim(),
      enquiryMobile: values.phone.replace(/\D/g, ''),
      // Surface the originating solution so the CRM team can route it.
      enquiryProduct: `${ENQUIRY_PRODUCT} – ${values.subject}`,
      enquiryMessage: values.message.trim(),
      ...ENQUIRY_UTM,
    }

    try {
      await enquiryMutation.mutateAsync(payload)
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setServerError(
        err instanceof Error
          ? err.message
          : 'We could not send your enquiry. Please try again.',
      )
    }
  }

  function handleReset() {
    setValues({ ...INITIAL_FORM, subject: subject ?? '' })
    setErrors({})
    setServerError(null)
    setStatus('idle')
    enquiryMutation.reset()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="enquiry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden bg-navy-deep/70 p-2 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            key="enquiry-panel"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.97 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-card sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl"
          >
            {/* Header — compact so the whole dialog fits the viewport */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-surface px-5 py-3 sm:px-6 sm:py-3.5">
              <div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-gold">
                  Enquire Now
                </p>
                <h2
                  id="enquiry-modal-title"
                  className="mt-0.5 font-display text-base font-bold text-navy sm:text-lg"
                >
                  {subject}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry form"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-line-soft hover:text-ink"
              >
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body — fits the viewport, no internal scroller */}
            <div className="flex-1 overflow-hidden px-5 py-3.5 sm:px-6 sm:py-4">
              {status === 'success' ? (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center text-emerald-900"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-emerald-950 sm:text-xl">
                    Enquiry Sent!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-emerald-800">
                    Thanks, <span className="font-semibold">{values.fullName}</span>. Our team will reach out about{' '}
                    <span className="font-semibold">{subject}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-5 inline-flex items-center gap-2 rounded-button bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-soft"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
                  <p className="text-[13px] leading-snug text-muted">
                    Tell us a bit about you and we&apos;ll connect you with the right advisor for{' '}
                    <span className="font-semibold text-ink">{subject}</span>.
                  </p>

                  {serverError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-rose-200 bg-rose-50/70 px-4 py-3 text-sm text-rose-700"
                    >
                      {serverError}
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="enquiry-fullName"
                        className="block text-xs font-semibold text-ink"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="enquiry-fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={values.fullName}
                        onChange={(e) => {
                          setValues({ ...values, fullName: e.target.value })
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                        }}
                        className={`mt-1 h-9 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${
                          errors.fullName
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                            : 'border-line'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-0.5 text-xs text-rose-500">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-xs font-semibold text-ink"
                      >
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div
                        className={`mt-1 flex h-9 w-full items-center rounded-lg border bg-white transition-colors focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 ${
                          errors.phone
                            ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-200'
                            : 'border-line'
                        }`}
                      >
                        <div className="flex items-center gap-1 border-r border-line px-3 text-xs font-semibold text-ink">
                          <span>+91</span>
                        </div>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="Enter mobile number"
                          value={values.phone}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
                            setValues({ ...values, phone: digits })
                            if (errors.phone) setErrors({ ...errors, phone: undefined })
                          }}
                          className="h-full w-full bg-transparent px-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-0.5 text-xs text-rose-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-xs font-semibold text-ink"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={values.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: undefined })
                      }}
                      className={`mt-1 h-9 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${
                        errors.email
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-line'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-0.5 text-xs text-rose-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject — pre-filled from the card the user clicked */}
                  <div>
                    <label
                      htmlFor="enquiry-subject"
                      className="block text-xs font-semibold text-ink"
                    >
                      Subject
                    </label>
                    <input
                      id="enquiry-subject"
                      type="text"
                      value={values.subject}
                      readOnly
                      className="mt-1 h-9 w-full cursor-default rounded-lg border border-line bg-line-soft/60 px-3 text-sm font-semibold text-ink focus:outline-none"
                    />
                    <p className="mt-0.5 text-[11px] leading-snug text-muted">
                      Pre-filled based on the solution you selected.
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-semibold text-ink"
                    >
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={2}
                      placeholder="Tell us a bit about what you need..."
                      value={values.message}
                      onChange={(e) => {
                        setValues({ ...values, message: e.target.value })
                        if (errors.message) setErrors({ ...errors, message: undefined })
                      }}
                      className={`mt-1 max-h-[72px] min-h-[60px] w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${
                        errors.message
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-line'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-0.5 text-xs text-rose-500">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-button bg-gold px-5 py-2 text-sm font-semibold text-white shadow-gold transition-all hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending Enquiry...
                      </>
                    ) : (
                      <>
                        Send Enquiry
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
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
