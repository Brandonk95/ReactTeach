// Friendly explanations for common errors, aimed at Python developers.
const PY_NAMES = {
  print: 'JavaScript uses `console.log(...)` instead of `print(...)`.',
  len: 'Use `.length` instead of `len(...)`, e.g. `items.length`.',
  True: 'Booleans are lowercase in JavaScript: `true`.',
  False: 'Booleans are lowercase in JavaScript: `false`.',
  None: 'JavaScript uses `null` or `undefined` instead of `None`.',
  self: 'Function components have no `self`. Use variables, props and state.',
  range: 'There is no `range()`. Use a `for (let i = 0; i < n; i++)` loop.',
  str: 'Use `String(x)` instead of `str(x)`.',
  int: 'Use `Number(x)` or `parseInt(x)` instead of `int(x)`.',
  def: 'Define functions with `function name() { ... }`.',
  elif: 'JavaScript uses `else if`.',
  useState: 'Did you forget to import it? Add `import { useState } from "react";` at the top.',
  useEffect: 'Did you forget to import it? Add `import { useEffect } from "react";` at the top.',
};

export function errorTip(message = '') {
  let m = /^(\w+) is not defined/.exec(message);
  if (m) {
    return PY_NAMES[m[1]] || `\`${m[1]}\` doesn't exist at this point. Check the spelling (names are case-sensitive) and that you declared it with \`const\`, \`let\` or \`function\`.`;
  }
  if (/Assignment to constant variable/.test(message)) return 'You tried to change a `const`. Declare it with `let` if it needs to change.';
  if (/Adjacent JSX elements/.test(message)) return 'A component must return a single root element. Wrap the siblings in `<div>...</div>` or a fragment `<>...</>`.';
  if (/Unterminated JSX contents|Expected corresponding JSX closing tag/.test(message)) return 'A JSX tag is not closed. Every tag needs a closing tag, or must be self-closing like `<input />`.';
  if (/Unterminated regular expression/.test(message)) return 'This usually means two JSX elements are side by side without a parent, or a tag is not closed. Wrap siblings in `<div>...</div>` or `<>...</>`, and close every tag.';
  if (/Unexpected token|Unexpected character|Unterminated/.test(message)) return 'There is a syntax error here. Look for a missing `)`, `}`, `]`, comma or quote near this line.';
  if ((m = /Cannot read properties of (undefined|null) \(reading '(.+)'\)/.exec(message))) {
    return `You tried to read \`.${m[2]}\` from something that is \`${m[1]}\`. Check that the value before \`.${m[2]}\` actually exists (like Python's \`AttributeError: 'NoneType' object has no attribute\`).`;
  }
  if ((m = /(\S+) is not a function/.exec(message))) return `\`${m[1]}\` is not a function, so you can't call it with \`()\`. Check the name, and whether it was defined or returned correctly.`;
  if (/Objects are not valid as a React child/.test(message)) return 'You tried to render a whole object. Render one of its properties instead, such as `{user.name}`.';
  if (/Too many re-renders/.test(message)) return 'A state setter is being called during render, probably `onClick={setX(...)}`. Wrap it: `onClick={() => setX(...)}`.';
  if (/Rendered (more|fewer) hooks/.test(message)) return 'Hooks must be called in the same order every render. Don\'t call them inside `if` statements or loops.';
  return null;
}
