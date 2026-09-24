/**
 * @file src/routes/AppRoutes.tsx
 * Decoupled route table wrapped in PageSEO for bulletproof metadata and SSR pre-rendering.
 */
import React, { Suspense, useEffect, useSyncExternalStore } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '@/shared/layouts/MainLayout';
import SEOPageLayout from '@/components/SEOPageLayout';
import { getSeoForRoute } from '@/shared/seo/seoEngine';
import {
  ensureDynamicData,
  getDynamicDataVersion,
  subscribeDynamicData,
} from '@/shared/seo/dynamicData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AboutPage,
  BlogDetailPage,
  BlogsPage,
  BusinessFinancePage,
  ContactPage,
  HomePage,
  NotFoundPage,
  RealEstateFinancePage,
  ServiceDetailPage,
} from '@/app/lazyRoutes';

function PageSEO({ path, children }: { path?: string; children: React.ReactNode }) {
  const location = useLocation();
  // The SSG category/blog maps are empty on first SPA paint. Warm them once
  // and re-render when ready so dynamic routes upgrade from generic SEO to
  // full API-driven meta + schemas instead of sticking on cold-cache output.
  // Third arg = server snapshot (required by React during SSG prerendering).
  useSyncExternalStore(subscribeDynamicData, getDynamicDataVersion, getDynamicDataVersion);
  useEffect(() => {
    ensureDynamicData().catch(() => {
      // Warmer never rejects (errors are swallowed internally) — belt & braces.
    });
  }, []);
  const currentPath = path || location.pathname;
  const seo = getSeoForRoute(currentPath);
  return (
    <SEOPageLayout seo={seo} structuredSchemas={seo.schemas}>
      <Suspense fallback={null}>{children}</Suspense>
    </SEOPageLayout>
  );
}

export default function AppRoutes({
  queryClient: initialQueryClient,
}: {
  queryClient?: QueryClient;
} = {}) {
  const routesContent = (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PageSEO path="/">
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
  );

  if (initialQueryClient) {
    return <QueryClientProvider client={initialQueryClient}>{routesContent}</QueryClientProvider>;
  }

  return routesContent;
}
