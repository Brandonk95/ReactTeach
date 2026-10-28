## 📝 Unit Test: Gradebook

This is the test for Unit 1. Unlike the lessons, **you're on your own**: there are no hints and no step-by-step starter code. Plan your program, write it yourself, and use **Run** as often as you like. Press **Check** to see which requirements your program meets. You pass when it meets **all of them**.

The sample solution unlocks once you pass.

### The scenario

A teacher keeps their gradebook as an array of students, each with a list of test scores. Write a small program that analyzes it.

```js
const gradebook = [
  { name: "Ada", scores: [95, 90, 98] },
  { name: "Grace", scores: [88, 92, 79] },
  { name: "Linus", scores: [72, 65, 70] },
  { name: "Guido", scores: [100, 85, 91] },
];
```

### Things you'll need

Everything here was covered in Unit 1, plus one new built-in:

- `Math.round(x)` rounds to the nearest whole number: `Math.round(94.33)` is `94`.

@@ instructions
Write these four functions, then use them to print the report.

| Function | Returns |
|---|---|
| `average(scores)` | The mean of an array of numbers. Return `0` for an empty array. |
| `letterGrade(score)` | `"A"` for 90+, `"B"` for 80+, `"C"` for 70+, `"D"` for 60+, otherwise `"F"` |
| `report(students)` | An array of strings, one per student, like `"Ada: 94 (A)"`. Round the average with `Math.round`, and base the letter on that rounded number. |
| `honorRoll(students)` | An array of the **names** of students whose average is 90 or more |

Your program must also:

- **Log each line** of `report(gradebook)` with `console.log`
- Use `.map()` and `.filter()` (in `report` and `honorRoll`, for example)
- **Not modify** the array passed in, or the objects in it
- Use `const` / `let`, never `var`

Inside your functions, use their parameters (`students`, `scores`, `score`), not `gradebook`. The tests call them with other data too.

Expected output:

```
Ada: 94 (A)
Grace: 86 (B)
Linus: 69 (D)
Guido: 92 (A)
```

@@ starter
// Unit 1 Test: Gradebook
// Read the requirements on the left, then write your program below.

const gradebook = [
  { name: "Ada", scores: [95, 90, 98] },
  { name: "Grace", scores: [88, 92, 79] },
  { name: "Linus", scores: [72, 65, 70] },
  { name: "Guido", scores: [100, 85, 91] },
];

@@ solution
const gradebook = [
  { name: "Ada", scores: [95, 90, 98] },
  { name: "Grace", scores: [88, 92, 79] },
  { name: "Linus", scores: [72, 65, 70] },
  { name: "Guido", scores: [100, 85, 91] },
];

function average(scores) {
  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function letterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function report(students) {
  return students.map(({ name, scores }) => {
    const roundedAverage = Math.round(average(scores));
    return `${name}: ${roundedAverage} (${letterGrade(roundedAverage)})`;
  });
}

function honorRoll(students) {
  return students.filter((student) => average(student.scores) >= 90).map((student) => student.name);
}

for (const line of report(gradebook)) {
  console.log(line);
}
console.log("Honor roll:", honorRoll(gradebook));
