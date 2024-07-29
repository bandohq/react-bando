import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import MagicProvider from '@hooks/useMagicLinkAuth/MagicProvider';
import MagicUserProvider from '@hooks/useUser/MagicUserProvider';
import RemoteConfigProvider from '@hooks/useRemoteConfig/RemoteConfigProvider';

import initFirebase from '@config/firebase';
import initTapfiliate from '@config/tapfiliate';

import router from 'routes/index.tsx';
import theme from '@config/theme.ts';
import { setupDateLocale } from '@helpers/getUserLanguage';

import '@config/axios';
import '@config/sentry';
import './translations';
import './index.css';

setupDateLocale();
initFirebase();
initTapfiliate();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RemoteConfigProvider>
        <MagicProvider>
          <MagicUserProvider>
            <RouterProvider router={router} />
          </MagicUserProvider>
        </MagicProvider>
      </RemoteConfigProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
