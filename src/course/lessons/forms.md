## Forms & Controlled Inputs

The standard way to handle an input is to make it **controlled**: state holds the value, and the input displays it.

```jsx
function NameField() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}                                        // state → input
      onChange={(event) => setName(event.target.value)}   // input → state
    />
  );
}
```

On each keystroke, `onChange` fires, `setName` updates state, React re-renders, and the input shows the new `value`.

Because the text lives in state, you can use it anywhere in the component:

```jsx
<p>{name.length} characters</p>
{name.length > 20 && <p className="error">Too long!</p>}
```

### Submitting

Wrap inputs in a `<form>` and handle `onSubmit`. **Always call `event.preventDefault()`**: by default the browser submits a form by **reloading the page**, which wipes your app's state.

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Signing up", name);
}

<form onSubmit={handleSubmit}>...</form>
```

A `<button>` inside a form submits it when clicked, and so does pressing Enter in an input.

### Fallbacks with `||`

`a || b` gives `a` if it's truthy, otherwise `b`:

```jsx
const displayName = name || "anonymous";
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
        Your name: <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}

@@ hint
`const [name, setName] = useState("");`

@@ hint
`<input value={name} onChange={(event) => setName(event.target.value)} />`

@@ hint
`<p>Hello, {name || "stranger"}!</p>`
