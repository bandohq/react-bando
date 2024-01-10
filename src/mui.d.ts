// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    ink: {
      i900: string;
      i700: string;
      i500: string;
      i300: string;
      i200: string;
      i100: string;
      i000: string;
    };
  }

  interface PaletteOptions {
    ink: {
      i900: string;
      i700: string;
      i500: string;
      i300: string;
      i200: string;
      i100: string;
      i000: string;
    };
  }
}
