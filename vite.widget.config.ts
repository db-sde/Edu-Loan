import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// Base URL that the widget (and the assets it references, like the logo)
// will be served from in production, e.g. "https://calc.yourdomain.com/".
// Set VITE_WIDGET_BASE_URL at build time once the production host is known:
//   VITE_WIDGET_BASE_URL=https://calc.yourdomain.com/ npm run build:widget
const widgetBaseUrl = process.env.VITE_WIDGET_BASE_URL || '/'

// https://vite.dev/config/
export default defineConfig({
  base: widgetBaseUrl,
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    react(),
    tailwindcss(),
    // Inlines the generated CSS into the JS bundle so a single <script>
    // tag is enough to embed the widget in WordPress.
    cssInjectedByJsPlugin(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/widget.tsx',
      name: 'DBEducationLoanWidget',
      formats: ['iife'],
      fileName: () => 'widget.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
})
