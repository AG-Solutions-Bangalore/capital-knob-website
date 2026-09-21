/**
 * Friendly API error messages.
 *
 * Components must never render raw transport errors (e.g.
 * `AxiosError: Request failed with status code 500`). Pass any caught
 * error through `getFriendlyApiErrorMessage` before showing it in UI.
 */

import { ApiError } from './axios'

const GENERIC_MESSAGE = 'Something went wrong. Please try again.'

function isTimeoutMessage(message: string): boolean {
  const lower = message.toLowerCase()
  return (
    lower.includes('timeout') ||
    lower.includes('econnaborted') ||
    lower.includes('timed out')
  )
}

function isNetworkMessage(message: string): boolean {
  const lower = message.toLowerCase()
  return (
    lower.includes('network error') ||
    lower.includes('failed to fetch') ||
    lower.includes('load failed') ||
    lower.includes('connection')
  )
}

/**
 * Map any thrown value to a user-safe message.
 *
 * Server-provided validation messages (4xx with a `message`/`error` body)
 * are surfaced as-is; everything else falls back to a generic message so
 * we never leak transport internals or HTML error pages to users.
 */
export function getFriendlyApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const serverMessage =
      typeof error.body?.message === 'string' && error.body.message.trim()
        ? error.body.message.trim()
        : typeof error.body?.error === 'string' && error.body.error.trim()
          ? error.body.error.trim()
          : null

    if (error.status === undefined) {
      if (isTimeoutMessage(error.message)) {
        return 'The request timed out. Please check your connection and try again.'
      }
      if (isNetworkMessage(error.message)) {
        return 'Unable to reach the server. Please check your internet connection and try again.'
      }
      return GENERIC_MESSAGE
    }

    if (error.status >= 500) return GENERIC_MESSAGE

    if (error.status === 429) {
      return 'Too many attempts. Please wait a moment and try again.'
    }

    // 4xx — prefer the server message when it looks user-safe, otherwise
    // fall back so we never render raw HTML/Laravel debug output.
    if (serverMessage && serverMessage.length <= 200 && !serverMessage.includes('<')) {
      return serverMessage
    }
    return 'We could not process your request. Please check your details and try again.'
  }

  if (error instanceof Error) {
    if (isTimeoutMessage(error.message)) {
      return 'The request timed out. Please check your connection and try again.'
    }
    if (isNetworkMessage(error.message)) {
      return 'Unable to reach the server. Please check your internet connection and try again.'
    }
    return GENERIC_MESSAGE
  }

  return GENERIC_MESSAGE
}
