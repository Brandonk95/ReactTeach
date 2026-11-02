## Functions & Arrow Functions

```js
function add(first, second = 0) {
  return first + second;
}
```

- Default parameters work as you'd expect.
- No `return` means the function returns `undefined`.
- Calling with missing arguments doesn't throw an error. The missing ones are just `undefined`.

### Arrow functions

The shorter syntax, used everywhere in React:

```js
const square = (number) => number * number; // expression body: returned automatically

const describe = (number) => {
  // block body: needs an explicit return
  const size = number > 100 ? "big" : "small";
  return `${number} is ${size}`;
};
```

- Without braces, the expression after `=>` is returned.
- With braces `{ }`, you must write `return`.
- To return an object literal directly, wrap it in parentheses: `() => ({ id: 1 })`.

### Functions are values

Functions can be stored in variables, passed as arguments and returned. React relies on this heavily, for example to say what runs when a button is clicked.

```js
function callWith5(someFunction) {
  return someFunction(5);
}

callWith5(square); // 25
```

@@ instructions
1. Write a function `greet(name)` that returns `` `Hello, ${name}!` ``. If no name is given, use `"friend"` as the default.
2. Write `square` as an **arrow function** that takes a `number` and returns it times itself.
3. Write `applyTwice(transform, value)` that calls the function `transform` on `value`, then calls `transform` again on the result, and returns that. So `applyTwice(square, 3)` is `square(square(3))`, which is `81`.

@@ starter
// 1. greet(name) with a default of "friend"
function greet(name) {

}

// 2. square as an arrow function
const square = null;

// 3. applyTwice(transform, value)


// Try them out:
console.log(greet("Ada"));
console.log(greet());

@@ solution
function greet(name = "friend") {
  return `Hello, ${name}!`;
}

const square = (number) => number * number;

function applyTwice(transform, value) {
  return transform(transform(value));
}

console.log(greet("Ada"));
console.log(greet());
console.log(square(5));
console.log(applyTwice(square, 3));

@@ hint
Default parameter: `function greet(name = "friend") { ... }`. Don't forget the `return`!

@@ hint
A one-line arrow function: `const square = (number) => number * number;`

@@ hint
`applyTwice` is one line: `return transform(transform(value));`
