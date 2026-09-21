import { ROUTES, type RoutePath } from '@/app/routes'
import { cn } from '@/shared/lib/cn'
import { linkTitleFor } from '@/shared/seo/linkTitles'
import { useCategoryQuery } from '@/modules/category/hooks/useCategoryQuery'
import { categoryAnchor } from '@/modules/category/categoryAnchor'
import { SolutionsMegaPanel } from '@/modules/category/components/CategoryMegaMenu'
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

interface NavChildLink {
  kind: 'link'
  label: string
  /** Full destination including the Solutions-page anchor, e.g. `/solutions#home-loans`. */
  to: string
  title: string
}

interface NavGroupEntry {
  kind: 'group'
  label: string
  /** Top-level path used to mark the parent as "active". */
  to: RoutePath
  title: string
  children: NavChildLink[]
  /** When true, the desktop dropdown renders the live mega-menu panel. */
  mega?: boolean
}

type NavEntry = NavLinkEntry | NavGroupEntry

const navEntries: NavEntry[] = [
  { kind: 'link', label: 'Home', to: ROUTES.home, title: 'CapitalKnob Home' },
  {
    kind: 'link',
    label: 'About Us',
    to: ROUTES.about,
    title: 'About Us – CapitalKnob',
  },
  {
    kind: 'group',
    label: 'Solutions',
    to: ROUTES.solutions,
    title: 'Explore CapitalKnob Solutions',
    mega: true,
    children: [
      {
        kind: 'link',
        label: 'Home Finance',
        to: `${ROUTES.solutions}#home-loans`,
        title: 'Home Finance Solutions – CapitalKnob',
      },
      {
        kind: 'link',
        label: 'Business Finance',
        to: `${ROUTES.solutions}#working-capital`,
        title: 'Business Finance Solutions – CapitalKnob',
      },
      {
        kind: 'link',
        label: 'Real Estate Finance',
        to: `${ROUTES.solutions}#real-estate`,
        title: 'Real Estate Finance Solutions – CapitalKnob',
      },
      {
        kind: 'link',
        label: 'Private Credit',
        to: `${ROUTES.solutions}#private-credit`,
        title: 'Private Credit Solutions – CapitalKnob',
      },
    ],
  },
  {
    kind: 'link',
    label: 'Contact Us',
    to: ROUTES.contact,
    title: 'Contact CapitalKnob',
  },
  // {
  //   kind: 'link',
  //   label: 'Blogs',
  //   to: ROUTES.blogs,
  //   title: 'Blogs & Insights – CapitalKnob',
  // },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Close dropdown menus on every route change.
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setOpen(false)
    setOpenGroup(null)
  }

  const { data: liveCategories } = useCategoryQuery()
  const solutionsEntry = navEntries.find(
    (e): e is NavGroupEntry => e.kind === 'group' && e.label === 'Solutions',
  )

  // Close-delay timer keeps the panel open while the user moves the cursor
  // from the trigger to the dropdown body.
  const closeTimerRef = useRef<number | null>(null)

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
    closeTimerRef.current = window.setTimeout(() => setOpenGroup(null), 200)
  }
  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  // Close dropdown on main window scroll
  useEffect(() => {
    if (!openGroup) return
    const onScroll = () => {
      cancelClose()
      setOpenGroup(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [openGroup])

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-white text-ink shadow-soft"
      onMouseLeave={scheduleClose}
    >
      <Container size="4xl">
        <div className="flex h-20 items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <div onMouseEnter={() => { cancelClose(); setOpenGroup(null); }}>
            <Logo variant="dark" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex h-full">
            <ul className="flex h-full items-center gap-4 xl:gap-8 text-[13px] xl:text-sm font-medium text-ink-soft">
              {navEntries.map((entry) =>
                entry.kind === 'link' ? (
                  <DesktopTopLink
                    key={`link-${entry.label}`}
                    entry={entry}
                    onHover={() => {
                      cancelClose()
                      setOpenGroup(null)
                    }}
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

          {/* Right cluster */}
          <div
            className="hidden items-center gap-4 lg:flex xl:gap-6"
            onMouseEnter={() => { cancelClose(); setOpenGroup(null); }}
          >
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
            <span key={open ? 'close' : 'menu'} className="inline-flex animate-pop-in">
              {open ? <CloseIcon /> : <MenuIcon />}
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile end-to-end dropdown + backdrop */}
      {open && (
        <>
          <div
            key="mobile-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 top-20 z-40 bg-ink/40 backdrop-blur-xs lg:hidden animate-fade-in"
          />

          <div
            key="mobile-dropdown"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="CapitalKnob navigation"
            className="fixed inset-x-0 top-20 z-50 px-3 pt-2 lg:hidden animate-dropdown-in"
          >
            <div className="mx-auto w-full max-w-lg rounded-2xl border border-line bg-white/98 text-ink shadow-2xl backdrop-blur-md p-4 max-h-[calc(100dvh-5.5rem)] overflow-y-auto">
              <div className="flex flex-col gap-3.5">
                {/* Row 1: Primary Page Links */}
                <div className="grid grid-cols-3 gap-2">
                  <NavLink
                    to={ROUTES.home}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-center rounded-xl py-2.5 text-[13px] font-semibold transition-colors',
                        isActive
                          ? 'bg-navy text-white shadow-soft'
                          : 'bg-line-soft/70 text-ink hover:bg-line-soft',
                      )
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={ROUTES.about}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-center rounded-xl py-2.5 text-[13px] font-semibold transition-colors',
                        isActive
                          ? 'bg-navy text-white shadow-soft'
                          : 'bg-line-soft/70 text-ink hover:bg-line-soft',
                      )
                    }
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to={ROUTES.contact}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-center rounded-xl py-2.5 text-[13px] font-semibold transition-colors',
                        isActive
                          ? 'bg-navy text-white shadow-soft'
                          : 'bg-line-soft/70 text-ink hover:bg-line-soft',
                      )
                    }
                  >
                    Contact Us
                  </NavLink>
                </div>

                {/* Row 2: Solutions Header */}
                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                    Financial Solutions
                  </span>
                  <Link
                    to={ROUTES.solutions}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-1 text-[12px] font-semibold text-navy transition-colors hover:text-gold"
                  >
                    <span>View All</span>
                    <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                </div>

                {/* Row 3: Solutions Grid (4-5 per line on md, 3 on sm, 2 on xs) */}
                <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5">
                  {liveCategories?.data && liveCategories.data.length > 0 ? (
                    liveCategories.data.map((cat) => (
                      <Link
                        key={cat.id ?? cat.category_slug}
                        to={categoryAnchor(cat.category_slug)}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-lg border border-line bg-slate-50/90 px-2.5 py-1.5 text-[11px] sm:text-[12px] font-medium text-ink transition-all active:scale-[0.98] hover:border-navy/30 hover:bg-navy/5 hover:text-navy"
                      >
                        <span className="truncate">{cat.category_name}</span>
                        <ArrowRightIcon className="h-2.5 w-2.5 shrink-0 text-muted opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
                      </Link>
                    ))
                  ) : (
                    (solutionsEntry?.children ?? []).map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-lg border border-line bg-slate-50/90 px-2.5 py-1.5 text-[11px] sm:text-[12px] font-medium text-ink transition-all active:scale-[0.98] hover:border-navy/30 hover:bg-navy/5 hover:text-navy"
                      >
                        <span className="truncate">{child.label}</span>
                        <ArrowRightIcon className="h-2.5 w-2.5 shrink-0 text-muted opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
                      </Link>
                    ))
                  )}
                </div>

                {/* Row 4: Get a Callback CTA */}
                <div className="pt-1">
                  <Link
                    to={ROUTES.contact}
                    title={linkTitleFor(ROUTES.contact)}
                    onClick={() => setOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="gold" size="md" className="w-full justify-center shadow-soft">
                      <span>Get a Callback</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

/* -------------------- Desktop subcomponents -------------------- */

function DesktopTopLink({
  entry,
  onHover,
}: {
  entry: NavLinkEntry
  onHover: () => void
}) {
  return (
    <li className="relative flex h-full items-center" onMouseEnter={onHover}>
      <NavLink
        to={entry.to}
        title={entry.title}
        end={entry.to === ROUTES.home}
        className={({ isActive }) =>
          cn(
            'relative whitespace-nowrap py-2 transition-colors hover:text-navy',
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
  const itemRef = useRef<HTMLLIElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Mark this group as active when user is on the Solutions route, regardless
  // of whether the dropdown is open.
  const isOnGroupRoute = useOnRoute(entry.to)

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node
      if (
        itemRef.current &&
        !itemRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        cancelClose()
        setOpenGroup(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen, setOpenGroup, cancelClose])

  // Live categories power the mega panel. Fires once per load (cached
  // 30 min) and doubles as a cache warmer for the Solutions page. While
  // loading we still show the mega panel (it has its own skeleton); the
  // static list below is only a fallback for error/empty.
  const { data: liveCategories, isPending: livePending } = useCategoryQuery()
  const showMega =
    !!entry.mega &&
    (livePending || (liveCategories?.data.length ?? 0) > 0)

  return (
    <li
      ref={itemRef}
      className="relative flex h-full items-center"
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
        onFocus={() => {
          cancelClose()
          setOpenGroup(entry.label)
        }}
        className={cn(
          'relative flex items-center gap-1 whitespace-nowrap py-2 transition-colors hover:text-navy',
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

      {isOpen && showMega ? (
        <div
          id={panelId}
          role="menu"
          className="fixed inset-x-0 top-20 z-50 pointer-events-none pt-2"
        >
          <div
            ref={panelRef}
            data-lenis-prevent
            className="pointer-events-auto relative mx-auto max-h-[calc(100dvh-5.5rem)] w-[min(1380px,96vw)] overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-2xl animate-dropdown-in lg:p-7 before:absolute before:-top-3 before:inset-x-0 before:h-3 before:content-['']"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <SolutionsMegaPanel onNavigate={() => setOpenGroup(null)} />
          </div>
        </div>
      ) : (
        isOpen && (
          <div
            ref={panelRef}
            id={panelId}
            role="menu"
            // `left-1/2 -translate-x-1/2` centers the panel under the trigger
            // pt-2 provides seamless hover bridge between button and dropdown
            className="absolute left-1/2 top-full z-50 pt-2 -translate-x-1/2"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="min-w-60 rounded-button border border-line bg-white p-1.5 shadow-card animate-dropdown-in">
              <ul className="flex gap-2 flex-col">
                {entry.children.map((child) => (
                  <SolutionChildItem
                    key={`${entry.label}-${child.label}`}
                    child={child}
                    variant="desktop"
                    onNavigate={() => setOpenGroup(null)}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      )}
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

/**
 * Solutions dropdown item — links to the Solutions page with a hash anchor
 * (e.g. `/solutions#home-loans`) so the page scrolls to and highlights the
 * matching card. `NavLink` ignores the hash when matching, which would mark
 * every item active at once, so active state is compared manually against
 * `pathname + hash`.
 */
function SolutionChildItem({
  child,
  variant,
  onNavigate,
}: {
  child: NavChildLink
  variant: 'desktop' | 'mobile'
  onNavigate: () => void
}) {
  const { pathname, hash } = useLocation()
  const isActive = `${pathname}${hash}` === child.to
  const desktop = variant === 'desktop'

  return (
    <li role={desktop ? 'none' : undefined}>
      <Link
        to={child.to}
        title={child.title}
        role={desktop ? 'menuitem' : undefined}
        onClick={onNavigate}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          desktop
            ? 'flex items-center group justify-between gap-3 rounded-md px-3 py-2.5 text-[13px] transition-colors'
            : 'flex items-center justify-between rounded-button px-3 py-2.5 text-[13px] transition-colors',
          isActive
            ? 'bg-line-soft font-semibold text-navy'
            : desktop
              ? 'text-ink hover:bg-line-soft hover:text-navy'
              : 'text-ink-soft hover:bg-line-soft hover:text-ink',
        )}
      >
        <span>{child.label}</span>
        <ArrowRightIcon
          className={
            desktop
              ? 'h-3 w-3 opacity-60 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-rotate-45'
              : 'h-3 w-3 opacity-50'
          }
        />
      </Link>
    </li>
  )
}

/* -------------------- inline icons -------------------- */

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