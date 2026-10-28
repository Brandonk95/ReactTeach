## Arrays, Loops & map/filter

Python **lists** are JavaScript **arrays**. Most things carry over:

```compare
nums = [10, 20, 30]
nums[0]          # 10
nums[-1]         # 30
len(nums)        # 3
nums.append(40)
30 in nums       # True
nums[1:3]        # [20, 30]
", ".join(names)
////
const nums = [10, 20, 30];
nums[0]          // 10
nums.at(-1)      // 30  (nums[-1] is undefined!)
nums.length      // 3
nums.push(40);
nums.includes(30) // true
nums.slice(1, 3) // [20, 30]
names.join(", ")
```

> Note: `const nums = [...]` doesn't make the array unchangeable. You can still `push` to it; you just can't reassign `nums` to a different array.

### Loops

```compare
for n in nums:
    print(n)

for i in range(3):
    print(i)

while count > 0:
    count -= 1
////
for (const n of nums) {
  console.log(n);
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}

while (count > 0) {
  count -= 1;
}
```

⚠️ Use `for...of` for arrays. There's also a `for...in`, but it loops over **keys/indexes as strings**. It's a classic trap for Python developers!

### map & filter: the list comprehensions of JavaScript

This is the most important part of this lesson. In React, you'll turn arrays of data into arrays of UI elements with `.map()`, constantly.

```compare
doubled = [n * 2 for n in nums]

big = [n for n in nums if n > 15]

total = sum(nums)
////
const doubled = nums.map((n) => n * 2);

const big = nums.filter((n) => n > 15);

const total = nums.reduce((acc, n) => acc + n, 0);
```

- `.map(fn)` returns a **new** array with `fn` applied to every item.
- `.filter(fn)` returns a **new** array with only the items where `fn` returns truthy.
- Neither one changes the original array.
- `.map` also passes the index: `nums.map((n, i) => ...)`, like `enumerate`.

@@ instructions
1. `doubled(arr)` returns a new array with every number doubled. Use `.map()`.
2. `evens(arr)` returns only the even numbers. Use `.filter()`.
3. `total(arr)` returns the sum of all numbers (`0` for an empty array). Use a `for...of` loop or `.reduce()`, your choice.

@@ starter
const nums = [1, 2, 3, 4, 5, 6];

function doubled(arr) {
  // use .map()
}

function evens(arr) {
  // use .filter()
}

function total(arr) {
  // a for...of loop or .reduce()
}

console.log(doubled(nums));
console.log(evens(nums));
console.log(total(nums));

@@ solution
const nums = [1, 2, 3, 4, 5, 6];

function doubled(arr) {
  return arr.map((n) => n * 2);
}

function evens(arr) {
  return arr.filter((n) => n % 2 === 0);
}

function total(arr) {
  let sum = 0;
  for (const n of arr) {
    sum += n;
  }
  return sum;
}

console.log(doubled(nums));
console.log(evens(nums));
console.log(total(nums));

@@ hint
`return arr.map((n) => n * 2);` Don't forget the `return`!

@@ hint
`.filter` keeps items where your function returns true: `arr.filter((n) => n % 2 === 0)`

@@ hint
For total: start with `let sum = 0;`, loop with `for (const n of arr) { sum += n; }`, then `return sum;`
