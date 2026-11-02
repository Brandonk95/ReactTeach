## 🔁 Practice: Lifting State Up

Recap:

- The **closest common parent** owns the state
- Pass the value down to whoever shows it
- Pass functions down to whoever changes it

@@ instructions
Split a counter into three pieces. Only `App` has state, and the children get everything through props.

1. **`Display({ count })`** returns `<p>Count: {count}</p>`. For example, `<Display count={7} />` shows `Count: 7`.
2. **`Controls({ onIncrement, onReset })`** returns two buttons:
   - **+1**, with `onClick={onIncrement}`
   - **Reset**, with `onClick={onReset}`

   `Controls` has no state of its own. It just calls the functions it was given.
3. **`App`**:
   - creates `const [count, setCount] = useState(0);` (the only `useState` in the file)
   - renders `<Display count={count} />`
   - renders `<Controls onIncrement={...} onReset={...} />`, where the functions call `setCount(count + 1)` and `setCount(0)`

@@ starter
import { useState } from "react";

function Display({ count }) {
  // return <p>Count: {count}</p>
  return null;
}

function Controls({ onIncrement, onReset }) {
  // return a "+1" button and a "Reset" button that call the props
  return null;
}

function App() {
  // count state lives here

  return (
    <div>
      {/* <Display ... /> */}
      {/* <Controls ... /> */}
    </div>
  );
}

@@ solution
import { useState } from "react";

function Display({ count }) {
  return <p>Count: {count}</p>;
}

function Controls({ onIncrement, onReset }) {
  return (
    <div>
      <button onClick={onIncrement}>+1</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Display count={count} />
      <Controls onIncrement={() => setCount(count + 1)} onReset={() => setCount(0)} />
    </div>
  );
}

@@ hint
In App: `<Controls onIncrement={() => setCount(count + 1)} onReset={() => setCount(0)} />`
