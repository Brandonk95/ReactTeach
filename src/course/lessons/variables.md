## Variables: `let` and `const`

Variables must be declared before use:

```js
const city = "Paris"; // can't be reassigned
let visits = 1;       // can be reassigned
visits += 1;          // or visits++
```

- Use **`const` by default**, and `let` only when you reassign.
- Avoid `var`. It's the legacy keyword, with function scope and hoisting quirks.
- `const` prevents **reassignment**, not mutation. `const list = []; list.push(1);` is fine.
- `let` and `const` are **block-scoped**: declared inside `{ }`, they don't exist outside it.

```js
if (true) {
  const message = "hi";
}
console.log(message); // ReferenceError
```

**Naming conventions:** `camelCase` for variables and functions, `PascalCase` for components and classes, `UPPER_SNAKE_CASE` for fixed constants.

@@ instructions
1. Create a **constant** named `city` with the value `"Paris"`.
2. Create a variable named `visits` with the value `1`. It will change, so use `let`.
3. Add 1 to `visits`.
4. Log `city`, then log `visits` (two separate `console.log` calls).

@@ starter
// 1. Create a constant named city


// 2. Create a variable named visits that starts at 1


// 3. Add 1 to visits


// 4. Log city, then visits

@@ solution
const city = "Paris";
let visits = 1;
visits += 1;
console.log(city);
console.log(visits);

@@ hint
`const city = "Paris";` declares a constant. `let visits = 1;` declares a variable you can change.

@@ hint
You can add one with `visits += 1;` or the shorthand `visits++;`.
