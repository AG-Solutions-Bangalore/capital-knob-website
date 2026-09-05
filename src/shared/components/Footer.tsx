import { Link } from 'react-router-dom'
import { ROUTES, type RoutePath } from '@/app/routes'
import { Container } from './Container'
import { Logo } from './Logo'

interface FooterNavItem {
  label: string
  to: RoutePath
}

const footerLinks: FooterNavItem[] = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Home Finance', to: ROUTES.homeFinance },
  { label: 'Business Finance', to: ROUTES.businessFinance },
  { label: 'Real Estate Finance', to: ROUTES.realEstateFinance },
  { label: 'Private Credit', to: ROUTES.privateCredit },
  { label: 'About Us', to: ROUTES.about },
  { label: 'Contact', to: ROUTES.contact },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
  { label: 'Instagram', href: '#', icon: <InstagramIcon /> },
  { label: 'YouTube', href: '#', icon: <YouTubeIcon /> },
  { label: 'X', href: '#', icon: <XIcon /> },
]

import { useLocation } from 'react-router-dom'

interface FooterProps {
  variant?: 'light' | 'dark'
}

export function Footer({ variant }: FooterProps) {
  const location = useLocation()
  const isDark = variant ? variant === 'dark' : location.pathname === ROUTES.contact

  return (
    <footer
      className={
        isDark
          ? 'border-t border-white/10 bg-navy-deep text-white'
          : 'border-t border-line bg-white text-ink'
      }
    >
      <Container size="4xl" className="w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo, Horizontal Nav Links, Social Icons */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <Logo variant={isDark ? 'light' : 'dark'} />

          {/* Centered nav links */}
          <ul
            className={`flex flex-wrap items-center justify-center gap-6 text-xs font-medium md:text-sm ${
              isDark ? 'text-white/80' : 'text-muted'
            }`}
          >
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`transition-colors ${
                    isDark ? 'hover:text-gold' : 'hover:text-gold'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div
            className={`flex items-center gap-4 ${
              isDark ? 'text-white/80' : 'text-muted'
            }`}
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`transition-colors ${
                  isDark ? 'hover:text-gold' : 'hover:text-navy'
                }`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: Copyright & Disclaimer */}
        <div
          className={`flex flex-col items-center justify-between gap-4 border-t py-6 text-xs md:flex-row ${
            isDark
              ? 'border-white/10 text-white/60'
              : 'border-line/60 text-muted'
          }`}
        >
          <p>© {new Date().getFullYear()} CapitalKnob. All rights reserved.</p>
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

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}