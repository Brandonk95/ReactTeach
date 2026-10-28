## Lists in State: A Todo App

Here's the most important rule of React state, and the one Python developers trip over most:

> **Never mutate state. Always replace it with a new value.**

In Python, you'd happily do `todos.append(item)`. In React, that's a bug:

```jsx
todos.push(item);   // ❌ mutates the existing array
setTodos(todos);    // React sees the SAME array and may skip the re-render
```

React decides whether to re-render by checking if the new value **is the same object** as the old one (like Python's `is`). If you mutate the array and pass it back, it's still the same object.

### Immutable update recipes

| Goal | ❌ Mutating | ✅ New array |
|---|---|---|
| Add | `todos.push(newTodo)` | `[...todos, newTodo]` |
| Remove | `todos.splice(i, 1)` | `todos.filter((t) => t.id !== id)` |
| Change one | `todos[i].done = true` | `todos.map((t) => t.id === id ? { ...t, done: true } : t)` |

```compare
# Python equivalents that build NEW lists:
todos = todos + [item]
todos = [t for t in todos if t["id"] != id]
////
setTodos([...todos, item]);
setTodos(todos.filter((t) => t.id !== id));
```

### Unique IDs

Each todo needs a stable `id` for its `key`. `crypto.randomUUID()` (built into browsers) works well, or `Date.now()` for a simple app.

### Trimming input

`"  hi  ".trim()` → `"hi"`, which is Python's `.strip()`. Use it to ignore blank entries:

```jsx
if (newTodoText.trim() === "") return;
```

@@ instructions
Build a todo list:

1. Keep two pieces of state: `newTodoText` (what's typed in the input, starting `""`) and `todos` (an array, starting `[]`).
2. When the form is submitted (the **Add** button), add a new todo `{ id, text: newTodoText }` and clear the input. **Ignore blank input.**
3. Render each todo as an `<li>` showing its text and a **Delete** button that removes it.
4. Don't mutate: use spread to add and `.filter()` to delete.

@@ starter
import { useState } from "react";

function App() {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    // add the todo (unless it's blank), then clear the input
  }

  function deleteTodo(id) {
    // remove the todo with this id
  }

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input value={newTodoText} onChange={(event) => setNewTodoText(event.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {/* render todos here */}
      </ul>
    </div>
  );
}

@@ solution
import { useState } from "react";

function App() {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (newTodoText.trim() === "") return;
    setTodos([...todos, { id: crypto.randomUUID(), text: newTodoText.trim() }]);
    setNewTodoText("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input value={newTodoText} onChange={(event) => setNewTodoText(event.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

@@ hint
Adding: `setTodos([...todos, { id: crypto.randomUUID(), text: newTodoText }]);` then `setNewTodoText("");`

@@ hint
Deleting: `setTodos(todos.filter((todo) => todo.id !== id));`

@@ hint
Each item: `<li key={todo.id}>{todo.text} <button onClick={() => deleteTodo(todo.id)}>Delete</button></li>`
