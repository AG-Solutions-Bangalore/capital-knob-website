/**
 * SmoothScrollProvider — wraps the app with a Lenis instance that gives the
 * whole site a buttery inertia scroll.
 *
 * PERF: this module imports `lenis/react` and therefore lives in the
 * `lenis-*` chunk — it must NEVER be imported in the critical path.
 * `MainLayout` renders `DeferredSmoothScroll` (React.lazy) instead.
 *
 * Upgrade strategy:
 *   - Render children natively first (no Lenis) so first paint is instant.
 *   - Upgrade to `<ReactLenis root>` only after `requestIdleCallback`
 *     (2500ms timeout fallback).
 *   - Bypass entirely on `prefers-reduced-motion` OR `(pointer: coarse)`
 *     so mobile + reduced-motion users keep native scrolling with zero JS.
 *
 * Imperative access goes through `@/lib/lenisInstance` (zero lenis code).
 */

import { ReactLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenisInstance, setLenisInstance } from '@/lib/lenisInstance'

interface SmoothScrollProviderProps {
  children: ReactNode
}

function ScrollToTopOnRouteChange() {
  const location = useLocation()

  useEffect(() => {
    const hash = window.location.hash?.slice(1)
    const lenis = getLenisInstance()

    if (!lenis) {
      // Native path (pre-upgrade / reduced-motion / coarse pointer):
      // hash links must still work — native jump, no smooth animation.
      if (hash) {
        const id = window.requestAnimationFrame(() => {
          document
            .getElementById(hash)
            ?.scrollIntoView({ block: 'start', behavior: 'auto' })
        })
        return () => window.cancelAnimationFrame(id)
      }
      window.scrollTo(0, 0)
      return
    }

    // Snap to top on every route change so users land at the top of the
    // new page. Hash targets wait one frame so the new page has rendered.
    lenis.scrollTo(0, { immediate: true })

    if (hash) {
      const id = window.requestAnimationFrame(() => {
        const target = document.getElementById(hash)
        if (target) {
          lenis.scrollTo(target, { offset: -80 })
        }
      })
      return () => window.cancelAnimationFrame(id)
    }
  }, [location.pathname, location.hash])

  return null
}

function shouldBypassLenis(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  // Coarse pointers (touch phones/tablets) keep native momentum/overscroll.
  if (window.matchMedia('(pointer: coarse)').matches) return true
  return false
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [bypass] = useState<boolean>(() => shouldBypassLenis())
  const [upgraded, setUpgraded] = useState(false)

  // Disable the browser's automatic scroll restoration so Lenis owns the
  // scroll position once upgraded; harmless on the native path too.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Upgrade to Lenis only after the browser is idle (2500ms fallback).
  useEffect(() => {
    if (bypass) return
    let cancelled = false
    const upgrade = () => {
      if (!cancelled) setUpgraded(true)
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(upgrade, { timeout: 2500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }
    const t = window.setTimeout(upgrade, 1200)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [bypass])

  useEffect(() => {
    // Clear the singleton when the provider unmounts or downgrades.
    if (!upgraded || bypass) {
      setLenisInstance(null)
    }
  }, [upgraded, bypass])

  if (bypass || !upgraded) {
    return (
      <>
        <ScrollToTopOnRouteChange />
        {children}
      </>
    )
  }

  return (
    <ReactLenis
      root
      ref={(instance: unknown) => {
        // ReactLenis forwards the Lenis instance (or an object holding it).
        // Accept anything with a `scrollTo` function; otherwise clear.
        const candidate = instance as
          | { scrollTo?: unknown }
          | { lenis?: { scrollTo?: unknown } }
          | null
          | undefined
        const direct =
          candidate && typeof (candidate as { scrollTo?: unknown }).scrollTo === 'function'
            ? (candidate as { scrollTo: (t: number | string | HTMLElement, o?: { immediate?: boolean; offset?: number }) => void })
            : null
        const nested =
          candidate &&
          (candidate as { lenis?: { scrollTo?: unknown } }).lenis &&
          typeof (candidate as { lenis: { scrollTo?: unknown } }).lenis.scrollTo === 'function'
            ? (candidate as { lenis: { scrollTo: (t: number | string | HTMLElement, o?: { immediate?: boolean; offset?: number }) => void } }).lenis
            : null
        setLenisInstance(direct ?? nested)
      }}
      options={{
        // Lerp-based animation: each frame, move 10% of the remaining
        // distance. Smoother and RAF-friendly than duration-based easing.
        lerp: 0.1,
        // Slightly faster touch lerp so finger drags feel responsive.
        syncTouchLerp: 0.075,
        // Keep native touch handling for the mobile browser's own
        // momentum, overscroll, and pull-to-refresh behaviour.
        syncTouch: false,
        // Drive wheel and touch events through Lenis on desktop.
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      }}
    >
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
