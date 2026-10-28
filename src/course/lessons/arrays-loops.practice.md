## 🔁 Practice: Arrays

Recap:

- `.map(fn)`: transform every item, like `[f(x) for x in arr]`
- `.filter(fn)`: keep some items, like `[x for x in arr if cond]`
- `for (const x of arr) { }`: like `for x in arr:`
- `.length` with no parentheses

@@ instructions
1. `lengths(words)` returns the length of each word: `["hi", "hello"]` → `[2, 5]`. Use `.map()`.
2. `longWords(words)` returns only words **longer than 4** letters. Use `.filter()`.
3. `countMatches(arr, target)` returns how many times `target` appears in `arr`. Use a `for...of` loop.

@@ starter


@@ solution
function lengths(words) {
  return words.map((w) => w.length);
}

function longWords(words) {
  return words.filter((w) => w.length > 4);
}

function countMatches(arr, target) {
  let count = 0;
  for (const item of arr) {
    if (item === target) count++;
  }
  return count;
}

console.log(lengths(["hi", "hello"]), longWords(["tiny", "python"]), countMatches([1, 2, 1], 1));

@@ hint
For `countMatches`: start with `let count = 0;`, loop with `for (const item of arr)`, and add 1 when `item === target`.
