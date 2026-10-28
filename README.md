# ReactTeach: React for Python Developers

An interactive, CodeHS-style course that teaches JavaScript and React to people who already know Python. Every concept is shown side by side with its Python equivalent. You write code in a real in-browser editor, see a live preview, and automatic tests grade each exercise.

## Running it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173). To build a static site, which you can host anywhere, including GitHub Pages:

```bash
npm run build
```

The output in `dist/` uses relative paths, so it works from any folder.

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
- Progress and code are **saved automatically** to `progress.json` in the project folder (see below)

## Your progress file

While the app runs through `npm run dev` (or `npm run preview`), every change is saved to **`progress.json`** in the project root, with the browser's localStorage kept as a cache. On startup the two are merged: completed lessons from both are kept, and the newer saved code wins.

To move to another device, just bring `progress.json` along with the project (it's not git-ignored, so committing and pushing it works too). On a static host with no dev server, progress falls back to the browser only. Use **Export backup / Import backup** at the bottom of the home page to carry it over by hand.

## How it works

| Path | Role |
|---|---|
| `src/course/lessons/*.md` | Lesson prose, instructions, starter code, solution and hints, split by `@@ section` markers. ```` ```compare ```` blocks put Python and JS side by side (separated by a `////` line). |
| `src/course/units.js` | Course structure, tests, and quiz questions |
| `src/sandbox/` | Runs inside the preview `<iframe>`: compiles JSX with Sucrase, runs student code, renders `<App />`, runs tests (`testkit.js`) |
| `src/components/` | The course UI: workspace, editor (CodeMirror), quizzes, sidebar |
| `src/lib/` | Markdown rendering, progress storage, Python-habit linting, error tips |

### Adding a lesson

1. Create `src/course/lessons/my-lesson.md` with sections `@@ instructions`, `@@ starter`, `@@ solution` and one or more `@@ hint` (the text before the first marker is the lesson content).
2. Add `{ id: 'my-lesson', title: '...', kind: 'react' | 'js', expose: [...], tests: [...] }` to a unit in `units.js`. Tests receive helpers like `render`, `click`, `type`, `button`, `$`, `text`, `logs`, `exports` and `expect`.
