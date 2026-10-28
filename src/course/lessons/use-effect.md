## Side Effects with `useEffect`

Components should be **pure**: given the same props and state, return the same JSX, and don't change anything outside themselves. But apps need to talk to the outside world: timers, network requests, the browser tab title, `localStorage`... These are **side effects**.

`useEffect` runs code **after** React has updated the screen:

```jsx
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Click</button>;
}
```

### The dependency array

The second argument tells React **when** to re-run the effect:

| Code | Runs... |
|---|---|
| `useEffect(fn, [count])` | after the first render, and whenever `count` changes |
| `useEffect(fn, [])` | once, after the first render ("on mount") |
| `useEffect(fn)` | after **every** render (rarely what you want) |

### Cleanup

Some effects need undoing: stopping a timer, closing a connection. Return a **cleanup function** from the effect, and React calls it when the component disappears (or before the effect re-runs).

It's the same idea as Python's `try/finally` or a context manager's `__exit__`:

```compare
timer = start_timer(tick, every=1)
try:
    run_app()
finally:
    timer.cancel()   # always clean up
////
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

### Timers in JavaScript

- `setTimeout(fn, ms)` runs `fn` once after `ms` milliseconds (like `threading.Timer`)
- `setInterval(fn, ms)` runs `fn` every `ms` milliseconds
- Both return an ID you pass to `clearTimeout` / `clearInterval`

> ⚠️ Inside a `setInterval` callback, use the **updater form** `setSeconds((previousSeconds) => previousSeconds + 1)`. The callback was created during the first render, so a plain `seconds` variable inside it would be stuck at `0` forever.

@@ instructions
Build two components (App already renders both):

1. **`ClickTitle`**: keeps a `count` state and renders a button. Use an effect to set `document.title` to `` `Clicked ${count} times` `` whenever `count` changes. (The preview is in a frame, so you won't see the title change, but the tests will check it.)
2. **`Timer`**: renders `<p>Seconds: N</p>`, where N goes up by 1 every second. Use `setInterval` in an effect with an empty dependency array, and **return a cleanup** that calls `clearInterval`.

@@ starter
import { useState, useEffect } from "react";

function ClickTitle() {
  const [count, setCount] = useState(0);

  // update document.title when count changes

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // start an interval on mount, clean it up on unmount

  return <p>Seconds: {seconds}</p>;
}

function App() {
  return (
    <div>
      <ClickTitle />
      <Timer />
    </div>
  );
}

@@ solution
import { useState, useEffect } from "react";

function ClickTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Seconds: {seconds}</p>;
}

function App() {
  return (
    <div>
      <ClickTitle />
      <Timer />
    </div>
  );
}

@@ hint
`` useEffect(() => { document.title = `Clicked ${count} times`; }, [count]); ``

@@ hint
In Timer: `const id = setInterval(() => setSeconds((previousSeconds) => previousSeconds + 1), 1000);`

@@ hint
Return the cleanup from the effect: `return () => clearInterval(id);` and use `[]` as the dependency array.
