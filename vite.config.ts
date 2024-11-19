import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update service worker
      manifest: {
        name: 'BlackAt',
        short_name: 'BlackAt',
        description: 'unlocking the potential of every black executive and vendor',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === '/assets',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === '',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 5 * 60
              },
            },
          },
        ],
      },
    }),
  ],
});
