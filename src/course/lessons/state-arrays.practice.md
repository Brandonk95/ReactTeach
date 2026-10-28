## 🔁 Practice: Updating Arrays in State

Recap:

| Goal | Immutable way |
|---|---|
| Change one item | `items.map((it) => it.id === id ? { ...it, done: !it.done } : it)` |
| Remove items | `items.filter((it) => !it.done)` |

Never assign `item.done = true` or `push`. Always give `setItems` a **new** array.

@@ instructions
The shopping list is already in state. Add:

1. One `<li>` per item showing its `name` and a **Toggle** button. Toggling flips `done`, and done items get `className="done"`.
2. A **Clear done** button that removes every done item.

Use `.map()` to toggle and `.filter()` to clear, without mutating.

@@ starter
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Milk", done: false },
    { id: 2, name: "Eggs", done: false },
    { id: 3, name: "Bread", done: false },
  ]);

  return (
    <div>
      <h2>Shopping list</h2>
    </div>
  );
}

@@ solution
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Milk", done: false },
    { id: 2, name: "Eggs", done: false },
    { id: 3, name: "Bread", done: false },
  ]);

  function toggleDone(id) {
    setItems(items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  function clearDone() {
    setItems(items.filter((item) => !item.done));
  }

  return (
    <div>
      <h2>Shopping list</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.done ? "done" : ""}>
            {item.name} <button onClick={() => toggleDone(item.id)}>Toggle</button>
          </li>
        ))}
      </ul>
      <button onClick={clearDone}>Clear done</button>
    </div>
  );
}

@@ hint
Toggle with a map that replaces just the matching item: `item.id === id ? { ...item, done: !item.done } : item`
