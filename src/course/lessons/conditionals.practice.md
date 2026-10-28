## 🔁 Practice: Conditionals

Recap:

- `if (...) { } else if (...) { } else { }` (with parentheses and braces)
- Always `===`, never `==`
- Ternary: `cond ? a : b` (Python's `a if cond else b`)

@@ instructions
1. Write the classic `fizzbuzz(n)`:
   - divisible by 3 **and** 5 → `"FizzBuzz"`
   - divisible by 3 → `"Fizz"`
   - divisible by 5 → `"Buzz"`
   - otherwise → the number as a **string**, e.g. `"7"`
2. Write `canVote(age)` that returns `"yes"` for 18 and over, otherwise `"no"`. Use a ternary.

@@ starter


@@ solution
function fizzbuzz(n) {
  if (n % 15 === 0) {
    return "FizzBuzz";
  } else if (n % 3 === 0) {
    return "Fizz";
  } else if (n % 5 === 0) {
    return "Buzz";
  }
  return String(n);
}

const canVote = (age) => (age >= 18 ? "yes" : "no");

for (let i = 1; i <= 15; i++) {
  console.log(fizzbuzz(i));
}

@@ hint
Check the "both" case first (`n % 15 === 0`), or the `% 3` branch will catch 15 before you get there.

@@ hint
Turn a number into a string with `String(n)`, the JS version of `str(n)`.
