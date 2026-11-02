## 🔁 Practice: Updating Arrays in State

Recap:

| Goal | Immutable way |
|---|---|
| Change one item | `items.map((it) => it.id === id ? { ...it, done: !it.done } : it)` |
| Remove items | `items.filter((it) => !it.done)` |

Never assign `item.done = true` or `push`. Always give `setItems` a **new** array.

@@ instructions
The shopping list is already in state. Finish it without mutating `items`:

1. **`toggleDone(id)`**: call `setItems` with a new array from `.map()`. For the item whose `id` matches, return a copy with `done` flipped (`{ ...item, done: !item.done }`). Return every other item unchanged.
2. **`clearDone()`**: call `setItems` with `.filter()`, keeping only items where `done` is false.
3. **Render each item** as `<li key={item.id}>`, containing:
   - the item's `name`
   - a **Toggle** button that calls `toggleDone(item.id)`

   Give the `<li>` `className="done"` when `item.done` is true (`className={item.done ? "done" : ""}`). The preview crosses those out.
4. Under the list, a **Clear done** button calls `clearDone`.

Don't use `.push`, `.splice`, or assignments like `item.done = true`.

@@ starter
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Milk", done: false },
    { id: 2, name: "Eggs", done: false },
    { id: 3, name: "Bread", done: false },
  ]);

  function toggleDone(id) {
    // setItems(items.map(...)): flip done on the matching item
  }

  function clearDone() {
    // setItems(items.filter(...)): keep items that aren't done
  }

  return (
    <div>
      <h2>Shopping list</h2>
      <ul>
        {/* 3. items.map((item) => <li key={item.id} ...>name + Toggle button</li>) */}
      </ul>
      {/* 4. Clear done button */}
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
