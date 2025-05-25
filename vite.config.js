import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, // Increased limit
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['redux', 'react-redux', '@reduxjs/toolkit'],
          framer: ['framer-motion'],
          icons: ['react-icons'],
          charts: ['recharts'], // If you use charts
          utils: ['date-fns', 'axios'], // Common utilities
        },
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
    host: true,
  },
});