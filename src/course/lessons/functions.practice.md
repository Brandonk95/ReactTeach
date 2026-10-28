## 🔁 Practice: Functions

Recap:

- `function name(a, b = 1) { return ...; }` is `def name(a, b=1):`
- Arrow functions: `const name = (a) => a * 2;` (no braces means the result is returned automatically)
- Functions are values you can pass around

@@ instructions
1. `double` is an **arrow function** that returns its argument times 2.
2. `describePet(name, species)` returns `"Rex is a dog"`. If no species is given, it defaults to `"cat"`.
3. `compose(f, g, x)` calls `g` on `x`, then calls `f` on that result, and returns it. So `compose(double, addOne, 3)` is `double(addOne(3))`, which is `8`.

@@ starter


@@ solution
const double = (n) => n * 2;

function describePet(name, species = "cat") {
  return `${name} is a ${species}`;
}

function compose(f, g, x) {
  return f(g(x));
}

console.log(compose(double, (n) => n + 1, 3));

@@ hint
`compose` is one line: `return f(g(x));`
