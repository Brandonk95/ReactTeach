## 🔁 Practice: Composing Components

Recap:

- Define each component as its own top-level function
- Use one inside another like a tag: `<Logo />`
- Capital letter = your component; lowercase = HTML

@@ instructions
Build a navigation bar out of two components:

1. `Logo` renders `<span className="logo">ReactTeach</span>`.
2. `NavBar` renders a `<nav>` containing `<Logo />` followed by two links: `<a href="#">Home</a>` and `<a href="#">About</a>`.
3. `App` renders `<NavBar />`.

@@ starter


@@ solution
function Logo() {
  return <span className="logo">ReactTeach</span>;
}

function NavBar() {
  return (
    <nav>
      <Logo />
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  );
}

function App() {
  return <NavBar />;
}

@@ hint
Three small functions, each returning JSX. `NavBar` uses `<Logo />`, and `App` uses `<NavBar />`.
