## 📝 Unit Test: Product Catalog

This is the test for Unit 2. There are **no hints and no step-by-step starter code**. Design the components yourself, use **Run** to see your work in the Preview, and press **Check** to see which requirements you meet. You pass when you meet **all of them**.

The sample solution unlocks once you pass.

### The scenario

You're building the product page for a small online shop. The data is already written for you:

```js
const inventory = [
  { id: 1, name: "Keyboard", price: 49, inStock: true },
  { id: 2, name: "Mouse", price: 25, inStock: true },
  { id: 3, name: "Monitor", price: 199, inStock: false },
  { id: 4, name: "Webcam", price: 65, inStock: true },
];
```

Think about it as a tree of components before you start typing:

```
App
└── ProductList
    ├── ProductCard
    ├── ProductCard
    └── ...
```

@@ instructions
Build three components.

**`ProductCard({ product })`** renders a single product:

- A wrapper element with `className="product"`
- The product name in an `<h3>`
- The price in an element with `className="price"`, formatted like `$49`
- `<span className="sold-out">Sold out</span>`, **only** if the product is not in stock

**`ProductList({ products })`** renders:

- One `ProductCard` for each product in the `products` prop, using `.map()` and a `key`
- The text `No products found` instead, if the array is empty

**`App`** renders:

- `<h1>Shop</h1>`
- `<p className="summary">3 of 4 in stock</p>`, where both numbers are **calculated** from `inventory` (don't type them!)
- A `ProductList` showing everything in `inventory`

Inside `ProductList`, use its `products` prop, not `inventory`. The tests render it with other lists too.

Use `className`, never `class`.

@@ starter
// Unit 2 Test: Product Catalog
// Read the requirements on the left, then build your components below.

const inventory = [
  { id: 1, name: "Keyboard", price: 49, inStock: true },
  { id: 2, name: "Mouse", price: 25, inStock: true },
  { id: 3, name: "Monitor", price: 199, inStock: false },
  { id: 4, name: "Webcam", price: 65, inStock: true },
];

function App() {
  return <h1>Shop</h1>;
}

@@ solution
const inventory = [
  { id: 1, name: "Keyboard", price: 49, inStock: true },
  { id: 2, name: "Mouse", price: 25, inStock: true },
  { id: 3, name: "Monitor", price: 199, inStock: false },
  { id: 4, name: "Webcam", price: 65, inStock: true },
];

function ProductCard({ product }) {
  return (
    <div className="product card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      {!product.inStock && <span className="sold-out">Sold out</span>}
    </div>
  );
}

function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No products found</p>;
  }
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function App() {
  const inStockCount = inventory.filter((product) => product.inStock).length;
  return (
    <div>
      <h1>Shop</h1>
      <p className="summary">
        {inStockCount} of {inventory.length} in stock
      </p>
      <ProductList products={inventory} />
    </div>
  );
}
