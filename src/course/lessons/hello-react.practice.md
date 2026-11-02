## 🔁 Practice: Components & JSX

Recap:

- A component is a capitalized function that returns JSX
- `{ }` inside JSX runs JavaScript
- Return **one** root. A fragment `<>...</>` groups elements without adding a `<div>`

@@ instructions
Make `App` return a **fragment** (`<>` ... `</>`, not a `<div>`) containing, in order:

1. An `<h2>` with the text `About me`.
2. A `<p>` that reads exactly `My favorite number is 21`. Write the `21` as `{3 * 7}` so JSX calculates it.

The rendered page should be just the heading and the paragraph, with no wrapper element around them.

@@ starter
function App() {
  return (
    <>
      {/* 1. <h2>About me</h2> */}
      {/* 2. <p>My favorite number is {3 * 7}</p> */}
    </>
  );
}

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
