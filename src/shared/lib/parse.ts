/**
 * Safe response-shape helpers.
 *
 * The backend documents no response contracts and several endpoints return
 * `null`, `[]`, or an empty body depending on state. These guards let API
 * functions normalise anything the wire throws at us into predictable
 * shapes instead of assuming a structure.
 */

/** Return `value` when it's an array, otherwise `fallback` (default `[]`). */
export function arrayOf<T>(value: unknown, fallback: T[] = []): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback
}

/** Return `value` when it's a non-null object, otherwise `fallback`. */
export function objectOf<T extends object>(value: unknown, fallback: T): T {
  return typeof value === 'object' && value !== null ? (value as T) : fallback
}

/**
 * Parse a body that may already be an object, a JSON string, or an empty
 * string (empty 200 responses). Returns `fallback` for anything unparseable
 * — including the HTML Laravel error pages returned on 5xx.
 */
export function parseBody<T extends object>(data: unknown, fallback: T): T {
  if (data === '' || data === null || data === undefined) return fallback
  if (typeof data === 'string') {
    const trimmed = data.trim()
    if (!trimmed) return fallback
    try {
      return objectOf<T>(JSON.parse(trimmed) as unknown, fallback)
    } catch {
      return fallback
    }
  }
  if (typeof data === 'object') return data as T
  return fallback
}
