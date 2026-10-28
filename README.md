# ReactTeach: React for Python Developers

An interactive, CodeHS-style course that teaches JavaScript and React to people who already know Python. Every concept is shown side by side with its Python equivalent. You write code in a real in-browser editor, see a live preview, and automatic tests grade each exercise.

## Running it locally

The site needs [PocketBase](https://pocketbase.io) for accounts and saved progress. Download the executable for your OS from the [PocketBase releases](https://github.com/pocketbase/pocketbase/releases) and put it in the `pocketbase/` folder (`pocketbase.exe` on Windows, `pocketbase` on Linux/macOS). It's git-ignored.

```bash
npm install
npm run pb      # terminal 1: PocketBase on http://127.0.0.1:8090
npm run dev     # terminal 2: the site on http://localhost:5173
```

The database lives in `pocketbase/pb_data/` (git-ignored). Its structure comes from `pocketbase/pb_migrations/`, which is applied automatically on start.

## Accounts

Accounts are **invite-only**: public sign-up is turned off, so you create every account yourself.

1. Create a superuser (the admin) once:
   ```bash
   npm run pb -- superuser upsert you@example.com "a-long-password"
   ```
2. Open the dashboard at `/_/` (for example http://127.0.0.1:8090/_/), sign in, go to **Collections → users → New record**, and enter an email and password. Turn on **verified**.
3. Sign in to the site with that account.

Each account's progress is stored in the `progress` collection, one record per user per course. The access rules let a user read and change **only their own** record. Anonymous visitors and other users can't see it.

**Moving old progress:** progress saved before accounts existed (the old `progress.json` and this browser's old cache) is copied into an account the **first time it signs in on the dev server**. The old file is kept as a backup. You can also use **Export backup / Import backup** at the bottom of the home page.

## Deploying to your server

PocketBase serves the whole site (the built `dist/` folder) as well as the API, so a single process runs everything.

1. Copy the project to the server, then put the **Linux** PocketBase executable at `pocketbase/pocketbase` (`chmod +x` it).
2. Build and start:
   ```bash
   npm install
   npm start       # = npm run build && PocketBase serving dist/ on 127.0.0.1:8090
   ```
3. Create the superuser and accounts as described above, using the server's own database.
4. Put a reverse proxy in front for HTTPS. With Caddy:
   ```
   learn.yourdomain.com {
   	reverse_proxy 127.0.0.1:8090
   }
   ```
5. Keep it running with systemd (adjust the user and paths):
   ```ini
   [Unit]
   Description=ReactTeach
   After=network.target

   [Service]
   User=reactteach
   WorkingDirectory=/opt/reactteach
   ExecStart=/usr/bin/node scripts/pocketbase.mjs serve
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

After changing lessons or code, run `npm run build` on the server. PocketBase serves the new files straight away.

**Security checklist**

- Keep PocketBase listening on `127.0.0.1` (the default) so it's only reachable through the proxy.
- Use a strong superuser password. If you can, limit `/_/` to your own IP in Caddy, or reach it through an SSH tunnel.
- Accounts protect progress and code. The lesson content itself is ordinary static files, so if that needs to be private too, add a gate in the proxy (for example Caddy `basic_auth`, Cloudflare Access, or Tailscale).
- Back up `pocketbase/pb_data/`. It holds every account and all progress. The dashboard has a **Backups** page for this.

## What's inside

- **4 units, 25 lessons:** JavaScript for Pythonistas → Thinking in Components → State & Interactivity → Effects, Data & Hooks, ending with a flashcards final project
- **22 graded coding exercises** with 3–4 automatic tests each, progressive hints, and a solution you can reveal
- **A practice step after every coding lesson** (22 total): a short exercise that applies the same idea in a new situation, with a quick recap and less scaffolding. A lesson only counts as complete once its practice is done. Prose and code live in `src/course/lessons/<id>.practice.md` and tests in `src/course/practice.js`.
- **3 quizzes** with explanations and retries
- **4 unit tests**, one at the end of each unit: open-ended programs (Gradebook, Product Catalog, Expense Tracker, User Directory) written from scratch against a grading checklist, with no hints. The sample solution unlocks after you pass. They're defined in `src/course/unitTests.js`.
- **Playground** for free experimentation
- **Python habit detector:** flags `print()`, `True`, `elif`, `len()`, `.append()` and similar, and suggests the JavaScript version
- **Friendly error messages** that translate common JS/React errors (with line numbers)
- **Infinite-loop protection**, a built-in **mock API** (`https://api.example.com/...`) for the data-fetching lessons, and a warning when a form forgets `preventDefault()`
- **Accounts:** progress and code are saved to your account in PocketBase and follow you to any device. A browser copy keeps you working if the server is briefly unreachable, and syncs once it's back.

## How it works

| Path | Role |
|---|---|
| `src/course/lessons/*.md` | Lesson prose, instructions, starter code, solution and hints, split by `@@ section` markers. ```` ```compare ```` blocks put Python and JS side by side (separated by a `////` line). |
| `src/course/units.js` | Course structure, tests, and quiz questions |
| `src/sandbox/` | Runs inside the preview `<iframe>`: compiles JSX with Sucrase, runs student code, renders `<App />`, runs tests (`testkit.js`) |
| `src/components/` | The course UI: workspace, editor (CodeMirror), quizzes, sidebar |
| `src/lib/` | Markdown rendering, PocketBase sign-in (`pocketbase.js`), progress sync (`progress.js`), Python-habit linting, error tips |
| `pocketbase/pb_migrations/` | Database structure and access rules (invite-only users, private progress records) |
| `scripts/pocketbase.mjs` | Starts PocketBase with this project's data, migrations and built site (`npm run pb`, `npm start`) |

### Adding a lesson

1. Create `src/course/lessons/my-lesson.md` with sections `@@ instructions`, `@@ starter`, `@@ solution` and one or more `@@ hint` (the text before the first marker is the lesson content).
2. Add `{ id: 'my-lesson', title: '...', kind: 'react' | 'js', expose: [...], tests: [...] }` to a unit in `units.js`. Tests receive helpers like `render`, `click`, `type`, `button`, `$`, `text`, `logs`, `exports` and `expect`.
