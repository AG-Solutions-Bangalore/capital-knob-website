/**
 * NewsletterForm — compact newsletter subscription form for the Footer.
 *
 * Validates the email client-side, blocks empty/invalid/duplicate
 * submissions, and posts to `POST /createNewsletter` as
 * `multipart/form-data` through `useNewsletterMutation` so the API call
 * stays outside this UI component. The input resets only on success.
 */

import { useState, type FormEvent } from 'react'
import { getFriendlyApiErrorMessage } from '@/shared/lib/apiErrors'
import { isValidEmail } from '@/shared/lib/validation'
import { useNewsletterMutation } from '../hooks/useWebsiteQueries'

interface NewsletterFormProps {
  /** Match the surrounding footer theme. Defaults to light. */
  tone?: 'light' | 'dark'
}

export function NewsletterForm({ tone = 'light' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const newsletterMutation = useNewsletterMutation()
  const isSubmitting = newsletterMutation.isPending || status === 'submitting'
  const isDark = tone === 'dark'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (isSubmitting) return

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }
    if (!isValidEmail(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setError(null)

    try {
      await newsletterMutation.mutateAsync({ newsletter_email: trimmed })
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('idle')
      setError(getFriendlyApiErrorMessage(err))
    }
  }

  function handleReset() {
    setEmail('')
    setError(null)
    setStatus('idle')
    newsletterMutation.reset()
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={`mt-4 rounded-lg border px-4 py-3 text-xs leading-relaxed ${
          isDark
            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
            : 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
        }`}
      >
        <p className="font-semibold">You&apos;re subscribed!</p>
        <p className={isDark ? 'text-emerald-200/80' : 'text-emerald-700'}>
          Thank you — we&apos;ll keep you posted with the latest updates.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className={`mt-1 font-semibold underline underline-offset-2 transition-colors ${
            isDark ? 'hover:text-emerald-100' : 'hover:text-emerald-900'
          }`}
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4">
      <label
        htmlFor="footer-newsletter-email"
        className={`text-xs font-bold uppercase tracking-wider ${
          isDark ? 'text-white' : 'text-ink'
        }`}
      >
        Stay Updated
      </label>
      <p className={`mt-1 text-xs ${isDark ? 'text-white/70' : 'text-muted'}`}>
        Subscribe for financing insights and updates.
      </p>
      <div className="mt-2 flex gap-2">
        <input
          id="footer-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          disabled={isSubmitting}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          aria-invalid={Boolean(error)}
          className={`h-11 min-w-0 flex-1 rounded-lg border bg-white px-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-70 ${
            error ? 'border-rose-400' : 'border-line'
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-gold px-4 text-xs font-bold text-ink shadow-sm transition-all hover:bg-gold-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
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
              <span className="sr-only">Subscribing…</span>
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-rose-500">
          {error}
        </p>
      )}
    </form>
  )
}
