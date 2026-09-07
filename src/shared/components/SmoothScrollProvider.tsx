/**
 * SmoothScrollProvider — wraps the app with a Lenis instance that gives the
 * whole site a buttery inertia scroll.
 *
 * Tuning notes (after a jitter pass):
 *   - We use Lenis's *lerp* mode (per-frame interpolation) instead of a
 *     duration + easing curve. Lerp adapts smoothly to whatever the user
 *     is doing — duration-based curves fight the RAF loop and cause
 *     rubber-banding on long pages, especially when many `whileInView`
 *     sections are also being revealed.
 *   - `syncTouch: false` keeps native touch scrolling for mobile so the
 *     browser handles momentum, overscroll, and the iOS pull-to-refresh
 *     correctly. Lenis still drives wheel scroll on desktop.
 *   - Reduced-motion users get native scrolling — Lenis is never
 *     initialised.
 *   - Browser scroll restoration is disabled so route changes can be
 *     driven entirely by Lenis (see <ScrollToTopOnRouteChange />).
 *
 * Components that need imperative access to Lenis (e.g. a "back to top"
 * CTA) can call `useLenis()` from `lenis/react`.
 */

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface SmoothScrollProviderProps {
  children: ReactNode
}

function ScrollToTopOnRouteChange() {
  const lenis = useLenis()
  const location = useLocation()

  useEffect(() => {
    const hash = window.location.hash?.slice(1)

    if (!lenis) {
      // Reduced-motion / no-Lenis path: hash links (e.g. Solutions card
      // anchors) must still work — native jump, no smooth animation.
      // Cards carry `scroll-mt-28` so the sticky header doesn't cover them.
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
    // new page. Hash targets (e.g. /about#team) are handled by a
    // separate branch below that waits for the element to mount.
    lenis.scrollTo(0, { immediate: true })

    if (hash) {
      // Wait one frame so the new page has rendered, then smooth-scroll
      // to the requested anchor.
      const id = window.requestAnimationFrame(() => {
        const target = document.getElementById(hash)
        if (target) {
          lenis.scrollTo(target, { offset: -80 })
        }
      })
      return () => window.cancelAnimationFrame(id)
    }
  }, [lenis, location.pathname, location.hash])

  return null
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Read the user's reduced-motion preference synchronously so we never
  // initialise Lenis for users who don't want smooth motion.
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Disable the browser's automatic scroll restoration so Lenis owns the
  // scroll position; otherwise the page would jump back to its previous
  // location when the user navigates with the back/forward buttons.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
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
