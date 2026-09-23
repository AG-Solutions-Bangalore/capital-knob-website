/**
 * @file src/config/dynamicData.ts
 * Build-time API fetcher and in-memory cache enabling 100% pre-rendered dynamic content.
 */

declare const process: { env: Record<string, string | undefined> } | undefined;

const API_BASE_URL =
  (typeof process !== 'undefined' && process?.env?.VITE_API_BASE_URL) ||
  'https://agsdemo.in/ckapi/public/api';

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
 * TEMPORARY MOCK TESTIMONIALS — remove once real rows land in the backend
 * testimonial table. Used ONLY when the API returns zero usable rows (see
 * getEffectiveHomeTestimonials): the moment at least one real testimonial
 * with a proper story exists, these mocks disappear automatically from both
 * the visible marquee and the JSON-LD schema.
 */
export const MOCK_HOME_TESTIMONIALS: TestimonialItemData[] = [
  {
    testimonial_client_name: 'Rohan Mehta',
    testimonial_description:
      'CapitalKnob helped me transfer my home loan and reduce my EMI by almost eighteen percent. The team handled all the paperwork and coordination with the bank in under three weeks.',
    testimonial_created_date: '2026-08-02',
    testimonial_rating: '5',
    testimonial_for: 'home',
  },
  {
    testimonial_client_name: 'Priya Sharma',
    testimonial_description:
      'As a boutique owner I needed working capital before the festive season. CapitalKnob structured a flexible credit line around my cash flow and disbursed in days, not months.',
    testimonial_created_date: '2026-07-18',
    testimonial_rating: '5',
    testimonial_for: 'home',
  },
  {
    testimonial_client_name: 'Anil Verma',
    testimonial_description:
      'I raised funds against my commercial property for expansion. Transparent charges, no hidden fees, and a relationship manager who actually picked up the phone every time.',
    testimonial_created_date: '2026-06-29',
    testimonial_rating: '4',
    testimonial_for: 'home',
  },
  {
    testimonial_client_name: 'Sneha Iyer',
    testimonial_description:
      'From application to top-up disbursal for our home renovation, everything was digital and tracked. The advisory team explained every clause patiently before we signed.',
    testimonial_created_date: '2026-09-05',
    testimonial_rating: '5',
    testimonial_for: 'home',
  },
];

/** Minimum cleaned body length for a testimonial to count as genuine content. */
const MIN_USABLE_REVIEW_BODY_LENGTH = 20;

export function isUsableTestimonial(t: TestimonialItemData): boolean {
  const name = (t.testimonial_client_name || '').trim();
  const body = (t.testimonial_description || '').replace(/<[^>]*>?/gm, '').trim();
  return name.length > 0 && body.length >= MIN_USABLE_REVIEW_BODY_LENGTH;
}

/**
 * Returns usable API testimonials when at least one genuine row exists,
 * otherwise the temporary mocks (which vanish automatically once real
 * backend data arrives). Keeps schema and visible marquee in sync.
 */
export function resolveEffectiveTestimonials(rows: TestimonialItemData[]): TestimonialItemData[] {
  const usable = (rows || []).filter(isUsableTestimonial);
  return usable.length > 0 ? usable : MOCK_HOME_TESTIMONIALS;
}

/** Build-time (SSG) version reading the pre-fetched home cache. */
export function getEffectiveHomeTestimonials(): TestimonialItemData[] {
  return resolveEffectiveTestimonials(homeTestimonials);
}

let dynamicCategoriesMap = new Map<string, { category: CategoryData; raw: unknown }>();
let dynamicBlogsMap = new Map<string, BlogDetailsResponse>();
let rawCategoriesResponse: unknown = null;
let rawBlogsResponse: unknown = null;
let rawFrontBlogsResponse: unknown = null;
let rawHomeFaqResponse: unknown = null;
let rawHomeTestimonialsResponse: unknown = null;

let homeFaqs: FaqItemData[] = [];
let homeTestimonials: TestimonialItemData[] = [];
let frontBlogs: BlogData[] = [];
let testimonialsBySlug = new Map<string, TestimonialItemData[]>();
let faqsBySlug = new Map<string, FaqItemData[]>();
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export async function loadDynamicData(): Promise<void> {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      console.log('🔄 [SSG] Pre-fetching dynamic data from CapitalKnob API...');

      // 1. Fetch categories, blogs, front blogs, home FAQs, and home testimonials in parallel
      const [categoriesRes, blogsRes, frontBlogsRes, homeFaqRes, homeTestimonialsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/getCategory`, { signal: AbortSignal.timeout(15000) })
          .then((r) => r.json())
          .catch((err) => {
            console.warn('⚠️ [SSG] Failed to fetch /getCategory:', err.message);
            return { data: [] };
          }),
        fetch(`${API_BASE_URL}/getBlogs`, { signal: AbortSignal.timeout(15000) })
          .then((r) => r.json())
          .catch((err) => {
            console.warn('⚠️ [SSG] Failed to fetch /getBlogs:', err.message);
            return { data: [] };
          }),
        fetch(`${API_BASE_URL}/getFrontBlogs`, { signal: AbortSignal.timeout(15000) })
          .then((r) => r.json())
          .catch((err) => {
            console.warn('⚠️ [SSG] Failed to fetch /getFrontBlogs:', err.message);
            return { data: [] };
          }),
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
      ]);

      rawCategoriesResponse = categoriesRes;
      rawBlogsResponse = blogsRes;
      rawFrontBlogsResponse = frontBlogsRes;
      rawHomeFaqResponse = homeFaqRes;
      rawHomeTestimonialsResponse = homeTestimonialsRes;

      homeFaqs = Array.isArray(homeFaqRes?.data) ? homeFaqRes.data : [];
      homeTestimonials = Array.isArray(homeTestimonialsRes?.data) ? homeTestimonialsRes.data : [];
      frontBlogs = Array.isArray(frontBlogsRes?.data) ? frontBlogsRes.data : [];

      testimonialsBySlug.set('home', homeTestimonials);
      faqsBySlug.set('home', homeFaqs);

      const catList: CategoryData[] = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
      for (const cat of catList) {
        if (cat.category_slug) {
          dynamicCategoriesMap.set(cat.category_slug.trim(), {
            category: cat,
            raw: categoriesRes,
          });
        }
      }

      // 2. Fetch category testimonials and FAQs in parallel
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

      isLoaded = true;
      console.log(
        `✅ [SSG] Loaded ${dynamicCategoriesMap.size} categories, ${dynamicBlogsMap.size} blogs, and API testimonials/FAQs.`,
      );
    } catch (err) {
      console.error('❌ [SSG] Error loading dynamic data:', err);
      isLoaded = true;
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
