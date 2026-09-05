/**
 * Runtime environment configuration.
 *
 * Values are sourced from Vite's `import.meta.env`. Anything that talks to the
 * network should pull from here so it stays easy to swap in a staging URL,
 * mock server, or environment-specific override later.
 */

export const env = {
  /**
   * Base URL for the CapitalKnob public API. All feature modules should call
   * the shared `api` axios instance — never hardcode this URL elsewhere.
   */
  apiBaseUrl:
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    'https://agsdemo.in/cp/api',

  /** When true, devtools and verbose axios logging are enabled. */
  isDev: import.meta.env.DEV,
} as const
