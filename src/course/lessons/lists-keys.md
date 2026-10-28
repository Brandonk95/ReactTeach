## Rendering Lists

Remember `.map()`? Here's where it pays off. To render a list, **map your data to JSX elements**:

```compare
fruits = ["apple", "banana"]
items = [f"<li>{f}</li>" for f in fruits]
////
const fruits = ["apple", "banana"];
const items = fruits.map((f) => <li key={f}>{f}</li>);
```

You can put the `.map()` right inside your JSX, since it's an expression:

```jsx
function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

> Notice `(fruit) => ( ... )` uses **parentheses**, so the JSX is returned automatically. If you use `{ }` braces you need to write `return`.

### Why `key`?

When a list changes (an item is added, removed or reordered), React needs to know **which item is which** so it can update the page efficiently and keep state attached to the right item. The `key` prop is an item's unique ID.

- ✅ Use a stable ID from your data: `key={task.id}`
- ⚠️ Avoid the array index (`key={i}`) if items can be reordered or removed
- Keys only need to be unique **among siblings**

Without keys, React prints a warning in the console.

### Filtering before rendering

Chain `.filter()` and `.map()` to render only some items:

```jsx
{tasks
  .filter((t) => !t.done)
  .map((t) => <li key={t.id}>{t.text}</li>)}
```

### Conditional classes

Use a ternary to decide a `className`:

```jsx
<li className={task.done ? "done" : ""}>...</li>
```

@@ instructions
Render the `tasks` array as a `<ul>` with one `<li>` per task:

1. Each `<li>` shows the task's `text`.
2. Give each `<li>` a `key` using the task's `id`.
3. If the task is done, give its `<li>` the `className` `"done"` (the preview crosses it out).

@@ starter
const tasks = [
  { id: 1, text: "Learn JavaScript", done: true },
  { id: 2, text: "Learn React", done: false },
  { id: 3, text: "Build something cool", done: false },
];

function App() {
  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {/* map over tasks here */}
      </ul>
    </div>
  );
}

@@ solution
const tasks = [
  { id: 1, text: "Learn JavaScript", done: true },
  { id: 2, text: "Learn React", done: false },
  { id: 3, text: "Build something cool", done: false },
];

function App() {
  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

@@ hint
Inside the `<ul>`: `{tasks.map((task) => <li key={task.id}>{task.text}</li>)}`

@@ hint
Add `className={task.done ? "done" : ""}` to the `<li>`.
