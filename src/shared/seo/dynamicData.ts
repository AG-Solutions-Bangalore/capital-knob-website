/**
 * @file src/config/dynamicData.ts
 * Build-time API fetcher and in-memory cache enabling 100% pre-rendered dynamic content.
 */

declare const process: { env: Record<string, string | undefined> } | undefined;

import { env } from '@/shared/lib/env';

// Single source of truth for the API host: the SSG pre-fetcher, the browser
// cache warmer below, AND the runtime React Query hooks (via
// `@/shared/lib/axios` → `env.apiBaseUrl`) must all hit the same base. Two
// different hosts mean the prerendered HTML and the client's first render
// disagree → React hydration #418 → full client re-render.
const API_BASE_URL =
  (typeof process !== 'undefined' && process?.env?.VITE_API_BASE_URL) ||
  env.apiBaseUrl;

interface CategoryData {
  category_slug?: string;
  category_name?: string;
  category_description?: string;
  category_meta_title?: string;
  category_meta_description?: string;
  category_meta_primary_keywords?: string;
  category_banner_image?: string;
  category_subs?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

interface BlogData {
  blog_slug?: string;
  blog_title?: string;
  blog_short_description?: string;
  blog_description?: string;
  blog_meta_title?: string;
  blog_meta_description?: string;
  blog_meta_keywords?: string;
  blog_created_date?: string;
  blog_updated_date?: string;
  blog_banner_image?: string;
  categories?: string;
  [key: string]: unknown;
}

interface BlogDetailsResponse {
  data: BlogData | null;
  image_url?: Array<Record<string, unknown>>;
  previous?: BlogData | null;
  next?: BlogData | null;
  featured?: BlogData[];
  faq?: Array<{ faq_que?: string; faq_ans?: string }>;
}

export interface FaqItemData {
  faq_que?: string | null;
  faq_ans?: string | null;
  faq_question?: string | null;
  faq_answer?: string | null;
  faq_sort?: string | number | null;
  faq_heading?: string | null;
  [key: string]: unknown;
}

export interface TestimonialItemData {
  testimonial_client_name?: string | null;
  testimonial_description?: string | null;
  testimonial_created_date?: string | null;
  testimonial_rating?: string | number | null;
  testimonial_for?: string | null;
  [key: string]: unknown;
}

/**
 * A testimonial row counts as usable when it has a real client name and a
 * non-empty description straight from `GET /getTestimonial/{slug}`.
 * No minimum length is enforced — even short API rows (e.g. "demo") are
 * rendered as-is so the homepage always mirrors the backend 1:1.
 */
export function isUsableTestimonial(t: TestimonialItemData): boolean {
  const name = (t.testimonial_client_name || '').trim();
  const body = (t.testimonial_description || '').replace(/<[^>]*>?/gm, '').trim();
  return name.length > 0 && body.length > 0;
}

/**
 * Returns ONLY real API testimonials (filtered for empty name/body).
 * No mocks, no fallback — when the API returns zero usable rows the
 * homepage marquee and JSON-LD schema both render nothing.
 * Keeps visible reviews identical to schema reviewBody — required by Google.
 */
export function resolveEffectiveTestimonials(rows: TestimonialItemData[]): TestimonialItemData[] {
  return (rows || []).filter(isUsableTestimonial);
}

/** Build-time (SSG) version reading the pre-fetched home cache. */
export function getEffectiveHomeTestimonials(): TestimonialItemData[] {
  return resolveEffectiveTestimonials(homeTestimonials);
}

const dynamicCategoriesMap = new Map<string, { category: CategoryData; raw: unknown }>();
const dynamicBlogsMap = new Map<string, BlogDetailsResponse>();
let rawCategoriesResponse: unknown = null;
let rawBlogsResponse: unknown = null;
let rawFrontBlogsResponse: unknown = null;
let rawHomeFaqResponse: unknown = null;
let rawHomeTestimonialsResponse: unknown = null;
let rawClientsResponse: unknown = null;
let rawCompanyResponse: unknown = null;

let homeFaqs: FaqItemData[] = [];
let homeTestimonials: TestimonialItemData[] = [];
let frontBlogs: BlogData[] = [];
const testimonialsBySlug = new Map<string, TestimonialItemData[]>();
const faqsBySlug = new Map<string, FaqItemData[]>();
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

/**
 * Version counter bumped every time the dynamic cache finishes loading.
 * Pair with `subscribeDynamicData` via React's `useSyncExternalStore` so
 * client-side SEO (`PageSEO`) re-renders once the browser cache warms —
 * the SSG-only maps are empty on first SPA paint, which previously made
 * every dynamic service/blog resolve to the 404 fallback in `<head>`
 * while the UI rendered live content fine.
 */
let dynamicDataVersion = 0;
const dynamicDataListeners = new Set<() => void>();

function notifyDynamicDataListeners() {
  dynamicDataVersion += 1;
  dynamicDataListeners.forEach((listener) => listener());
}

export function subscribeDynamicData(listener: () => void): () => void {
  dynamicDataListeners.add(listener);
  return () => {
    dynamicDataListeners.delete(listener);
  };
}

export function getDynamicDataVersion(): number {
  return dynamicDataVersion;
}

/**
 * Browser-safe cache warmer. Idempotent — shares the same loaded/loading
 * guard as the SSG pre-fetcher, so calling it on app boot is a no-op
 * when `loadDynamicData()` already ran.
 */
export function ensureDynamicData(): Promise<void> {
  return loadDynamicData();
}

export async function loadDynamicData(): Promise<void> {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const isServer = typeof window === 'undefined';
      if (isServer) {
        console.log('🔄 [SSG] Pre-fetching dynamic data from CapitalKnob API...');
      }

      // 1. Fetch categories, blogs, and front blogs (needed for metadata maps)
      const [categoriesRes, blogsRes, frontBlogsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/getCategory`, { signal: AbortSignal.timeout(15000) })
          .then((r) => r.json())
          .catch((err) => {
            if (isServer) console.warn('⚠️ [SSG] Failed to fetch /getCategory:', err.message);
            return { data: [] };
          }),
        fetch(`${API_BASE_URL}/getBlogs`, { signal: AbortSignal.timeout(15000) })
          .then((r) => r.json())
          .catch((err) => {
            if (isServer) console.warn('⚠️ [SSG] Failed to fetch /getBlogs:', err.message);
            return { data: [] };
          }),
        fetch(`${API_BASE_URL}/getFrontBlogs`, { signal: AbortSignal.timeout(15000) })
          .then((r) => r.json())
          .catch((err) => {
            if (isServer) console.warn('⚠️ [SSG] Failed to fetch /getFrontBlogs:', err.message);
            return { data: [] };
          }),
      ]);

      rawCategoriesResponse = categoriesRes;
      rawBlogsResponse = blogsRes;
      rawFrontBlogsResponse = frontBlogsRes;
      frontBlogs = Array.isArray(frontBlogsRes?.data) ? frontBlogsRes.data : [];

      const catList: CategoryData[] = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
      for (const cat of catList) {
        if (cat.category_slug) {
          dynamicCategoriesMap.set(cat.category_slug.trim(), {
            category: cat,
            raw: categoriesRes,
          });
        }
      }

      // 2. Server-only SSG pre-hydration (home & category FAQs / testimonials,
      // clients marquee, company profile). In the browser, each page component
      // fetches its own slug on demand via React Query.
      if (isServer) {
        const [homeFaqRes, homeTestimonialsRes, clientsRes, companyRes] = await Promise.all([
          fetch(`${API_BASE_URL}/getFAQBySlug/home`, { signal: AbortSignal.timeout(15000) })
            .then((r) => r.json())
            .catch((err) => {
              console.warn('⚠️ [SSG] Failed to fetch /getFAQBySlug/home:', err.message);
              return { data: [] };
            }),
          fetch(`${API_BASE_URL}/getTestimonial/home`, { signal: AbortSignal.timeout(15000) })
            .then((r) => r.json())
            .catch((err) => {
              console.warn('⚠️ [SSG] Failed to fetch /getTestimonial/home:', err.message);
              return { data: [] };
            }),
          fetch(`${API_BASE_URL}/getClient`, { signal: AbortSignal.timeout(15000) })
            .then((r) => r.json())
            .catch((err) => {
              console.warn('⚠️ [SSG] Failed to fetch /getClient:', err.message);
              return { data: [] };
            }),
          fetch(`${API_BASE_URL}/getCompany`, { signal: AbortSignal.timeout(15000) })
            .then((r) => r.json())
            .catch((err) => {
              console.warn('⚠️ [SSG] Failed to fetch /getCompany:', err.message);
              return { data: null };
            }),
        ]);

        rawHomeFaqResponse = homeFaqRes;
        rawHomeTestimonialsResponse = homeTestimonialsRes;
        rawClientsResponse = clientsRes;
        rawCompanyResponse = companyRes;
        homeFaqs = Array.isArray(homeFaqRes?.data) ? homeFaqRes.data : [];
        homeTestimonials = Array.isArray(homeTestimonialsRes?.data) ? homeTestimonialsRes.data : [];
        testimonialsBySlug.set('home', homeTestimonials);
        faqsBySlug.set('home', homeFaqs);

        // Fetch category testimonials and FAQs in parallel
        await Promise.all(
          catList.map(async (cat) => {
            if (!cat.category_slug) return;
            const slug = cat.category_slug.trim();
            try {
              const [tRes, fRes] = await Promise.all([
                fetch(`${API_BASE_URL}/getTestimonial/${encodeURIComponent(slug)}`, {
                  signal: AbortSignal.timeout(10000),
                })
                  .then((r) => r.json())
                  .catch(() => null),
                fetch(`${API_BASE_URL}/getFAQBySlug/${encodeURIComponent(slug)}`, {
                  signal: AbortSignal.timeout(10000),
                })
                  .then((r) => r.json())
                  .catch(() => null),
              ]);
              if (Array.isArray(tRes?.data) && tRes.data.length > 0) {
                testimonialsBySlug.set(slug, tRes.data);
              }
              if (Array.isArray(fRes?.data) && fRes.data.length > 0) {
                faqsBySlug.set(slug, fRes.data);
              }
            } catch {
              // Ignore polite failures
            }
          }),
        );

        const blogList: BlogData[] = Array.isArray(blogsRes?.data) ? blogsRes.data : [];

        // 3. Fetch full blog details in polite batches
        const batchSize = 10;
        for (let i = 0; i < blogList.length; i += batchSize) {
          const batch = blogList.slice(i, i + batchSize);
          await Promise.all(
            batch.map(async (b) => {
              if (!b.blog_slug) return;
              try {
                const res = await fetch(`${API_BASE_URL}/getBlogsBySlug/${encodeURIComponent(b.blog_slug)}`, {
                  signal: AbortSignal.timeout(10000),
                }).then((r) => r.json());
                dynamicBlogsMap.set(b.blog_slug, res || { data: b });
              } catch {
                dynamicBlogsMap.set(b.blog_slug, { data: b });
              }
            }),
          );
        }
      }

      isLoaded = true;
      notifyDynamicDataListeners();
      console.log(
        `✅ [SSG] Loaded ${dynamicCategoriesMap.size} categories, ${dynamicBlogsMap.size} blogs, and API testimonials/FAQs.`,
      );
    } catch (err) {
      console.error('❌ [SSG] Error loading dynamic data:', err);
      isLoaded = true;
      notifyDynamicDataListeners();
    }
  })();

  return loadPromise;
}

export function getCachedCategoriesResponse() {
  return rawCategoriesResponse;
}

export function getCachedBlogsResponse() {
  return rawBlogsResponse;
}

export function getCachedFrontBlogsResponse() {
  return rawFrontBlogsResponse;
}

export function getCachedHomeFaqResponse() {
  return rawHomeFaqResponse;
}

export function getCachedHomeTestimonialsResponse() {
  return rawHomeTestimonialsResponse;
}

export function getCachedClientsResponse() {
  return rawClientsResponse;
}

export function getCachedCompanyResponse() {
  return rawCompanyResponse;
}

export function getHomeFaqs(): FaqItemData[] {
  return homeFaqs;
}

export function getHomeTestimonials(): TestimonialItemData[] {
  return homeTestimonials;
}

export function getTestimonialsForSlug(slug: string): TestimonialItemData[] {
  return testimonialsBySlug.get(slug) || [];
}

export function getFaqsForSlug(slug: string): FaqItemData[] {
  return faqsBySlug.get(slug) || [];
}

export function getFrontBlogs(): BlogData[] {
  return frontBlogs;
}

export function getDynamicCategory(slug: string) {
  return dynamicCategoriesMap.get(slug);
}

export function getAllCategories() {
  return Array.from(dynamicCategoriesMap.values()).map((v) => v.category);
}

export function getDynamicBlog(slug: string): BlogDetailsResponse | undefined {
  return dynamicBlogsMap.get(slug);
}

export function getAllDynamicRouteUrls(): string[] {
  const urls: string[] = [];
  for (const slug of dynamicCategoriesMap.keys()) {
    urls.push(`/${slug}`);
  }
  for (const slug of dynamicBlogsMap.keys()) {
    urls.push(`/blogs/${slug}`);
  }
  return urls;
}
