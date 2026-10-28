import { isLessonDone, units } from '../course/index.js';

const ICONS = { js: '⚡', react: '⚛️', quiz: '❓' };
const STATUS_LABELS = { done: 'completed', partial: 'practice not done yet', todo: 'not completed' };

// 'done' (lesson and practice), 'partial' (lesson only) or 'todo'.
export function lessonState(lesson, completed) {
  if (isLessonDone(lesson, completed)) return 'done';
  return completed[lesson.id] ? 'partial' : 'todo';
}

export function Sidebar({ currentId, completed, open, onClose }) {
  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${open ? 'open' : ''}`} aria-label="Course contents">
        <a className="sidebar-home" href="#/" onClick={onClose}>
          ← Course overview
        </a>
        {units.map((unit, ui) => {
          const done = unit.lessons.filter((l) => isLessonDone(l, completed)).length;
          return (
            <section key={unit.id} className="sidebar-unit">
              <h3>
                <span className="unit-num">Unit {ui + 1}</span>
                {unit.title}
                <span className="unit-count">
                  {done}/{unit.lessons.length}
                </span>
              </h3>
              <ol>
                {unit.lessons.map((lesson) => {
                  const state = lessonState(lesson, completed);
                  return (
                    <li key={lesson.id}>
                      <a
                        href={`#/lesson/${lesson.id}`}
                        className={`sidebar-lesson ${lesson.id === currentId ? 'current' : ''} ${state}`}
                        onClick={onClose}
                      >
                        <span className="lesson-status" aria-label={STATUS_LABELS[state]}>
                          {state === 'done' ? '✓' : state === 'partial' ? '◐' : ''}
                        </span>
                        <span className="lesson-icon">{lesson.assessment ? '📝' : ICONS[lesson.kind]}</span>
                        <span className="lesson-title">{lesson.title}</span>
                      </a>
                      {lesson.practice && (
                        <a
                          href={`#/lesson/${lesson.practice.id}`}
                          className={`sidebar-lesson sidebar-practice ${lesson.practice.id === currentId ? 'current' : ''} ${completed[lesson.practice.id] ? 'done' : ''}`}
                          onClick={onClose}
                        >
                          <span className="lesson-status" aria-label={completed[lesson.practice.id] ? 'completed' : 'not completed'}>
                            {completed[lesson.practice.id] ? '✓' : ''}
                          </span>
                          <span className="lesson-title">🔁 Practice</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
        <section className="sidebar-unit">
          <h3>
            <span className="unit-num">Extra</span>Free practice
          </h3>
          <ol>
            <li>
              <a href="#/playground" className={`sidebar-lesson ${currentId === 'playground' ? 'current' : ''}`} onClick={onClose}>
                <span className="lesson-status" />
                <span className="lesson-icon">🧪</span>
                <span className="lesson-title">Playground</span>
              </a>
            </li>
          </ol>
        </section>
      </nav>
    </>
  );
}
