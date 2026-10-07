import { lazy, Suspense } from 'react'
import { HomeHero } from '../components/HomeHero'

// PERF 90+: Load hero banner first. Below-the-fold sections are lazy-loaded
// in a separate chunk via Suspense so critical initial JS is minimal and
// mobile hydration/render does not lock the main thread.
const HomeBelowFold = lazy(() => import('../components/HomeBelowFold'))

export function HomePage() {
  return (
    <div className="flex flex-col bg-page">
      {/* 1. Hero with modern luxury villa visual & live EMI Calculator (loads immediately) */}
      <HomeHero />

      {/* 2-9. Below-the-fold sections loaded after the hero banner */}
      <Suspense fallback={null}>
        <HomeBelowFold />
      </Suspense>
    </div>
  )
}

export default HomePage

