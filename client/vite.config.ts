import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Middleware to serve admin.html for all /admin routes
const adminSpaPlugin = () => ({
  name: 'admin-spa-rewrite',
  configureServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      if (req.url && (req.url === '/admin' || req.url.startsWith('/admin/')) && !req.url.includes('.')) {
        req.url = '/admin.html';
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    adminSpaPlugin(),
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
