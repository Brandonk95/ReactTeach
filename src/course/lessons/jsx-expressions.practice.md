## 🔁 Practice: JSX Expressions

Recap:

- `className`, not `class`
- `{movie.title}` drops a value into JSX
- Styles are objects with camelCase names: `style={{ fontWeight: "bold" }}`

@@ instructions
Render this movie as:

- an `<article className="movie">`, containing
- an `<h2>` showing `Inception (2010)`, using `movie.title` and `movie.year`
- a `<p>` showing `Rating: 8.8` using `movie.rating`, styled with `fontWeight: "bold"`

@@ starter
const movie = { title: "Inception", year: 2010, rating: 8.8 };

function App() {
  return null;
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
