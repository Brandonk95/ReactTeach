## Handling Events

Pass a **function** to an event prop like `onClick`:

```jsx
function App() {
  function handleClick() {
    console.log("clicked!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

### ⚠️ Pass the function, don't call it

```jsx
<button onClick={handleClick}>   ✅ React calls it on click
<button onClick={handleClick()}> ❌ calls it immediately, during render
```

With `handleClick()`, the function runs on every render, and its *return value* (`undefined`) becomes the click handler.

### Inline arrow functions

For short handlers, or when you need to pass arguments, wrap the call in an arrow function:

```jsx
<button onClick={() => console.log("hi")}>Say hi</button>
<button onClick={() => deleteItem(item.id)}>Delete</button>
```

### The event object

Handlers receive an event object describing what happened:

```jsx
<input onChange={(event) => console.log(event.target.value)} />
```

Common events: `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onMouseEnter`, `onFocus`, `onBlur`.

@@ instructions
1. Write a function `sayHi` inside `App` that logs `hi!`. Attach it to the **Say hi** button (pass it, don't call it!).
2. Give the **Shout** button an **inline arrow function** that logs `HELLO!`.

Rendering the component should log nothing. Messages should only appear when you click. Try it in the Preview, then check the Console tab.

@@ starter
function App() {
  // 1. write sayHi here


  return (
    <div>
      <button>Say hi</button>
      <button>Shout</button>
    </div>
  );
}

@@ solution
function App() {
  function sayHi() {
    console.log("hi!");
  }

  return (
    <div>
      <button onClick={sayHi}>Say hi</button>
      <button onClick={() => console.log("HELLO!")}>Shout</button>
    </div>
  );
}

@@ hint
`function sayHi() { console.log("hi!"); }`, then `<button onClick={sayHi}>`, with no parentheses after `sayHi`!

@@ hint
`<button onClick={() => console.log("HELLO!")}>Shout</button>`
