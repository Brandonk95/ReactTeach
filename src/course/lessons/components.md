## Composing Components

Apps are built from many small components. Once a component is defined, use it **like an HTML tag**:

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

### Capitalization matters

React decides "HTML tag or component?" by the first letter:

- `<header>` is the built-in HTML element
- `<Header>` is **your** `Header` function

### Define components at the top level

Don't define a component inside another component's function. It works, but React treats it as a brand-new component on every render, which resets its state and slows things down.

### The component tree

Every app is a tree of components:

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
