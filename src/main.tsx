import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import MagicProvider from '@hooks/useMagicLinkAuth/MagicProvider';
import MagicUserProvider from '@hooks/useUser/MagicUserProvider';
import * as Sentry from '@sentry/react';

import router from 'routes/index.tsx';
import theme from '@config/theme.ts';

import '@config/axios';
import './index.css';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/alpha\.bando\.cool\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MagicProvider>
        <MagicUserProvider>
          <RouterProvider router={router} />
        </MagicUserProvider>
      </MagicProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
