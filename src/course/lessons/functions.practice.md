## 🔁 Practice: Functions

Recap:

- `function name(first, second = 1) { return ...; }` declares a function with a default parameter
- Arrow functions: `const name = (a) => a * 2;` (no braces means the result is returned automatically)
- Functions are values you can pass around

@@ instructions
Fill in the three functions in the starter:

1. **`double`**: an **arrow function** that takes `number` and returns `number * 2`.
   - `double(4)` → `8`
2. **`describePet(name, species)`**: returns `` `${name} is a ${species}` ``. Give `species` a **default value** of `"cat"`.
   - `describePet("Rex", "dog")` → `"Rex is a dog"`
   - `describePet("Tom")` → `"Tom is a cat"`
3. **`compose(outer, inner, value)`**: `outer` and `inner` are functions. Call `inner` with `value`, pass that result to `outer`, and return what `outer` gives back.
   - `compose(double, addOne, 3)` → `double(addOne(3))` → `double(4)` → `8`

`addOne` is already written for you to test with.

@@ starter
// 1. Arrow function: takes number, returns it times 2
const double = (number) => {
  // return ...
};

// 2. Default species to "cat"
function describePet(name, species) {
  // return `${name} is a ${species}`
}

// 3. Call inner on value, then outer on that result
function compose(outer, inner, value) {
  // return ...
}

// For testing compose:
const addOne = (number) => number + 1;

console.log(double(4));
console.log(describePet("Rex", "dog"), describePet("Tom"));
console.log(compose(double, addOne, 3));

@@ solution
const double = (number) => number * 2;
const addOne = (number) => number + 1;

function describePet(name, species = "cat") {
  return `${name} is a ${species}`;
}

function compose(outer, inner, value) {
  return outer(inner(value));
}

console.log(compose(double, addOne, 3));

@@ hint
`compose` is one line: `return outer(inner(value));`
