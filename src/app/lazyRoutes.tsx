import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('@/modules/home/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
export const ServiceDetailPage = lazy(() =>
  import('@/modules/service/pages/ServiceDetailPage').then((m) => ({
    default: m.ServiceDetailPage,
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
export const AboutPage = lazy(() =>
  import('@/modules/about/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
export const ContactPage = lazy(() =>
  import('@/modules/contact/pages/ContactPage').then((m) => ({
    default: m.ContactPage,
  })),
)
export const BlogsPage = lazy(() =>
  import('@/modules/blogs/pages/BlogsPage').then((m) => ({
    default: m.BlogsPage,
  })),
)
export const BlogDetailPage = lazy(() =>
  import('@/modules/blogs/pages/BlogDetailPage').then((m) => ({
    default: m.BlogDetailPage,
  })),
)
export const NotFoundPage = lazy(() =>
  import('@/shared/components/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  })),
)
export const DisclaimerPage = lazy(() =>
  import('@/modules/disclaimer/pages/DisclaimerPage').then((m) => ({
    default: m.DisclaimerPage,
  })),
)
export const PrivacyPolicyPage = lazy(() =>
  import('@/modules/privacy/pages/PrivacyPolicyPage').then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
)
