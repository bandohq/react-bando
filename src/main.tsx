import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import MagicProvider from '@hooks/useMagicLinkAuth/MagicProvider';
import MagicUserProvider from '@hooks/useUser/MagicUserProvider';

import router from 'routes/index.tsx';
import theme from '@config/theme.ts';

import '@config/axios';
import '@config/sentry';
import './translations';
import './index.css';

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
