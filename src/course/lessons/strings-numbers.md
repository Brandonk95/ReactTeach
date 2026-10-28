## Types & Template Literals

### The basic types

| Python | JavaScript | Notes |
|---|---|---|
| `int`, `float` | `number` | JS has just **one** number type. `7 / 2` is `3.5`. |
| `str` | `string` | `"double"` or `'single'` quotes, same as Python. |
| `True` / `False` | `true` / `false` | **lowercase** in JS! |
| `None` | `null` and `undefined` | `undefined` = "never set"; `null` = "intentionally empty". |
| `type(x)` | `typeof x` | `typeof 42` → `"number"` |

```compare
7 // 2          # 3 (floor division)
7 / 2           # 3.5
2 ** 10         # 1024
len("hello")    # 5
"hi".upper()    # 'HI'
str(42)         # '42'
int("42")       # 42
////
Math.floor(7 / 2)  // 3
7 / 2              // 3.5
2 ** 10            // 1024
"hello".length     // 5 (a property, no parentheses!)
"hi".toUpperCase() // "HI"
String(42)         // "42"
Number("42")       // 42
```

### Template literals = f-strings

Python's f-strings have a twin in JavaScript: **template literals**. They use **backticks** (`` ` ``, usually the key above `Tab`) and `${ }` instead of `{ }`:

```compare
name = "Ada"
age = 36
print(f"{name} is {age} years old")
print(f"Next year: {age + 1}")
////
const name = "Ada";
const age = 36;
console.log(`${name} is ${age} years old`);
console.log(`Next year: ${age + 1}`);
```

⚠️ `${...}` only works inside **backticks**. In `"double quotes"` it's just literal text.

### Comparisons produce booleans

```js
const isAdult = age >= 18;   // true
console.log(typeof isAdult); // "boolean"
```

@@ instructions
Using the variables provided:

1. Create a constant `receipt` with the text `4 x coffee = $14`, built with a **template literal**. Don't type the numbers by hand; use `${quantity}`, `${item}` and `${price * quantity}`.
2. Create a constant `isExpensive` that is `true` when the total (`price * quantity`) is greater than `10`.
3. Log `receipt`.

> 💡 A literal `$` right before `${...}` works fine: `` `$${total}` `` prints `$14`.

@@ starter
const item = "coffee";
const price = 3.5;
const quantity = 4;

// 1. Build the receipt with a template literal: "4 x coffee = $14"
const receipt = "";

// 2. true if the total is more than 10
const isExpensive = false;

// 3. Log the receipt

@@ solution
const item = "coffee";
const price = 3.5;
const quantity = 4;

const receipt = `${quantity} x ${item} = $${price * quantity}`;

const isExpensive = price * quantity > 10;

console.log(receipt);

@@ hint
Template literals use backticks: `` `${quantity} x ${item} = ...` ``

@@ hint
For the dollar sign, write `$` right before the expression: `` `= $${price * quantity}` ``

@@ hint
`isExpensive` should be a comparison, not a hard-coded value: `price * quantity > 10`
