## 🔁 Practice: Functions

Recap:

- `function name(a, b = 1) { return ...; }` is `def name(a, b=1):`
- Arrow functions: `const name = (a) => a * 2;` (no braces means the result is returned automatically)
- Functions are values you can pass around

@@ instructions
1. `double` is an **arrow function** that takes a `number` and returns it times 2.
2. `describePet(name, species)` returns `"Rex is a dog"`. If no species is given, it defaults to `"cat"`.
3. `compose(outer, inner, value)` calls the function `inner` on `value`, then calls `outer` on that result, and returns it. So `compose(double, addOne, 3)` is `double(addOne(3))`, which is `8`.

@@ starter


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
