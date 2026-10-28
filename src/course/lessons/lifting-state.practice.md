## 🔁 Practice: Lifting State Up

Recap:

- The **closest common parent** owns the state
- Pass the value down to whoever shows it
- Pass functions down to whoever changes it

@@ instructions
Split a counter into pieces that share state through `App`:

1. `Display({ count })` renders `<p>Count: {count}</p>`.
2. `Controls({ onIncrement, onReset })` renders a **+1** button and a **Reset** button that call those props.
3. `App` owns the only `useState`, and wires them together.

@@ starter
import { useState } from "react";

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
