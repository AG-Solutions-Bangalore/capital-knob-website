import { Suspense, type ComponentType } from 'react'
import { LoadingFallback } from './LoadingFallback'
import { RouteErrorBoundary } from './RouteErrorBoundary'

/**
 * LazyRoute — every lazy route renders inside Suspense + ErrorBoundary
 * (blank screen + INP freeze otherwise).
 */
export function LazyRoute({ Component }: { Component: ComponentType }) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </RouteErrorBoundary>
  )
}

export default LazyRoute
