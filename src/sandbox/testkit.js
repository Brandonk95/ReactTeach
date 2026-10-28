// A tiny Jest-flavoured assertion library and DOM helpers used by lesson tests.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

export class TestFailure extends Error {}

export function show(value) {
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'function') return `function ${value.name || '(anonymous)'}`;
  if (value === undefined) return 'undefined';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual(a[k], b[k]));
}

// A function call that produced undefined almost always means a missing return.
const RETURN_HINT = ' Did your function forget to `return` its result? (Unlike an arrow function without braces, a `{ ... }` body needs an explicit `return`.)';

export function expect(actual, label) {
  const what = label ? `${label} ` : '';
  const fail = (msg) => {
    throw new TestFailure(actual === undefined && /\(.*\)/.test(label || '') ? msg + RETURN_HINT : msg);
  };
  return {
    toBe(expected) {
      if (!Object.is(actual, expected)) fail(`Expected ${what}to be ${show(expected)}, but got ${show(actual)}.`);
    },
    toEqual(expected) {
      if (!deepEqual(actual, expected)) fail(`Expected ${what}to equal ${show(expected)}, but got ${show(actual)}.`);
    },
    toContain(item) {
      const ok = typeof actual === 'string' ? actual.includes(item) : Array.isArray(actual) && actual.some((x) => deepEqual(x, item));
      if (!ok) fail(`Expected ${what}to contain ${show(item)}, but got ${show(actual)}.`);
    },
    notToContain(item) {
      const has = typeof actual === 'string' ? actual.includes(item) : Array.isArray(actual) && actual.some((x) => deepEqual(x, item));
      if (has) fail(`Expected ${what}not to contain ${show(item)}.`);
    },
    toMatch(re) {
      if (typeof actual !== 'string' || !re.test(actual)) fail(`Expected ${what}to match ${re}, but got ${show(actual)}.`);
    },
    toBeTruthy() {
      if (!actual) fail(`Expected ${what}to be truthy, but got ${show(actual)}.`);
    },
    toBeFalsy() {
      if (actual) fail(`Expected ${what}to be falsy, but got ${show(actual)}.`);
    },
    toHaveLength(len) {
      const got = actual == null ? actual : actual.length;
      if (got !== len) fail(`Expected ${what}to have length ${len}, but it has length ${show(got)}.`);
    },
    toBeA(type) {
      const got = Array.isArray(actual) ? 'array' : actual === null ? 'null' : typeof actual;
      if (got !== type) fail(`Expected ${what}to be a ${type}, but got a ${got} (${show(actual)}).`);
    },
  };
}

const settle = (ms = 30) => new Promise((r) => setTimeout(r, ms));

// Creates the helper object handed to every test as its single argument.
export function createHelpers({ exports, logs, source }) {
  const area = document.getElementById('__test-area');
  const roots = [];

  const helpers = {
    exports,
    logs,
    source,
    expect,
    h: createElement,
    wait: settle,
    fail(msg) {
      throw new TestFailure(msg);
    },
    // Renders an element (default: <App />) into a hidden container.
    async render(element) {
      let el = element;
      if (!el) {
        if (typeof exports.App !== 'function') throw new TestFailure('Could not find a component named App. Make sure you wrote `function App() { ... }`.');
        el = createElement(exports.App);
      }
      const container = document.createElement('div');
      area.appendChild(container);
      const root = createRoot(container);
      roots.push({ root, container });
      flushSync(() => root.render(el));
      await settle();
      return container;
    },
    $(selector, root = area) {
      return root.querySelector(selector);
    },
    $$(selector, root = area) {
      return [...root.querySelectorAll(selector)];
    },
    text(el) {
      return (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
    },
    button(label, root = area) {
      const want = label.toLowerCase();
      const btn = [...root.querySelectorAll('button')].find((b) => b.textContent.trim().toLowerCase() === want);
      if (!btn) throw new TestFailure(`Could not find a <button> with the text "${label}".`);
      return btn;
    },
    async click(el) {
      if (!el) throw new TestFailure('Tried to click an element that does not exist.');
      el.click();
      await settle();
    },
    async type(el, value) {
      if (!el) throw new TestFailure('Could not find the input to type into.');
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
      el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
      await settle();
    },
    async submit(form) {
      if (!form) throw new TestFailure('Could not find a <form> to submit.');
      form.requestSubmit();
      await settle();
    },
    cleanup() {
      for (const { root, container } of roots.splice(0)) {
        try {
          flushSync(() => root.unmount());
        } catch {
          /* ignore */
        }
        container.remove();
      }
    },
  };
  return helpers;
}
