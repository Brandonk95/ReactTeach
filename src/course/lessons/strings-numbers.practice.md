## 🔁 Practice: Types & Template Literals

Recap:

- Template literals use **backticks** and `${...}`: `` `Hi ${name}` `` (Python's `f"Hi {name}"`)
- Comparisons give booleans: `age >= 65`
- `.toUpperCase()` is Python's `.upper()`

@@ instructions
Using the variables provided:

1. `bio` should be `Guido was born in 1956 and is 70 years old.`, built with a template literal. **Calculate** the age from the years.
2. `isSenior` should be `true` if the age is 65 or more (a real comparison, not typed by hand).
3. `shout` should be the first name in all caps, using a string method.

@@ starter
const firstName = "Guido";
const birthYear = 1956;
const currentYear = 2026;

@@ solution
const firstName = "Guido";
const birthYear = 1956;
const currentYear = 2026;

const age = currentYear - birthYear;
const bio = `${firstName} was born in ${birthYear} and is ${age} years old.`;
const isSenior = age >= 65;
const shout = firstName.toUpperCase();

console.log(bio, isSenior, shout);

@@ hint
Make an `age` variable first: `const age = currentYear - birthYear;` Then use `${age}` inside the template literal.
