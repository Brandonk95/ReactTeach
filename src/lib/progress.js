import { useCallback, useEffect, useRef, useState } from 'react';
import { pb } from './pocketbase.js';

// Progress is stored per user and per course in PocketBase's "progress"
// collection, with a localStorage copy so nothing is lost while offline.
const COURSE = 'react';
const LEGACY_KEY = 'reactteach:v1'; // browser cache from before accounts existed
const cacheKey = (userId) => `reactteach:${COURSE}:${userId}`;
const SAVE_DELAY = 800;
const RETRY_DELAY = 30000;

const EMPTY = { completed: {}, code: {}, lastLesson: null, updatedAt: 0 };
const VERSION = 2;
const fresh = () => ({ ...EMPTY, version: VERSION });

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

function readCache(key) {
  try {
    return normalize(JSON.parse(localStorage.getItem(key)));
  } catch {
    return null;
  }
}

function writeCache(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    /* storage unavailable */
  }
}

// Progress saved before accounts existed: this browser's old cache and, when
// running the dev server, the old progress.json file. Neither is deleted.
async function loadLegacy() {
  let legacy = readCache(LEGACY_KEY);
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}legacy-progress.json`, { cache: 'no-store' });
    if (res.ok && (res.headers.get('content-type') || '').includes('json')) {
      const file = normalize(await res.json());
      if (file) legacy = legacy ? mergeProgress(file, legacy) : file;
    }
  } catch {
    /* no legacy file (production build) */
  }
  return legacy;
}

// No response, or a proxy/gateway error (5xx): the server is down, not refusing us.
const isUnreachable = (err) => !err?.status || err.status >= 500;

const findRecord = (userId) =>
  pb
    .collection('progress')
    .getFirstListItem(pb.filter('user = {:user} && course = {:course}', { user: userId, course: COURSE }))
    .catch((err) => {
      if (err?.status === 404) return null;
      throw err;
    });

// Fetches the user's progress record, creating it on first sign-in from any
// pre-account progress. Returns { record, data } with cached changes merged in.
async function loadRemote(userId, key) {
  let record = await findRecord(userId);
  const cached = readCache(key);
  if (record) {
    const remote = normalize(record.data) ?? fresh();
    return { record, data: cached ? mergeProgress(remote, cached) : remote };
  }
  const legacy = await loadLegacy();
  const data = [legacy, cached].filter(Boolean).reduce(mergeProgress, fresh());
  try {
    record = await pb.collection('progress').create({ user: userId, course: COURSE, data });
  } catch (err) {
    // Another tab (or React's dev double-mount) created it first.
    record = await findRecord(userId);
    if (!record) throw err;
    return { record, data: mergeProgress(normalize(record.data) ?? fresh(), data) };
  }
  return { record, data };
}

// Course progress and saved code for the signed-in user.
// status: 'loading' | 'synced' | 'saving' | 'offline' | 'error'
export function useProgress(user) {
  const key = cacheKey(user.id);
  const [state, setState] = useState(() => readCache(key) ?? fresh());
  const [status, setStatus] = useState('loading');
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const recordId = useRef(null);
  const latest = useRef(state);
  latest.current = state;
  const dirty = useRef(false);

  // Load (and on reconnect, re-sync) the account's progress.
  useEffect(() => {
    let cancelled = false;
    loadRemote(user.id, key)
      .then(({ record, data }) => {
        if (cancelled) return;
        recordId.current = record.id;
        setState(data);
        setReady(true);
        setStatus('synced');
      })
      .catch((err) => {
        if (cancelled) return;
        if (err?.status === 401) pb.authStore.clear();
        setStatus('offline');
      });
    return () => {
      cancelled = true;
    };
  }, [user.id, key, attempt]);

  // While offline, retry periodically and as soon as the browser reconnects.
  useEffect(() => {
    if (status !== 'offline') return;
    const retry = () => setAttempt((n) => n + 1);
    const id = setTimeout(retry, RETRY_DELAY);
    window.addEventListener('online', retry);
    return () => {
      clearTimeout(id);
      window.removeEventListener('online', retry);
    };
  }, [status]);

  // Save on every change: localStorage immediately, the account after a short pause.
  useEffect(() => {
    writeCache(key, state);
    if (!ready || !recordId.current) return;
    dirty.current = true;
    const id = setTimeout(() => {
      setStatus('saving');
      pb.collection('progress')
        .update(recordId.current, { data: state })
        .then(() => {
          dirty.current = false;
          setStatus('synced');
        })
        .catch((err) => {
          if (err?.status === 401) pb.authStore.clear();
          setStatus(isUnreachable(err) ? 'offline' : 'error');
        });
    }, SAVE_DELAY);
    return () => clearTimeout(id);
  }, [state, ready, key]);

  // Best-effort save if the tab closes during the pause. The local cache is
  // merged in on the next visit anyway, so nothing is lost if this fails.
  useEffect(() => {
    const flush = () => {
      if (!dirty.current || !recordId.current) return;
      const body = JSON.stringify({ data: latest.current });
      if (body.length > 60000) return; // keepalive requests are size-limited
      fetch(pb.buildURL(`/api/collections/progress/records/${recordId.current}`), {
        method: 'PATCH',
        keepalive: true,
        headers: { 'Content-Type': 'application/json', Authorization: pb.authStore.token },
        body,
      }).catch(() => {});
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
  const resetAll = useCallback(() => setState({ ...fresh(), updatedAt: Date.now() }), []);
  const importData = useCallback((data) => {
    const incoming = normalize(data);
    if (!incoming || typeof incoming.completed !== 'object' || typeof incoming.code !== 'object') throw new Error('That file is not a ReactTeach progress file.');
    setState({ ...incoming, updatedAt: Date.now() });
  }, []);

  return { ...state, status, ready, complete, saveCode, visit, resetAll, importData };
}
