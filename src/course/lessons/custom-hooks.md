## Custom Hooks

When you notice the same state logic in several components, you can extract it into your own **custom hook**. A custom hook is just a function that:

1. has a name starting with `use`, and
2. calls other hooks inside it.

It's the React version of refactoring repeated code into a helper function.

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

Each component that calls `useCounter()` gets its **own, independent** state. Hooks share *logic*, not *data*.

### Returning a pair vs. an object

You can return whatever you like. Two common styles:

```jsx
// Array: the caller picks the names (like useState)
const [isOpen, toggleOpen] = useToggle();

// Object: the caller destructures by name
const { count, increment } = useCounter();
```

```compare
# Python: returning a tuple
def use_toggle(initial=False):
    ...
    return value, toggle

is_open, toggle_open = use_toggle()
////
function useToggle(initial = false) {
  // ...
  return [value, toggle];
}

const [isOpen, toggleOpen] = useToggle();
```

### Some hooks people write all the time

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
