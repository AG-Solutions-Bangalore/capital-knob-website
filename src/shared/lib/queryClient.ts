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
      staleTime: 5 * 60 * 1000, // 5 min
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
