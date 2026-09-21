/**
 * GetInTouchCard — the "Get in Touch" contact-channels card.
 *
 * Phone and email render from live company data (`GET /getCompany`) and
 * fall back to the static `contactCopy.touch` values while loading or when
 * the API is unreachable, so the card never renders empty. Office details
 * stay static (the backend currently returns no address).
 */

import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useCompanyQuery } from '@/modules/company/hooks/useCompanyQuery'
import { contactCopy } from '../constants'

function formatIndianMobile(digits: string): string {
  const d = digits.replace(/\D/g, '')
  return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : `+91 ${d}`
}

export function GetInTouchCard() {
  const { touch } = contactCopy
  const { data } = useCompanyQuery()
  const live = data?.data

  const phoneNumber = live?.company_mobile_no
    ? formatIndianMobile(live.company_mobile_no)
    : touch.phone.number
  const phoneHref = live?.company_mobile_no
    ? `tel:+91${live.company_mobile_no.replace(/\D/g, '')}`
    : touch.phone.href
  const emailAddress =
    live?.company_email?.trim() ? live.company_email.trim() : touch.email.address
  const emailHref = `mailto:${emailAddress}`

  return (
    <div className="rounded-2xl border border-line/60 bg-[#F4F7FA] p-6 sm:p-8 md:p-10 lg:col-span-5">
      <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
        {touch.title}
      </h2>
      <p className="mt-2 text-sm text-muted md:text-base">
        {touch.description}
      </p>

      <div className="mt-8 space-y-7">
        {/* Call Us */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-soft">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">{touch.phone.label}</p>
            <a
              href={phoneHref}
              title={linkTitleFor(phoneHref)}
              className="mt-1 block font-display text-lg font-bold text-navy transition-colors hover:text-gold"
            >
              {phoneNumber}
            </a>
            <p className="mt-0.5 text-xs text-muted">{touch.phone.hours}</p>
          </div>
        </div>

        {/* Email Us */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-soft">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">{touch.email.label}</p>
            <a
              href={emailHref}
              title={linkTitleFor(emailHref)}
              className="mt-1 block font-display text-lg font-bold text-navy transition-colors hover:text-gold"
            >
              {emailAddress}
            </a>
            <p className="mt-0.5 text-xs text-muted">{touch.email.note}</p>
          </div>
        </div>

        {/* Visit Our Office */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-soft">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">{touch.office.label}</p>
            <p className="mt-1 font-display text-lg font-bold text-navy">
              {live?.company_name?.trim() || touch.office.name}
            </p>
            <address className="mt-1 text-sm not-italic leading-relaxed text-muted">
              {touch.office.lines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>
    </div>
  )
}
