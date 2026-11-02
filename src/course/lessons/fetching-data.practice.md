## 🔁 Practice: Fetching Data

Recap of the pattern:

1. State for the data (and for loading)
2. `useEffect(() => { async function load() { ... } load(); }, [])`
3. `const response = await fetch(url); const data = await response.json();`
4. Show `Loading...` until the data arrives

@@ instructions
Load the todos from `https://api.example.com/todos`. Each one looks like `{ id, title, done }`.

1. The starter has two pieces of state: `todos` (starting `[]`) and `loading` (starting `true`).
2. In the `useEffect` (it runs once, thanks to `[]`), write an `async function load()` that:
   1. does `const response = await fetch("https://api.example.com/todos");`
   2. calls `setTodos(await response.json());`
   3. calls `setLoading(false);`

   Then call `load();` at the end of the effect.
3. While `loading` is true, render `<p>Loading...</p>`.
4. Afterwards, render a `<ul>` with one `<li key={todo.id}>` per todo, showing its `title`. Give the `<li>` `className="done"` when `todo.done` is true.

@@ starter
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // 2. fetch the todos, save them with setTodos, then setLoading(false)
    }
    load();
  }, []);

  // 3. while loading, return <p>Loading...</p>

  return (
    <ul>
      {/* 4. one <li> per todo, className "done" for finished ones */}
    </ul>
  );
}

@@ solution
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch("https://api.example.com/todos");
      setTodos(await response.json());
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.done ? "done" : ""}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

@@ hint
Same shape as the users lesson. Only the URL, the field name (`title`) and the `className` change.
