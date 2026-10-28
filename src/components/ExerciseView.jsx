import { useCallback, useEffect, useRef, useState } from 'react';
import { CodeEditor } from './CodeEditor.jsx';
import { InlineMarkdown, Markdown } from './Markdown.jsx';
import { findPythonHabits } from '../lib/pythonHabits.js';
import { errorTip } from '../lib/errorTips.js';

const SANDBOX_URL = `${import.meta.env.BASE_URL}sandbox.html`;
const RUN_TIMEOUT = 12000;

export function ExerciseView({ lesson, progress, next }) {
  const isReact = lesson.kind === 'react';
  const hasTests = lesson.tests?.length > 0;
  // Unit tests: no hints, and the solution unlocks only after passing.
  const isAssessment = Boolean(lesson.assessment);
  const passedBefore = Boolean(progress.completed[lesson.id]);
  const showSolutionTab = lesson.solution && (!isAssessment || passedBefore);
  const [code, setCode] = useState(() => progress.code[lesson.id] ?? lesson.starter ?? '');
  const [leftTab, setLeftTab] = useState('lesson');
  const [outTab, setOutTab] = useState(isReact ? 'preview' : 'console');
  const [runKey, setRunKey] = useState(0);
  const [entries, setEntries] = useState([]);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('idle');
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionShown, setSolutionShown] = useState(isAssessment);
  const [celebrate, setCelebrate] = useState(false);
  const iframeRef = useRef(null);
  const pending = useRef(null);
  const timer = useRef(null);
  const { saveCode, complete } = progress;

  // Autosave (debounced)
  useEffect(() => {
    const id = setTimeout(() => saveCode(lesson.id, code), 400);
    return () => clearTimeout(id);
  }, [code, lesson.id, saveCode]);

  const run = useCallback(
    (check = false) => {
      const habits = findPythonHabits(code).map((text) => ({ level: 'habit', text }));
      setEntries(habits);
      if (check) {
        setResults(null);
        setOutTab('tests');
      }
      setCelebrate(false);
      setStatus(check ? 'checking' : 'running');
      pending.current = { type: 'run', code, lessonId: lesson.id, check };
      setRunKey((k) => k + 1);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setStatus('idle');
        setEntries((e) => [...e, { level: 'error', text: 'Your code took too long to finish, so it was stopped.' }]);
        setRunKey((k) => k + 1);
      }, RUN_TIMEOUT);
    },
    [code, lesson.id],
  );

  // Messages from the sandbox iframe
  useEffect(() => {
    function onMessage(e) {
      const msg = e.data;
      if (msg?.source !== 'reactteach-sandbox' || e.source !== iframeRef.current?.contentWindow) return;
      if (msg.type === 'ready') {
        if (pending.current) {
          iframeRef.current.contentWindow.postMessage(pending.current, '*');
          pending.current = null;
        }
      } else if (msg.type === 'console') {
        setEntries((list) => [...list, { level: msg.level, text: msg.text }]);
      } else if (msg.type === 'error') {
        const where = msg.line && msg.line > 0 ? ` (line ${msg.line})` : '';
        setEntries((list) => [...list, { level: 'error', text: `${msg.name}: ${msg.message}${where}`, tip: errorTip(msg.message) }]);
        if (msg.phase !== 'async') setOutTab((tab) => (tab === 'tests' ? tab : 'console'));
      } else if (msg.type === 'tests') {
        setResults(msg.results);
        const passed = msg.results.every((r) => r.passed);
        setStatus(passed ? 'passed' : 'failed');
        if (passed) {
          complete(lesson.id);
          setCelebrate(true);
        }
      } else if (msg.type === 'done') {
        clearTimeout(timer.current);
        setStatus((s) => (s === 'running' ? 'idle' : s === 'checking' ? 'failed' : s));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [complete, lesson.id]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Run once on load so the preview shows the starting code.
  const ran = useRef(false);
  useEffect(() => {
    if (!ran.current) {
      ran.current = true;
      run(false);
    }
  }, [run]);

  function reset() {
    if (window.confirm('Reset the editor to the starter code? Your changes will be lost.')) setCode(lesson.starter ?? '');
  }

  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const errorCount = entries.filter((e) => e.level === 'error').length;
  const busy = status === 'running' || status === 'checking';
  const fileName = isReact ? 'App.jsx' : 'script.js';

  return (
    <div className="workspace">
      {/* ---------- left: lesson / hints / solution ---------- */}
      <section className="panel panel-lesson">
        <div className="tabs" role="tablist">
          <Tab id="lesson" current={leftTab} onSelect={setLeftTab}>{isAssessment ? '📝 Assignment' : lesson.isPractice ? '🔁 Practice' : '📖 Lesson'}</Tab>
          {!isAssessment && lesson.hints?.length > 0 && (
            <Tab id="hints" current={leftTab} onSelect={setLeftTab}>💡 Hints</Tab>
          )}
          {showSolutionTab && (
            <Tab id="solution" current={leftTab} onSelect={setLeftTab}>{isAssessment ? '🔑 Sample solution' : '🔑 Solution'}</Tab>
          )}
          {isAssessment && !passedBefore && (
            <span className="tab tab-locked" title="Unlocks when you meet every requirement">🔒 Solution</span>
          )}
        </div>
        <div className="panel-body scroll">
          {leftTab === 'lesson' && (
            <>
              <Markdown text={lesson.content} />
              {lesson.instructions && (
                <div className={`task ${isAssessment ? 'task-test' : ''}`}>
                  <div className="task-label">{isAssessment ? '📋 Requirements' : '🎯 Your task'}</div>
                  <Markdown text={lesson.instructions} />
                  {isAssessment && <Checklist tests={lesson.tests} results={results} />}
                  {hasTests && !isAssessment && (
                    <p className="task-foot">
                      Press <kbd>Run</kbd> to try your code, then <kbd>Check</kbd> to run the {lesson.tests.length} tests.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
          {leftTab === 'hints' && (
            <div className="hints">
              <p className="muted">Hints are revealed one at a time. Try to get as far as you can with each one!</p>
              {lesson.hints.slice(0, hintsShown).map((hint, i) => (
                <div className="hint" key={i}>
                  <div className="hint-label">Hint {i + 1}</div>
                  <Markdown text={hint} />
                </div>
              ))}
              {hintsShown < lesson.hints.length ? (
                <button className="btn" onClick={() => setHintsShown((n) => n + 1)}>
                  Show hint {hintsShown + 1} of {lesson.hints.length}
                </button>
              ) : (
                <p className="muted">That's all the hints. Still stuck? Check the Solution tab.</p>
              )}
            </div>
          )}
          {leftTab === 'solution' && (
            <div className="solution">
              {solutionShown ? (
                <>
                  <p className="muted">Here's one way to solve it. Read it, then try writing it yourself from memory!</p>
                  <div className="solution-code">
                    <CodeEditor value={lesson.solution} readOnly height="auto" />
                  </div>
                  <button
                    className="btn"
                    onClick={() => {
                      if (window.confirm('Replace your code with the solution?')) setCode(lesson.solution);
                    }}
                  >
                    Copy into editor
                  </button>
                </>
              ) : (
                <div className="solution-gate">
                  <p>🤔 Looking at the solution is fine, but you'll learn more if you try the hints first.</p>
                  <button className="btn" onClick={() => setSolutionShown(true)}>
                    Reveal the solution
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---------- middle: editor ---------- */}
      <section className="panel panel-editor">
        <div className="toolbar">
          <span className="file-tab">{fileName}</span>
          <div className="toolbar-actions">
            <button className="btn btn-ghost" onClick={reset} title="Reset to starter code">
              ↺ Reset
            </button>
            <button className="btn btn-run" onClick={() => run(false)} disabled={busy} title="Run (Ctrl+Enter)">
              ▶ Run
            </button>
            {hasTests && (
              <button className="btn btn-check" onClick={() => run(true)} disabled={busy} title="Check (Ctrl+S)">
                ✓ Check
              </button>
            )}
          </div>
        </div>
        <div className="editor-wrap">
          <CodeEditor value={code} onChange={setCode} onRun={() => run(false)} onCheck={() => hasTests && run(true)} />
        </div>
        <div className="editor-foot">
          <span>
            <kbd>Ctrl</kbd>+<kbd>Enter</kbd> run{hasTests && <> · <kbd>Ctrl</kbd>+<kbd>S</kbd> check</>}
          </span>
          <span className={`status status-${status}`}>
            {status === 'running' && 'Running…'}
            {status === 'checking' && 'Checking…'}
            {status === 'passed' && '✓ All tests passed'}
            {status === 'failed' && results && `${passedCount}/${results.length} tests passed`}
            {status === 'idle' && 'Saved'}
          </span>
        </div>
      </section>

      {/* ---------- right: output ---------- */}
      <section className="panel panel-output">
        <div className="tabs" role="tablist">
          {isReact && (
            <Tab id="preview" current={outTab} onSelect={setOutTab}>🖥️ Preview</Tab>
          )}
          <Tab id="console" current={outTab} onSelect={setOutTab}>
            ⌨️ Console
            {errorCount > 0 ? <span className="pill pill-bad">{errorCount}</span> : entries.length > 0 && <span className="pill">{entries.length}</span>}
          </Tab>
          {hasTests && (
            <Tab id="tests" current={outTab} onSelect={setOutTab}>
              🧪 Tests
              {results && <span className={`pill ${passedCount === results.length ? 'pill-good' : 'pill-bad'}`}>{passedCount}/{results.length}</span>}
            </Tab>
          )}
        </div>
        <div className="panel-body output-body">
          <iframe
            key={runKey}
            ref={iframeRef}
            src={SANDBOX_URL}
            title="Preview of your app"
            className={`preview ${outTab === 'preview' && isReact ? '' : 'hidden'}`}
          />
          {outTab === 'console' && <ConsoleView entries={entries} />}
          {outTab === 'tests' && <TestsView tests={lesson.tests} results={results} status={status} />}
          {celebrate && (
            <div className="celebrate" role="status">
              <div className="celebrate-emoji">🎉</div>
              <strong>{isAssessment ? 'Unit test passed!' : lesson.isPractice ? 'Practice complete!' : lesson.practice ? 'Part 1 done!' : 'Lesson complete!'}</strong>
              <span>
                {isAssessment
                  ? `Your program meets all ${results.length} requirements. The sample solution is now unlocked.`
                  : lesson.isPractice
                    ? 'That concept is locked in. This lesson is fully complete.'
                    : lesson.practice
                      ? `All ${results.length} tests passed. Finish the lesson with a short practice exercise to make it stick.`
                      : `All ${results.length} tests passed.`}
              </span>
              <div className="celebrate-actions">
                <button className="btn btn-ghost" onClick={() => setCelebrate(false)}>
                  Keep coding
                </button>
                {next && (
                  <a className="btn btn-check" href={`#/lesson/${next.id}`}>
                    {next.isPractice ? 'Start the practice →' : `Next: ${next.title} →`}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Tab({ id, current, onSelect, children }) {
  return (
    <button role="tab" aria-selected={current === id} className={`tab ${current === id ? 'active' : ''}`} onClick={() => onSelect(id)}>
      {children}
    </button>
  );
}

// The unit-test requirements, ticked off from the latest Check.
function Checklist({ tests, results }) {
  const passed = results?.filter((r) => r.passed).length ?? 0;
  return (
    <div className="checklist">
      <div className="checklist-head">
        <strong>Grading checklist</strong>
        <span className="muted">{results ? `${passed}/${tests.length} met` : 'Press Check to grade'}</span>
      </div>
      <ul>
        {tests.map((t, i) => {
          const r = results?.[i];
          const state = !r ? 'pending' : r.passed ? 'pass' : 'fail';
          return (
            <li key={t.name} className={`test test-${state}`}>
              <span className="test-icon">{state === 'pass' ? '✓' : state === 'fail' ? '✗' : i + 1}</span>
              <InlineMarkdown text={t.name} as="div" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ConsoleView({ entries }) {
  if (entries.length === 0) {
    return <div className="empty">Nothing logged yet. Output from <code>console.log()</code> shows up here.</div>;
  }
  return (
    <div className="console scroll">
      {entries.map((e, i) => (
        <div key={i} className={`log log-${e.level}`}>
          {e.level === 'habit' ? (
            <>
              <span className="log-badge">🐍 Python habit?</span> <InlineMarkdown text={e.text} />
            </>
          ) : (
            <>
              <pre>{e.text}</pre>
              {e.tip && (
                <div className="log-tip">
                  💡 <InlineMarkdown text={e.tip} />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function TestsView({ tests, results, status }) {
  if (status === 'checking') return <div className="empty">Running tests…</div>;
  return (
    <div className="tests scroll">
      {!results && <p className="muted">Press <kbd>Check</kbd> to run these tests against your code:</p>}
      <ul>
        {tests.map((t, i) => {
          const r = results?.[i];
          const state = !r ? 'pending' : r.passed ? 'pass' : 'fail';
          return (
            <li key={t.name} className={`test test-${state}`}>
              <span className="test-icon">{state === 'pass' ? '✓' : state === 'fail' ? '✗' : '○'}</span>
              <div>
                <InlineMarkdown text={t.name} as="div" />
                {r && !r.passed && <InlineMarkdown text={r.message} as="div" />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
