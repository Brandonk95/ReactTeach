// Runs this project's PocketBase: database in pocketbase/pb_data, migrations
// from pocketbase/pb_migrations, and (for `serve`) the built site in dist/.
//
//   npm run pb                          -> serve on http://127.0.0.1:8090
//   npm run pb -- serve --http=0.0.0.0:8090
//   npm run pb -- superuser upsert EMAIL PASSWORD
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const bin = join(root, 'pocketbase', process.platform === 'win32' ? 'pocketbase.exe' : 'pocketbase');

if (!existsSync(bin)) {
  console.error(`PocketBase was not found at ${bin}.\nDownload it from https://github.com/pocketbase/pocketbase/releases and put the executable in the pocketbase/ folder.`);
  process.exit(1);
}

const [command = 'serve', ...rest] = process.argv.slice(2);
const args = [command, `--dir=${join(root, 'pocketbase', 'pb_data')}`, `--migrationsDir=${join(root, 'pocketbase', 'pb_migrations')}`];
if (command === 'serve') args.push(`--publicDir=${join(root, 'dist')}`);

const child = spawn(bin, [...args, ...rest], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
