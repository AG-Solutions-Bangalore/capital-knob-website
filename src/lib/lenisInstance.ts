/**
 * lenisInstance — zero-lenis singleton for imperative scroll access.
 *
 * Consumers (e.g. ScrollToTop) import ONLY this file so `lenis` never
 * enters the critical path. The real Lenis instance is registered via
 * `setLenisInstance` from the deferred `<ReactLenis ref={...}>` tree.
 */

/** Structural subset of Lenis used by the app — no `lenis` import needed. */
export interface LenisLike {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; offset?: number },
  ) => void
}

let instance: LenisLike | null = null

export function setLenisInstance(lenis: LenisLike | null | undefined) {
  instance = lenis ?? null
}

export function getLenisInstance(): LenisLike | null {
  return instance
}
