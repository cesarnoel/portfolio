import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite pipeline for this project:
//   *.scss  ->  dart-sass (SASS)  ->  PostCSS (Tailwind + Autoprefixer)  ->  *.css bundle
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Keep dart-sass quiet about its legacy JS API deprecations from tooling.
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
