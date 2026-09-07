import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { ROUTES } from './routes'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { HomePage } from '@/modules/home/pages/HomePage'
import { SolutionsPage } from '@/modules/solutions/pages/SolutionsPage'
import { HomeFinancePage } from '@/modules/home-finance/pages/HomeFinancePage'
import { BusinessFinancePage } from '@/modules/business-finance/pages/BusinessFinancePage'
import { RealEstateFinancePage } from '@/modules/real-estate-finance/pages/RealEstateFinancePage'
import { PrivateCreditPage } from '@/modules/private-credit/pages/PrivateCreditPage'
import { AboutPage } from '@/modules/about/pages/AboutPage'
import { ContactPage } from '@/modules/contact/pages/ContactPage'
import { NotFoundPage } from '@/shared/components/NotFoundPage'

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.solutions, element: <SolutionsPage /> },
      { path: '/solution', element: <Navigate to={ROUTES.solutions} replace /> },
      { path: ROUTES.homeFinance, element: <HomeFinancePage /> },
      { path: ROUTES.businessFinance, element: <BusinessFinancePage /> },
      { path: ROUTES.realEstateFinance, element: <RealEstateFinancePage /> },
      { path: ROUTES.privateCredit, element: <PrivateCreditPage /> },
      { path: ROUTES.about, element: <AboutPage /> },
      { path: '/about', element: <Navigate to={ROUTES.about} replace /> },
      { path: ROUTES.contact, element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)