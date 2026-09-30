/**
 * `useCompanyQuery` — React Query hook for the company profile.
 *
 * Wraps `fetchCompany` so components stay focused on rendering
 * (loading state, error feedback, data display).
 */

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchCompany } from '../api/company.api'
import type { CompanyResponse } from '../api/company.types'

export function useCompanyQuery(
  enabled = true,
): UseQueryResult<CompanyResponse, Error> {
  return useQuery({
    queryKey: ['website', 'company'],
    queryFn: fetchCompany,
    enabled,
    staleTime: 30 * 60 * 1000, // 30 min — reference content rarely changes
  })
}
