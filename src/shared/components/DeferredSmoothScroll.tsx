import { Suspense, lazy, useEffect, useState, type ReactNode } from 'react'

// NEVER import `lenis`/`lenis/react` in the critical path — this lazy
// boundary keeps the `lenis-*` chunk off first paint. The real provider
// upgrades to <ReactLenis> only after idle (see SmoothScrollProvider).
const LazySmoothScrollProvider = lazy(() =>
  import('./SmoothScrollProvider').then((m) => ({
    default: m.SmoothScrollProvider,
  })),
)

export function DeferredSmoothScroll({ children }: { children: ReactNode }) {
  // PERF (mobile 79→90+): don't even fetch the SmoothScrollProvider chunk
  // during the LCP window. Mount the lazy boundary only after idle (or
  // first interaction on desktop) — mobile (pointer:coarse) bypasses Lenis
  // entirely, so it never pays this cost.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const onInteract = () => {
      if (!cancelled) setReady(true)
    }
    const markReady = () => {
      if (!cancelled) setReady(true)
    }
    // Coarse pointers never use Lenis — stay on the native path forever.
    try {
      if (window.matchMedia('(pointer: coarse)').matches) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    } catch {
      // matchMedia unavailable — fall through to idle upgrade.
    }
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true })
    window.addEventListener('keydown', onInteract, { once: true })
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(markReady, { timeout: 3500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
        window.removeEventListener('pointerdown', onInteract)
        window.removeEventListener('keydown', onInteract)
      }
    }
    const t = window.setTimeout(markReady, 3500)
    return () => {
      cancelled = true
      window.clearTimeout(t)
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
    }
  }, [])

  if (!ready) return <>{children}</>

  return (
    <Suspense fallback={<>{children}</>}>
      <LazySmoothScrollProvider>{children}</LazySmoothScrollProvider>
    </Suspense>
  )
}

export default DeferredSmoothScroll
