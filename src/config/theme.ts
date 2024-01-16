import { createTheme } from '@mui/material';
import { responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#40B494',
      light: '#E0FEF6',
      dark: '#393F44',
      contrastText: '#FFFFFF',
    },
    secondary: { main: '#5CC9AB' },
    ink: {
      i900: '#212121',
      i700: '#393F44',
      i600: '#3D3D3D',
      i500: '#686F73',
      i300: '#BFC3C7',
      i200: '#E6E7E9',
      i100: '#F2F2F2',
      i000: '#FFFFFF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: [
      'TWK Everett',
      'DM Sans',
      '-apple-system',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default responsiveFontSizes(theme);
