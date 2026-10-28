## Lifting State Up

Data in React flows **one way: down** from parents to children, through props. So what happens when two components need the **same** data?

Example: a temperature converter where one component has the input and a sibling shows the result.

```
App
├── CelsiusInput   ← the user types here
└── Fahrenheit     ← needs to know what they typed!
```

Siblings can't talk to each other directly. The solution is to **lift the state up** to their closest common parent:

1. The **parent** (`App`) owns the state.
2. It passes the **value** down to whoever displays it.
3. It passes a **setter function** down to whoever changes it.

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

The child doesn't own any state. It just calls the function it was given:

```jsx
function CelsiusInput({ celsius, onChange }) {
  return <input value={celsius} onChange={(e) => onChange(Number(e.target.value))} />;
}
```

This is like passing a **callback** in Python: the child says "something happened" and the parent decides what to do with it.

```compare
class CelsiusInput:
    def __init__(self, on_change):
        self.on_change = on_change

    def user_typed(self, text):
        self.on_change(float(text))
////
function CelsiusInput({ onChange }) {
  return (
    <input onChange={(e) =>
      onChange(Number(e.target.value))
    } />
  );
}
```

> `e.target.value` is always a **string**, even for `type="number"` inputs. Convert it with `Number(...)`, the JS version of `float(...)`.

@@ instructions
1. In `App`, create `celsius` state starting at `0`.
2. `CelsiusInput` receives `celsius` and `onChange` props. Render an `<input type="number">` whose value is `celsius`, and which calls `onChange(Number(e.target.value))` when it changes.
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
      <input type="number" value={celsius} onChange={(e) => onChange(Number(e.target.value))} />
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
`<input type="number" value={celsius} onChange={(e) => onChange(Number(e.target.value))} />`

@@ hint
`return <p>{celsius * 9 / 5 + 32}°F</p>;`
