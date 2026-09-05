import { ROUTES, type RoutePath } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './Button'
import { Container } from './Container'
import { Logo } from './Logo'

interface NavItem {
  label: string
  to: RoutePath
}

const navItems: NavItem[] = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Home Finance', to: ROUTES.homeFinance },
  { label: 'Business Finance', to: ROUTES.businessFinance },
  { label: 'Real Estate Finance', to: ROUTES.realEstateFinance },
  { label: 'Private Credit', to: ROUTES.privateCredit },
  { label: 'About Us', to: ROUTES.about },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white text-ink shadow-soft">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Logo variant="dark" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-8 text-sm font-medium text-ink-soft">
              {navItems.map((item) => (
                <li key={item.to} className="relative">
                  <NavLink
                    to={item.to}
                    end={item.to === ROUTES.home}
                    className={({ isActive }) =>
                      cn(
                        'relative py-2 transition-colors hover:text-navy',
                        isActive
                          ? 'font-semibold text-navy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-navy'
                          : 'text-ink-soft',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-navy"
            >
              <PhoneIcon />
              +91 98765 43210
            </a>
            <Button variant="navy" size="md" className="px-5">
              Get a Callback
              <ArrowRightIcon />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-button p-2 text-ink lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t border-line py-4 lg:hidden">
            <ul className="flex flex-col gap-1 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === ROUTES.home}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-button px-3 py-2 transition-colors',
                        isActive ? 'bg-gold/10 text-gold' : 'text-ink-soft hover:bg-line-soft',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 px-3 text-sm text-ink-soft">
                <PhoneIcon /> +91 98765 43210
              </a>
              <Link to={ROUTES.contact} onClick={() => setOpen(false)}>
                <Button variant="gold" className="w-full">
                  Get a Callback
                  <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

/* -------------------- inline icons -------------------- */

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}