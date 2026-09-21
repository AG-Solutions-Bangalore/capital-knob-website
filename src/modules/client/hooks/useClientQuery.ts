/**
 * `useClientsQuery` — React Query hook for client/partner entries.
 *
 * Wraps `fetchClients` so components stay focused on rendering
 * (loading state, error feedback, data display).
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchClients } from '../api/client.api'
import type { ClientResponse } from '../api/client.types'

export function useClientsQuery(): UseQueryResult<ClientResponse, Error> {
  return useQuery({
    queryKey: ['website', 'clients'],
    queryFn: fetchClients,
    staleTime: 30 * 60 * 1000, // 30 min — reference content rarely changes
  })
}
