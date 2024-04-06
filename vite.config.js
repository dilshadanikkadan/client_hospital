import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      'crypto-random-string': 'crypto-random-string/dist/crypto-random-string.browser.js'
    }
  }
});
