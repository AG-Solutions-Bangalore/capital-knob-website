import { Component, type ReactNode } from 'react'

interface RouteErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface RouteErrorBoundaryState {
  hasError: boolean
}

/**
 * RouteErrorBoundary — prevents a lazy-route chunk failure from blanking
 * the whole app (blank screen + INP freeze otherwise).
 */
export class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch() {
    // Intentionally silent — keeps Lighthouse console clean.
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[50vh] items-center justify-center bg-page px-6 text-center">
            <div>
              <p className="font-display text-xl font-bold text-ink">
                Something went wrong
              </p>
              <p className="mt-2 text-sm text-muted">
                Please refresh the page or go back home.
              </p>
              <a
                href="/"
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white"
              >
                Back to Home
              </a>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}

export default RouteErrorBoundary
