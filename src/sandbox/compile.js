import { transform } from 'sucrase';

// Turns student code (modern JS + JSX + import/export) into a plain function body.
export function compile(source) {
  const { code } = transform(source, {
    transforms: ['jsx', 'imports'],
    jsxRuntime: 'classic',
    production: true,
  });
  return guardLoops(code);
}

const GUARD = '__guard();';

// Inserts a call to __guard() at the top of every loop body so an accidental
// infinite loop throws a friendly error instead of freezing the browser tab.
export function guardLoops(code) {
  let out = '';
  let i = 0;
  const n = code.length;
  while (i < n) {
    const ch = code[i];
    if (ch === '/' && code[i + 1] === '/') {
      const j = code.indexOf('\n', i);
      const end = j === -1 ? n : j;
      out += code.slice(i, end);
      i = end;
      continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      const j = code.indexOf('*/', i + 2);
      const end = j === -1 ? n : j + 2;
      out += code.slice(i, end);
      i = end;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      const end = skipString(code, i);
      out += code.slice(i, end);
      i = end;
      continue;
    }
    if (/[A-Za-z_$]/.test(ch) && !/[\w$]/.test(code[i - 1] || '')) {
      const word = /^[A-Za-z_$][\w$]*/.exec(code.slice(i, i + 64))[0];
      if (word === 'for' || word === 'while') {
        let j = skipSpace(code, i + word.length);
        if (code[j] === '(') {
          const close = matchParen(code, j);
          if (close !== -1) {
            const k = skipSpace(code, close + 1);
            if (code[k] === '{') {
              out += code.slice(i, k + 1) + GUARD;
              i = k + 1;
              continue;
            }
          }
        }
      } else if (word === 'do') {
        const j = skipSpace(code, i + 2);
        if (code[j] === '{') {
          out += code.slice(i, j + 1) + GUARD;
          i = j + 1;
          continue;
        }
      }
      out += word;
      i += word.length;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

function skipSpace(code, i) {
  while (i < code.length && /\s/.test(code[i])) i++;
  return i;
}

function skipString(code, start) {
  const quote = code[start];
  let i = start + 1;
  while (i < code.length) {
    if (code[i] === '\\') { i += 2; continue; }
    if (code[i] === quote) return i + 1;
    if (quote !== '`' && code[i] === '\n') return i;
    i++;
  }
  return i;
}

function matchParen(code, open) {
  let depth = 0;
  let i = open;
  while (i < code.length) {
    const ch = code[i];
    if (ch === '"' || ch === "'" || ch === '`') { i = skipString(code, i); continue; }
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}
