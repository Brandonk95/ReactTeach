// Spots Python-isms in student code and suggests the JavaScript equivalent.

const RULES = [
  { re: /(^|[^.\w])print\s*\(/, tip: 'Use `console.log(...)` instead of `print(...)`.' },
  { re: /^\s*def\s+\w+/m, tip: 'Define functions with `function name() { ... }` or `const name = () => { ... }`, not `def`.' },
  { re: /\belif\b/, tip: 'JavaScript spells it `else if`, not `elif`.' },
  { re: /(^|[^.\w"'])True\b|(^|[^.\w"'])False\b/, tip: 'Booleans are lowercase in JavaScript: `true` and `false`.' },
  { re: /(^|[^.\w"'])None\b/, tip: 'JavaScript uses `null` (or `undefined`) instead of `None`.' },
  { re: /\blen\s*\(/, tip: 'Use `.length` (no parentheses) instead of `len(...)`, e.g. `items.length`.' },
  { re: /\.append\s*\(/, tip: 'Arrays use `.push(...)` instead of `.append(...)`. In React state, use `[...arr, item]`.' },
  { re: /^\s*#(?![!{])/m, tip: 'Comments start with `//` in JavaScript, not `#`.' },
  { re: /^\s*(if|for|while|else)\b[^{\n]*:\s*$/m, tip: 'JavaScript blocks use `{ ... }`, not a colon and indentation. Example: `if (x > 0) { ... }`' },
  { re: /\bif\s*\(?[^{\n]*\s(and|or)\s/, tip: 'Use `&&` for `and` and `||` for `or`.' },
  { re: /\bif\s+not\s/, tip: 'Use `!` for `not`, e.g. `if (!done) { ... }`.' },
  { re: /\bfor\s*\(?\s*(const|let)?\s*\w+\s+in\s+range\(/, tip: 'There is no `range()`. Use `for (let i = 0; i < n; i++) { ... }`.' },
  { re: /\bf"[^"]*\{/, tip: 'f-strings become template literals with backticks: `` `Hello ${name}` ``.' },
  { re: /\bself\./, tip: 'There is no `self` in function components. Use variables, props and state instead.' },
  { re: /\bstr\s*\(|\bint\s*\(/, tip: 'Use `String(x)` and `Number(x)` (or `parseInt(x)`) instead of `str()` / `int()`.' },
];

// Blank out string contents and JS comments so we don't flag text inside them.
function stripStringsAndComments(src) {
  return src
    .replace(/"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\[\s\S]|[^`\\])*`/g, (m) => m[0] + ' '.repeat(Math.max(0, m.length - 2)) + m[0])
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
}

// JSX text like <p>True or False?</p> is not code, so drop text between tags too.
function stripJsxText(src) {
  return src.replace(/>([^<>{}]*)</g, '><');
}

export function findPythonHabits(source) {
  const fString = /\bf"[^"]*\{/.test(source);
  const code = stripJsxText(stripStringsAndComments(source));
  const tips = RULES.filter((r) => (r.re.source.startsWith('\\bf"') ? fString : r.re.test(code))).map((r) => r.tip);
  return [...new Set(tips)];
}
