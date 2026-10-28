## 🔁 Practice: Components & JSX

Recap:

- A component is a capitalized function that returns JSX
- `{ }` inside JSX runs JavaScript
- Return **one** root. A fragment `<>...</>` groups elements without adding a `<div>`

@@ instructions
Write `App` from scratch so it returns, inside a **fragment** (not a div):

1. An `<h2>` with `About me`
2. A `<p>` that says `My favorite number is 21`, where `21` is calculated with `{3 * 7}`

@@ starter


@@ solution
function App() {
  return (
    <>
      <h2>About me</h2>
      <p>My favorite number is {3 * 7}</p>
    </>
  );
}

@@ hint
A fragment is an empty tag: `return (<> ... </>);`
