/**
 * Shared TanStack Query client.
 *
 * Defaults are tuned for a public marketing site — long stale times, no
 * background refetching on focus, and retries disabled for mutations so
 * we don't double-submit forms on flaky networks.
 */

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // PERF (staged loading: banner first, data later): 30min stale so
      // SSR-seeded content (faq/testimonials/...) never refetches in the
      // LCP window on repeat visits — prod deploys are always older than
      // minutes, so 5min meant 6 API calls on EVERY visit. CMS edits can
      // lag ≤30min; the background warmer still refreshes underneath.
      staleTime: 30 * 60 * 1000, // 30 min
      // PERF: never refetch on component mount (mounts happen during
      // hydration = inside the LCP window). Empty-cache queries still do
      // their initial fetch normally; seeded ones refresh via the
      // idle-scheduled background refresh in main.tsx instead.
      refetchOnMount: false,
      gcTime: 10 * 60 * 1000, // 10 min
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
})
