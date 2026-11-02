## Arrays, Loops & map/filter

```js
const scores = [10, 20, 30];
scores[0]           // 10
scores.at(-1)       // 30 (scores[-1] is undefined: no negative indexing)
scores.length       // 3 (a property)
scores.push(40);    // add to the end
scores.includes(30) // true
scores.indexOf(20)  // 1 (-1 if not found)
scores.slice(1, 3)  // [20, 30] (a copy, end not included)
names.join(", ")    // "Ada, Grace"
```

`const scores = [...]` doesn't freeze the array. You can still `push` to it; you just can't reassign `scores`.

### Loops

```js
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

⚠️ Use `for...of` for arrays. `for...in` loops over **keys, as strings**, which is almost never what you want for an array.

### map, filter, reduce

These are the most important part of this lesson. In React you'll turn arrays of data into arrays of UI elements with `.map()` constantly.

```js
const doubled = scores.map((score) => score * 2);   // [20, 40, 60]
const high = scores.filter((score) => score > 15);   // [20, 30]
const total = scores.reduce((runningTotal, score) => runningTotal + score, 0); // 60
```

- `.map(fn)` returns a **new** array with `fn` applied to every item.
- `.filter(fn)` returns a **new** array with only the items where `fn` returns something truthy.
- Neither one changes the original array.
- `.map` also passes the index: `scores.map((score, index) => ...)`.
- `.reduce(fn, start)` combines everything into one value. `runningTotal` starts as `start` (the `0` above) and becomes whatever `fn` returns each time. Always pass a starting value: without one, `.reduce()` crashes on an empty array.

> ⚠️ A function with a `{ }` body needs `return`, or it returns `undefined`. `function doubled(numbers) { numbers.map(...) }` computes the new array and then throws it away.

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
