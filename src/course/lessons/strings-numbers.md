## Types & Template Literals

The primitive types you'll use:

| Type | Examples | Notes |
|---|---|---|
| `number` | `42`, `3.5` | One type for integers and decimals: `7 / 2` is `3.5` |
| `string` | `"hi"`, `'hi'` | Single or double quotes, no difference |
| `boolean` | `true`, `false` | Lowercase |
| `undefined` | | "Never set": missing variables, properties and return values |
| `null` | | "Intentionally empty" |

`typeof value` gives the type as a string, for example `typeof 42` is `"number"`.

```js
Math.floor(7 / 2)   // 3
2 ** 10             // 1024
"hello".length      // 5 (a property, no parentheses)
"hi".toUpperCase()  // "HI"
"  hi ".trim()      // "hi"
String(42)          // "42"
Number("42")        // 42
Number("abc")       // NaN ("not a number")
```

### Template literals

Use **backticks** and `${...}` to build strings. Any expression works inside:

```js
const name = "Ada";
const age = 36;
console.log(`${name} is ${age} years old`);
console.log(`Next year: ${age + 1}`);
```

`${...}` only works inside backticks. In `"double"` or `'single'` quotes it's literal text.

Comparisons produce booleans: `const isAdult = age >= 18;`

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
