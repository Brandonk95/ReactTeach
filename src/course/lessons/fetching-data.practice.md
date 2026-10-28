## 🔁 Practice: Fetching Data

Recap of the pattern:

1. State for the data (and for loading)
2. `useEffect(() => { async function load() { ... } load(); }, [])`
3. `const resp = await fetch(url); const data = await resp.json();`
4. Show `Loading...` until the data arrives

@@ instructions
Load the todos from `https://api.example.com/todos` (each is `{ id, title, done }`):

1. Show `Loading...` while waiting.
2. Then show a `<ul>` with one `<li>` per todo, showing its `title`.
3. Todos where `done` is true get `className="done"` (crossed out in the preview).

@@ starter
import { useState, useEffect } from "react";

function App() {
  return null;
}

@@ solution
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const resp = await fetch("https://api.example.com/todos");
      setTodos(await resp.json());
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
