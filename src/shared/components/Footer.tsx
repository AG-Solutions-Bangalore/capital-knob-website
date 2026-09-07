import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { Container } from './Container'
import { Logo } from './Logo'

/**
 * Financial-solution links — every entry routes to the Solutions page
 * with a hash that targets a specific card. The Solutions page uses that
 * hash to scroll the matching card into view and highlight it so the
 * user can see at a glance which solution they selected.
 */
const solutionLinks = [
  { label: 'Solutions Hub', href: ROUTES.solutions },
  { label: 'Home Finance & Loans', href: `${ROUTES.solutions}#home-loans` },
  { label: 'Business & Working Capital', href: `${ROUTES.solutions}#working-capital` },
  { label: 'Real Estate & Project Finance', href: `${ROUTES.solutions}#real-estate` },
  { label: 'Private Credit & Structured Debt', href: `${ROUTES.solutions}#private-credit` },
  { label: 'Home Loan Balance Transfer', href: `${ROUTES.solutions}#balance-transfer` },
  { label: 'Loan Against Property (LAP)', href: `${ROUTES.solutions}#loan-against-property` },
]

const companyLinks = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Explore All Solutions', href: ROUTES.solutions },
  { label: 'About CapitalKnob', href: ROUTES.about },
  { label: 'Lending Partners', href: '/#partners' },
  { label: 'Why Choose Us', href: '/#why-choose' },
  { label: '5-Step Process', href: '/#steps' },
  { label: 'Contact Us', href: ROUTES.contact },
]

const advisoryLinks = [
  { label: 'Free EMI Calculator', href: '/#calculator' },
  { label: 'Check Loan Eligibility', href: ROUTES.contact },
  { label: 'Request Callback', href: ROUTES.contact },
  { label: 'Talk to an Advisor', href: 'tel:+919876543210' },
  { label: 'Partnership Inquiry', href: ROUTES.contact },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
  { label: 'Instagram', href: '#', icon: <InstagramIcon /> },
  { label: 'YouTube', href: '#', icon: <YouTubeIcon /> },
]

interface FooterProps {
  variant?: 'light' | 'dark'
}

export function Footer({ variant = 'light' }: FooterProps) {
  // Default light white everywhere. Dark only when explicitly passed
  // as <Footer variant="dark" /> — ready for next-themes later.
  const isDark = variant === 'dark'

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
              className={`mt-4 max-w-sm text-sm leading-relaxed ${
                isDark ? 'text-white/75' : 'text-muted'
              }`}
            >
              Empowering individuals, enterprises, and real estate developers with
              transparent financial advisory, access to 50+ leading lenders, and structured
              financing solutions.
            </p>

            {/* Quick Contact info */}
            <div className="mt-5 space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gold">Phone:</span>
                <a
                  href="tel:+919876543210"
                  title={linkTitleFor('tel:+919876543210')}
                  className={`transition-colors ${
                    isDark ? 'text-white/90 hover:text-gold' : 'text-ink hover:text-brand-blue'
                  }`}
                >
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gold">Email:</span>
                <a
                  href="mailto:info@capitalknob.com"
                  title={linkTitleFor('mailto:info@capitalknob.com')}
                  className={`transition-colors ${
                    isDark ? 'text-white/90 hover:text-gold' : 'text-ink hover:text-brand-blue'
                  }`}
                >
                  info@capitalknob.com
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={linkTitleFor(s.href)}
                  aria-label={s.label}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                    isDark
                      ? 'border-white/15 bg-white/5 text-white/80 hover:border-gold hover:text-gold'
                      : 'border-line bg-line-soft text-muted hover:border-navy hover:text-navy'
                  }`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile links group: Solutions + Navigation in 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Col 2: Solutions & Offerings (Span 3) */}
            <div className="lg:col-span-3">
              <h3
                className={`font-display text-sm font-bold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-ink'
                }`}
              >
                Financial Solutions
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                {solutionLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      title={linkTitleFor(l.href)}
                      className={`transition-colors ${
                        isDark
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
                className={`font-display text-sm font-bold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-ink'
                }`}
              >
                Navigation
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      title={linkTitleFor(l.href)}
                      className={`transition-colors ${
                        isDark
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
              className={`font-display text-sm font-bold uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-ink'
              }`}
            >
              Advisory & Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              {advisoryLinks.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith('tel:') ? (
                    <a
                      href={l.href}
                      title={linkTitleFor(l.href)}
                      className={`transition-colors ${
                        isDark
                          ? 'text-white/70 hover:text-gold'
                          : 'text-muted hover:text-navy'
                      }`}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.href}
                      title={linkTitleFor(l.href)}
                      className={`transition-colors ${
                        isDark
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
                title={linkTitleFor(ROUTES.contact)}
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
          className={`mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs md:flex-row ${
            isDark
              ? 'border-white/10 text-white/60'
              : 'border-line/80 text-muted'
          }`}
        >
          <p>© 2026 CapitalKnob. All rights reserved.</p>
          <p className="max-w-2xl text-center md:text-right">
            Disclaimer: CapitalKnob does not guarantee loan approval. Final approval, pricing, tenure, security
            requirements and other terms are determined by the respective lender or financial institution.
          </p>
        </div>
      </Container>
    </footer>
  )
}

/* -------------------- inline icons -------------------- */

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.37 4.28 5.46v6.28zM5.34 7.43a-1.55 1.55 0 1 1 0-3.11 1.55 1.55 0 0 1 0 3.11zM6.75 20.45H3.2V9h3.55v11.45z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  )
}