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

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Unlock the right capital for every milestone — from your first home to scaling your business.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-gold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/80 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-gold">Connect</h3>
            <ul className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-pill border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">
              © {new Date().getFullYear()} CapitalKnob. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-xs text-white/50">
          Disclaimer: CapitalKnob does not guarantee loan approval. Final approval, pricing, tenure, security
          requirements and other terms are determined by the respective lender or financial institution.
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