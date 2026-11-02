## Welcome

This course assumes you already know how to program. It skips the fundamentals and covers what's specific to **JavaScript** (its syntax and its quirks), then **React**.

### How it works

- Each lesson has a short explanation, an exercise, and then a quick **practice** exercise to make it stick.
- Write code in the editor. **Run** (`Ctrl`+`Enter`) shows console output and, for React lessons, a live **Preview**.
- **Check** (`Ctrl`+`S`) runs the tests. The lesson completes when they all pass.
- Stuck? Use the **Hints** tab, then the **Solution** tab.
- Each unit ends with a quiz and a unit test, where you build something from a spec with no hints.

### Printing output

```js
console.log("Hello");
console.log(2 + 3, "and", [1, 2]); // several values, separated by spaces
```

Statements end with `;`. It's technically optional, but conventional. Comments use `//` for a single line and `/* ... */` for a block.

@@ instructions
1. Log the text `Hello, React!` (exactly, including the comma and exclamation mark).
2. On the next line, log the result of `2 + 3`. Let JavaScript do the math!

@@ starter
// Your first JavaScript program!
// Use console.log() to print output.

@@ solution
// Your first JavaScript program!
console.log("Hello, React!");
console.log(2 + 3);

@@ hint
`console.log("some text");` prints text. Make sure the capitalization and punctuation match exactly: `Hello, React!`

@@ hint
`console.log(2 + 3);` prints `5`. Don't put quotes around `2 + 3`, or you'll print the text instead of the answer.
