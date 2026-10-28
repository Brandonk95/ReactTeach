## Your First Component

You now know enough JavaScript to start React. 🎉

### What is React?

React is a JavaScript library for building user interfaces. Its big idea:

> **Your UI is a function of your data.** You write functions that take data and *return a description of what the screen should look like*. React figures out how to update the real page.

If you've used a Python templating language like Jinja, you've seen a similar idea, except in React the "template" is **just JavaScript**.

### Components are functions

A **component** is a function that returns some UI. Its name **must start with a capital letter**:

```jsx
function App() {
  return <h1>Hello!</h1>;
}
```

That `<h1>Hello!</h1>` inside JavaScript is **JSX**: an HTML-like syntax that compiles into regular function calls:

```compare
# Conceptually, JSX is like calling
# a function that builds a tree:
element("h1", {}, "Hello!")
////
<h1>Hello!</h1>
// compiles to:
React.createElement("h1", null, "Hello!")
```

### Curly braces = "run some JavaScript here"

Inside JSX, `{ }` drops you back into JavaScript, like `{{ }}` in Jinja or `{}` in an f-string:

```jsx
function App() {
  const name = "Ada";
  return <p>Hi {name}, 10 squared is {10 * 10}</p>;
}
```

### Rules of JSX

1. **Return one root element.** Wrap siblings in a `<div>` or in a fragment, `<>...</>`.
2. **Close every tag.** `<img />`, `<br />`, `<input />`.
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

In a real project, a file called `main.jsx` tells React where to draw your `App`. In this course, **we render `<App />` for you**: just define a function called `App` and press **Run** to see it in the **Preview** tab.

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
