import { ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import { responsiveFontSizes } from '@mui/material/styles';

import theme from '@config/theme';

export default function TestProvider({ children }: Readonly<PropsWithChildren>) {
  return <ThemeProvider theme={responsiveFontSizes(theme)}>{children}</ThemeProvider>;
}
