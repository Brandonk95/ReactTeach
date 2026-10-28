## 🔁 Practice: Arrays

Quick recap before you try it from memory:

- `.map(fn)`: transform every item, like `[f(item) for item in items]`
- `.filter(fn)`: keep some items, like `[item for item in items if cond]`
- `for (const item of items) { }`: like `for item in items:`
- `.length` with no parentheses

@@ instructions
1. `lengths(words)` returns the length of each word: `["hi", "hello"]` → `[2, 5]`. Use `.map()`.
2. `longWords(words)` returns only words **longer than 4** letters. Use `.filter()`.
3. `countMatches(items, target)` returns how many times `target` appears in `items`. Use a `for...of` loop.

@@ starter


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
