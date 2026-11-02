## 🔁 Practice: Arrays

Quick recap before you try it from memory:

- `.map((item) => ...)` returns a new array with every item transformed
- `.filter((item) => ...)` returns a new array with only the items where the function returns true
- `for (const item of items) { }` loops over each item
- `.length` is a property, with no parentheses

@@ instructions
Fill in the three functions. Each one must use its parameter, so it works for any array the tests pass in.

1. **`lengths(words)`**: return a new array with the length of each word. Use `.map()` and `word.length`.
   - `lengths(["hi", "hello"])` → `[2, 5]`
2. **`longWords(words)`**: return a new array with only the words **longer than 4** letters. Use `.filter()`.
   - `longWords(["tiny", "python", "react", "js"])` → `["python", "react"]`
3. **`countMatches(items, target)`**: return how many items are equal (`===`) to `target`. Use a `for...of` loop:
   1. Start a counter: `let count = 0;`
   2. Loop: `for (const item of items) { ... }`
   3. Inside the loop, add 1 to `count` when `item === target`.
   4. After the loop, `return count;`

   - `countMatches([1, 2, 1, 3, 1], 1)` → `3`
   - `countMatches(["a", "b"], "z")` → `0`

@@ starter
function lengths(words) {
  // return words.map(...)
}

function longWords(words) {
  // return words.filter(...)
}

function countMatches(items, target) {
  // let count = 0;
  // for (const item of items) { ... }
  // return count;
}

console.log(lengths(["hi", "hello"]));
console.log(longWords(["tiny", "python", "react", "js"]));
console.log(countMatches([1, 2, 1, 3, 1], 1));

@@ solution
function lengths(words) {
  return words.map((word) => word.length);
}

function longWords(words) {
  return words.filter((word) => word.length > 4);
}

function countMatches(items, target) {
  let count = 0;
  for (const item of items) {
    if (item === target) count++;
  }
  return count;
}

console.log(lengths(["hi", "hello"]), longWords(["tiny", "python"]), countMatches([1, 2, 1], 1));

@@ hint
For `countMatches`: start with `let count = 0;`, loop with `for (const item of items)`, and add 1 when `item === target`.
