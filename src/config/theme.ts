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
    secondary: { main: '#59c6a8' },
    ink: {
      i950: '#000000',
      i900: '#212121',
      i800: '#3A3E3D',
      i700: '#393F44',
      i600: '#3D3D3D',
      i500: '#686F73',
      i400: '#9A9A9A',
      i300: '#BFC3C7',
      i250: '#D9D9D9',
      i200: '#E6E7E9',
      i150: '#F6F7F9',
      i100: '#F2F2F2',
      i000: '#FFFFFF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1440,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: [
      'Kanit',
      'TWK Everett',
      '-apple-system',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  transitions: {
    duration: {
      enteringScreen: 400,
      leavingScreen: 350,
    },
  },
});

export default responsiveFontSizes(theme);
