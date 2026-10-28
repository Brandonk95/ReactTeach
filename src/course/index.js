// Course structure. Each lesson's prose, starter code, solution and hints live in
// ./lessons/<id>.md; tests and quiz questions live here because they are code.
import { units as baseUnits } from './units.js';
import { unitTests } from './unitTests.js';
import { practice } from './practice.js';

// Every unit ends with its unit test.
const rawUnits = baseUnits.map((unit) => ({ ...unit, lessons: unitTests[unit.id] ? [...unit.lessons, unitTests[unit.id]] : unit.lessons }));

const files = import.meta.glob('./lessons/*.md', { query: '?raw', import: 'default', eager: true });

// Splits a lesson file on "@@ section" marker lines.
function parseLesson(text) {
  const out = { content: '', hints: [] };
  let key = 'content';
  let buf = [];
  const flush = () => {
    const value = buf.join('\n').replace(/^\n+|\s+$/g, '');
    if (key === 'hint') out.hints.push(value);
    else out[key] = value;
    buf = [];
  };
  for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
    const m = /^@@\s*(\w+)\s*$/.exec(line);
    if (m) {
      flush();
      key = m[1];
    } else buf.push(line);
  }
  flush();
  return out;
}

const EMPTY_STARTER = {
  js: '// Write your code here.\n',
  react: '// Write your code here. Remember: the preview renders a component named App.\n',
};

// Builds the practice step that follows a lesson, from ./lessons/<id>.practice.md.
function buildPractice(lesson) {
  const file = files[`./lessons/${lesson.id}.practice.md`];
  const spec = practice[lesson.id];
  if (!file || !spec) return null;
  const parsed = parseLesson(file);
  return {
    ...spec,
    ...parsed,
    id: `${lesson.id}/practice`,
    parentId: lesson.id,
    isPractice: true,
    unitId: lesson.unitId,
    kind: lesson.kind,
    title: `Practice: ${lesson.title}`,
    starter: parsed.starter || EMPTY_STARTER[lesson.kind],
  };
}

export const units = rawUnits.map((unit) => ({
  ...unit,
  lessons: unit.lessons.map((lesson) => {
    const file = files[`./lessons/${lesson.id}.md`];
    const full = { ...lesson, unitId: unit.id, ...(file ? parseLesson(file) : {}) };
    return { ...full, practice: buildPractice(full) };
  }),
}));

// Lessons as listed in the course (practice steps hang off their lesson).
export const lessons = units.flatMap((u) => u.lessons);
// Every page in order, for Prev/Next: each lesson followed by its practice.
export const steps = lessons.flatMap((l) => (l.practice ? [l, l.practice] : [l]));
export const lessonsById = Object.fromEntries(steps.map((l) => [l.id, l]));

// A lesson counts as done only once its practice is done too.
export const isLessonDone = (lesson, completed) => Boolean(completed[lesson.id] && (!lesson.practice || completed[lesson.practice.id]));

export const playground = {
  id: 'playground',
  title: 'Playground',
  kind: 'react',
  optionalApp: true,
  content: `## Playground\n\nA free-form sandbox. Write any JavaScript or React here: \`console.log\` output appears in the **Console** tab, and if you define a component named \`App\` it shows up in **Preview**.\n\nNothing here is graded, so experiment freely. Your code is saved automatically.`,
  starter: `import { useState } from "react";\n\nfunction App() {\n  const [likes, setLikes] = useState(0);\n  return (\n    <div>\n      <h1>Playground</h1>\n      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>\n    </div>\n  );\n}\n\nconsole.log("Hello from the playground!");\n`,
  hints: [],
  tests: [],
};
lessonsById.playground = playground;
