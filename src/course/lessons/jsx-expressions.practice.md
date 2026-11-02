## 🔁 Practice: JSX Expressions

Recap:

- `className`, not `class`
- `{movie.title}` drops a value into JSX
- Styles are objects with camelCase names: `style={{ fontWeight: "bold" }}`

@@ instructions
Render the `movie` object. Read every value from the object, without typing any of them yourself:

1. The outer element is `<article className="movie">`.
2. Inside it, an `<h2>` that reads `Inception (2010)`: `{movie.title}`, a space, then the year in parentheses `({movie.year})`.
3. After it, a `<p>` that reads `Rating: 8.8`, using `{movie.rating}`, and styled bold with `style={{ fontWeight: "bold" }}`.

The result should look like this HTML:

```html
<article class="movie">
  <h2>Inception (2010)</h2>
  <p style="font-weight: bold">Rating: 8.8</p>
</article>
```

@@ starter
const movie = { title: "Inception", year: 2010, rating: 8.8 };

function App() {
  return (
    <article>
      {/* 1. give the article className="movie" */}
      {/* 2. <h2> with the title and (year) */}
      {/* 3. bold <p> with "Rating: " and the rating */}
    </article>
  );
}

@@ solution
const movie = { title: "Inception", year: 2010, rating: 8.8 };

function App() {
  return (
    <article className="movie">
      <h2>
        {movie.title} ({movie.year})
      </h2>
      <p style={{ fontWeight: "bold" }}>Rating: {movie.rating}</p>
    </article>
  );
}

@@ hint
The parentheses around the year are plain text: `<h2>{movie.title} ({movie.year})</h2>`
