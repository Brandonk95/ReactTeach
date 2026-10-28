## 🔁 Practice: Custom Hooks

Recap:

- A custom hook is a function named `use...` that calls other hooks
- It can return anything, often an object: `return { count, increment };`
- Every component that calls it gets **its own** independent state

@@ instructions
1. Write `useCounter(initial = 0, step = 1)`, returning `{ count, increment, decrement, reset }`:
   - `increment` / `decrement` change `count` by `step`
   - `reset` sets it back to `initial`
2. In `App`, use it **twice** to show two independent counters. Each one is a `<div className="counter">` with a `<p>` showing the count and a **+** button.

@@ starter
import { useState } from "react";

@@ solution
import { useState } from "react";

function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  return {
    count,
    increment: () => setCount((previousCount) => previousCount + step),
    decrement: () => setCount((previousCount) => previousCount - step),
    reset: () => setCount(initial),
  };
}

function App() {
  const apples = useCounter();
  const oranges = useCounter();

  return (
    <div>
      <div className="counter">
        <p>{apples.count}</p>
        <button onClick={apples.increment}>+</button>
      </div>
      <div className="counter">
        <p>{oranges.count}</p>
        <button onClick={oranges.increment}>+</button>
      </div>
    </div>
  );
}

@@ hint
Inside the hook: `const [count, setCount] = useState(initial);` then return functions that call `setCount`.
