/**
 * Blog query hooks — one thin React Query wrapper per blog endpoint.
 *
 * Components consume these hooks (loading/error/data states included) and
 * never call the `api/blogs.api.ts` functions directly. Slug hooks stay
 * disabled until a slug is provided.
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
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

// PERF: 30min staleTime so SSR-hydrated data never refetches on mount.
// Without this every homepage visit fired getFrontBlogs/getFeaturedBlogs/
// getBlogs again after hydration, delaying LCP and burning TBT.
const BLOG_STALE_TIME = 30 * 60 * 1000

export function useFrontBlogsQuery(): UseQueryResult<BlogListResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'front'],
    queryFn: fetchFrontBlogs,
    staleTime: BLOG_STALE_TIME,
  })
}

export function useFeaturedBlogsQuery(): UseQueryResult<BlogListResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'featured'],
    queryFn: fetchFeaturedBlogs,
    staleTime: BLOG_STALE_TIME,
  })
}

export function useBlogsQuery(): UseQueryResult<BlogListResponse, Error> {
  return useQuery({
    queryKey: ['website', 'blogs', 'list'],
    queryFn: fetchBlogs,
    staleTime: BLOG_STALE_TIME,
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
