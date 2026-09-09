/**
 * Shared axios instance.
 *
 * Every feature module should import `api` from here instead of creating its
 * own client. Centralising the client keeps timeout, headers, auth and
 * error-handling behaviour consistent across the app.
 *
 * Usage:
 *   import { api } from '@/shared/lib/axios'
 *   const { data } = await api.post<MyResponse>('/enquiry.php', payload)
 */

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { env } from './env'

/** Shape of the standard JSON error returned by our APIs. */
export interface ApiErrorBody {
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

/** Normalised error surface — components consume this, not raw axios errors. */
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

function normalizeError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const body = error.response?.data as ApiErrorBody | undefined
    const message =
      body?.message ??
      body?.error ??
      error.message ??
      'Something went wrong. Please try again.'
    return new ApiError(message, status, body)
  }

  if (error instanceof Error) return new ApiError(error.message)
  return new ApiError('Unknown error')
}

export const api: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// --- Request interceptor -----------------------------------------------------
// Attach auth tokens or tracing headers here when the app grows.

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (env.secretKey) {
      config.headers.Authorization = env.secretKey
    }

    if (env.isDev) {
      console.debug(
        `[api] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      )
    }
    return config
  },
  (error) => Promise.reject(normalizeError(error)),
)

// --- Response interceptor ----------------------------------------------------
// Unwrap the response, or normalise any error into the shared `ApiError`.

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(normalizeError(error)),
)
