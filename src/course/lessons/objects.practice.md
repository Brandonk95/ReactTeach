## 🔁 Practice: Objects

Recap:

- Destructure in the parameters: `function f({ name, age }) { ... }`
- Copy and change: `{ ...obj, key: newValue }` (Python's `{**obj, "key": new}`)
- Combine: `{ ...a, ...b }`, where later keys win

@@ instructions
1. `summary(book)` returns `"Dune by Frank Herbert"`. Destructure `title` and `author` **right in the parameter list**.
2. `withPages(book, n)` returns a **new** book with `pages` set to `n`. The original must not change.
3. `merge(a, b)` returns a new object with everything from `a` and `b`. If both have a key, `b` wins.

@@ starter
const book = { title: "Dune", author: "Frank Herbert", pages: 412 };

@@ solution
const book = { title: "Dune", author: "Frank Herbert", pages: 412 };

function summary({ title, author }) {
  return `${title} by ${author}`;
}

function withPages(book, n) {
  return { ...book, pages: n };
}

function merge(a, b) {
  return { ...a, ...b };
}

console.log(summary(book), withPages(book, 500), merge({ x: 1 }, { y: 2 }));

@@ hint
`merge` is a single spread: `return { ...a, ...b };`
