/**
 * LoadingFallback — minimal Suspense fallback for lazy routes.
 * Zero heavy deps, no layout shift (reserves viewport height).
 */
export function LoadingFallback() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading page"
      className="flex min-h-[50vh] items-center justify-center bg-page"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-navy" />
    </div>
  )
}

export default LoadingFallback
