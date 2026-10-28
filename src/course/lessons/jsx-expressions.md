## JSX: Expressions & Attributes

### Showing data

Anything inside `{ }` is a JavaScript **expression**: a variable, math, a function call, a property, a ternary...

```jsx
const user = { first: "Ada", last: "Lovelace", born: 1815 };

function App() {
  return (
    <p>
      {user.first} {user.last.toUpperCase()} was born {2026 - user.born} years ago.
    </p>
  );
}
```

> Statements like `if` or `for` **can't** go inside `{ }`, only expressions. (Ternaries and `.map()` are expressions, which is why React code uses them so much.)

### Attributes (props) on HTML elements

JSX attributes look like HTML, with a few differences because JSX is really JavaScript:

| HTML | JSX | Why |
|---|---|---|
| `class="card"` | `className="card"` | `class` is a reserved word in JS |
| `for="email"` | `htmlFor="email"` | `for` is a reserved word too |
| `onclick="..."` | `onClick={...}` | camelCase, and you pass a function |
| `style="color: red"` | `style={{ color: "red" }}` | an object! |

Use quotes for fixed strings and `{ }` for JavaScript values:

```jsx
<img src={user.photoUrl} alt="profile" width={100} />
```

### The double-brace style

`style` takes a JavaScript **object**, with camelCase CSS property names. The outer braces mean "JavaScript here"; the inner braces are the object literal:

```compare
# Like passing a dict:
style = {"color": "red", "font_size": 20}
////
<h1 style={{ color: "red", fontSize: 20 }}>
  Hi
</h1>
```

@@ instructions
Using the `user` object, make `App` render this structure:

```html
<div class="card">
  <h2 style="color: rebeccapurple">Grace Hopper</h2>
  <p>Favorite language: COBOL</p>
</div>
```

But in **JSX**:

1. Use `className` for the class.
2. Show the name with `{user.name}` and the language with `{user.language}`. Don't type them by hand!
3. Give the `<h2>` the style `color: "rebeccapurple"` using a style object.

@@ starter
const user = {
  name: "Grace Hopper",
  language: "COBOL",
};

function App() {
  return (
    <div>

    </div>
  );
}

@@ solution
const user = {
  name: "Grace Hopper",
  language: "COBOL",
};

function App() {
  return (
    <div className="card">
      <h2 style={{ color: "rebeccapurple" }}>{user.name}</h2>
      <p>Favorite language: {user.language}</p>
    </div>
  );
}

@@ hint
`<div className="card">`. Remember, `class` doesn't work in JSX.

@@ hint
The style needs two sets of braces: `<h2 style={{ color: "rebeccapurple" }}>`

@@ hint
`<p>Favorite language: {user.language}</p>`
