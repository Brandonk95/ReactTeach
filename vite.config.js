import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';

const LEGACY_PROGRESS = fileURLToPath(new URL('./progress.json', import.meta.url));

// Progress used to be saved to progress.json by the dev server. It now lives in
// PocketBase, but the old file stays readable (dev only) so it can be imported
// into an account on first sign-in.
function legacyProgressFile() {
  return {
    name: 'legacy-progress-file',
    configureServer(server) {
      server.middlewares.use('/legacy-progress.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(existsSync(LEGACY_PROGRESS) ? readFileSync(LEGACY_PROGRESS, 'utf8') : 'null');
      });
    },
  };
}

// In development the site runs on Vite while PocketBase runs separately
// (`npm run pb`), so its API and dashboard are proxied to keep one origin.
const POCKETBASE = 'http://127.0.0.1:8090';
const proxy = { '/api': POCKETBASE, '/_/': POCKETBASE };

export default defineConfig({
  base: './',
  plugins: [react(), legacyProgressFile()],
  server: { proxy },
  preview: { proxy },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        sandbox: fileURLToPath(new URL('./sandbox.html', import.meta.url)),
      },
    },
  },
});
