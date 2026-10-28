## Props

Components become reusable when you can pass them data. Those inputs are called **props** (short for "properties"), and they work a lot like **keyword arguments** in Python.

```compare
def greeting(name, excited=False):
    end = "!" if excited else "."
    return f"Hello, {name}{end}"

greeting(name="Ada", excited=True)
////
function Greeting({ name, excited = false }) {
  const end = excited ? "!" : ".";
  return <p>Hello, {name}{end}</p>;
}

<Greeting name="Ada" excited={true} />
```

React gathers all the attributes into **one object** and passes it as the first argument. That's why we **destructure** it with `{ name, excited }`. It's the same as:

```jsx
function Greeting(props) {
  return <p>Hello, {props.name}</p>;
}
```

### Passing different types

```jsx
<Product
  title="Keyboard"        // string: quotes
  price={49.99}           // number: braces
  inStock={true}          // boolean: braces
  tags={["usb", "rgb"]}   // array: braces
  onBuy={handleBuy}       // function: braces
/>
```

A prop with **no value** is shorthand for `true`: `<Greeting name="Ada" excited />`.

### Props are read-only

A component must **never change its own props**, just like you shouldn't mutate a function's arguments to communicate with the caller. Data flows **down**, from parent to child.

### The special `children` prop

Whatever you put *between* a component's tags arrives as `children`:

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
