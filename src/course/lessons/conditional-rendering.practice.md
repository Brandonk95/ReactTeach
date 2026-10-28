## 🔁 Practice: Conditional Rendering

Recap:

- Ternary for "this or that": `{online ? "Online" : "Offline"}`
- `&&` for "this or nothing" (watch out for `0`!)
- `return null;` renders nothing at all

@@ instructions
1. `Status({ online })` renders a `<p>` saying `Online` or `Offline`. Use a ternary.
2. `Cart({ itemCount })` renders **nothing** (return `null`) when `itemCount` is `0`. Otherwise it renders `<p>{itemCount} items in cart</p>`.
3. Show a few of each in `App`.

@@ starter


@@ solution
function Status({ online }) {
  return <p>{online ? "Online" : "Offline"}</p>;
}

function Cart({ itemCount }) {
  if (itemCount === 0) {
    return null;
  }
  return <p>{itemCount} items in cart</p>;
}

function App() {
  return (
    <div>
      <Status online />
      <Status online={false} />
      <Cart itemCount={0} />
      <Cart itemCount={2} />
    </div>
  );
}

@@ hint
Early return in Cart: `if (itemCount === 0) { return null; }`
