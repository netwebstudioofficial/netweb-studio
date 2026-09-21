import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'netlify-forms-dev-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && (req.url === '/' || req.url === '/index.html' || req.url?.startsWith('/?'))) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              res.end('OK');
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
