import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { ROUTES } from './routes'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { LazyRoute } from '@/shared/components/LazyRoute'
import {
  AboutPage,
  BlogDetailPage,
  BlogsPage,
  BusinessFinancePage,
  ContactPage,
  DisclaimerPage,
  HomePage,
  NotFoundPage,
  PrivacyPolicyPage,
  RealEstateFinancePage,
  ServiceDetailPage,
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
    // Most likely next from landing: Contact. Staggered after initial paint.
    window.setTimeout(() => {
      import('@/modules/contact/pages/ContactPage').catch(() => { })
    }, 8000)
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
      // Listing page retired — home shows all 10 live services.
      { path: ROUTES.services, element: <Navigate to={ROUTES.home} replace /> },
      { path: '/solution', element: <Navigate to={ROUTES.home} replace /> },
      { path: '/solutions', element: <Navigate to={ROUTES.home} replace /> },
      { path: ROUTES.businessFinance, element: <LazyRoute Component={BusinessFinancePage} /> },
      { path: ROUTES.realEstateFinance, element: <LazyRoute Component={RealEstateFinancePage} /> },
      { path: ROUTES.about, element: <LazyRoute Component={AboutPage} /> },
      { path: '/about', element: <Navigate to={ROUTES.about} replace /> },
      { path: ROUTES.contact, element: <LazyRoute Component={ContactPage} /> },
      { path: ROUTES.blogs, element: <LazyRoute Component={BlogsPage} /> },
      { path: ROUTES.blogDetail, element: <LazyRoute Component={BlogDetailPage} /> },
      { path: ROUTES.disclaimer, element: <LazyRoute Component={DisclaimerPage} /> },
      { path: ROUTES.privacyPolicy, element: <LazyRoute Component={PrivacyPolicyPage} /> },
      // Live service detail (`/:slug`) — last so static routes win.
      // Unknown slugs render the page's own "not found" state.
      { path: ROUTES.serviceDetail, element: <LazyRoute Component={ServiceDetailPage} /> },
      { path: '*', element: <LazyRoute Component={NotFoundPage} /> },
    ],
  },
]

export const router = createBrowserRouter(routes)