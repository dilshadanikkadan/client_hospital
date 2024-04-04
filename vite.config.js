import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias:{
      'events': 'rollup-plugin-node-polyfills/polyfills/events'
    }
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  define: {
    global: {},
  },
});
