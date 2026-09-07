import { ROUTES, type RoutePath } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { Container } from './Container'
import { Logo } from './Logo'

/* -----------------------------------------------------------------------------
   Navigation model
   - A "link" is a plain top-level entry.
   - A "group" is a top-level entry with a dropdown of child links. Children
     currently all funnel into the Solutions page (per product spec) but each
     keeps a unique `title` so screen readers / link titles still differentiate.
   ----------------------------------------------------------------------------- */

interface NavLinkEntry {
  kind: 'link'
  label: string
  to: RoutePath
  title: string
}

interface NavGroupEntry {
  kind: 'group'
  label: string
  /** Top-level path used to mark the parent as "active". */
  to: RoutePath
  title: string
  children: NavLinkEntry[]
}

type NavEntry = NavLinkEntry | NavGroupEntry

const SOLUTIONS_GROUP_ID = 'solutions-group'

const navEntries: NavEntry[] = [
  { kind: 'link', label: 'Home', to: ROUTES.home, title: 'CapitalKnob Home' },
  {
    kind: 'group',
    label: 'Solutions',
    to: ROUTES.solutions,
    title: 'Explore CapitalKnob Solutions',
    children: [
      {
        kind: 'link',
        label: 'Home Finance',
        to: ROUTES.solutions,
        title: 'Home Finance Solutions – CapitalKnob',
      },
      {
        kind: 'link',
        label: 'Business Finance',
        to: ROUTES.solutions,
        title: 'Business Finance Solutions – CapitalKnob',
      },
      {
        kind: 'link',
        label: 'Real Estate Finance',
        to: ROUTES.solutions,
        title: 'Real Estate Finance Solutions – CapitalKnob',
      },
      {
        kind: 'link',
        label: 'Private Credit',
        to: ROUTES.solutions,
        title: 'Private Credit Solutions – CapitalKnob',
      },
    ],
  },
  {
    kind: 'link',
    label: 'About Us',
    to: ROUTES.about,
    title: 'About Us – CapitalKnob',
  },
  {
    kind: 'link',
    label: 'Contact Us',
    to: ROUTES.contact,
    title: 'Contact CapitalKnob',
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(
    null,
  )
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  // Close-delay timer keeps the panel open while the user moves the cursor
  // from the trigger to the dropdown body.
  const closeTimerRef = useRef<number | null>(null)

  // Close the sidebar on every route change.
  useEffect(() => {
    setOpen(false)
    setOpenGroup(null)
    setMobileExpandedGroup(null)
  }, [location.pathname])

  // Lock body scroll while the sidebar is open and restore on close/unmount.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
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

  // Close on Escape — desktop dropdown OR mobile sidebar.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (open) setOpen(false)
      if (openGroup) setOpenGroup(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, openGroup])

  // Cleanup any pending close-timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => setOpenGroup(null), 120)
  }
  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white text-ink shadow-soft">
      <Container size="4xl">
        <div className="flex h-20 items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <Logo variant="dark" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-4 xl:gap-8 text-[13px] xl:text-sm font-medium text-ink-soft">
              {navEntries.map((entry) =>
                entry.kind === 'link' ? (
                  <DesktopTopLink
                    key={`link-${entry.label}`}
                    entry={entry}
                  />
                ) : (
                  <DesktopDropdown
                    key={`group-${entry.label}`}
                    entry={entry}
                    openGroup={openGroup}
                    setOpenGroup={setOpenGroup}
                    scheduleClose={scheduleClose}
                    cancelClose={cancelClose}
                  />
                ),
              )}
            </ul>
          </nav>

          {/* Right cluster — phone hidden at lg to keep nav on a single line, visible from xl+ */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            <a
              href="tel:+919876543210"
              title={linkTitleFor('tel:+919876543210')}
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium text-ink-soft hover:text-navy xl:flex"
            >
              <PhoneIcon />
              +91 98765 43210
            </a>
            <Link
              to={ROUTES.contact}
              title={linkTitleFor(ROUTES.contact)}
              className="group"
            >
              <Button variant="navy" size="md" className="px-5">
                <span className="whitespace-nowrap">Get a Callback</span>
                <ArrowRightIcon className="transition-transform duration-300 group-hover:-rotate-45" />
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
            className="flex h-11 w-11 items-center justify-center rounded-button text-ink transition-colors hover:bg-line-soft active:bg-line lg:hidden"
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
                  ? { x: '-100%', opacity: 0.6 }
                  : { x: '-100%', opacity: 0, filter: 'blur(6px)' }
              }
              animate={{ x: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={
                prefersReducedMotion
                  ? { x: '-100%', opacity: 0 }
                  : { x: '-100%', opacity: 0, filter: 'blur(6px)' }
              }
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 32,
                mass: 0.8,
              }}
              className="fixed left-0 top-0 z-50 flex h-dvh w-[85vw] max-w-sm sm:w-80 flex-col overflow-y-auto border-r border-line bg-white text-ink shadow-2xl lg:hidden"
            >
              {/* Sidebar header */}
              <div className="flex h-20 items-center justify-between border-b border-line px-5">
                <div onClick={() => setOpen(false)}>
                  <Logo variant="dark" />
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-button text-ink transition-colors hover:bg-line-soft active:bg-line"
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
                  {navEntries.map((entry, idx) => (
                    <motion.li
                      key={entry.kind === 'group' ? `m-group-${entry.label}` : `m-link-${entry.label}`}
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
                      {entry.kind === 'link' ? (
                        <NavLink
                          to={entry.to}
                          title={entry.title}
                          end={entry.to === ROUTES.home}
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
                          <span>{entry.label}</span>
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </NavLink>
                      ) : (
                        <MobileGroup
                          entry={entry}
                          expanded={mobileExpandedGroup === entry.label}
                          onToggle={() =>
                            setMobileExpandedGroup((prev) =>
                              prev === entry.label ? null : entry.label,
                            )
                          }
                          onPick={() => setOpen(false)}
                        />
                      )}
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

/* -------------------- Desktop subcomponents -------------------- */

function DesktopTopLink({ entry }: { entry: NavLinkEntry }) {
  return (
    <li className="relative">
      <NavLink
        to={entry.to}
        title={entry.title}
        end={entry.to === ROUTES.home}
        className={({ isActive }) =>
          cn(
            'relative whitespace-nowrap py-2 my-3 transition-colors hover:text-navy',
            isActive
              ? 'font-semibold text-navy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-navy'
              : 'text-ink-soft',
          )
        }
      >
        {entry.label}
      </NavLink>
    </li>
  )
}

function DesktopDropdown({
  entry,
  openGroup,
  setOpenGroup,
  scheduleClose,
  cancelClose,
}: {
  entry: NavGroupEntry
  openGroup: string | null
  setOpenGroup: (v: string | null) => void
  scheduleClose: () => void
  cancelClose: () => void
}) {
  const isOpen = openGroup === entry.label
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Mark this group as active when user is on the Solutions route, regardless
  // of whether the dropdown is open.
  const isOnGroupRoute = useOnRoute(entry.to)

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpenGroup(entry.label)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpenGroup(isOpen ? null : entry.label)}
        onFocus={() => setOpenGroup(entry.label)}
        className={cn(
          'relative flex items-center gap-1 whitespace-nowrap py-2 my-4 transition-colors hover:text-navy',
          isOpen || isOnGroupRoute
            ? 'font-semibold text-navy'
            : 'text-ink-soft',
          // The same bottom-underline indicator used by plain links — only
          // shows when this group is active and the dropdown is NOT open (so
          // we don't double up visually).
          isOnGroupRoute && !isOpen
            ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-navy'
            : '',
        )}
      >
        {entry.label}
        <ChevronDownIcon
          className={cn(
            'h-3 w-3 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            // `left-1/2 -translate-x-1/2` centers the panel under the trigger
            // so the dropdown reads as "belonging to" the Solutions label,
            // rather than being anchored to its left edge.
            className="absolute left-1/2 top-full z-50 mt-2 min-w-60 -translate-x-1/2 rounded-button border border-line bg-white p-1.5 shadow-card"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <ul className="flex gap-2 flex-col">
              {entry.children.map((child) => (
                <li key={`${entry.label}-${child.label}`} role="none">
                  <NavLink
                    to={child.to}
                    title={child.title}
                    role="menuitem"
                    onClick={() => setOpenGroup(null)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center group justify-between gap-3 rounded-md px-3 py-2.5 text-[13px] transition-colors',
                        isActive
                          ? 'bg-line-soft font-semibold text-navy'
                          : 'text-ink hover:bg-line-soft hover:text-navy',
                      )
                    }
                  >
                    <span>{child.label}</span>
                    <ArrowRightIcon className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-rotate-45" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/** Returns true when the current pathname matches `to` (or starts with it
 *  for non-home paths). Used to keep the dropdown trigger styled as active. */
function useOnRoute(to: RoutePath): boolean {
  const { pathname } = useLocation()
  if (to === ROUTES.home) return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

/* -------------------- Mobile subcomponents -------------------- */

function MobileGroup({
  entry,
  expanded,
  onToggle,
  onPick,
}: {
  entry: NavGroupEntry
  expanded: boolean
  onToggle: () => void
  onPick: () => void
}) {
  const isOnGroupRoute = useOnRoute(entry.to)

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={SOLUTIONS_GROUP_ID}
        title={entry.title}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between rounded-button px-3 py-3 text-left transition-colors',
          isOnGroupRoute
            ? 'bg-navy/5 font-semibold text-navy'
            : 'text-ink hover:bg-line-soft',
        )}
      >
        <span>{entry.label}</span>
        <ChevronDownIcon
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            id={SOLUTIONS_GROUP_ID}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden pl-2"
          >
            <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-line pl-3">
              {entry.children.map((child) => (
                <li key={`${entry.label}-m-${child.label}`}>
                  <NavLink
                    to={child.to}
                    title={child.title}
                    onClick={onPick}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-button px-3 py-2.5 text-[13px] transition-colors',
                        isActive
                          ? 'bg-line-soft font-semibold text-navy'
                          : 'text-ink-soft hover:bg-line-soft hover:text-ink',
                      )
                    }
                  >
                    <span>{child.label}</span>
                    <ArrowRightIcon className="h-3 w-3 opacity-50" />
                  </NavLink>
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
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