/**
 * @file src/config/seoEngine.ts
 * Master SEO dictionary and dynamic route parameter resolver.
 */
import type { Thing } from 'schema-dts';
import { SITE_NAME } from './site';
import {
  createBlogPostingSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createOrganizationWithReviews,
  createServiceSchema,
  createTestimonialReviewSchema,
  createWebPageSchema,
  organizationSchema,
  websiteSchema,
} from './schemaExamples';
import {
  getDynamicBlog,
  getDynamicCategory,
  getEffectiveHomeTestimonials,
  getFaqsForSlug,
  getFrontBlogs,
  getHomeFaqs,
  getTestimonialsForSlug,
} from './dynamicData';

export interface RouteSeoEntry {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  noIndex?: boolean;
  schemas: Thing[];
}

export const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  '/': {
    title: 'CapitalKnob – Unlock Your Capital Potential',
    description:
      'CapitalKnob helps businesses unlock their capital potential with smart financial services, funding support, and strategic capital guidance.',
    keywords: 'financial services, funding, capital guidance',
    canonicalPath: '/',
    schemas: [
      organizationSchema,
      websiteSchema,
      createWebPageSchema(
        '/',
        'CapitalKnob – Unlock Your Capital Potential',
        'CapitalKnob helps businesses unlock their capital potential with smart financial services, funding support, and strategic capital guidance.',
      ),
      createBreadcrumbSchema([{ name: 'Home', path: '/' }], '/'),
    ],
  },
  '/about-us': {
    title: 'About CapitalKnob – Smarter Capital Services in India',
    description:
      'Learn about CapitalKnob and our approach to providing smart, flexible capital and financing services for businesses, property and investment needs.',
    keywords: 'about CapitalKnob, capital advisory team',
    canonicalPath: '/about-us',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/about-us',
        'About CapitalKnob – Smarter Capital Services in India',
        'Learn about CapitalKnob and our approach to providing smart, flexible capital and financing services for businesses, property and investment needs.',
      ),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about-us' },
        ],
        '/about-us',
      ),
    ],
  },
  '/contact': {
    title: 'Contact CapitalKnob – Get in Touch for Finance Services',
    description:
      'Contact CapitalKnob for business finance, home loans, real estate finance and private credit services. Get in touch with our team today.',
    keywords: 'contact CapitalKnob, finance inquiry',
    canonicalPath: '/contact',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/contact',
        'Contact CapitalKnob – Get in Touch for Finance Services',
        'Contact CapitalKnob for business finance, home loans, real estate finance and private credit services. Get in touch with our team today.',
      ),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ],
        '/contact',
      ),
    ],
  },
  '/blogs': {
    title: 'Financial Insights & Financing Guides | CapitalKnob',
    description:
      'Explore CapitalKnob financing guides, real estate finance insights, business loans, private credit and market perspectives.',
    keywords: 'finance blogs, capital market insights',
    canonicalPath: '/blogs',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/blogs',
        'Financial Insights & Financing Guides | CapitalKnob',
        'Explore CapitalKnob financing guides, real estate finance insights, business loans, private credit and market perspectives.',
      ),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
        ],
        '/blogs',
      ),
    ],
  },
  '/home-finance': {
    title: 'Home Finance Services in Bangalore | CapitalKnob',
    description:
      'Home finance solutions in Bangalore for home purchase, construction, balance transfer, top-up loans and property-backed funding.',
    keywords: 'home loans, balance transfer, property loans, home finance',
    canonicalPath: '/home-finance',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/home-finance',
        'Home Finance Services in Bangalore | CapitalKnob',
        'Home finance solutions in Bangalore for home purchase, construction, balance transfer, top-up loans and property-backed funding.',
      ),
      createServiceSchema({
        name: 'Home Finance Services',
        description:
          'Home finance solutions in Bangalore for home purchase, construction, balance transfer, top-up loans and property-backed funding.',
        path: '/home-finance',
      }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Home Finance', path: '/home-finance' },
        ],
        '/home-finance',
      ),
    ],
  },
  '/business-finance': {
    title: 'Business Finance Services in India | CapitalKnob',
    description:
      'Explore flexible business finance services from CapitalKnob, designed to help businesses access funding for growth, expansion, working capital and more.',
    keywords: 'business loans, working capital, expansion finance',
    canonicalPath: '/business-finance',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/business-finance',
        'Business Finance Services in India | CapitalKnob',
        'Explore flexible business finance services from CapitalKnob, designed to help businesses access funding for growth, expansion, working capital and more.',
      ),
      createServiceSchema({
        name: 'Business Finance Services',
        description:
          'Explore flexible business finance services from CapitalKnob, designed to help businesses access funding for growth, expansion, working capital and more.',
        path: '/business-finance',
      }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Business Finance', path: '/business-finance' },
        ],
        '/business-finance',
      ),
    ],
  },
  '/business-loan': {
    title: 'Business Loan Services in Bangalore | CapitalKnob',
    description:
      'Business loan solutions in Bangalore for working capital, business expansion, secured funding, project finance and growth needs.',
    keywords: 'business loans, working capital, expansion finance, business loan Bangalore',
    canonicalPath: '/business-loan',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/business-loan',
        'Business Loan Services in Bangalore | CapitalKnob',
        'Business loan solutions in Bangalore for working capital, business expansion, secured funding, project finance and growth needs.',
      ),
      createServiceSchema({
        name: 'Business Loan Services',
        description:
          'Business loan solutions in Bangalore for working capital, business expansion, secured funding, project finance and growth needs.',
        path: '/business-loan',
      }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Business Loan', path: '/business-loan' },
        ],
        '/business-loan',
      ),
    ],
  },
  '/real-estate-finance': {
    title: 'Real Estate Finance Services in India | CapitalKnob',
    description:
      'Get flexible real estate finance services from CapitalKnob for property acquisition, construction, development and other real estate funding needs.',
    keywords: 'real estate finance, property acquisition, construction funding',
    canonicalPath: '/real-estate-finance',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/real-estate-finance',
        'Real Estate Finance Services in India | CapitalKnob',
        'Get flexible real estate finance services from CapitalKnob for property acquisition, construction, development and other real estate funding needs.',
      ),
      createServiceSchema({
        name: 'Real Estate Finance Services',
        description:
          'Get flexible real estate finance services from CapitalKnob for property acquisition, construction, development and other real estate funding needs.',
        path: '/real-estate-finance',
      }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Real Estate Finance', path: '/real-estate-finance' },
        ],
        '/real-estate-finance',
      ),
    ],
  },
  '/real-estate-project-finance': {
    title: 'Real Estate Project Finance in Bangalore | CapitalKnob',
    description:
      'Real estate project finance solutions in Bangalore for land acquisition, construction, completion, inventory and stalled projects.',
    keywords:
      'real estate project finance, land acquisition funding, construction finance Bangalore',
    canonicalPath: '/real-estate-project-finance',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/real-estate-project-finance',
        'Real Estate Project Finance in Bangalore | CapitalKnob',
        'Real estate project finance solutions in Bangalore for land acquisition, construction, completion, inventory and stalled projects.',
      ),
      createServiceSchema({
        name: 'Real Estate Project Finance Services',
        description:
          'Real estate project finance solutions in Bangalore for land acquisition, construction, completion, inventory and stalled projects.',
        path: '/real-estate-project-finance',
      }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Real Estate Project Finance', path: '/real-estate-project-finance' },
        ],
        '/real-estate-project-finance',
      ),
    ],
  },
  '/private-credit': {
    title: 'Private Credit Services in India | CapitalKnob',
    description:
      'Access flexible private credit services from CapitalKnob for businesses, investors and property needs with tailored funding options and strategic support.',
    keywords: 'private credit, investment capital, private funding',
    canonicalPath: '/private-credit',
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/private-credit',
        'Private Credit Services in India | CapitalKnob',
        'Access flexible private credit services from CapitalKnob for businesses, investors and property needs with tailored funding options and strategic support.',
      ),
      createServiceSchema({
        name: 'Private Credit Services',
        description:
          'Access flexible private credit services from CapitalKnob for businesses, investors and property needs with tailored funding options and strategic support.',
        path: '/private-credit',
      }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Private Credit', path: '/private-credit' },
        ],
        '/private-credit',
      ),
    ],
  },
  '/disclaimer': {
    title: 'Disclaimer | CapitalKnob Investment & Financial Advisors',
    description:
      'Content on this website is provided by CapitalKnob Investment & Financial Advisors for general informational, educational, business facilitation, and capital advisory purposes only.',
    keywords: 'CapitalKnob disclaimer, legal notice',
    canonicalPath: '/disclaimer',
    noIndex: true,
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/disclaimer',
        'Disclaimer | CapitalKnob Investment & Financial Advisors',
        'Content on this website is provided by CapitalKnob Investment & Financial Advisors for general informational, educational, business facilitation, and capital advisory purposes only.',
      ),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Disclaimer', path: '/disclaimer' },
        ],
        '/disclaimer',
      ),
    ],
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Terms | CapitalKnob Investment & Financial Advisors',
    description:
      'How CapitalKnob collects, uses, and protects your information — privacy policy, terms, cookie, grievance, refund, and consent policies.',
    keywords: 'CapitalKnob privacy policy, terms and conditions',
    canonicalPath: '/privacy-policy',
    noIndex: true,
    schemas: [
      organizationSchema,
      createWebPageSchema(
        '/privacy-policy',
        'Privacy Policy & Terms | CapitalKnob Investment & Financial Advisors',
        'How CapitalKnob collects, uses, and protects your information — privacy policy, terms, cookie, grievance, refund, and consent policies.',
      ),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ],
        '/privacy-policy',
      ),
    ],
  },
};

/** "real-estate-project-finance" → "Real Estate Project Finance". */
function humanizeSlug(slug: string): string {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Malformed % sequences — fall through with the raw slug.
  }
  const words = decoded
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return words || 'Service';
}

function safeDecodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).trim();
  } catch {
    return slug.trim();
  }
}

/**
 * Generic indexable SEO for a single-segment service slug missing from the
 * build-time category cache (cache not yet warmed on SPA navigation, or slug
 * added after the last build). The UI fetches the category live, so emitting
 * the 404 fallback here (`Page Not Found` + noindex) would de-index a real
 * money page — hence a humanized, indexable entry instead.
 */
function createGenericServiceSeo(slug: string, path: string): RouteSeoEntry {
  const name = humanizeSlug(slug);
  const title = `${name} Services in India | ${SITE_NAME}`;
  const description = `Explore flexible ${name} services from ${SITE_NAME}.`;
  return {
    title,
    description,
    keywords: `${name}, finance services, CapitalKnob`,
    canonicalPath: path,
    schemas: [
      organizationSchema,
      websiteSchema,
      createWebPageSchema(path, title, description),
      createServiceSchema({ name: `${name} Services`, description, path }),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name, path },
        ],
        path,
      ),
    ],
  };
}

/**
 * Generic indexable SEO for a `/blogs/:slug` missing from the build-time
 * blog cache (same cold-cache reason as services). Indexable so real
 * articles never ship a 404 title + noindex while the UI renders them.
 */
function createGenericBlogSeo(slug: string, path: string): RouteSeoEntry {
  const name = humanizeSlug(slug);
  const title = `${name} | ${SITE_NAME}`;
  const description = `Read about ${name} — financial insights and guides from ${SITE_NAME}.`;
  return {
    title,
    description,
    keywords: `${name}, financial guidance`,
    canonicalPath: path,
    schemas: [
      organizationSchema,
      websiteSchema,
      createWebPageSchema(path, title, description),
      createBreadcrumbSchema(
        [
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
          { name, path },
        ],
        path,
      ),
    ],
  };
}

export function getSeoForRoute(url: string): RouteSeoEntry {
  const path = url.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  // 1. Dynamic home page match ('/')
  if (path === '/') {
    const homeEntry = ROUTE_SEO['/'];
    // Real API rows only from GET /getTestimonial/home — no mocks.
    const testimonials = getEffectiveHomeTestimonials();
    const faqs = getHomeFaqs();
    const frontBlogs = getFrontBlogs();

    const schemas: Thing[] = [
      createOrganizationWithReviews({ testimonials }),
      websiteSchema,
      createWebPageSchema('/', homeEntry.title, homeEntry.description),
      createBreadcrumbSchema([{ name: 'Home', path: '/' }], '/'),
    ];

    // Standalone Review nodes (igli docs pattern) → "Review snippets" row
    testimonials.forEach((t, i) => {
      const review = createTestimonialReviewSchema(t, '/', i);
      if (review) schemas.push(review);
    });

    const faqSchema = createFaqSchema(faqs, '/');
    if (faqSchema) {
      schemas.push(faqSchema);
    }

    if (frontBlogs && frontBlogs.length > 0) {
      for (const blog of frontBlogs.slice(0, 3)) {
        if (blog.blog_slug) {
          schemas.push(createBlogPostingSchema(blog));
        }
      }
    }

    return {
      ...homeEntry,
      schemas,
    };
  }

  // 2. Static match
  if (ROUTE_SEO[path]) {
    const entry = ROUTE_SEO[path];
    const slug = path.replace(/^\//, '');
    const realTestimonials = getTestimonialsForSlug(slug);
    const realFaqs = getFaqsForSlug(slug);

    if (realTestimonials.length > 0 || realFaqs.length > 0) {
      const schemas = [...entry.schemas];
      if (realTestimonials.length > 0) {
        schemas[0] = createOrganizationWithReviews({ testimonials: realTestimonials });
        realTestimonials.forEach((t, i) => {
          const review = createTestimonialReviewSchema(t, path, i);
          if (review) schemas.push(review);
        });
      }
      const faqSchema = createFaqSchema(realFaqs, path);
      if (faqSchema) {
        schemas.push(faqSchema);
      }
      return {
        ...entry,
        schemas,
      };
    }

    return entry;
  }

  // 3. Dynamic blog match (/blogs/:slug)
  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch) {
    const slug = safeDecodeSlug(blogMatch[1]);
    const blogData = getDynamicBlog(slug);
    if (blogData && blogData.data) {
      const b = blogData.data;
      const title = b.blog_meta_title?.trim() || `${b.blog_title || slug} | ${SITE_NAME}`;
      const description =
        b.blog_meta_description?.trim() ||
        b.blog_short_description?.trim() ||
        b.blog_description?.replace(/<[^>]*>?/gm, '').trim().slice(0, 160) ||
        title;
      const schemas: Thing[] = [
        organizationSchema,
        websiteSchema,
        createWebPageSchema(path, title, description),
        createBlogPostingSchema(b),
        createBreadcrumbSchema(
          [
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: b.blog_title || slug, path },
          ],
          path,
        ),
      ];
      if (blogData.faq && blogData.faq.length > 0) {
        const faqSchema = createFaqSchema(blogData.faq, path);
        if (faqSchema) {
          schemas.push(faqSchema);
        }
      }
      return {
        title,
        description,
        keywords: b.blog_meta_keywords || `${b.blog_title || slug}, financial guidance`,
        canonicalPath: path,
        schemas,
      };
    }
    // Cache miss (cold SPA cache or post-build slug) — the UI still fetches
    // the article live, so return generic indexable SEO, never the 404 entry.
    return createGenericBlogSeo(slug, path);
  }

  // 3. Dynamic service / category match (/:slug)
  const categoryMatch = path.match(/^\/([^/]+)$/);
  if (categoryMatch) {
    const slug = safeDecodeSlug(categoryMatch[1]);
    const categoryEntry = getDynamicCategory(slug);
    if (categoryEntry && categoryEntry.category) {
      const c = categoryEntry.category;
      const name = c.category_name || slug;
      const title =
        c.category_meta_title?.trim() || `${name} Services in India | ${SITE_NAME}`;
      const description =
        c.category_meta_description?.trim() ||
        c.category_description?.replace(/<[^>]*>?/gm, '').trim().slice(0, 160) ||
        `Explore flexible ${name} services from ${SITE_NAME}.`;

      const catTestimonials = getTestimonialsForSlug(slug);
      const catFaqs = getFaqsForSlug(slug);

      const schemas: Thing[] = [
        createOrganizationWithReviews({ testimonials: catTestimonials }),
        websiteSchema,
        createWebPageSchema(path, title, description),
        createServiceSchema({ name, description, path }),
        createBreadcrumbSchema(
          [
            { name: 'Home', path: '/' },
            { name, path },
          ],
          path,
        ),
      ];

      catTestimonials.forEach((t, i) => {
        const review = createTestimonialReviewSchema(t, path, i);
        if (review) schemas.push(review);
      });

      const faqSchema = createFaqSchema(catFaqs, path);
      if (faqSchema) {
        schemas.push(faqSchema);
      }

      return {
        title,
        description,
        keywords: c.category_meta_primary_keywords || `${name}, finance services, CapitalKnob`,
        canonicalPath: path,
        schemas,
      };
    }
    // Cache miss (cold SPA cache or post-build slug) — the UI still fetches
    // the category live, so return generic indexable SEO, never the 404 entry.
    return createGenericServiceSeo(slug, path);
  }

  // 4. Fallback 404
  return {
    title: `${SITE_NAME} | Page Not Found`,
    description: 'The requested page could not be found.',
    keywords: '404',
    canonicalPath: path,
    noIndex: true,
    schemas: [organizationSchema],
  };
}
