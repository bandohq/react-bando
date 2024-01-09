import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { responsiveFontSizes } from '@mui/material/styles';

import App from './App.tsx';
import muiTheme from '@config/theme.ts';
import './index.css';

const theme = responsiveFontSizes(muiTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
