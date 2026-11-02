## 🔁 Practice: Conditionals

Recap:

- `if (...) { } else if (...) { } else { }` (with parentheses and braces)
- Always `===`, never `==`
- Ternary: `condition ? valueIfTrue : valueIfFalse`

@@ instructions
1. **`fizzbuzz(number)`** returns a string:
   - `"FizzBuzz"` if `number` is divisible by both 3 and 5 (that is, by 15)
   - `"Fizz"` if it's divisible by 3
   - `"Buzz"` if it's divisible by 5
   - otherwise, the number as a string: `fizzbuzz(7)` → `"7"` (use `String(number)`)

   Use `%` to test divisibility (`number % 3 === 0`), and check the "both" case **first**.

   Examples: `fizzbuzz(15)` → `"FizzBuzz"`, `fizzbuzz(9)` → `"Fizz"`, `fizzbuzz(10)` → `"Buzz"`.
2. **`canVote(age)`** returns `"yes"` if `age` is 18 or more, otherwise `"no"`. Write it as a one-line arrow function with a **ternary**: `condition ? "yes" : "no"`.

Use `===`, never `==`.

@@ starter
function fizzbuzz(number) {
  // if divisible by 15 → "FizzBuzz"
  // else if divisible by 3 → "Fizz"
  // else if divisible by 5 → "Buzz"
  // otherwise → the number as a string
}

// One line, using a ternary: (age) => condition ? "yes" : "no"
const canVote = (age) => {
  // return ...
};

// Prints 1 to 15 so you can check fizzbuzz
for (let count = 1; count <= 15; count++) {
  console.log(fizzbuzz(count));
}
console.log(canVote(18), canVote(17));

@@ solution
function fizzbuzz(number) {
  if (number % 15 === 0) {
    return "FizzBuzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else if (number % 5 === 0) {
    return "Buzz";
  }
  return String(number);
}

const canVote = (age) => (age >= 18 ? "yes" : "no");

for (let count = 1; count <= 15; count++) {
  console.log(fizzbuzz(count));
}

@@ hint
Check the "both" case first (`number % 15 === 0`), or the `% 3` branch will catch 15 before you get there.

@@ hint
Turn a number into a string with `String(number)`.
