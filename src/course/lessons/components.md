## Composing Components

Real apps are built from many small components, just like Python programs are built from many small functions.

Once you define a component, you use it **like an HTML tag**:

```jsx
function Avatar() {
  return <img src="https://i.pravatar.cc/80" alt="avatar" />;
}

function Profile() {
  return (
    <div className="card">
      <Avatar />
      <h2>Ada Lovelace</h2>
    </div>
  );
}
```

```compare
# The Python way of thinking:
def avatar():
    return '<img ...>'

def profile():
    return f"<div>{avatar()}<h2>Ada</h2></div>"
////
// The React way:
function Avatar() {
  return <img ... />;
}

function Profile() {
  return <div><Avatar /><h2>Ada</h2></div>;
}
```

### Capital letters matter

React decides "HTML tag or component?" based on the first letter:

- `<header>` → the built-in HTML `<header>` element
- `<Header>` → **your** `Header` function

That's why component names must be **PascalCase**.

### Don't define components inside components

Always define components at the **top level** of your file, not inside another component's function. It works, but it causes subtle bugs and slow re-renders.

### Thinking in a tree

Every React app is a **tree** of components:

```
App
├── Header
├── main
│   └── (page content)
└── Footer
```

@@ instructions
1. Create a `Header` component that renders a `<header>` containing an `<h1>` with the text `My Blog`.
2. Create a `Footer` component that renders a `<footer>` containing the text `Made with React`.
3. Make `App` render `<Header />`, then a `<main>` with a paragraph of your choice, then `<Footer />`.

@@ starter
// 1. Header component


// 2. Footer component


function App() {
  return (
    <div>
      {/* 3. Header, a <main> with a paragraph, then Footer */}
    </div>
  );
}

@@ solution
function Header() {
  return (
    <header>
      <h1>My Blog</h1>
    </header>
  );
}

function Footer() {
  return <footer>Made with React ⚛️</footer>;
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <p>Welcome to my blog about learning React!</p>
      </main>
      <Footer />
    </div>
  );
}

@@ hint
A component is just a function: `function Header() { return (<header>...</header>); }`

@@ hint
Use them inside App as self-closing tags: `<Header />` and `<Footer />`.
