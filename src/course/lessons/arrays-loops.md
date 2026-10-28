## Arrays, Loops & map/filter

Python **lists** are JavaScript **arrays**. Most things carry over:

```compare
scores = [10, 20, 30]
scores[0]          # 10
scores[-1]         # 30
len(scores)        # 3
scores.append(40)
30 in scores       # True
scores[1:3]        # [20, 30]
", ".join(names)
////
const scores = [10, 20, 30];
scores[0]          // 10
scores.at(-1)      // 30  (scores[-1] is undefined!)
scores.length      // 3
scores.push(40);
scores.includes(30) // true
scores.slice(1, 3) // [20, 30]
names.join(", ")
```

> Note: `const scores = [...]` doesn't make the array unchangeable. You can still `push` to it; you just can't reassign `scores` to a different array.

### Loops

```compare
for score in scores:
    print(score)

for index in range(3):
    print(index)

while count > 0:
    count -= 1
////
for (const score of scores) {
  console.log(score);
}

for (let index = 0; index < 3; index++) {
  console.log(index);
}

while (count > 0) {
  count -= 1;
}
```

⚠️ Use `for...of` for arrays. There's also a `for...in`, but it loops over **keys/indexes as strings**. It's a classic trap for Python developers!

### map & filter: the list comprehensions of JavaScript

This is the most important part of this lesson. In React, you'll turn arrays of data into arrays of UI elements with `.map()`, constantly.

```compare
doubled = [score * 2 for score in scores]

high = [score for score in scores if score > 15]

total = sum(scores)
////
const doubled = scores.map((score) => score * 2);

const high = scores.filter((score) => score > 15);

const total = scores.reduce((runningTotal, score) => runningTotal + score, 0);
```

- `.map(fn)` returns a **new** array with `fn` applied to every item.
- `.filter(fn)` returns a **new** array with only the items where `fn` returns truthy.
- Neither one changes the original array.
- `.map` also passes the index: `scores.map((score, index) => ...)`, like `enumerate`.
- `.reduce(fn, start)` combines everything into one value. `runningTotal` starts as `start` (the `0` above) and becomes whatever `fn` returns each time. Always pass a starting value: without one, `.reduce()` crashes on an empty array.

> ⚠️ Remember: a function with a `{ }` body needs `return`, or it returns `undefined`. `function doubled(numbers) { numbers.map(...) }` computes the new array and then throws it away.

@@ instructions
1. `doubled(numbers)` returns a **new** array with every number doubled, using `.map()`. Don't change the array that was passed in.
2. `evens(numbers)` returns a new array of only the even numbers, using `.filter()`.
3. `total(numbers)` returns the sum of all the numbers, and `0` for an empty array. Use a `for...of` loop or `.reduce()` with a starting value of `0`.

Inside each function, work with its parameter `numbers`, not `sampleNumbers`. The tests call your functions with their own arrays, so each one has to work for any array it's given.

@@ starter
// Sample data for trying your functions. Don't use it inside them!
const sampleNumbers = [1, 2, 3, 4, 5, 6];

function doubled(numbers) {
  // use .map()
}

function evens(numbers) {
  // use .filter()
}

function total(numbers) {
  // a for...of loop or .reduce()
}

console.log(doubled(sampleNumbers));
console.log(evens(sampleNumbers));
console.log(total(sampleNumbers));

@@ solution
// Sample data for trying your functions. Don't use it inside them!
const sampleNumbers = [1, 2, 3, 4, 5, 6];

function doubled(numbers) {
  return numbers.map((number) => number * 2);
}

function evens(numbers) {
  return numbers.filter((number) => number % 2 === 0);
}

function total(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

console.log(doubled(sampleNumbers));
console.log(evens(sampleNumbers));
console.log(total(sampleNumbers));

@@ hint
`return numbers.map((number) => number * 2);` Don't forget the `return`!

@@ hint
`.filter` keeps items where your function returns true: `numbers.filter((number) => number % 2 === 0)`

@@ hint
For total: start with `let sum = 0;`, loop with `for (const number of numbers) { sum += number; }`, then `return sum;`
