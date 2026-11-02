## 🔁 Practice: Composing Components

Recap:

- Define each component as its own top-level function
- Use one inside another like a tag: `<Logo />`
- Capital letter = your component; lowercase = HTML

@@ instructions
Build a navigation bar from two components. Fill in each function in the starter:

1. **`Logo`** returns `<span className="logo">ReactTeach</span>`.
2. **`NavBar`** returns a `<nav>` containing, in order:
   - `<Logo />`
   - `<a href="#">Home</a>`
   - `<a href="#">About</a>`
3. **`App`** returns `<NavBar />`.

@@ starter
function Logo() {
  // return a <span> with className "logo" and the text ReactTeach
  return null;
}

function NavBar() {
  return (
    <nav>
      {/* <Logo />, then a "Home" link, then an "About" link */}
    </nav>
  );
}

function App() {
  // render the NavBar component
  return null;
}

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
