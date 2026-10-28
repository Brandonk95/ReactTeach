## 🔁 Practice: Events

Recap:

- Pass the function, don't call it: `onClick={handleClick}`
- To pass an argument, wrap it: `onClick={() => greet("Ada")}`
- Handlers receive an event; `e.target.value` is an input's text

@@ instructions
1. Render an `<input>` whose `onChange` logs what's in the box (`e.target.value`).
2. Write a function `greet(name)` that logs `` `Hello, ${name}` ``.
3. Render a **Greet** button that calls `greet("Ada")` when clicked. Nothing should be logged until you click!

@@ starter
function App() {
  return null;
}

@@ solution
function App() {
  function greet(name) {
    console.log(`Hello, ${name}`);
  }

  return (
    <div>
      <input onChange={(e) => console.log(e.target.value)} />
      <button onClick={() => greet("Ada")}>Greet</button>
    </div>
  );
}

@@ hint
`onClick={greet("Ada")}` would run during render. Wrap it in an arrow: `onClick={() => greet("Ada")}`
