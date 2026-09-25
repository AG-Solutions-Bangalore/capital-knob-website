/**
 * @file src/prerender.tsx
 * Static site generator worker using Web Standard renderToReadableStream with React Query pre-hydration.
 */
import React from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getCanonicalUrl, SITE_LOGO, SITE_NAME } from '@/shared/seo/site';
import { getSeoForRoute, ROUTE_SEO } from '@/shared/seo/seoEngine';
import { createCompositeGraph } from '@/shared/seo/schemaExamples';
import {
  getAllDynamicRouteUrls,
  getCachedBlogsResponse,
  getCachedCategoriesResponse,
  getCachedClientsResponse,
  getCachedCompanyResponse,
  getCachedFrontBlogsResponse,
  getCachedHomeFaqResponse,
  getCachedHomeTestimonialsResponse,
  getDynamicBlog,
  loadDynamicData,
} from '@/shared/seo/dynamicData';

async function renderToStringAsync(element: React.ReactNode): Promise<string> {
  const { renderToReadableStream } = await import('react-dom/server');
  const stream = await renderToReadableStream(element, {
    onError(err) {
      console.warn('⚠️ [SSG SSR warning]:', err);
    },
  });
  // Await stream.allReady to guarantee all React.lazy chunks and Suspense boundaries resolve
  await stream.allReady;
  return await new Response(stream).text();
}

export async function prerender(data: { url: string }) {
  await loadDynamicData();
  const url = data.url || '/';
  const cleanPath = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  const seo = getSeoForRoute(url);
  const canonical = getCanonicalUrl(seo.canonicalPath);

  // Setup SSR QueryClient with pre-cached dynamic state so pages emit full HTML instead of skeletons
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  // Seed ONLY non-empty responses. An empty cache entry would serialize into
  // the HTML and pin the client to the empty state (fresh timestamp → no
  // refetch); leaving the key absent lets the client fetch normally, and its
  // pending UI matches the SSR pending UI → clean hydration either way.
  const hasRows = (res: unknown): res is { data: unknown[] } =>
    !!res &&
    typeof res === 'object' &&
    Array.isArray((res as { data?: unknown }).data) &&
    (res as { data: unknown[] }).data.length > 0;
  const hasDatum = (res: unknown): res is { data: Record<string, unknown> } =>
    !!res &&
    typeof res === 'object' &&
    (res as { data?: unknown }).data !== null &&
    typeof (res as { data?: unknown }).data === 'object' &&
    Object.keys((res as { data: Record<string, unknown> }).data).length > 0;

  // Pre-hydrate categories
  const categoriesRes = getCachedCategoriesResponse();
  if (hasRows(categoriesRes)) {
    queryClient.setQueryData(['website', 'categories'], categoriesRes);
  }

  // Pre-hydrate blogs list only on /blogs routes
  const blogsRes = getCachedBlogsResponse();
  if (hasRows(blogsRes) && (cleanPath === '/blogs' || cleanPath.startsWith('/blogs/'))) {
    queryClient.setQueryData(['website', 'blogs', 'list'], blogsRes);
  }

  const frontBlogsRes = getCachedFrontBlogsResponse();
  if (hasRows(frontBlogsRes)) {
    queryClient.setQueryData(['website', 'blogs', 'front'], frontBlogsRes);
  }

  // Pre-hydrate home FAQs
  const homeFaqRes = getCachedHomeFaqResponse();
  if (hasRows(homeFaqRes)) {
    queryClient.setQueryData(['website', 'faq', 'home'], homeFaqRes);
  }

  // Pre-hydrate home testimonials
  const homeTestimonialsRes = getCachedHomeTestimonialsResponse();
  if (hasRows(homeTestimonialsRes)) {
    queryClient.setQueryData(['website', 'testimonials', 'home'], homeTestimonialsRes);
  }

  // Pre-hydrate clients marquee + company profile (Footer / partners strip
  // render these on first paint — without cache entries they mismatch SSR).
  const clientsRes = getCachedClientsResponse();
  if (hasRows(clientsRes)) {
    queryClient.setQueryData(['website', 'clients'], clientsRes);
  }
  const companyRes = getCachedCompanyResponse();
  if (hasDatum(companyRes)) {
    queryClient.setQueryData(['website', 'company'], companyRes);
  }

  // Pre-hydrate single blog if matching /blogs/:slug
  const blogMatch = cleanPath.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const blogData = getDynamicBlog(slug);
    if (blogData) {
      queryClient.setQueryData(['website', 'blogs', 'slug', slug], blogData);
    }
  }

  const [{ StaticRouter }, { HelmetProvider }] = await Promise.all([
    import('react-router'),
    import('react-helmet-async'),
  ]);
  const { default: AppRoutes } = await import('@/routes/AppRoutes');

  const rawHtml = await renderToStringAsync(
    React.createElement(
      HelmetProvider,
      {},
      React.createElement(
        StaticRouter,
        { location: url },
        React.createElement(AppRoutes as React.ComponentType<{ queryClient?: QueryClient }>, { queryClient }),
      ),
    ),
  );

  // Strip raw SSR artifacts from body
  const html = rawHtml
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<link[^>]*>/gi, '');

  // Every tag carries data-rh="true" so react-helmet-async adopts (not
  // duplicates) them on hydration — without it, SPA navigation appends a
  // second description/canonical set and crawlers/tools read the stale copy.
  //
  // The dehydrated React Query cache travels the same way: the client
  // hydrates its QueryClient from `#react-query-state` BEFORE hydrateRoot,
  // so first render reuses SSR data instead of flashing pending UI — and,
  // critically, produces DOM identical to the SSR HTML (no hydration #418).
  // `<` is unicode-escaped so inline HTML in blog/testimonial bodies can
  // never break out of the script element.
  const dehydratedState = JSON.stringify(dehydrate(queryClient)).replace(
    /</g,
    '\\u003c',
  );
  const elements = new Set<Record<string, unknown>>([
    { type: 'script', props: { id: 'react-query-state', type: 'application/json', 'data-rh': 'true' }, children: dehydratedState },
    { type: 'meta', props: { name: 'description', content: seo.description, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'author', content: SITE_NAME, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'publisher', content: SITE_NAME, 'data-rh': 'true' } },
    { type: 'link', props: { rel: 'canonical', href: canonical, 'data-rh': 'true' } },
    {
      type: 'meta',
      props: {
        name: 'robots',
        content: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
        'data-rh': 'true',
      },
    },
    { type: 'meta', props: { property: 'og:title', content: seo.title, 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:description', content: seo.description, 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:url', content: canonical, 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:type', content: 'website', 'data-rh': 'true' } },
    { type: 'meta', props: { property: 'og:image', content: SITE_LOGO, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image', 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:title', content: seo.title, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:description', content: seo.description, 'data-rh': 'true' } },
    { type: 'meta', props: { name: 'twitter:image', content: SITE_LOGO, 'data-rh': 'true' } },
  ]);

  if (seo.keywords) {
    elements.add({
      type: 'meta',
      props: { name: 'keywords', content: seo.keywords, 'data-rh': 'true' },
    });
  }

  if (seo.schemas.length > 0) {
    elements.add({
      type: 'script',
      props: { type: 'application/ld+json', id: 'schema-jsonld', 'data-rh': 'true' },
      children: JSON.stringify(createCompositeGraph(seo.schemas)),
    });
  }

  const { parseLinks } = await import('vite-prerender-plugin/parse');
  const dynamicUrls = getAllDynamicRouteUrls();

  return {
    html,
    head: { lang: 'en', title: seo.title, elements },
    links: new Set<string>(['/', ...Object.keys(ROUTE_SEO), ...dynamicUrls, ...parseLinks(html)]),
    data: { url },
  };
}
