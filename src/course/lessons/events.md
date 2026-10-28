## Handling Events

To respond to a click, pass a **function** to the `onClick` prop:

```jsx
function App() {
  function handleClick() {
    console.log("clicked!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

If you've used Tkinter, this is the same idea as `Button(command=handle_click)`:

```compare
def handle_click():
    print("clicked!")

Button(root, text="Click me",
       command=handle_click)
////
function handleClick() {
  console.log("clicked!");
}

<button onClick={handleClick}>
  Click me
</button>
```

### ⚠️ The #1 beginner bug: calling instead of passing

```jsx
<button onClick={handleClick}>   ✅ passes the function; React calls it on click
<button onClick={handleClick()}> ❌ calls it RIGHT NOW, during render
```

With `handleClick()`, the function runs every time the component renders, and the *return value* (`undefined`) becomes the click handler. In Tkinter, `command=handle_click()` has exactly the same bug!

### Inline arrow functions

For short handlers, or when you need to pass arguments, use an arrow function:

```jsx
<button onClick={() => console.log("hi")}>Say hi</button>
<button onClick={() => deleteItem(item.id)}>Delete</button>
```

The arrow function *wraps* the call so it only runs on click.

### The event object

Handlers receive an event object with details about what happened:

```jsx
<input onChange={(e) => console.log(e.target.value)} />
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
