## 🔁 Practice: Conditional Rendering

Recap:

- Ternary for "this or that": `{online ? "Online" : "Offline"}`
- `&&` for "this or nothing" (watch out for `0`!)
- `return null;` renders nothing at all

@@ instructions
1. **`Status({ online })`** returns a `<p>` whose text is exactly `Online` when `online` is true, and exactly `Offline` when it's false. Choose the text with a **ternary** inside the `<p>`.
2. **`Cart({ itemCount })`**:
   - When `itemCount` is `0`, render **nothing at all**: `return null;` (not an empty element).
   - Otherwise, return `<p>{itemCount} items in cart</p>`. For example, `<Cart itemCount={2} />` shows `2 items in cart`.
3. **`App`** already renders a few of each, so you can check them in the Preview.

@@ starter
function Status({ online }) {
  // return a <p> showing "Online" or "Offline", chosen with a ternary
  return null;
}

function Cart({ itemCount }) {
  // if itemCount is 0, return null
  // otherwise return <p>{itemCount} items in cart</p>
  return null;
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
