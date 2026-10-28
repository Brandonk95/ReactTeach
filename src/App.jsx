import { useEffect, useState } from 'react';
import { isLessonDone, lessons, lessonsById, playground, steps, units } from './course/index.js';
import { useProgress } from './lib/progress.js';
import { useAuth } from './lib/pocketbase.js';
import { Login } from './components/Login.jsx';
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
  const auth = useAuth();
  if (auth.checking) return <div className="empty">Checking your session…</div>;
  if (!auth.user) return <Login onSignIn={auth.signIn} onSignUp={auth.signUp} />;
  // Keyed by user so switching accounts starts from a clean slate.
  return <Course key={auth.user.id} user={auth.user} onSignOut={auth.signOut} />;
}

const SAVE_LABELS = {
  loading: 'Loading…',
  saving: 'Saving…',
  synced: 'Saved to your account',
  offline: "Offline: saving in this browser until the server is back",
  error: "The server rejected the last save. Progress is kept in this browser.",
};

function Course({ user, onSignOut }) {
  const route = useRoute();
  const progress = useProgress(user);
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
          {(progress.status === 'offline' || progress.status === 'error') && (
            <span className="save-warn" title={SAVE_LABELS[progress.status]}>
              ⚠ {progress.status === 'offline' ? 'Offline' : 'Not saved'}
            </span>
          )}
          <div className="mini-progress" title={`${doneCount} of ${lessons.length} lessons complete`}>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${(doneCount / lessons.length) * 100}%` }} />
            </div>
            <span>{Math.round((doneCount / lessons.length) * 100)}%</span>
          </div>
          <UserMenu user={user} status={progress.status} onSignOut={onSignOut} />
        </div>
      </header>

      <Sidebar currentId={lesson?.id} completed={progress.completed} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="main">
        {/* Wait for the account's progress so the editor opens with the saved code. */}
        {progress.status === 'loading' && <div className="empty">Loading your progress…</div>}
        {progress.status !== 'loading' && <Routes lesson={lesson} progress={progress} next={next} />}
      </main>
    </div>
  );
}

function UserMenu({ user, status, onSignOut }) {
  const [open, setOpen] = useState(false);
  const initial = (user.name || user.email || '?').trim()[0].toUpperCase();
  return (
    <div className="user-menu">
      <button className="avatar" onClick={() => setOpen((o) => !o)} aria-label="Account menu" aria-expanded={open}>
        {initial}
      </button>
      {open && (
        <>
          <div className="menu-scrim" onClick={() => setOpen(false)} />
          <div className="menu" role="menu">
            <div className="menu-email">{user.email}</div>
            <div className={`menu-status status-${status}`}>{SAVE_LABELS[status]}</div>
            <button className="menu-item" role="menuitem" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </>
      )}
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
