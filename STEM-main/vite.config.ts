import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'icons/*'],
        manifest: {
          name: 'PlantCare AI — Chẩn đoán bệnh cây thông minh & Quản lý farm IoT',
          short_name: 'PlantCare AI',
          description: 'Ứng dụng AI phát hiện bệnh cây trồng, quản lý trang trại IoT với 261 bệnh cây trồng offline',
          theme_color: '#059669',
          background_color: '#000000',
          display: 'standalone',
          orientation: 'portrait',
          categories: ['agriculture', 'education', 'productivity', 'utilities'],
          start_url: '/',
          scope: '/',
          icons: [
            { src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
            { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
          ],
          shortcuts: [
            { name: 'Quét cây', short_name: 'Quét', url: '/', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
            { name: 'IoT Dashboard', short_name: 'Farm', url: '/dashboard', icons: [{ src: '/icons/icon-192.svg', sizes: '192x192' }] },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
              handler: 'CacheFirst',
              options: { cacheName: 'google-fonts', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 } },
            },
            {
              urlPattern: /^https:\/\/server\.arcgisonline\.com/,
              handler: 'CacheFirst',
              options: { cacheName: 'map-tiles', expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 } },
            },
            {
              urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
              handler: 'CacheFirst',
              options: { cacheName: 'cdn-assets', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 } },
            },
            {
              urlPattern: /^https:\/\/api\.groq\.com/,
              handler: 'NetworkFirst',
              options: { cacheName: 'groq-api', expiration: { maxEntries: 10, maxAgeSeconds: 60 } },
            },
          ],
        },
      }),
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      'process.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY),
      'process.env.VITE_GROQ_API_KEY': JSON.stringify(env.VITE_GROQ_API_KEY || env.GROQ_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 8000,
      host: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['lucide-react', 'motion', 'clsx', 'tailwind-merge'],
            ai: ['@google/genai', 'groq-sdk', 'openai'],
            charts: ['recharts', 'leaflet', 'react-leaflet'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      compression: 'gzip',
    },
    preview: {
      port: 4173,
    },
  };
});
