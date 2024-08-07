import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import env from 'vite-plugin-environment';
import check from 'vite-plugin-checker';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  const envVars = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        '@config': path.resolve(__dirname, 'src/config'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@translations': path.resolve(__dirname, 'src/translations'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
      check({ typescript: true }),
      env('all'),
      createHtmlPlugin({
        viteNext: true,
        minify: true,
        inject: {
          data: {
            title: envVars.VITE_APP_TITLE,
            description: envVars.VITE_APP_DESCRIPTION,
            heapId: envVars.VITE_HEAP_ID,
            googleMapsApiKey: envVars.VITE_GOOGLE_MAPS_API_KEY,
          },
        },
      }),
    ],
    build: {
      sourcemap: true,
    },
    optimizeDeps: {
      // This is a temporary fix for the Grid2 issue
      // https://github.com/mui/material-ui/issues/32727#issuecomment-1697253782
      include: [
        '@mui/material/Unstable_Grid2',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material/Tooltip',
      ],
    },
  });
};
