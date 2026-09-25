import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppProviders } from '@/app/providers/AppProviders';
import App from '@/App';
import '@/index.css';

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
