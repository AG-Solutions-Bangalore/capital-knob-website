import { ROUTES, type RoutePath } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { Container } from './Container'
import { Logo } from './Logo'

interface NavItem {
  label: string
  to: RoutePath
  title: string
}

const navItems: NavItem[] = [
  { label: 'Home', to: ROUTES.home, title: 'CapitalKnob Home' },
  {
    label: 'Home Finance',
    to: ROUTES.homeFinance,
    title: 'Home Finance Solutions',
  },
  {
    label: 'Business Finance',
    to: ROUTES.businessFinance,
    title: 'Business Finance Solutions',
  },
  {
    label: 'Real Estate Finance',
    to: ROUTES.realEstateFinance,
    title: 'Real Estate Finance Solutions',
  },
  {
    label: 'Private Credit',
    to: ROUTES.privateCredit,
    title: 'Private Credit Solutions',
  },
  { label: 'About Us', to: ROUTES.about, title: 'About Us – CapitalKnob' },
]

/** Width of the slide-in mobile sidebar in pixels. */
const SIDEBAR_WIDTH = 320

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  // Close the sidebar on every route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock body scroll while the sidebar is open and restore on close/unmount.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    // Compensate for the disappearing scrollbar so the page doesn't jump.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [open])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white text-ink shadow-soft">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Logo variant="dark" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-6 xl:gap-8 text-sm font-medium text-ink-soft">
              {navItems.map((item) => (
                <li key={item.to} className="relative">
                  <NavLink
                    to={item.to}
                    title={item.title}
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
          <div className="hidden items-center gap-5 xl:gap-6 lg:flex">
            <a
              href="tel:+919876543210"
              title={linkTitleFor('tel:+919876543210')}
              className="flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-navy"
            >
              <PhoneIcon />
              +91 98765 43210
            </a>
            <Link to={ROUTES.contact} title={linkTitleFor(ROUTES.contact)}>
              <Button variant="navy" size="md" className="px-5">
                Get a Callback
                <ArrowRightIcon />
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-sidebar"
            onClick={() => setOpen((v) => !v)}
            className="rounded-button p-2 text-ink transition-colors hover:bg-line-soft lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotate: -45, scale: 0.8 }
                }
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotate: 45, scale: 0.8 }
                }
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="inline-flex"
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {/* Mobile sidebar + backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-ink/55 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              key="mobile-sidebar"
              id="mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="CapitalKnob navigation"
              initial={
                prefersReducedMotion
                  ? { x: -SIDEBAR_WIDTH, opacity: 0.6 }
                  : { x: -SIDEBAR_WIDTH, opacity: 0, filter: 'blur(6px)' }
              }
              animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={
                prefersReducedMotion
                  ? { x: -SIDEBAR_WIDTH, opacity: 0 }
                  : { x: -SIDEBAR_WIDTH, opacity: 0, filter: 'blur(6px)' }
              }
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 32,
                mass: 0.8,
              }}
              style={{ width: SIDEBAR_WIDTH, maxWidth: '85vw' }}
              className="fixed left-0 top-0 z-50 flex h-dvh flex-col overflow-y-auto border-r border-line bg-white text-ink shadow-2xl lg:hidden"
            >
              {/* Sidebar header */}
              <div className="flex h-20 items-center justify-between border-b border-line px-5">
                <Link
                  to={ROUTES.home}
                  title={linkTitleFor(ROUTES.home)}
                  onClick={() => setOpen(false)}
                  className="inline-flex"
                >
                  <span className="flex items-baseline gap-0.5">
                    <span className="font-display text-2xl font-extrabold text-brand-blue">Capital</span>
                    <span className="font-display text-2xl font-extrabold text-gold">Knob</span>
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="rounded-button p-2 text-ink transition-colors hover:bg-line-soft"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6">
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                  Explore
                </p>
                <ul className="mt-3 flex flex-col gap-1 text-sm font-medium">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.to}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: -12, filter: 'blur(4px)' }
                      }
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.35,
                        delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <NavLink
                        to={item.to}
                        title={item.title}
                        end={item.to === ROUTES.home}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between rounded-button px-3 py-3 transition-colors',
                            isActive
                              ? 'bg-navy text-white shadow-soft'
                              : 'text-ink hover:bg-line-soft',
                          )
                        }
                      >
                        <span>{item.label}</span>
                        <ArrowRightIcon
                          className={cn(
                            'h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5',
                          )}
                        />
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar footer: phone + contact CTA */}
              <div className="border-t border-line bg-[#f4f7fa] px-5 py-5">
                <a
                  href="tel:+919876543210"
                  title={linkTitleFor('tel:+919876543210')}
                  className="flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-navy"
                >
                  <PhoneIcon /> +91 98765 43210
                </a>
                <Link
                  to={ROUTES.contact}
                  title={linkTitleFor(ROUTES.contact)}
                  onClick={() => setOpen(false)}
                  className="mt-4 block"
                >
                  <Button variant="gold" className="w-full">
                    Get a Callback
                    <ArrowRightIcon />
                  </Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
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

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
