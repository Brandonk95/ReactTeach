## State with `useState`

Let's build a counter. This seems like it should work:

```jsx
function Counter() {
  let count = 0;
  return <button onClick={() => (count += 1)}>Count: {count}</button>;
}
```

It doesn't. Clicking does nothing. Two problems:

1. Changing a local variable **doesn't tell React** anything changed, so it never re-draws.
2. Even if it did re-draw, React re-runs `Counter()` from the top, so `count` would be `0` again. Local variables don't survive between renders.

### Enter `useState`

`useState` gives a component **memory** that survives re-renders, plus a function to update it that tells React to re-render:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

- `useState(0)`: the **initial** value
- It returns a **pair**, which we destructure: the current value and a setter
- Calling `setCount(newValue)` stores the new value **and re-renders** the component

### The mental model

Compare it to a Python class that redraws itself whenever its data changes:

```compare
class Counter:
    def __init__(self):
        self.count = 0      # state

    def increment(self):
        self.count += 1
        self.render()       # must redraw!

    def render(self):
        draw(f"Count: {self.count}")
////
function Counter() {
  // state lives in React, not in a local
  const [count, setCount] = useState(0);

  // calling the setter = update + re-render
  const increment = () => setCount(count + 1);

  // the whole function IS render()
  return <button onClick={increment}>
    Count: {count}
  </button>;
}
```

Every render is a **snapshot**: the function runs again with the latest state, and returns fresh JSX.

### Rules of hooks

Functions starting with `use` are called **hooks**. Two rules:

1. Only call them at the **top level** of a component, never inside `if`, loops or nested functions.
2. Only call them from **components** (or your own custom hooks).

### Updating from the previous value

When the new state depends on the old one, you can pass a function:

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
