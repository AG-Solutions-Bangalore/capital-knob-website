/**
 * @file src/config/schemaExamples.ts
 * Type-safe Schema.org factory functions providing Rich Results compliant JSON-LD structures.
 */
import type { Graph, Thing } from 'schema-dts';
import { SITE_EMAIL, SITE_LOGO, SITE_NAME, SITE_ORIGIN, SITE_PHONE, getCanonicalUrl } from './site';

export const organizationSchema: Thing = {
  '@type': ['Organization', 'LocalBusiness', 'FinancialService'] as unknown as 'Organization',
  '@id': `${SITE_ORIGIN}/#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
  logo: { '@type': 'ImageObject', url: SITE_LOGO },
  image: SITE_LOGO,
  description:
    'CapitalKnob helps businesses and individuals unlock their capital potential with smart financial solutions, funding support, and strategic capital guidance.',
  foundingDate: '2020-01-01',
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Prestige Tech Park, 5th Floor, Outer Ring Road, Marathahalli',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560037',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.956,
    longitude: 77.701,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '18:30',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    {
      '@type': 'ContactPoint',
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
} as Thing;

export function createOrganizationWithReviews(options?: {
  testimonials?: Array<{
    testimonial_client_name?: string | null;
    testimonial_description?: string | null;
    testimonial_created_date?: string | null;
    testimonial_rating?: string | number | null;
  }>;
}): Thing {
  const base = { ...(organizationSchema as Record<string, unknown>) };

  // ONLY real data from API — zero static injection
  const realTestimonials = (options?.testimonials || []).filter(
    (t) => t.testimonial_client_name && t.testimonial_description,
  );

  if (realTestimonials.length > 0) {
    const reviews = realTestimonials.map((t) => {
      const rating = Number(t.testimonial_rating) || 5;
      return {
        '@type': 'Review',
        itemReviewed: { '@id': `${SITE_ORIGIN}/#organization` },
        author: {
          '@type': 'Person',
          name: (t.testimonial_client_name || 'Client').trim(),
        },
        datePublished: t.testimonial_created_date || '2026-01-01',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(rating),
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: (t.testimonial_description || '').replace(/<[^>]*>?/gm, '').trim().slice(0, 300),
      };
    });

    const sumRating = realTestimonials.reduce(
      (acc, t) => acc + (Number(t.testimonial_rating) || 5),
      0,
    );
    const avgRating = (sumRating / realTestimonials.length).toFixed(1);

    base.review = reviews;
    base.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: String(realTestimonials.length),
      bestRating: '5',
      worstRating: '1',
    };
  }

  return base as Thing;
}

// Alias for backwards compatibility
export const createHomeOrganizationSchema = createOrganizationWithReviews;

export const websiteSchema: Thing = {
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  url: `${SITE_ORIGIN}/`,
  name: SITE_NAME,
  description: 'Unlock Your Capital Potential',
  publisher: { '@id': `${SITE_ORIGIN}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_ORIGIN}/blogs?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as Thing;

export function createWebPageSchema(canonicalPath: string, title: string, description: string): Thing {
  const url = getCanonicalUrl(canonicalPath);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': `${SITE_ORIGIN}/#organization` },
  } as Thing;
}

export function createServiceSchema(service: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): Thing {
  const url = getCanonicalUrl(service.path);
  return {
    '@type': 'FinancialService',
    '@id': `${url}#service`,
    name: service.name,
    description: service.description,
    provider: { '@id': `${SITE_ORIGIN}/#organization` },
    url,
    image: service.image || SITE_LOGO,
    areaServed: 'IN',
  } as Thing;
}

export function createBlogPostingSchema(blog: {
  blog_slug?: string | null;
  blog_title?: string | null;
  blog_heading?: string | null;
  blog_short_description?: string | null;
  blog_description?: string | null;
  blog_meta_description?: string | null;
  blog_created_date?: string | null;
  blog_updated_date?: string | null;
  blog_banner_image?: string | null;
  categories?: string | null;
}): Thing {
  const slug = blog.blog_slug || '';
  const canonicalUrl = getCanonicalUrl(`/blogs/${slug}`);
  const title = blog.blog_title || blog.blog_heading || 'Blog Post';
  const description =
    blog.blog_meta_description || blog.blog_short_description || blog.blog_description || title;
  const image = blog.blog_banner_image
    ? `https://agsdemo.in/ckapi/public/assets/images/blog_images/${blog.blog_banner_image}`
    : SITE_LOGO;

  return {
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#blogposting`,
    headline: title,
    description: description.replace(/<[^>]*>?/gm, '').trim().slice(0, 300),
    image,
    datePublished: blog.blog_created_date || '2026-01-01',
    dateModified: blog.blog_updated_date || blog.blog_created_date || '2026-01-01',
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    articleSection: blog.categories || 'Financial Advisory',
  } as Thing;
}

export function createFaqSchema(
  faqs:
    | Array<
        | {
            faq_que?: string | null;
            faq_ans?: string | null;
            faq_question?: string | null;
            faq_answer?: string | null;
          }
        | null
        | undefined
      >
    | null
    | undefined,
  canonicalPath: string,
): Thing | null {
  // If FAQ data is null, undefined, not an array, or empty -> DO NOT inject FAQ
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const validFaqs = faqs
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .map((f) => {
      const q = (f.faq_que || f.faq_question || '').replace(/<[^>]*>?/gm, '').trim();
      const a = (f.faq_ans || f.faq_answer || '').replace(/<[^>]*>?/gm, '').trim();
      return { q, a };
    })
    .filter((f) => f.q.length > 0 && f.a.length > 0);

  // If no valid Q&A pairs remain, do not inject FAQPage schema
  if (validFaqs.length === 0) {
    return null;
  }

  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: validFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } as Thing;
}

export function createReviewSchema(review: {
  authorName: string;
  reviewBody: string;
  ratingValue?: string | number;
  datePublished?: string;
  path?: string;
}): Thing {
  const canonicalUrl = getCanonicalUrl(review.path || '/');
  return {
    '@type': 'Review',
    '@id': `${canonicalUrl}#review`,
    itemReviewed: { '@id': `${SITE_ORIGIN}/#organization` },
    author: { '@type': 'Person', name: review.authorName },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review.ratingValue || 5),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.reviewBody.replace(/<[^>]*>?/gm, '').trim().slice(0, 300),
    datePublished: review.datePublished || '2026-01-01',
  } as Thing;
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>, currentPath: string): Thing {
  const url = getCanonicalUrl(currentPath);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  } as Thing;
}

export function createCompositeGraph(schemas: Thing[]): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
