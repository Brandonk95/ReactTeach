## Variables: `let` and `const`

In Python you just write `name = value`. JavaScript makes you **declare** a variable the first time, and you choose how:

| Keyword | Can be reassigned? | When to use |
|---|---|---|
| `const` | ❌ No | **Default choice.** Most variables never change. |
| `let` | ✅ Yes | Counters, totals, anything you reassign. |
| `var` | ✅ Yes | Old-style, with confusing scoping rules. **Avoid it.** |

```compare
city = "Paris"
visits = 1
visits += 1
# Python has no real constants;
# CAPS is just a convention
MAX_USERS = 100
////
const city = "Paris";
let visits = 1;
visits += 1;   // or visits++
// const is enforced by the language
const MAX_USERS = 100;
```

If you try to reassign a `const`, JavaScript stops you:

```js
const city = "Paris";
city = "Rome"; // ❌ TypeError: Assignment to constant variable.
```

### Naming conventions

Python uses `snake_case`; JavaScript uses **`camelCase`** for variables and functions:

```compare
first_name = "Ada"
total_price = 9.99
////
const firstName = "Ada";
const totalPrice = 9.99;
```

### Block scope

`let` and `const` only exist inside the `{ }` block where they're declared. Python's `if` and `for` don't create a new scope, but JavaScript's blocks do:

```compare
if True:
    message = "hi"
print(message)  # works in Python
////
if (true) {
  const message = "hi";
}
console.log(message); // ❌ ReferenceError
```

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
