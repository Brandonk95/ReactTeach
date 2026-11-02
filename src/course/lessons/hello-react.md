## Your First Component

React's core idea: **the UI is a function of your data.** You write functions that return a description of what the screen should show, and React works out how to update the real page when the data changes.

A **component** is a function that returns UI. Its name must start with a **capital letter**:

```jsx
function App() {
  return <h1>Hello!</h1>;
}
```

The HTML-like syntax is **JSX**. A compiler turns each tag into a function call:

```jsx
<h1>Hello!</h1>
// becomes
React.createElement("h1", null, "Hello!")
```

### `{ }` embeds JavaScript

Inside JSX, curly braces evaluate any expression:

```jsx
function App() {
  const name = "Ada";
  return <p>Hi {name}, 10 squared is {10 * 10}</p>;
}
```

### JSX rules

1. **Return one root element.** Wrap siblings in a `<div>`, or in a fragment `<>...</>` if you don't want an extra element.
2. **Close every tag**, including `<img />`, `<br />` and `<input />`.
3. Wrap multi-line JSX in **parentheses** after `return`.

```jsx
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Two siblings, wrapped in a fragment.</p>
    </>
  );
}
```

### How the preview works

In a real project, an entry file renders your root component: `createRoot(document.getElementById("root")).render(<App />)`. Here, **the course renders `<App />` for you**, so just define a function called `App` and press **Run**.

@@ instructions
Make `App` return:

1. An `<h1>` that says `Hello, React!`
2. Below it, a `<p>` that says `2 + 2 is 4`, where the `4` is calculated with `{2 + 2}` inside the JSX.

Remember: two sibling elements need a single parent (a `<div>` or `<>...</>`).

@@ starter
function App() {
  return (
    <div>
      {/* your h1 and p go here */}
    </div>
  );
}

@@ solution
function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>2 + 2 is {2 + 2}</p>
    </div>
  );
}

@@ hint
Put `<h1>Hello, React!</h1>` on one line inside the div, and the paragraph on the next.

@@ hint
`<p>2 + 2 is {2 + 2}</p>`: the first `2 + 2` is plain text, the one in curly braces is calculated.
