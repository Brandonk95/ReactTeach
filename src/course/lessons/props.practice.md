## 🔁 Practice: Props

Recap:

- Props arrive as one object; destructure them: `function Badge({ label, color = "gray" })`
- Default values work like Python's default arguments
- Whatever goes between a component's tags arrives as `children`

@@ instructions
1. `Badge({ label, color })` renders `<span className="badge">` showing `label`, with its background set to `color` (`style={{ background: color }}`). `color` defaults to `"gray"`.
2. `Card({ title, children })` renders a `<div className="card">` with the title in an `<h3>`, followed by its `children`.
3. `App` renders a `Card` with any title, containing a `Badge` and a paragraph.

@@ starter


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
