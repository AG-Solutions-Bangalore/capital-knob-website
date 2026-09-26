import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate as hydrateQueryClient } from '@tanstack/react-query';
import { AppProviders } from '@/app/providers/AppProviders';
import { queryClient } from '@/shared/lib/queryClient';
import App from '@/App';
import '@/index.css';

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
