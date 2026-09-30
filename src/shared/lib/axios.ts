/**
 * Shared API client (fetch-based).
 *
 * Same import path / call shape as before (`api.get<T>(url)`,
 * `api.post<T>(url, body, { headers })` → `{ data }`, `ApiError` on failure)
 * so all 8 feature modules keep working untouched — but implemented on
 * native `fetch` instead of axios, dropping ~50KB raw / ~19KB transfer of
 * JS from every page (Lighthouse `unused-javascript` top item after the
 * prerender leak fix).
 *
 * Usage:
 *   import { api } from '@/shared/lib/axios'
 *   const { data } = await api.get<MyResponse>('/getSitemap')
 */

import { env } from './env'

/** Shape of the standard JSON error returned by our APIs. */
export interface ApiErrorBody {
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

/** Normalised error surface — components consume this, not raw errors. */
export class ApiError extends Error {
  readonly status: number | undefined
  readonly body: ApiErrorBody | undefined

  constructor(message: string, status?: number, body?: ApiErrorBody) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

interface RequestOptions {
  headers?: Record<string, string>
}

function baseHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...extra,
  }
  if (env.secretKey) {
    headers.Authorization = env.secretKey
  }
  return headers
}

function normalizeErrorBody(data: unknown): ApiErrorBody | undefined {
  if (data && typeof data === 'object') return data as ApiErrorBody
  return undefined
}

async function request<T>(path: string, init: RequestInit): Promise<{ data: T }> {
  let res: Response
  try {
    res = await fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      signal: AbortSignal.timeout(20_000),
    })
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    )
  }

  let data: unknown
  try {
    const text = await res.text()
    data = text ? (JSON.parse(text) as unknown) : {}
  } catch {
    data = {}
  }

  if (!res.ok) {
    const body = normalizeErrorBody(data)
    throw new ApiError(
      body?.message ?? body?.error ?? `Request failed with status ${res.status}`,
      res.status,
      body,
    )
  }

  return { data: data as T }
}

/** Minimal axios-compatible surface used across feature modules. */
export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<{ data: T }> {
    return request<T>(url, {
      method: 'GET',
      headers: baseHeaders(options?.headers),
    })
  },

  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<{ data: T }> {
    const isForm = typeof FormData !== 'undefined' && body instanceof FormData
    // FormData: let the browser set multipart boundary. Plain objects: JSON.
    const headers = baseHeaders(options?.headers)
    if (!isForm && body !== undefined && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }
    if (isForm && headers['Content-Type'] === 'multipart/form-data') {
      // Axios accepted this literal but fetch must NOT send it without a
      // boundary — the browser generates the correct header itself.
      delete headers['Content-Type']
    }
    return request<T>(url, {
      method: 'POST',
      headers,
      body: isForm
        ? (body as FormData)
        : body === undefined
          ? undefined
          : typeof body === 'string'
            ? body
            : JSON.stringify(body),
    })
  },
}

export type AxiosInstance = typeof api
export type AxiosResponse<T = unknown> = { data: T }
export type AxiosError = Error
