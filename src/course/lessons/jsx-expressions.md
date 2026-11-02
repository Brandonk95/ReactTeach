## JSX: Expressions & Attributes

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

Statements like `if` or `for` **can't** go inside `{ }`, only expressions. That's why React code leans on ternaries and `.map()`.

### Attributes

JSX attributes look like HTML, with a few differences because JSX is JavaScript:

| HTML | JSX | Why |
|---|---|---|
| `class="card"` | `className="card"` | `class` is a reserved word |
| `for="email"` | `htmlFor="email"` | `for` is a reserved word |
| `onclick="..."` | `onClick={...}` | camelCase, and you pass a function |
| `style="color: red"` | `style={{ color: "red" }}` | an object |

Use quotes for fixed strings and `{ }` for anything else:

```jsx
<img src={user.photoUrl} alt="profile" width={100} />
```

### Inline styles

`style` takes an **object** with camelCase CSS property names. The outer braces mean "JavaScript here", and the inner braces are the object itself:

```jsx
<h1 style={{ color: "red", fontSize: 20 }}>Hi</h1>
```

Numbers are treated as pixels (`fontSize: 20` means `20px`).

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
