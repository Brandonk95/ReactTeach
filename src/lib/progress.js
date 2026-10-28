import { useCallback, useEffect, useRef, useState } from 'react';

const KEY = 'reactteach:v1';
const API = `${import.meta.env.BASE_URL}api/progress`;
const EMPTY = { completed: {}, code: {}, lastLesson: null, updatedAt: 0 };
const VERSION = 2;

// Version 2 added a practice step to each lesson. Lessons finished before that
// count as fully done, so their practice is marked complete. Runs once per
// snapshot; afterwards `version` is 2 and new completions are left alone.
function upgrade(s) {
  if ((s.version || 1) >= VERSION) return s;
  const completed = { ...s.completed };
  for (const id of Object.keys(s.completed)) {
    if (!id.endsWith('/practice')) completed[`${id}/practice`] = true;
  }
  return { ...s, completed, version: VERSION };
}

function loadLocal() {
  try {
    return upgrade({ ...EMPTY, ...JSON.parse(localStorage.getItem(KEY)) });
  } catch {
    return { ...EMPTY, version: VERSION };
  }
}

function normalize(data) {
  return data && typeof data === 'object' ? upgrade({ ...EMPTY, ...data }) : null;
}

// Combines two progress snapshots: completed lessons are unioned, and for
// saved code and the last lesson the more recently updated snapshot wins.
export function mergeProgress(a, b) {
  const [older, newer] = (a.updatedAt || 0) <= (b.updatedAt || 0) ? [a, b] : [b, a];
  return {
    completed: { ...older.completed, ...newer.completed },
    code: { ...older.code, ...newer.code },
    lastLesson: newer.lastLesson ?? older.lastLesson,
    updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0),
    version: Math.max(a.version || 1, b.version || 1),
  };
}

async function readFile() {
  const res = await fetch(API, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return normalize(await res.json());
}

function writeFile(state) {
  return fetch(API, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(state) }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });
}

// Course progress and saved code. Stored in progress.json (via the dev server)
// when available, with localStorage as a cache and fallback.
// storage: 'loading' | 'file' | 'local' | 'error'
export function useProgress() {
  const [state, setState] = useState(loadLocal);
  const [storage, setStorage] = useState('loading');
  const latest = useRef(state);
  latest.current = state;
  const dirty = useRef(false);

  // Load progress.json once and merge it with whatever this browser has.
  useEffect(() => {
    let cancelled = false;
    readFile()
      .then((fromFile) => {
        if (cancelled) return;
        const local = loadLocal();
        const merged = fromFile ? mergeProgress(fromFile, local) : local;
        setState(merged);
        // Switching to 'file' triggers the save effect, which writes the merged result.
        setStorage('file');
      })
      .catch(() => !cancelled && setStorage('local'));
    return () => {
      cancelled = true;
    };
  }, []);

  // Save on every change: localStorage immediately, the file after a short pause.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
    if (storage !== 'file' && storage !== 'error') return;
    dirty.current = true;
    const id = setTimeout(() => {
      writeFile(state)
        .then(() => {
          dirty.current = false;
          setStorage('file');
        })
        .catch(() => setStorage('error'));
    }, 500);
    return () => clearTimeout(id);
  }, [state, storage]);

  // Flush a pending save if the tab is closed during the debounce window.
  useEffect(() => {
    const flush = () => {
      if (dirty.current) navigator.sendBeacon(API, new Blob([JSON.stringify(latest.current)], { type: 'application/json' }));
    };
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, []);

  const update = useCallback((fn) => {
    setState((s) => {
      const next = fn(s);
      return next === s ? s : { ...next, updatedAt: Date.now() };
    });
  }, []);

  const complete = useCallback((id) => update((s) => (s.completed[id] ? s : { ...s, completed: { ...s.completed, [id]: true } })), [update]);
  const saveCode = useCallback((id, code) => update((s) => (s.code[id] === code ? s : { ...s, code: { ...s.code, [id]: code } })), [update]);
  const visit = useCallback((id) => update((s) => (s.lastLesson === id ? s : { ...s, lastLesson: id })), [update]);
  const resetAll = useCallback(() => setState({ ...EMPTY, version: VERSION, updatedAt: Date.now() }), []);
  const importData = useCallback((data) => {
    const incoming = normalize(data);
    if (!incoming || typeof incoming.completed !== 'object' || typeof incoming.code !== 'object') throw new Error('That file is not a ReactTeach progress file.');
    setState({ ...incoming, updatedAt: Date.now() });
  }, []);

  return { ...state, storage, complete, saveCode, visit, resetAll, importData };
}
