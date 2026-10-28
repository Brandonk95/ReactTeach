// Runs inside the preview <iframe>. The parent page posts student code here;
// we compile it, run it, render <App />, run the lesson's tests, and post results back.
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { compile, stripComments } from './compile.js';
import { errorTip } from '../lib/errorTips.js';
import { createHelpers, show, TestFailure } from './testkit.js';
import { installMockApi } from './mockApi.js';
import { lessonsById } from '../course/index.js';

const post = (msg) => window.parent.postMessage({ source: 'reactteach-sandbox', ...msg }, '*');

// ---- console capture -------------------------------------------------------
const logs = [];
const IGNORED = [/Download the React DevTools/];
const MAX_POSTED = 500;
let posted = 0;
function formatArg(a) {
  if (typeof a === 'string') return a;
  if (a instanceof Error) return `${a.name}: ${a.message}`;
  if (a instanceof Element) return a.outerHTML.slice(0, 200);
  return show(a);
}
for (const level of ['log', 'info', 'warn', 'error']) {
  const original = console[level].bind(console);
  console[level] = (...args) => {
    original(...args);
    let text = args.map(formatArg).join(' ');
    // React formats warnings with %s placeholders
    if (typeof args[0] === 'string' && args[0].includes('%s')) {
      let i = 1;
      text = args[0].replace(/%s/g, () => formatArg(args[i++]));
    }
    if (IGNORED.some((re) => re.test(text))) return;
    if (level === 'log' || level === 'info') logs.push(text);
    // Cap what we send so a runaway loop can't flood the page.
    if (++posted < MAX_POSTED) post({ type: 'console', level, text });
    else if (posted === MAX_POSTED) post({ type: 'console', level: 'warn', text: `Over ${MAX_POSTED} lines were logged, so the rest are hidden.` });
  };
}

// window.print() is a real browser function (it opens the print dialog!), so
// Python's print("hi") would silently do the wrong thing. Make it fail helpfully.
window.print = () => {
  throw new ReferenceError('print is not defined');
};

// ---- infinite loop protection ---------------------------------------------
// The timestamp is refreshed whenever the event loop is free. If a loop keeps
// the thread busy for 3 seconds, __guard throws.
let lastFree = performance.now();
setInterval(() => (lastFree = performance.now()), 100);
let loopCount = 0;
function __guard() {
  if ((++loopCount & 0x3fff) === 0 && performance.now() - lastFree > 3000) {
    lastFree = performance.now();
    throw new RangeError('Your loop ran for over 3 seconds, so it was stopped. Is there an infinite loop? Check that your loop condition eventually becomes false.');
  }
}

// ---- errors ----------------------------------------------------------------
function lineOf(err) {
  const m = /your-code\.js:(\d+):(\d+)/.exec(err?.stack || '');
  if (m) return Number(m[1]) - 2;
  // Compile errors from Sucrase end with "(line:column)"
  const c = /\((\d+):(\d+)\)\s*$/.exec(err?.message || '');
  return c ? Number(c[1]) : null;
}
function reportError(err, phase) {
  const line = lineOf(err);
  post({
    type: 'error',
    phase,
    name: err?.name || 'Error',
    message: (err?.message || String(err)).replace(/\s*\(\d+:\d+\)\s*$/, ''),
    line,
  });
}
window.addEventListener('error', (e) => reportError(e.error || { message: e.message }, 'runtime'));
window.addEventListener('unhandledrejection', (e) => reportError(e.reason, 'async'));

// Forms that forget e.preventDefault() would reload this page. Stop that, but tell the student.
window.addEventListener('submit', (e) => {
  if (!e.defaultPrevented) {
    e.preventDefault();
    post({
      type: 'console',
      level: 'warn',
      text: 'A form was submitted without calling event.preventDefault(). In a real app the whole page would reload! Add event.preventDefault() to your onSubmit handler.',
    });
  }
});

installMockApi();

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error) {
    reportError(error, 'render');
  }
  render() {
    if (this.state.error) {
      return <div className="__crash">💥 {this.state.error.name}: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

// ---- running student code --------------------------------------------------
function requireModule(name) {
  if (name === 'react') return React;
  if (name === 'react-dom/client' || name === 'react-dom') return ReactDOMClient;
  throw new Error(`The module "${name}" isn't available in this sandbox. Only "react" can be imported here.`);
}

const IDENT = /^[A-Za-z_$][\w$]*$/;

function execute(source, expose) {
  const body = compile(source);
  const names = expose.filter((n) => IDENT.test(n));
  const ret = `\nreturn { ${names.map((n) => `${n}: typeof ${n} !== "undefined" ? ${n} : undefined`).join(', ')} };\n//# sourceURL=your-code.js`;
  const params = ['require', 'exports', 'module', 'React', 'useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useReducer', 'useContext', 'createContext', 'Fragment', '__guard'];
  const fn = new Function(...params, body + ret);
  const module = { exports: {} };
  const found = fn(requireModule, module.exports, module, React, React.useState, React.useEffect, React.useRef, React.useMemo, React.useCallback, React.useReducer, React.useContext, React.createContext, React.Fragment, __guard);
  const result = { ...found };
  for (const [k, v] of Object.entries(module.exports)) {
    if (k === 'default') {
      if (!result.App && typeof v === 'function') result.App = v;
    } else if (result[k] === undefined) result[k] = v;
  }
  return result;
}

async function runTests(tests, ctx) {
  const results = [];
  for (const test of tests) {
    const t = createHelpers(ctx);
    try {
      await Promise.race([
        Promise.resolve(test.run(t)),
        new Promise((_, rej) => setTimeout(() => rej(new TestFailure('This test timed out after 4 seconds.')), 4000)),
      ]);
      results.push({ name: test.name, passed: true });
    } catch (err) {
      let message = err instanceof TestFailure ? err.message : `${err?.name || 'Error'}: ${err?.message || err}`;
      const tip = err instanceof TestFailure ? null : errorTip(err?.message);
      if (tip) message += `${/[.!?]$/.test(message) ? '' : '.'} ${tip}`;
      results.push({ name: test.name, passed: false, message });
    } finally {
      t.cleanup();
    }
  }
  return results;
}

async function run({ code, lessonId, check }) {
  const lesson = lessonsById[lessonId] || {};
  const isReact = lesson.kind === 'react';
  const expose = [...new Set([...(lesson.expose || []), ...(isReact ? ['App'] : [])])];

  let exports;
  try {
    exports = execute(code, expose);
  } catch (err) {
    reportError(err, err instanceof SyntaxError || /\(\d+:\d+\)/.test(err.message) ? 'syntax' : 'runtime');
    if (check) post({ type: 'tests', results: (lesson.tests || []).map((t) => ({ name: t.name, passed: false, message: 'Your code has an error, so this test could not run. Fix the error shown in the Console first.' })) });
    post({ type: 'done' });
    return;
  }

  if (isReact) {
    if (typeof exports.App === 'function') {
      ReactDOMClient.createRoot(document.getElementById('root')).render(
        <ErrorBoundary>
          <exports.App />
        </ErrorBoundary>,
      );
    } else if (!lesson.optionalApp) {
      reportError({ name: 'Missing App', message: 'Could not find a component named App. Define `function App() { return (...); }` and the preview will render it.' }, 'runtime');
    }
  }

  if (check && lesson.tests?.length) {
    await new Promise((r) => setTimeout(r, 50));
    // Tests that inspect the code see it without comments.
    const results = await runTests(lesson.tests, { exports, logs, source: stripComments(code) });
    post({ type: 'tests', results });
  }
  post({ type: 'done' });
}

window.addEventListener('message', (e) => {
  if (e.source !== window.parent || e.data?.type !== 'run') return;
  run(e.data);
});

post({ type: 'ready' });
