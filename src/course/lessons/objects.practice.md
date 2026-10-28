## 🔁 Practice: Objects

Recap:

- Destructure in the parameters: `function f({ name, age }) { ... }`
- Copy and change: `{ ...obj, key: newValue }` (Python's `{**obj, "key": new}`)
- Combine: `{ ...a, ...b }`, where later keys win

@@ instructions
1. `summary(book)` returns `"Dune by Frank Herbert"`. Destructure `title` and `author` **right in the parameter list**.
2. `withPages(book, pageCount)` returns a **new** book with `pages` set to `pageCount`. The original must not change.
3. `merge(base, overrides)` returns a new object with everything from `base` and `overrides`. If both have a key, the value from `overrides` wins.

Use the parameters inside your functions, not `sampleBook`. The tests pass in their own objects.

@@ starter
// Sample data for trying your functions. Don't use it inside them!
const sampleBook = { title: "Dune", author: "Frank Herbert", pages: 412 };

@@ solution
// Sample data for trying your functions. Don't use it inside them!
const sampleBook = { title: "Dune", author: "Frank Herbert", pages: 412 };

function summary({ title, author }) {
  return `${title} by ${author}`;
}

function withPages(book, pageCount) {
  return { ...book, pages: pageCount };
}

function merge(base, overrides) {
  return { ...base, ...overrides };
}

console.log(summary(sampleBook));
console.log(withPages(sampleBook, 500));
console.log(merge({ size: "M", color: "red" }, { color: "blue" }));

@@ hint
`merge` is a single spread: `return { ...base, ...overrides };`
