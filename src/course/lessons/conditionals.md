## Conditionals & Truthiness

### if / else if / else

```compare
if temp > 30:
    print("hot")
elif temp > 15:
    print("nice")
else:
    print("cold")
////
if (temp > 30) {
  console.log("hot");
} else if (temp > 15) {
  console.log("nice");
} else {
  console.log("cold");
}
```

Parentheses around the condition are **required**, `elif` becomes `else if`, and blocks use `{ }`.

### `and`, `or`, `not`

| Python | JavaScript |
|---|---|
| `and` | `&&` |
| `or` | `\|\|` |
| `not` | `!` |

### ⚠️ Use `===`, not `==`

JavaScript's `==` converts types before comparing, which leads to weird results. **Always use `===` (and `!==`)**. They behave like Python's `==` and `!=`.

```js
"5" == 5    // true  😱
"5" === 5   // false ✅
0 == ""     // true  😱
0 === ""    // false ✅
```

### The ternary operator

Python's one-line conditional is `a if cond else b`. JavaScript puts the condition first:

```compare
label = "adult" if age >= 18 else "minor"
////
const label = age >= 18 ? "adult" : "minor";
```

You'll use this **constantly** in React to decide what to show.

### Truthiness: mostly the same, one big difference

Falsy values in JavaScript: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy, **including empty arrays and objects**:

```compare
if []:            # falsy in Python
    print("never")
////
if ([]) {         // TRUTHY in JS!
  console.log("this runs!");
}
// Check the length instead:
if (list.length === 0) { /* ... */ }
```

### The remainder operator

`%` works just like Python: `7 % 2` is `1`.

@@ instructions
1. Write `grade(score)` that returns:
   - `"A"` for 90 and above
   - `"B"` for 80–89
   - `"C"` for 70–79
   - `"F"` for anything lower
2. Write `parity(n)` that returns `"even"` or `"odd"` using the **ternary operator**.
3. Use `===` for equality checks (the tests will look!).

@@ starter
function grade(score) {
  // use if / else if / else
}

const parity = (n) => {
  // use a ternary here
};

console.log(grade(95), grade(85), grade(72), grade(40));
console.log(parity(4), parity(7));

@@ solution
function grade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else {
    return "F";
  }
}

const parity = (n) => (n % 2 === 0 ? "even" : "odd");

console.log(grade(95), grade(85), grade(72), grade(40));
console.log(parity(4), parity(7));

@@ hint
Check from the highest grade down: `if (score >= 90) { return "A"; } else if (score >= 80) { ... }`

@@ hint
A number is even when `n % 2 === 0`. Then: `return n % 2 === 0 ? "even" : "odd";`
