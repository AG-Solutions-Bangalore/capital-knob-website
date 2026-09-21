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
