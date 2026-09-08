import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { ROUTES } from './routes'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { LazyRoute } from '@/shared/components/LazyRoute'
import {
  AboutPage,
  BusinessFinancePage,
  ContactPage,
  HomeFinancePage,
  HomePage,
  NotFoundPage,
  PrivateCreditPage,
  RealEstateFinancePage,
  SolutionsPage,
} from './lazyRoutes'

// Idle route-preloading: only the 1–2 most likely next routes, staggered,
// delayed 3.5s+, skipped on Save-Data / 2g/slow-2g, console-error safe.
if (typeof window !== 'undefined') {
  const preload = () => {
    try {
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
      const conn = nav.connection
      if (conn?.saveData) return
      const et = conn?.effectiveType
      if (et === 'slow-2g' || et === '2g') return
    } catch {
      return
    }
    // Most likely next from landing: Solutions, then Contact. Staggered.
    window.setTimeout(() => {
      import('@/modules/solutions/pages/SolutionsPage').catch(() => {})
    }, 3500)
    window.setTimeout(() => {
      import('@/modules/contact/pages/ContactPage').catch(() => {})
    }, 4500)
  }
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(preload, { timeout: 5000 })
  } else {
    window.setTimeout(preload, 3800)
  }
}

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.home, element: <LazyRoute Component={HomePage} /> },
      { path: ROUTES.solutions, element: <LazyRoute Component={SolutionsPage} /> },
      { path: '/solution', element: <Navigate to={ROUTES.solutions} replace /> },
      { path: ROUTES.homeFinance, element: <LazyRoute Component={HomeFinancePage} /> },
      { path: ROUTES.businessFinance, element: <LazyRoute Component={BusinessFinancePage} /> },
      { path: ROUTES.realEstateFinance, element: <LazyRoute Component={RealEstateFinancePage} /> },
      { path: ROUTES.privateCredit, element: <LazyRoute Component={PrivateCreditPage} /> },
      { path: ROUTES.about, element: <LazyRoute Component={AboutPage} /> },
      { path: '/about', element: <Navigate to={ROUTES.about} replace /> },
      { path: ROUTES.contact, element: <LazyRoute Component={ContactPage} /> },
      { path: '*', element: <LazyRoute Component={NotFoundPage} /> },
    ],
  },
]

export const router = createBrowserRouter(routes)