## Rendering Lists

To render a list, **map your data to JSX elements**. `.map()` is an expression, so it goes right inside the JSX:

```jsx
const fruits = ["apple", "banana", "cherry"];

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

`(fruit) => ( ... )` uses **parentheses**, so the JSX is returned automatically. With `{ }` braces you'd need `return`.

### Keys

When a list changes (items added, removed or reordered), React uses each item's `key` to know **which item is which**. That keeps updates efficient and keeps state attached to the right item.

- ✅ Use a stable ID from your data: `key={task.id}`
- ⚠️ Avoid the array index (`key={index}`) if items can be reordered or removed
- Keys only need to be unique **among siblings**

Without keys, React warns in the console.

### Filter, then map

```jsx
{tasks
  .filter((task) => !task.done)
  .map((task) => <li key={task.id}>{task.text}</li>)}
```

### Conditional classes

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
