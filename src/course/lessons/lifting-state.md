## Lifting State Up

Data flows **one way: down**, from parent to child through props. When two siblings need the same data, move the state to their **closest common parent**:

```
App                ← owns the state
├── CelsiusInput   ← changes it
└── Fahrenheit     ← displays it
```

1. The parent owns the state.
2. It passes the **value** down to whoever displays it.
3. It passes a **setter (callback)** down to whoever changes it.

```jsx
function App() {
  const [celsius, setCelsius] = useState(0);
  return (
    <>
      <CelsiusInput celsius={celsius} onChange={setCelsius} />
      <Fahrenheit celsius={celsius} />
    </>
  );
}
```

The child owns no state. It calls the function it was given, and the parent decides what to do with it:

```jsx
function CelsiusInput({ celsius, onChange }) {
  return <input value={celsius} onChange={(event) => onChange(Number(event.target.value))} />;
}
```

> `event.target.value` is always a **string**, even for `type="number"` inputs. Convert it with `Number(...)`.

@@ instructions
1. In `App`, create `celsius` state starting at `0`.
2. `CelsiusInput` receives `celsius` and `onChange` props. Render an `<input type="number">` whose value is `celsius`, and which calls `onChange(Number(event.target.value))` when it changes.
3. `Fahrenheit` receives `celsius` and renders a `<p>` with the converted temperature followed by `°F`, for example `212°F`. (The formula is °F = °C × 9 / 5 + 32.)
4. Make `App` render both, wired together.

@@ starter
import { useState } from "react";

function CelsiusInput({ celsius, onChange }) {
  // an <input type="number"> controlled by props
}

function Fahrenheit({ celsius }) {
  // a <p> like "212°F"
}

function App() {
  // celsius state lives here

  return (
    <div>
      <h2>Temperature Converter</h2>
      {/* render CelsiusInput and Fahrenheit */}
    </div>
  );
}

@@ solution
import { useState } from "react";

function CelsiusInput({ celsius, onChange }) {
  return (
    <label>
      Celsius:{" "}
      <input type="number" value={celsius} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Fahrenheit({ celsius }) {
  return <p>{(celsius * 9) / 5 + 32}°F</p>;
}

function App() {
  const [celsius, setCelsius] = useState(0);

  return (
    <div>
      <h2>Temperature Converter</h2>
      <CelsiusInput celsius={celsius} onChange={setCelsius} />
      <Fahrenheit celsius={celsius} />
    </div>
  );
}

@@ hint
In App: `const [celsius, setCelsius] = useState(0);` then `<CelsiusInput celsius={celsius} onChange={setCelsius} />`

@@ hint
`<input type="number" value={celsius} onChange={(event) => onChange(Number(event.target.value))} />`

@@ hint
`return <p>{celsius * 9 / 5 + 32}°F</p>;`
