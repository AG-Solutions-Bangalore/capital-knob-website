import { Link, useLocation } from 'react-router-dom'
import { ROUTES, servicePath } from '@/app/routes'
import { linkTitleForPage } from '@/shared/seo/linkTitles'
import { useCompanyQuery } from '@/modules/company/hooks/useCompanyQuery'
import { useCategoryQuery } from '@/modules/category/hooks/useCategoryQuery'
import { NewsletterForm } from '@/modules/newsletter/components/NewsletterForm'
import { Container } from './Container'
import { Logo } from './Logo'

/**
 * Static fallback service links — used only while live categories load
 * or when the API is down, so the footer never renders empty.
 */
const solutionLinks = [
  { label: 'Services Hub', href: ROUTES.home },
  { label: 'Home Finance & Loans', href: servicePath('home-finance') },
  { label: 'Business & Working Capital', href: servicePath('business-loan') },
  { label: 'Real Estate & Project Finance', href: servicePath('real-estate-project-finance') },
  { label: 'Private Credit & Structured Debt', href: servicePath('private-credit') },
  { label: 'Home Loan Balance Transfer', href: servicePath('home-finance') },
  { label: 'Loan Against Property (LAP)', href: servicePath('home-finance') },
]

const companyLinks = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About CapitalKnob', href: ROUTES.about },
  { label: 'Blogs & Insights', href: ROUTES.blogs },
  { label: 'Lending Partners', href: '/#partners' },
  { label: 'Why Choose Us', href: '/#why-choose' },
  { label: '5-Step Process', href: '/#steps' },
  { label: 'Contact Us', href: ROUTES.contact },
  { label: 'Disclaimer', href: ROUTES.disclaimer },
  { label: 'Privacy Policy', href: ROUTES.privacyPolicy },
]

const advisoryLinks = [
  { label: 'Free EMI Calculator', href: '/#calculator' },
  { label: 'Check Loan Eligibility', href: ROUTES.contact },
  { label: 'Request Callback', href: ROUTES.contact },
  { label: 'Talk to an Advisor', href: 'tel:+919986900144' },
  { label: 'Partnership Inquiry', href: ROUTES.contact },
]

const socialLinks = [
  { label: 'LinkedIn', title: 'CapitalKnob on LinkedIn', href: 'https://www.linkedin.com/company/capitalknob', icon: <LinkedInIcon /> },
  { label: 'Facebook', title: 'CapitalKnob on Facebook', href: 'https://www.facebook.com/capitalknob', icon: <FacebookIcon /> },
  { label: 'YouTube', title: 'CapitalKnob on YouTube', href: 'https://www.youtube.com/channel/UCAO3v7__wS5S1HtvaqBduPw', icon: <YouTubeIcon /> },
]

interface FooterProps {
  variant?: 'light' | 'dark'
}

export function Footer({ variant = 'light' }: FooterProps) {
  // Page-aware link titles: REPF / Blogs / Contact pages require the LONG
  // audit variants ("... Services" / "... Team" / "... Financial Advisors")
  // while Home / About / Home-Finance / Business-Loan require the SHORT
  // forms for the same hrefs.
  const { pathname } = useLocation()
  const t = (href: string | undefined | null) => linkTitleForPage(href, pathname)
  // Default light white everywhere. Dark only when explicitly passed
  // as <Footer variant="dark" /> — ready for next-themes later.
  const isDark = variant === 'dark'

  // Live company contact (GET /getCompany) with static fallback so the
  // footer never renders empty while loading or when the API is down.
  const { data: companyData } = useCompanyQuery()
  const live = companyData?.data
  const contactPhone = live?.company_mobile_no
    ? `+91 ${live.company_mobile_no}`
    : '+91 99869 00144'
  const contactPhoneHref = live?.company_mobile_no
    ? `tel:+91${live.company_mobile_no.replace(/\D/g, '')}`
    : 'tel:+919986900144'
  const contactEmail = live?.company_email?.trim()
    ? live.company_email.trim()
    : 'advisory@capitalknob.com'

  // Live services (GET /getCategory) — every API category becomes a footer
  // link; the static list above is only the loading/error fallback.
  const { data: categoryData } = useCategoryQuery()
  const liveServices = (categoryData?.data ?? []).filter((c) =>
    c.category_slug?.trim(),
  )
  const serviceLinks =
    liveServices.length > 0
      ? liveServices.map((c) => ({
          label: (c.category_name ?? '').trim() || 'Service',
          href: servicePath((c.category_slug ?? '').trim()),
        }))
      : solutionLinks

  return (
    <footer
      className={
        isDark
          ? 'border-t border-white/10 bg-navy-deep text-white'
          : 'border-t border-line bg-white text-ink'
      }
    >
      <Container size="4xl" className="py-12 md:py-16">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Col 1: Brand Info & Consultation (Span 4) */}
          <div className="lg:col-span-4">
            <Logo variant={isDark ? 'light' : 'dark'} layout="horizontal" />
            <p
              className={`mt-4 max-w-sm text-sm leading-relaxed ${isDark ? 'text-white/75' : 'text-muted'
                }`}
            >
              Empowering individuals, enterprises, and real estate developers with
              transparent financial advisory, access to 50+ leading lenders, and structured
              financing services.
            </p>

            {/* Quick Contact info */}
            <div className="mt-5 space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-navy">Phone:</span>
                <a
                  href={contactPhoneHref}
                  title={t(contactPhoneHref)}
                  className={`transition-colors ${isDark ? 'text-white/90 hover:text-gold' : 'text-ink hover:text-brand-blue'
                    }`}
                >
                  {contactPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-navy">Email:</span>
                <a
                  href={`mailto:${contactEmail}`}
                  title={t(`mailto:${contactEmail}`)}
                  className={`transition-colors ${isDark ? 'text-white/90 hover:text-gold' : 'text-ink hover:text-brand-blue'
                    }`}
                >
                  {contactEmail}
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.title || t(s.href)}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${isDark
                    ? 'border-white/15 bg-white/5 text-white/80 hover:border-gold hover:text-gold'
                    : 'border-line bg-line-soft text-muted hover:border-navy hover:text-navy'
                    }`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter subscription */}
            <NewsletterForm tone={isDark ? 'dark' : 'light'} />
          </div>

          {/* Mobile links group: Solutions + Navigation in 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Col 2: Services (Span 3) */}
            <div className="lg:col-span-3">
              <h3
                className={`font-display text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-ink'
                  }`}
              >
                Services
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                {serviceLinks.map((l, i) => (
                  <li key={`${l.href}-${i}`}>
                    <Link
                      to={l.href}
                      title={t(l.href)}
                      className={`transition-colors ${isDark
                        ? 'text-white/70 hover:text-gold'
                        : 'text-muted hover:text-navy'
                        }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company & Exploration (Span 2) */}
            <div className="lg:col-span-2">
              <h3
                className={`font-display text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-ink'
                  }`}
              >
                Navigation
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      title={t(l.href)}
                      className={`transition-colors ${isDark
                        ? 'text-white/70 hover:text-gold'
                        : 'text-muted hover:text-navy'
                        }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4: Advisory, Tools & Consultation CTA (Span 3) */}
          <div className="lg:col-span-3">
            <h3
              className={`font-display text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-ink'
                }`}
            >
              Advisory & Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              {advisoryLinks.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith('tel:') ? (
                    <a
                      href={contactPhoneHref}
                      title={t(contactPhoneHref) ?? 'Talk to an Advisor'}
                      className={`transition-colors ${isDark
                        ? 'text-white/70 hover:text-gold'
                        : 'text-muted hover:text-navy'
                        }`}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.href}
                      title={t(l.href)}
                      className={`transition-colors ${isDark
                        ? 'text-white/70 hover:text-gold'
                        : 'text-muted hover:text-navy'
                        }`}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                to={ROUTES.contact}
                title={t(ROUTES.contact)}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-gold-hover active:scale-[0.98]"
              >
                <span>Book Free Consultation</span>
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: Copyright & Disclaimer */}
        <div
          className={`mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs md:flex-row ${isDark
            ? 'border-white/10 text-white/60'
            : 'border-line/80 text-muted'
            }`}
        >
          <p>© 2026 CapitalKnob. All rights reserved.</p>
          <p className="max-w-2xl text-center md:text-right">
            CapitalKnob does not guarantee loan approval. Final approval, pricing, tenure, security
            requirements and other terms are determined by the respective lender or financial institution.{' '}
            <Link
              to={ROUTES.disclaimer}
              title={t(ROUTES.disclaimer)}
              className={`underline underline-offset-2 transition-colors ${isDark ? 'hover:text-gold' : 'hover:text-navy'
                }`}
            >
              Full Disclaimer
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}

/* -------------------- inline icons -------------------- */

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.46v6.28zM5.34 7.43a-1.55 1.55 0 1 1 0-3.11 1.55 1.55 0 0 1 0 3.11zM6.75 20.45H3.2V9h3.55v11.45z"
      />
    </svg>
  )
}

// function InstagramIcon() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
//       <defs>
//         <linearGradient id="ig-gradient" x1="0" y1="1" x2="1" y2="0">
//           <stop offset="0%" stopColor="#FEDA75" />
//           <stop offset="35%" stopColor="#FA7E1E" />
//           <stop offset="65%" stopColor="#D62976" />
//           <stop offset="100%" stopColor="#962FBF" />
//         </linearGradient>
//       </defs>
//       <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="url(#ig-gradient)" />
//       <rect x="6" y="6" width="12" height="12" rx="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
//       <circle cx="12" cy="12" r="2.8" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
//       <circle cx="16.4" cy="7.6" r="1.3" fill="#FFFFFF" />
//     </svg>
//   )
// }

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <rect x="1" y="5" width="22" height="14" rx="4" fill="#FF0000" />
      <path d="M10.25 9.25v5.5l4.75-2.75-4.75-2.75z" fill="#FFFFFF" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M15.4 12l.5-3.3h-3.2v-2.1c0-.9.3-1.5 1.5-1.5h1.6V2.2c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1V8.7H6.7V12h2.7v8h3.4v-8h2.6z"
      />
    </svg>
  )
}