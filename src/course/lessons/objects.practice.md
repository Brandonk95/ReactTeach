## 🔁 Practice: Objects

Recap:

- Destructure in the parameters: `function f({ name, age }) { ... }`
- Copy and change: `{ ...original, key: newValue }`
- Combine: `{ ...a, ...b }`, where later keys win

@@ instructions
Fill in the three functions. Use their parameters, not `sampleBook`, because the tests pass in their own objects.

1. **`summary({ title, author })`**: the parameter list already destructures the book. Return `` `${title} by ${author}` ``.
   - `summary(sampleBook)` → `"Dune by Frank Herbert"`
2. **`withPages(book, pageCount)`**: return a **new** object: a copy of `book` with `pages` set to `pageCount`. Use spread: `{ ...book, pages: pageCount }`. Don't change `book` itself.
   - `withPages(sampleBook, 500)` → `{ title: "Dune", author: "Frank Herbert", pages: 500 }`
3. **`merge(base, overrides)`**: return a new object containing every key from `base` and `overrides`. Where both have the same key, `overrides` wins. Spread both into one object, putting `overrides` **last**.
   - `merge({ x: 1, y: 2 }, { y: 3, z: 4 })` → `{ x: 1, y: 3, z: 4 }`

@@ starter
// Sample data for trying your functions. Don't use it inside them!
const sampleBook = { title: "Dune", author: "Frank Herbert", pages: 412 };

function summary({ title, author }) {
  // return "<title> by <author>"
}

function withPages(book, pageCount) {
  // return a copy of book with pages set to pageCount
}

function merge(base, overrides) {
  // return one new object with base's keys, then overrides' keys
}

console.log(summary(sampleBook));
console.log(withPages(sampleBook, 500));
console.log(merge({ x: 1, y: 2 }, { y: 3, z: 4 }));
console.log(sampleBook); // should still have pages: 412

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
