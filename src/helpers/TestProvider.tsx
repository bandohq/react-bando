import { ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@translations/index';

import theme from '@config/theme';

export default function TestProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}
