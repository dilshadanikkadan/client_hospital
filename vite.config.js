import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), nodePolyfills({
    protocolImports:true
  })],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      'events': 'rollup-plugin-node-polyfills/polyfills/events',
    }
  }
});
