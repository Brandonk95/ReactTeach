## 🔁 Practice: Props

Recap:

- Props arrive as one object; destructure them: `function Badge({ label, color = "gray" })`
- Default values work like default function parameters: `{ color = "gray" }`
- Whatever goes between a component's tags arrives as `children`

@@ instructions
1. **`Badge({ label, color = "gray" })`** returns a `<span>` with:
   - `className="badge"`
   - `style={{ background: color }}`
   - the `label` as its text

   `<Badge label="New" />` should be gray, and `<Badge label="Sale" color="green" />` green.
2. **`Card({ title, children })`** returns a `<div className="card">` containing an `<h3>` with the `title`, followed by `{children}`.
3. **`App`** returns a `Card` (any title) with a `Badge` and a `<p>` inside it. The starter already has this; once `Badge` and `Card` work, it renders.

@@ starter
function Badge({ label, color = "gray" }) {
  // return a <span> with className "badge", a background of color, and label as its text
  return null;
}

function Card({ title, children }) {
  // return a <div className="card"> with <h3>{title}</h3>, then {children}
  return null;
}

function App() {
  return (
    <Card title="Mechanical keyboard">
      <Badge label="New" color="green" />
      <p>Clicky and satisfying.</p>
    </Card>
  );
}

@@ solution
function Badge({ label, color = "gray" }) {
  return (
    <span className="badge" style={{ background: color }}>
      {label}
    </span>
  );
}

function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Mechanical keyboard">
      <Badge label="New" color="green" />
      <p>Clicky and satisfying.</p>
    </Card>
  );
}

@@ hint
Render children by putting `{children}` where they should appear inside the card's `<div>`.
