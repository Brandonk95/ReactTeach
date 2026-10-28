## Forms & Controlled Inputs

In React, the usual way to handle an input is to make it **controlled**: React state is the single source of truth for what's in the box.

```jsx
function NameField() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}                               // state → input
      onChange={(e) => setName(e.target.value)}  // input → state
    />
  );
}
```

The loop goes like this:

1. You type a letter.
2. `onChange` fires; `e.target.value` is the input's new text.
3. `setName(...)` updates state, and React re-renders.
4. The input shows `value={name}`, the new state.

Because the text lives in state, you can use it anywhere else in the component: show it, validate it, transform it.

```jsx
<p>{name.length} characters</p>
{name.length > 20 && <p className="error">Too long!</p>}
```

### Handling form submission

Wrap inputs in a `<form>` and handle `onSubmit`. **Always call `e.preventDefault()`**: by default, browsers submit forms by **reloading the page**, which wipes your React app's state.

```compare
# Flask: the browser POSTs and the
# server sends back a new page
@app.post("/signup")
def signup():
    name = request.form["name"]
    ...
////
// React: handle it in the browser,
// no page reload
function handleSubmit(e) {
  e.preventDefault();
  console.log("Signing up", name);
}

<form onSubmit={handleSubmit}>...</form>
```

### The `||` default trick

`a || b` returns `a` if it's truthy, otherwise `b`. It's handy for fallbacks, and Python's `or` works the same way:

```compare
display = name or "anonymous"
////
const display = name || "anonymous";
```

@@ instructions
1. Create a `name` state variable, starting as an empty string `""`.
2. Make the `<input>` **controlled**: set its `value` from state and update state in `onChange`.
3. Show `Hello, NAME!` in the `<p>`, or `Hello, stranger!` when the input is empty.

@@ starter
import { useState } from "react";

function App() {
  // 1. name state

  return (
    <div>
      <label>
        Your name: <input />
      </label>
      <p>Hello, ???!</p>
    </div>
  );
}

@@ solution
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <label>
        Your name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}

@@ hint
`const [name, setName] = useState("");`

@@ hint
`<input value={name} onChange={(e) => setName(e.target.value)} />`

@@ hint
`<p>Hello, {name || "stranger"}!</p>`
