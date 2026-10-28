## Welcome! 👋

You already know how to program: you know Python. This course builds on that. Every new idea in JavaScript and React is shown **next to the Python you already know**, so you're learning the *differences*, not programming from scratch.

### How this course works

Each lesson has three parts:

1. **This panel** explains a concept with side-by-side Python ↔ JavaScript examples.
2. **The editor** (middle) is where you write code. Press **Run** (or `Ctrl`+`Enter`) to try it.
3. **The output** (right) shows your console output, a live **Preview** of React apps, and your **Tests**.

When you think you're done, press **Check**. Automatic tests grade your work, and when they all pass the lesson is marked complete. Stuck? Open the **Hints** tab. Really stuck? The **Solution** tab is there too, no judgement.

> 🐍 **Python habit detector:** if you type something Pythonic like `print(...)` or `True`, the console will gently point you to the JavaScript version.

### Your first line of JavaScript

JavaScript's `print` is `console.log`. Statements usually end with a semicolon (optional, but conventional).

```compare
print("Hello, world!")
print(2 + 3)
////
console.log("Hello, world!");
console.log(2 + 3);
```

Notice the differences:

- `console.log(...)` instead of `print(...)`
- An optional `;` at the end of each statement
- Comments start with `//` instead of `#`

```js
// This is a comment in JavaScript
/* This is a
   multi-line comment */
```

@@ instructions
1. Log the text `Hello, React!` (exactly, including the comma and exclamation mark).
2. On the next line, log the result of `2 + 3`. Let JavaScript do the math!

@@ starter
// Your first JavaScript program!
// Use console.log() to print things (it's JavaScript's print()).

@@ solution
// Your first JavaScript program!
console.log("Hello, React!");
console.log(2 + 3);

@@ hint
`console.log("some text");` prints text. Make sure the capitalization and punctuation match exactly: `Hello, React!`

@@ hint
`console.log(2 + 3);` prints `5`. Don't put quotes around `2 + 3`, or you'll print the text instead of the answer.
