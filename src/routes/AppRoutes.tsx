import React, { Suspense, useEffect, useSyncExternalStore } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/shared/layouts/MainLayout';
import SEOPageLayout from '@/components/SEOPageLayout';
import { LoadingFallback } from '@/shared/components/LoadingFallback';
import { RouteErrorBoundary } from '@/shared/components/RouteErrorBoundary';
import { getSeoForRoute } from '@/shared/seo/seoEngine';
import {
  ensureDynamicData,
  getDynamicDataVersion,
  subscribeDynamicData,
} from '@/shared/seo/dynamicData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from '@/modules/home/pages/HomePage';
import {
  AboutPage,
  BlogDetailPage,
  BlogsPage,
  BusinessFinancePage,
  ContactPage,
  DisclaimerPage,
  NotFoundPage,
  PrivacyPolicyPage,
  RealEstateFinancePage,
  ServiceDetailPage,
} from '@/app/lazyRoutes';

// Idle route-preloading: only the 1–2 most likely next routes, staggered,
// delayed 3.5s+, skipped on Save-Data / 2g/slow-2g. Never 5 at once.
if (typeof window !== 'undefined') {
  const preloadRoutes = () => {
    try {
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      };
      const conn = nav.connection;
      if (conn?.saveData) return;
      const et = conn?.effectiveType;
      if (et === 'slow-2g' || et === '2g') return;
    } catch {
      return;
    }
    // Most likely next from landing: Contact, then About — staggered.
    window.setTimeout(() => {
      import('@/modules/contact/pages/ContactPage').catch(() => {});
    }, 4000);
    window.setTimeout(() => {
      import('@/modules/about/pages/AboutPage').catch(() => {});
    }, 5500);
  };
  const schedulePreload = () => {
    window.setTimeout(preloadRoutes, 3500);
  };
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(schedulePreload, { timeout: 10000 });
  } else {
    window.setTimeout(preloadRoutes, 5000);
  }
}

/**
 * Forces the address-bar URL to always equal the canonical URL.
 * Canonicals are slash-free (`/about-us`, never `/about-us/`), but static
 * hosting serves both variants — without this, the trailing-slash variant
 * shows a URL ≠ canonical and SEO tools flag the page "Canonicalised".
 */
function TrailingSlashNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const { pathname, search, hash } = location;
    if (pathname.length > 1 && pathname.endsWith('/')) {
      navigate(`${pathname.slice(0, -1)}${search}${hash}`, { replace: true });
    }
  }, [location, navigate]);
  return null;
}

function PageSEO({ path, children, suspense = true }: { path?: string; children: React.ReactNode; suspense?: boolean }) {
  const location = useLocation();
  useSyncExternalStore(subscribeDynamicData, getDynamicDataVersion, getDynamicDataVersion);
  useEffect(() => {
    ensureDynamicData().catch(() => {});
  }, []);
  const currentPath = path || location.pathname;
  const seo = getSeoForRoute(currentPath);
  return (
    <SEOPageLayout seo={seo} structuredSchemas={seo.schemas}>
      {suspense ? (
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </RouteErrorBoundary>
      ) : (
        <RouteErrorBoundary>{children}</RouteErrorBoundary>
      )}
    </SEOPageLayout>
  );
}

export default function AppRoutes({
  queryClient: initialQueryClient,
}: {
  queryClient?: QueryClient;
} = {}) {
  const routesContent = (
    <>
      <TrailingSlashNormalizer />
      <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PageSEO path="/" suspense={false}>
              <HomePage />
            </PageSEO>
          }
        />
        <Route
          path="/about-us"
          element={
            <PageSEO path="/about-us">
              <AboutPage />
            </PageSEO>
          }
        />
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route
          path="/contact"
          element={
            <PageSEO path="/contact">
              <ContactPage />
            </PageSEO>
          }
        />
        <Route
          path="/blogs"
          element={
            <PageSEO path="/blogs">
              <BlogsPage />
            </PageSEO>
          }
        />
        <Route
          path="/blogs/:slug"
          element={
            <PageSEO>
              <BlogDetailPage />
            </PageSEO>
          }
        />
        <Route path="/services" element={<Navigate to="/" replace />} />
        <Route path="/solution" element={<Navigate to="/" replace />} />
        <Route path="/solutions" element={<Navigate to="/" replace />} />
        <Route
          path="/home-finance"
          element={
            <PageSEO path="/home-finance">
              <ServiceDetailPage categorySlug="home-finance" />
            </PageSEO>
          }
        />
        <Route
          path="/business-finance"
          element={
            <PageSEO path="/business-finance">
              <BusinessFinancePage />
            </PageSEO>
          }
        />
        <Route
          path="/real-estate-finance"
          element={
            <PageSEO path="/real-estate-finance">
              <RealEstateFinancePage />
            </PageSEO>
          }
        />
        <Route
          path="/private-credit"
          element={
            <PageSEO path="/private-credit">
              <ServiceDetailPage categorySlug="private-credit" />
            </PageSEO>
          }
        />
        <Route
          path="/disclaimer"
          element={
            <PageSEO path="/disclaimer">
              <DisclaimerPage />
            </PageSEO>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageSEO path="/privacy-policy">
              <PrivacyPolicyPage />
            </PageSEO>
          }
        />
        <Route
          path="/:slug"
          element={
            <PageSEO>
              <ServiceDetailPage />
            </PageSEO>
          }
        />
        <Route
          path="*"
          element={
            <PageSEO>
              <NotFoundPage />
            </PageSEO>
          }
        />
      </Route>
    </Routes>
    </>
  );

  if (initialQueryClient) {
    return <QueryClientProvider client={initialQueryClient}>{routesContent}</QueryClientProvider>;
  }

  return routesContent;
}
