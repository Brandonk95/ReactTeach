## Conditionals & Equality

```js
if (temp > 30) {
  console.log("hot");
} else if (temp > 15) {
  console.log("nice");
} else {
  console.log("cold");
}
```

The condition needs parentheses. Logical operators are `&&`, `||` and `!`.

### Always use `===`

`==` converts types before comparing, which gives surprising results. Use `===` and `!==`:

```js
"5" == 5    // true  😱
"5" === 5   // false ✅
0 == ""     // true  😱
```

### The ternary operator

`condition ? valueIfTrue : valueIfFalse` is an expression, so you can use it anywhere a value fits. You'll use it constantly in React:

```js
const label = age >= 18 ? "adult" : "minor";
```

### Truthiness

The falsy values are `false`, `0`, `""`, `null`, `undefined` and `NaN`. **Everything else is truthy, including `[]` and `{}`.** To check for an empty array, use `list.length === 0`.

`&&` and `||` return one of their operands, not necessarily a boolean:

```js
"" || "default"   // "default"
user && user.name // user.name, or undefined if there's no user
```

`%` is the remainder operator: `7 % 2` is `1`.

@@ instructions
1. Write `grade(score)` that returns:
   - `"A"` for 90 and above
   - `"B"` for 80–89
   - `"C"` for 70–79
   - `"F"` for anything lower
2. Write `parity(number)` that returns `"even"` or `"odd"` using the **ternary operator**.
3. Use `===` for equality checks (the tests will look!).

@@ starter
function grade(score) {
  // use if / else if / else
}

const parity = (number) => {
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

const parity = (number) => (number % 2 === 0 ? "even" : "odd");

console.log(grade(95), grade(85), grade(72), grade(40));
console.log(parity(4), parity(7));

@@ hint
Check from the highest grade down: `if (score >= 90) { return "A"; } else if (score >= 80) { ... }`

@@ hint
A number is even when `number % 2 === 0`. Then: `return number % 2 === 0 ? "even" : "odd";`
