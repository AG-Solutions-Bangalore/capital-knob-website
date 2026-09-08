import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('@/modules/home/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
export const SolutionsPage = lazy(() =>
  import('@/modules/solutions/pages/SolutionsPage').then((m) => ({
    default: m.SolutionsPage,
  })),
)
export const HomeFinancePage = lazy(() =>
  import('@/modules/home-finance/pages/HomeFinancePage').then((m) => ({
    default: m.HomeFinancePage,
  })),
)
export const BusinessFinancePage = lazy(() =>
  import('@/modules/business-finance/pages/BusinessFinancePage').then((m) => ({
    default: m.BusinessFinancePage,
  })),
)
export const RealEstateFinancePage = lazy(() =>
  import('@/modules/real-estate-finance/pages/RealEstateFinancePage').then(
    (m) => ({ default: m.RealEstateFinancePage }),
  ),
)
export const PrivateCreditPage = lazy(() =>
  import('@/modules/private-credit/pages/PrivateCreditPage').then((m) => ({
    default: m.PrivateCreditPage,
  })),
)
export const AboutPage = lazy(() =>
  import('@/modules/about/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
export const ContactPage = lazy(() =>
  import('@/modules/contact/pages/ContactPage').then((m) => ({
    default: m.ContactPage,
  })),
)
export const NotFoundPage = lazy(() =>
  import('@/shared/components/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  })),
)
