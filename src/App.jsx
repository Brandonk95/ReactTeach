import { useEffect, useState } from 'react';
import { isLessonDone, lessons, lessonsById, playground, steps, units } from './course/index.js';
import { useProgress } from './lib/progress.js';
import { Sidebar } from './components/Sidebar.jsx';
import { Home } from './components/Home.jsx';
import { ExerciseView } from './components/ExerciseView.jsx';
import { QuizView } from './components/QuizView.jsx';

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === 'playground') return { page: 'lesson', id: 'playground' };
  const m = /^lesson\/([\w-]+(?:\/practice)?)/.exec(hash);
  if (m && lessonsById[m[1]]) return { page: 'lesson', id: m[1] };
  return { page: 'home' };
}

function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useRoute();
  const progress = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const doneCount = lessons.filter((l) => isLessonDone(l, progress.completed)).length;

  const lesson = route.page === 'lesson' ? (route.id === 'playground' ? playground : lessonsById[route.id]) : null;
  const index = lesson ? steps.indexOf(lesson) : -1;
  const prev = index > 0 ? steps[index - 1] : null;
  const next = index >= 0 && index < steps.length - 1 ? steps[index + 1] : null;
  const unitIndex = lesson ? units.findIndex((u) => u.id === lesson.unitId) : -1;
  // A practice step is numbered with its parent lesson.
  const baseLesson = lesson?.isPractice ? lessonsById[lesson.parentId] : lesson;
  const { visit } = progress;

  useEffect(() => {
    if (lesson && lesson.id !== 'playground') visit(lesson.id);
    document.title = lesson ? `${lesson.title} · ReactTeach` : 'ReactTeach: React for Python Developers';
  }, [lesson, visit]);

  return (
    <div className="app">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle lesson list">
          ☰
        </button>
        <a href="#/" className="brand">
          <span className="brand-logo">⚛</span> ReactTeach
        </a>
        {lesson && (
          <div className="crumbs">
            {unitIndex >= 0 ? (
              <>
                <span className="muted">
                  Unit {unitIndex + 1} · {units[unitIndex].lessons.indexOf(baseLesson) + 1}/{units[unitIndex].lessons.length}
                  {lesson.isPractice ? ' · Part 2/2' : baseLesson.practice ? ' · Part 1/2' : ''}
                </span>
                <span className="crumb-title">{lesson.title}</span>
                {progress.completed[lesson.id] && <span className="done-chip">✓ Complete</span>}
              </>
            ) : (
              <span className="crumb-title">{lesson.title}</span>
            )}
          </div>
        )}
        <div className="topbar-right">
          {lesson && unitIndex >= 0 && (
            <nav className="lesson-nav">
              <a className={`btn btn-ghost ${prev ? '' : 'disabled'}`} href={prev ? `#/lesson/${prev.id}` : undefined} aria-disabled={!prev}>
                ← Prev
              </a>
              <a className={`btn btn-ghost ${next ? '' : 'disabled'}`} href={next ? `#/lesson/${next.id}` : undefined} aria-disabled={!next}>
                Next →
              </a>
            </nav>
          )}
          {progress.storage === 'error' && (
            <span className="save-warn" title="The dev server didn't accept the last save. Progress is still kept in this browser.">
              ⚠ Not saved to file
            </span>
          )}
          <div className="mini-progress" title={`${doneCount} of ${lessons.length} lessons complete`}>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${(doneCount / lessons.length) * 100}%` }} />
            </div>
            <span>{Math.round((doneCount / lessons.length) * 100)}%</span>
          </div>
        </div>
      </header>

      <Sidebar currentId={lesson?.id} completed={progress.completed} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="main">
        {/* Wait for progress.json so the editor opens with the saved code. */}
        {progress.storage === 'loading' && <div className="empty">Loading your progress…</div>}
        {progress.storage !== 'loading' && <Routes lesson={lesson} progress={progress} next={next} />}
      </main>
    </div>
  );
}

function Routes({ lesson, progress, next }) {
  return (
    <>
      {!lesson && <Home progress={progress} />}
      {lesson?.kind === 'quiz' && <QuizView key={lesson.id} lesson={lesson} progress={progress} next={next} />}
      {lesson && lesson.kind !== 'quiz' && <ExerciseView key={lesson.id} lesson={lesson} progress={progress} next={next} />}
    </>
  );
}
