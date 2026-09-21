import { useState, type FormEvent } from 'react'
import { Container } from '@/shared/components/Container'
import { getFriendlyApiErrorMessage } from '@/shared/lib/apiErrors'
import { getEnquiryFrom, getUtmParams } from '@/shared/lib/utm'
import { isValidEmail, isValidIndianMobile } from '@/shared/lib/validation'
import { useEnquiryMutation } from '@/modules/enquiry/hooks/useEnquiryMutation'
import { contactCopy } from '../constants'
import { ENQUIRY_FROM_CONTACT } from '@/modules/enquiry/constants'
import type { EnquiryPayload } from '@/modules/enquiry/api/enquiry.types'
import { GetInTouchCard } from '../components/GetInTouchCard'

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

export function ContactFormSection() {
  const { form } = contactCopy
  const [values, setValues] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const enquiryMutation = useEnquiryMutation()
  const isSubmitting = enquiryMutation.isPending || status === 'submitting'

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
    } else if (!isValidIndianMobile(values.phone)) {
      errs.phone = 'Mobile number must be exactly 10 digits.'
    }

    if (!values.email.trim()) {
      errs.email = 'Please enter your email address.'
    } else if (!isValidEmail(values.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!values.subject) {
      errs.subject = 'Please select a subject.'
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
      enquiryService: values.subject,
      enquiryMessage: values.message.trim(),
      enquiryFrom: getEnquiryFrom(ENQUIRY_FROM_CONTACT),
      ...getUtmParams(),
    }

    try {
      await enquiryMutation.mutateAsync(payload)
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      setServerError(getFriendlyApiErrorMessage(err))
    }
  }

  function handleReset() {
    setValues(INITIAL_FORM)
    setErrors({})
    setServerError(null)
    setStatus('idle')
    enquiryMutation.reset()
  }

  return (
    <section className="bg-white py-8 lg:py-12">
      <Container size="4xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Form Card */}
          <div className="rounded-2xl border border-line bg-white p-5 sm:p-8 md:p-10 lg:col-span-7 shadow-soft">
            <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
              {form.title}
            </h2>
            <p className="mt-2 text-sm text-muted md:text-base">
              {form.description}
            </p>

            {status === 'success' ? (
              <div
                role="status"
                className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center text-emerald-900"
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
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-emerald-950">
                  Message Sent Successfully!
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-emerald-800">
                  Thank you for reaching out, <span className="font-semibold">{values.fullName}</span>. One of our senior advisors will connect with you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center gap-2 rounded-button bg-navy px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-soft"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                {serverError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-rose-200 bg-rose-50/70 px-4 py-3 text-sm text-rose-700"
                  >
                    {serverError}
                  </div>
                )}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-ink"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={values.fullName}
                      onChange={(e) => {
                        setValues({ ...values, fullName: e.target.value })
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                      }}
                      className={`mt-2 h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${errors.fullName ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-line'
                        }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-ink"
                    >
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div
                      className={`mt-2 flex h-11 w-full items-center rounded-lg border bg-white transition-colors focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 ${errors.phone ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-200' : 'border-line'
                        }`}
                    >
                      <div className="flex items-center gap-1 border-r border-line px-3 text-xs font-semibold text-ink">
                        <span>+91</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <input
                        id="phone"
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
                      <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-ink"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={values.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: undefined })
                      }}
                      className={`mt-2 h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${errors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-line'
                        }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-ink"
                    >
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="subject"
                        value={values.subject}
                        onChange={(e) => {
                          setValues({ ...values, subject: e.target.value })
                          if (errors.subject) setErrors({ ...errors, subject: undefined })
                        }}
                        className={`h-11 w-full appearance-none rounded-lg border bg-white px-3.5 pr-8 text-sm text-ink transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${!values.subject ? 'text-muted/70' : 'text-ink'
                          } ${errors.subject ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-line'
                          }`}
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {form.subjects.map((sub) => (
                          <option key={sub} value={sub} className="text-ink">
                            {sub}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
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
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-500">{errors.subject}</p>
                    )}
                  </div>
                </div>

                {/* Your Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-ink"
                  >
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Write your message here..."
                    value={values.message}
                    onChange={(e) => {
                      setValues({ ...values, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: undefined })
                    }}
                    className={`mt-2 w-full rounded-lg border bg-white p-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${errors.message ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-line'
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-button bg-gold px-7 py-3 text-sm font-semibold text-white shadow-gold transition-all duration-200 hover:bg-gold-hover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
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
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
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
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Get in Touch Card (live company data) */}
          <GetInTouchCard />
        </div>
      </Container>
    </section>
  )
}
