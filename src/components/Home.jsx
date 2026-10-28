import { isLessonDone, lessons, lessonsById, steps, units } from '../course/index.js';
import { lessonState } from './Sidebar.jsx';

const STORAGE_LABELS = {
  file: '💾 Progress and code are saved to progress.json in the project folder.',
  local: 'Progress is saved in this browser only (no dev server). Export a backup to move it.',
  error: "⚠ Couldn't write progress.json. Progress is kept in this browser for now.",
};

function exportProgress({ completed, code, lastLesson, updatedAt }) {
  const blob = new Blob([JSON.stringify({ completed, code, lastLesson, updatedAt }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `reactteach-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function importProgress(e, progress) {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (window.confirm('Replace your current progress with this backup?')) progress.importData(data);
  } catch (err) {
    window.alert(err instanceof SyntaxError ? 'That file is not valid JSON.' : err.message);
  }
}

export function Home({ progress }) {
  const { completed, lastLesson } = progress;
  const doneCount = lessons.filter((l) => isLessonDone(l, completed)).length;
  const firstIncomplete = steps.find((s) => !completed[s.id]);
  const resume = lastLesson && lessonsById[lastLesson] && !completed[lastLesson] ? lastLesson : firstIncomplete?.id;

  return (
    <div className="home scroll">
      <div className="home-inner">
        <header className="hero">
          <div className="hero-badge">🐍 → ⚛️</div>
          <h1>React for Python Developers</h1>
          <p className="hero-sub">
            You already know how to program. This interactive course teaches you JavaScript and React by comparing everything to the Python you know. Read a short lesson, write real code in the browser, and get instant feedback from automatic tests.
          </p>
          <div className="hero-actions">
            {resume ? (
              <a className="btn btn-check btn-lg" href={`#/lesson/${resume}`}>
                {doneCount === 0 ? 'Start the course →' : 'Continue where you left off →'}
              </a>
            ) : (
              <span className="hero-done">🏆 You finished the course! Try the playground.</span>
            )}
            <a className="btn btn-lg" href="#/playground">
              Open the playground
            </a>
          </div>
          <div className="overall">
            <div className="bar">
              <div className="bar-fill" style={{ width: `${(doneCount / lessons.length) * 100}%` }} />
            </div>
            <span>
              {doneCount} of {lessons.length} lessons complete
            </span>
          </div>
        </header>

        <div className="features">
          <div>
            <strong>🐍 Python side-by-side</strong>
            <span>Every concept is shown next to its Python equivalent.</span>
          </div>
          <div>
            <strong>💻 Code in the browser</strong>
            <span>A real editor and a live preview. Nothing to install.</span>
          </div>
          <div>
            <strong>🧪 Instant feedback</strong>
            <span>Automatic tests check your work, plus hints when you're stuck.</span>
          </div>
        </div>

        <div className="units">
          {units.map((unit, ui) => {
            const done = unit.lessons.filter((l) => isLessonDone(l, completed)).length;
            return (
              <section key={unit.id} className="unit-card">
                <div className="unit-head">
                  <span className="unit-num">Unit {ui + 1}</span>
                  <span className="unit-count">
                    {done}/{unit.lessons.length}
                  </span>
                </div>
                <h2>{unit.title}</h2>
                <p>{unit.blurb}</p>
                <div className="bar small">
                  <div className="bar-fill" style={{ width: `${(done / unit.lessons.length) * 100}%` }} />
                </div>
                <ol>
                  {unit.lessons.map((l) => {
                    const state = lessonState(l, completed);
                    return (
                    <li key={l.id}>
                      <a href={`#/lesson/${state === 'partial' ? l.practice.id : l.id}`} className={state}>
                        <span className="check" title={state === 'partial' ? 'Practice not done yet' : undefined}>
                          {state === 'done' ? '✓' : state === 'partial' ? '◐' : '○'}
                        </span>
                        {l.title}
                        {l.kind === 'quiz' && <span className="tag">quiz</span>}
                        {l.assessment && <span className="tag tag-test">unit test</span>}
                        {state === 'partial' && <span className="tag tag-practice">practice left</span>}
                      </a>
                    </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>

        <footer className="home-foot">
          <span>{STORAGE_LABELS[progress.storage]}</span>
          <button className="link" onClick={() => exportProgress(progress)}>
            Export backup
          </button>
          <label className="link">
            Import backup
            <input type="file" accept="application/json,.json" hidden onChange={(e) => importProgress(e, progress)} />
          </label>
          <button
            className="link"
            onClick={() => {
              if (window.confirm('Erase all progress and saved code? This cannot be undone.')) progress.resetAll();
            }}
          >
            Reset progress
          </button>
        </footer>
      </div>
    </div>
  );
}
