## Props

**Props** are a component's inputs. React gathers the attributes into one object and passes it as the first argument, so you usually destructure it:

```jsx
function Greeting({ name, excited = false }) {
  const ending = excited ? "!" : ".";
  return <p>Hello, {name}{ending}</p>;
}

<Greeting name="Ada" excited={true} />
```

Without destructuring, it's `function Greeting(props) { ... props.name ... }`.

### Passing values

```jsx
<Product
  title="Keyboard"        // string: quotes
  price={49.99}           // anything else: braces
  inStock={true}
  tags={["usb", "rgb"]}
  onBuy={handleBuy}       // functions too
/>
```

A prop with **no value** is `true`: `<Greeting name="Ada" excited />`.

### Props are read-only

A component must never change its own props. Data flows **down**, from parent to child.

### `children`

Whatever goes *between* a component's tags arrives as the `children` prop:

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Anything can go in here</h2>
</Card>
```

@@ instructions
1. Finish the `Greeting` component. It takes two props, `name` and `excited` (default `false`), and renders a `<p>` saying `Hello, NAME.`, or `Hello, NAME!` when `excited` is true.
2. In `App`, render **at least three** `Greeting`s with different names. Make at least one of them excited.

@@ starter
function Greeting({ name, excited = false }) {
  // return a <p>: "Hello, NAME." or "Hello, NAME!" when excited
}

function App() {
  return (
    <div>
      <Greeting name="Ada" />
      {/* add at least two more, one excited */}
    </div>
  );
}

@@ solution
function Greeting({ name, excited = false }) {
  return (
    <p>
      Hello, {name}
      {excited ? "!" : "."}
    </p>
  );
}

function App() {
  return (
    <div>
      <Greeting name="Ada" />
      <Greeting name="Grace" excited />
      <Greeting name="Guido" excited={true} />
    </div>
  );
}

@@ hint
`return <p>Hello, {name}{excited ? "!" : "."}</p>;`

@@ hint
Pass an excited greeting like `<Greeting name="Grace" excited />`.
