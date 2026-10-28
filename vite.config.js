import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';

const PROGRESS_FILE = fileURLToPath(new URL('./progress.json', import.meta.url));

// Serves /api/progress so the app can keep course progress in progress.json
// next to the project, instead of only in the browser's localStorage.
function progressFile() {
  const handler = (req, res) => {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      res.end(existsSync(PROGRESS_FILE) ? readFileSync(PROGRESS_FILE, 'utf8') : 'null');
      return;
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          // Write to a temp file first so a crash mid-write can't corrupt the real file.
          const tmp = `${PROGRESS_FILE}.tmp`;
          writeFileSync(tmp, JSON.stringify(data, null, 2));
          renameSync(tmp, PROGRESS_FILE);
          res.statusCode = 204;
        } catch {
          res.statusCode = 400;
        }
        res.end();
      });
      return;
    }
    res.statusCode = 405;
    res.end();
  };
  return {
    name: 'progress-file',
    configureServer(server) {
      server.middlewares.use('/api/progress', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/progress', handler);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), progressFile()],
  server: {
    watch: { ignored: ['**/progress.json', '**/progress.json.tmp'] },
  },
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
