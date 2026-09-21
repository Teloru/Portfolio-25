import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Match static hosting's directory redirect for this multipage entry.
const mediaKitRedirect = (): Plugin => {
  const configure: NonNullable<Plugin['configureServer']> = (server) => {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url || '/', 'http://localhost');
      if (url.pathname !== '/media-kit') return next();
      res.writeHead(302, { Location: `/media-kit/${url.search}` });
      res.end();
    });
  };
  return { name: 'media-kit-directory-redirect', configureServer: configure, configurePreviewServer: configure };
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), mediaKitRedirect()],
      base: '/',
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            gamescom: path.resolve(__dirname, 'gamescom/index.html'),
            mediaKit: path.resolve(__dirname, 'media-kit/index.html'),
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
