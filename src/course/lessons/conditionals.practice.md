## 🔁 Practice: Conditionals

Recap:

- `if (...) { } else if (...) { } else { }` (with parentheses and braces)
- Always `===`, never `==`
- Ternary: `cond ? a : b` (Python's `a if cond else b`)

@@ instructions
1. Write the classic `fizzbuzz(number)`:
   - divisible by 3 **and** 5 → `"FizzBuzz"`
   - divisible by 3 → `"Fizz"`
   - divisible by 5 → `"Buzz"`
   - otherwise → the number as a **string**, e.g. `"7"`
2. Write `canVote(age)` that returns `"yes"` for 18 and over, otherwise `"no"`. Use a ternary.

@@ starter


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
Turn a number into a string with `String(number)`, the JS version of `str(number)`.
