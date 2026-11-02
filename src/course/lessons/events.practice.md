## 🔁 Practice: Events

Recap:

- Pass the function, don't call it: `onClick={handleClick}`
- To pass an argument, wrap it: `onClick={() => greet("Ada")}`
- Handlers receive an event; `event.target.value` is an input's text

@@ instructions
1. Give the `<input>` an `onChange` handler that logs what's in the box: `(event) => console.log(event.target.value)`. Typing `abc` all at once should log `abc`.
2. Fill in `greet(name)` so it logs `` `Hello, ${name}` ``.
3. Give the **Greet** button an `onClick` that calls `greet("Ada")`. To pass an argument, wrap the call in an arrow function: `onClick={() => greet("Ada")}`.

Nothing should be logged just from the page rendering. Messages appear only when you type or click.

@@ starter
function App() {
  function greet(name) {
    // log `Hello, ${name}`
  }

  return (
    <div>
      {/* 1. add onChange to this input */}
      <input />
      {/* 3. add onClick that calls greet("Ada") */}
      <button>Greet</button>
    </div>
  );
}

@@ solution
function App() {
  function greet(name) {
    console.log(`Hello, ${name}`);
  }

  return (
    <div>
      <input onChange={(event) => console.log(event.target.value)} />
      <button onClick={() => greet("Ada")}>Greet</button>
    </div>
  );
}

@@ hint
`onClick={greet("Ada")}` would run during render. Wrap it in an arrow: `onClick={() => greet("Ada")}`
