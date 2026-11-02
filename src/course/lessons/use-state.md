## State with `useState`

This counter looks like it should work, but clicking does nothing:

```jsx
function Counter() {
  let count = 0;
  return <button onClick={() => (count += 1)}>Count: {count}</button>;
}
```

There are two problems:

1. Changing a local variable doesn't tell React anything changed, so nothing re-renders.
2. Every render calls `Counter()` again from the top, so `count` would be back to `0` anyway.

### `useState`

`useState` gives a component a value that **survives re-renders**, plus a setter that **triggers a re-render**:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

- `useState(0)` sets the **initial** value.
- It returns a pair, `[value, setter]`, which you destructure.
- Calling `setCount(next)` stores the new value and re-renders the component.

Each render is a snapshot: the function runs again with the latest state and returns fresh JSX.

### Rules of hooks

Functions starting with `use` are **hooks**:

1. Call them only at the **top level** of a component: not inside `if`s, loops or nested functions.
2. Call them only from components, or from your own custom hooks.

### Updating from the previous value

When the next value depends on the current one, pass a function:

```jsx
setCount((previousCount) => previousCount + 1); // always uses the latest value
```

@@ instructions
Build a counter in `App`:

1. Store `count` in state, starting at `0`.
2. Show it in a `<p>` as `Count: 0`.
3. Add three buttons: **+1** adds one, **-1** subtracts one, **Reset** sets it back to `0`.

@@ starter
import { useState } from "react";

function App() {
  // create count state here

  return (
    <div>
      <p>Count: ?</p>
      <button>+1</button>
      <button>-1</button>
      <button>Reset</button>
    </div>
  );
}

@@ solution
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

@@ hint
`const [count, setCount] = useState(0);` goes at the top of `App`.

@@ hint
`<button onClick={() => setCount(count + 1)}>+1</button>`
