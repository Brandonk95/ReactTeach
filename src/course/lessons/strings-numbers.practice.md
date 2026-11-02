## 🔁 Practice: Types & Template Literals

Recap:

- Template literals use **backticks** and `${...}`: `` `Hi ${name}` ``
- Comparisons give booleans: `age >= 65`
- `.toUpperCase()` returns an uppercase copy of a string

@@ instructions
The three variables at the top are given. Below them:

1. Declare `age` as `currentYear - birthYear`.
2. Declare `bio` using a **template literal** (backticks) so it reads exactly:
   `Guido was born in 1956 and is 70 years old.`
   Insert `firstName`, `birthYear` and `age` with `${...}`. Don't type `70` yourself, since it has to be calculated.
3. Declare `isSenior` as the comparison `age >= 65`. It should be the boolean `true`.
4. Declare `shout` as `firstName` in all capitals (`"GUIDO"`), using the `.toUpperCase()` method.
5. Uncomment the `console.log` at the bottom of the starter to check all three.

@@ starter
const firstName = "Guido";
const birthYear = 1956;
const currentYear = 2026;

// 1. age = currentYear minus birthYear


// 2. bio, with a template literal: `... ${firstName} ...`


// 3. isSenior: is age 65 or more?


// 4. shout: firstName in capitals


// 5. once all three exist, uncomment this to check them
// console.log(bio, isSenior, shout);

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
