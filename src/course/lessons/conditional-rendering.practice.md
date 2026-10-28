## 🔁 Practice: Conditional Rendering

Recap:

- Ternary for "this or that": `{online ? "Online" : "Offline"}`
- `&&` for "this or nothing" (watch out for `0`!)
- `return null;` renders nothing at all

@@ instructions
1. `Status({ online })` renders a `<p>` saying `Online` or `Offline`. Use a ternary.
2. `Cart({ items })` renders **nothing** (return `null`) when `items` is `0`. Otherwise it renders `<p>{items} items in cart</p>`.
3. Show a few of each in `App`.

@@ starter


@@ solution
function Status({ online }) {
  return <p>{online ? "Online" : "Offline"}</p>;
}

function Cart({ items }) {
  if (items === 0) {
    return null;
  }
  return <p>{items} items in cart</p>;
}

function App() {
  return (
    <div>
      <Status online />
      <Status online={false} />
      <Cart items={0} />
      <Cart items={2} />
    </div>
  );
}

@@ hint
Early return in Cart: `if (items === 0) { return null; }`
