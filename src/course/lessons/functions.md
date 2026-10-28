## Functions & Arrow Functions

### Function declarations

```compare
def greet(name):
    return "Hello, " + name

def add(a, b=0):
    return a + b
////
function greet(name) {
  return "Hello, " + name;
}

function add(a, b = 0) {
  return a + b;
}
```

Differences to notice:

- `function` instead of `def`
- Parameters in `( )`, body in `{ }`. Indentation is just for humans.
- Default values work the same way: `b = 0`.
- **No `return` means the function returns `undefined`** (JavaScript's `None`).

### Arrow functions

JavaScript has a second, shorter way to write functions that's used **everywhere** in React. They're like Python's `lambda`, but they can be as long as you want:

```compare
square = lambda number: number * number

def describe(number):
    size = "big" if number > 100 else "small"
    return f"{number} is {size}"
////
const square = (number) => number * number;

const describe = (number) => {
  const size = number > 100 ? "big" : "small";
  return `${number} is ${size}`;
};
```

- With **no braces**, the expression after `=>` is returned automatically.
- With **braces** `{ }`, you need an explicit `return`.

### Functions are values

Just like in Python, you can pass functions to other functions. React does this constantly, for example by passing a function to run when a button is clicked.

```compare
def call_with_5(some_function):
    return some_function(5)

call_with_5(square)  # 25
////
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
Default parameters look just like Python: `function greet(name = "friend") { ... }`. Don't forget the `return`!

@@ hint
A one-line arrow function: `const square = (number) => number * number;`

@@ hint
`applyTwice` is one line: `return transform(transform(value));`
