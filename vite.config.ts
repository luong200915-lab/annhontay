import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    base: '/annhontay/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      // Exclude data files written by admin sync to prevent HMR reload loops.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: [
          '**/src/data/admin_exported_data.json',
          '**/src/data/cuchiData.ts',
        ],
      },
    },
  };
});
