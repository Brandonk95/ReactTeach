## 🔁 Practice: Custom Hooks

Recap:

- A custom hook is a function named `use...` that calls other hooks
- It can return anything, often an object: `return { count, increment };`
- Every component that calls it gets **its own** independent state

@@ instructions
1. Write **`useCounter(initial = 0, step = 1)`**:
   - Create state: `const [count, setCount] = useState(initial);`
   - Return an object `{ count, increment, decrement, reset }`, where:
     - `increment` adds `step` to `count`
     - `decrement` subtracts `step`
     - `reset` sets it back to `initial`

   Use the updater form for `increment` and `decrement`: `setCount((previousCount) => previousCount + step)`.

   For example, `useCounter(10, 5)` starts at `10`, and `increment()` makes it `15`.
2. In **`App`**, call `useCounter()` **twice** to get two independent counters, `apples` and `oranges`. Render each as:
   ```jsx
   <div className="counter">
     <p>{apples.count}</p>
     <button onClick={apples.increment}>+</button>
   </div>
   ```
   Clicking one counter's **+** must not change the other.

@@ starter
import { useState } from "react";

function useCounter(initial = 0, step = 1) {
  // create count state starting at initial
  // return { count, increment, decrement, reset }
}

function App() {
  // const apples = useCounter();
  // const oranges = useCounter();

  return (
    <div>
      {/* two <div className="counter"> boxes, each with a <p> and a "+" button */}
    </div>
  );
}

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
