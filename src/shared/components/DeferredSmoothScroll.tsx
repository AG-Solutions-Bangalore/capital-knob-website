import { Suspense, lazy, type ReactNode } from 'react'

// NEVER import `lenis`/`lenis/react` in the critical path — this lazy
// boundary keeps the `lenis-*` chunk off first paint. The real provider
// upgrades to <ReactLenis> only after idle (see SmoothScrollProvider).
const LazySmoothScrollProvider = lazy(() =>
  import('./SmoothScrollProvider').then((m) => ({
    default: m.SmoothScrollProvider,
  })),
)

export function DeferredSmoothScroll({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <LazySmoothScrollProvider>{children}</LazySmoothScrollProvider>
    </Suspense>
  )
}

export default DeferredSmoothScroll
