import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
    strictPort: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  clearScreen: false,

  // ✅ Add this block to control the build output
  build: {
    outDir: 'dist',         // Output directory (default is 'dist')
    sourcemap: true,        // Optional: includes source maps for debugging
    emptyOutDir: true,      // Ensures old builds are wiped
    minify: 'esbuild',      // Fast and safe minification
    target: 'esnext',       // Or set a lower target like 'es2017' if needed
  },
})
