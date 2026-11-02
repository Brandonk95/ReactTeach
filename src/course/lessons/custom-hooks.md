## Custom Hooks

When the same stateful logic shows up in several components, extract it into a **custom hook**: a function whose name starts with `use` and that calls other hooks.

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((previousCount) => previousCount + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}

function Likes() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>👍 {count}</button>;
}
```

Every component that calls `useCounter()` gets its **own, independent** state. Hooks share *logic*, not *data*.

### Return a pair, or an object

```jsx
// An array: the caller picks the names (like useState)
const [isOpen, toggleOpen] = useToggle();

// An object: the caller destructures by name
const { count, increment } = useCounter();
```

Arrays suit hooks that return two things. Objects scale better past that.

### Common custom hooks

- `useLocalStorage(key, initial)`: state that survives a page refresh
- `useFetch(url)`: returns `{ data, loading, error }`
- `useDebounce(value, ms)`: waits until the user stops typing
- `useWindowWidth()`: tracks the browser size

@@ instructions
1. Write a custom hook `useToggle(initial = false)` that stores a boolean in state and returns `[value, toggle]`, where `toggle()` flips the value.
2. Use it in `App`: a button that says **Show details** when hidden and **Hide details** when shown. When shown, render `<p>Secret details</p>`.

@@ starter
import { useState } from "react";

function useToggle(initial = false) {
  // store a boolean, return [value, toggle]
}

function App() {
  // use your hook here

  return (
    <div>
      <h2>Product</h2>
      <button>Show details</button>
    </div>
  );
}

@@ solution
import { useState } from "react";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((previousValue) => !previousValue);
  return [value, toggle];
}

function App() {
  const [open, toggleOpen] = useToggle();

  return (
    <div>
      <h2>Product</h2>
      <button onClick={toggleOpen}>{open ? "Hide details" : "Show details"}</button>
      {open && <p>Secret details</p>}
    </div>
  );
}

@@ hint
Inside the hook: `const [value, setValue] = useState(initial);`

@@ hint
`const toggle = () => setValue((previousValue) => !previousValue);` then `return [value, toggle];`

@@ hint
In App: `const [open, toggleOpen] = useToggle();` and `{open && <p>Secret details</p>}`
