/**
 * Website content query hooks — one thin React Query wrapper per endpoint.
 *
 * Components consume these hooks (loading/error/data states included) and
 * never call the `api/*.api.ts` functions directly.
 */

import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import { fetchCompany } from '../api/company.api'
import type { CompanyResponse } from '../api/company.types'
import { fetchCategories } from '../api/category.api'
import type { CategoryResponse } from '../api/category.types'
import {
  fetchBlogBySlug,
  fetchBlogs,
  fetchFeaturedBlogs,
  fetchFrontBlogs,
} from '../api/blogs.api'
import type {
  BlogBySlugResponse,
  BlogListResponse,
} from '../api/blogs.types'
import { fetchFaqBySlug } from '../api/faq.api'
import type { FaqBySlugResponse } from '../api/faq.types'
import { fetchTestimonialsBySlug } from '../api/testimonial.api'
import type { TestimonialResponse } from '../api/testimonial.types'
import { fetchClients } from '../api/client.api'
import type { ClientResponse } from '../api/client.types'
import { fetchSitemap } from '../api/sitemap.api'
import type { SitemapResponse } from '../api/sitemap.types'
import { subscribeNewsletter } from '../api/newsletter.api'
import type {
  NewsletterPayload,
  NewsletterResponse,
} from '../api/newsletter.types'

/** Long-lived reference content (company, categories, clients, sitemap). */
const REFERENCE_STALE_TIME = 30 * 60 * 1000 // 30 min

export function useCompanyQuery(): UseQueryResult<CompanyResponse, Error> {
  return useQuery({
    queryKey: ['website', 'company'],
    queryFn: fetchCompany,
    staleTime: REFERENCE_STALE_TIME,
  })
}

export function useCategoryQuery(): UseQueryResult<CategoryResponse, Error> {
  return useQuery({
    queryKey: ['website', 'categories'],
    queryFn: fetchCategories,
    staleTime: REFERENCE_STALE_TIME,
  })
}

export function useFrontBlogsQuery(): UseQueryResult<BlogListResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'front'],
    queryFn: fetchFrontBlogs,
  })
}

export function useFeaturedBlogsQuery(): UseQueryResult<BlogListResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'featured'],
    queryFn: fetchFeaturedBlogs,
  })
}

export function useBlogsQuery(): UseQueryResult<BlogListResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'list'],
    queryFn: fetchBlogs,
  })
}

export function useBlogBySlugQuery(
  slug: string | undefined,
): UseQueryResult<BlogBySlugResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'slug', slug],
    queryFn: () => fetchBlogBySlug(slug as string),
    enabled: Boolean(slug),
  })
}

export function useFaqBySlugQuery(
  slug: string | undefined,
): UseQueryResult<FaqBySlugResponse, Error> {
  return useQuery({
    queryKey: ['website', 'faq', slug],
    queryFn: () => fetchFaqBySlug(slug as string),
    enabled: Boolean(slug),
  })
}

export function useTestimonialsQuery(
  slug: string | undefined,
): UseQueryResult<TestimonialResponse, Error> {
  return useQuery({
    queryKey: ['website', 'testimonials', slug],
    queryFn: () => fetchTestimonialsBySlug(slug as string),
    enabled: Boolean(slug),
  })
}

export function useClientsQuery(): UseQueryResult<ClientResponse, Error> {
  return useQuery({
    queryKey: ['website', 'clients'],
    queryFn: fetchClients,
    staleTime: REFERENCE_STALE_TIME,
  })
}

export function useSitemapQuery(): UseQueryResult<SitemapResponse, Error> {
  return useQuery({
    queryKey: ['website', 'sitemap'],
    queryFn: fetchSitemap,
    staleTime: REFERENCE_STALE_TIME,
  })
}

export function useNewsletterMutation(): UseMutationResult<
  NewsletterResponse,
  Error,
  NewsletterPayload
> {
  return useMutation({
    mutationKey: ['website', 'newsletter'],
    mutationFn: subscribeNewsletter,
  })
}
