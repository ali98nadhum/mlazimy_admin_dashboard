import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png}'],
      },
      manifest: {
        name: 'Admin-dashboard',
        short_name: 'Dashboard',
        description: 'A platform for uploading and sharing university lectures',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon2.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
