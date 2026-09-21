import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { ROUTES } from './routes'
import { env } from '@/shared/lib/env'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { LazyRoute } from '@/shared/components/LazyRoute'
import {
  AboutPage,
  ApiCheckPage,
  BlogDetailPage,
  BlogsPage,
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
    // Most likely next from landing: Solutions, then Contact. Staggered after initial paint.
    window.setTimeout(() => {
      import('@/modules/solutions/pages/SolutionsPage').catch(() => {})
    }, 8000)
    window.setTimeout(() => {
      import('@/modules/contact/pages/ContactPage').catch(() => {})
    }, 9500)
  }
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(preload, { timeout: 10000 })
  } else {
    window.setTimeout(preload, 8000)
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
      { path: ROUTES.blogs, element: <LazyRoute Component={BlogsPage} /> },
      { path: ROUTES.blogDetail, element: <LazyRoute Component={BlogDetailPage} /> },
      // Dev-only backend verification dashboard — never registered in prod.
      ...(env.isDev
        ? [{ path: ROUTES.apiCheck, element: <LazyRoute Component={ApiCheckPage} /> }]
        : []),
      { path: '*', element: <LazyRoute Component={NotFoundPage} /> },
    ],
  },
]

export const router = createBrowserRouter(routes)