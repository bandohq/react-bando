import { ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import theme from '@config/theme';

export default function TestProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
}
