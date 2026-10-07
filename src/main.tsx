import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate as hydrateQueryClient } from '@tanstack/react-query';
import { AppProviders } from '@/app/providers/AppProviders';
import { queryClient } from '@/shared/lib/queryClient';
import App from '@/App';
import '@/index.css';

// PERF 90+ (user-approved deferred hydration): the prerendered HTML is
// already complete and visible (~114ms real FCP/LCP), so React hydration —
// the biggest main-thread cost (react+router parse/eval under CPU
// slowdown) — waits for an idle moment instead of racing first paint.
// Hydration still happens ASAP on first interaction, and a timeout
// guarantees it even if idle never fires (background tabs). Trade-off:
// slider/calculator/buttons are static until hydration runs (typically
// 1-3s); plain links keep working natively before that.
function boot() {
  // Reuse the SSR query cache (embedded as `#react-query-state` JSON by the
  // prerenderer) BEFORE hydration so the first client render produces DOM
  // identical to the SSR HTML — without this, every data-driven section
  // renders its pending/fallback state on first paint while SSR emitted live
  // content, crashing hydration (React #418 → full client re-render).
  // Missing or malformed payload = plain cold boot (queries fetch normally).
  try {
    const stateEl = document.getElementById('react-query-state');
    if (stateEl?.textContent) {
      hydrateQueryClient(queryClient, JSON.parse(stateEl.textContent));
    }
  } catch {
    // Never let a stale/partial cache break boot — fall back to cold fetch.
  }

  const containerElement = document.getElementById('root') as HTMLElement;

  if (containerElement && containerElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(
      containerElement,
      <React.StrictMode>
        <HelmetProvider>
          <AppProviders>
            <App />
          </AppProviders>
        </HelmetProvider>
      </React.StrictMode>,
    );
  } else if (containerElement) {
    ReactDOM.createRoot(containerElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <AppProviders>
            <App />
          </AppProviders>
        </HelmetProvider>
      </React.StrictMode>,
    );
  }
}

let booted = false;
function cleanupBootListeners() {
  window.removeEventListener('pointerdown', bootOnce, true);
  window.removeEventListener('keydown', bootOnce, true);
  window.removeEventListener('touchstart', bootOnce, true);
}
function bootOnce() {
  if (booted) return;
  booted = true;
  cleanupBootListeners();
  boot();
}

// Any interaction means the user needs a live app NOW — hydrate immediately.
window.addEventListener('pointerdown', bootOnce, true);
window.addEventListener('keydown', bootOnce, true);
window.addEventListener('touchstart', bootOnce, true);

if (typeof window.requestIdleCallback === 'function') {
  // Idle fires after paint settles; timeout forces it even on busy pages.
  window.requestIdleCallback(bootOnce, { timeout: 4000 });
} else {
  window.setTimeout(bootOnce, 3000);
}
// Hard guarantee: background tabs may never go idle — never leave the
// page permanently static.
window.setTimeout(bootOnce, 3500);

// PERF (staged loading, last stage): refresh stale seeded queries in the
// BACKGROUND, long after the LCP window closes — same 8s convention as the
// idle route-prefetches. refetchOnMount is false (see queryClient), so
// without this CMS edits would only arrive on redeploy; with it, content
// goes stale at most seconds, and zero API bytes compete with first paint.
// All consumers render below the fold, so silent updates can't shift CLS.
window.setTimeout(() => {
  try {
    const idle =
      typeof window.requestIdleCallback === 'function'
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 8000 })
        : (cb: () => void) => window.setTimeout(cb, 2000);
    idle(() => {
      queryClient
        .refetchQueries({ type: 'active', stale: true })
        .catch(() => {});
    });
  } catch {
    // Background refresh is best-effort — seeded content stays usable.
  }
}, 8000);
