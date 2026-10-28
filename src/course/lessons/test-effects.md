## 📝 Unit Test: User Directory

This is the final test of the course. There are **no hints and no starter code** beyond the import line. Use everything you've learned: state, effects, fetching data, custom hooks and conditional rendering. Press **Check** to see which requirements you meet. You pass when you meet **all of them**.

The sample solution unlocks once you pass.

### The scenario

Build a searchable directory of users loaded from the practice API:

```
https://api.example.com/users     → [{ id, name, email }, ...]  (3 users)
https://api.example.com/error     → a 500 error
```

The data-loading logic must live in a **reusable custom hook**, so any component could load any URL with one line:

```js
const { data, loading, error } = useFetch("https://api.example.com/users");
```

### Useful reminders

- `"Grace".toLowerCase()` is `"grace"`, and `"grace".includes("gr")` is `true`.
- `resp.ok` is `false` for error status codes like 500.
- Search results can be **calculated** from the data and the search text. They don't need their own state.

@@ instructions
**`useFetch(url)`** is a custom hook that returns an object `{ data, loading, error }`:

- It starts as `data: null`, `loading: true`, `error: null`.
- It fetches `url` inside `useEffect`.
- On success: `data` is the parsed JSON, and `loading` is `false`.
- If the response isn't OK (or the request fails): `error` is a message string, `data` stays `null`, and `loading` is `false`.

**`App`** uses `useFetch` to load `https://api.example.com/users`, and:

- Shows `Loading...` while loading
- Shows an error message if there's an error
- Has an `<input placeholder="Search">` that filters users by name, **ignoring upper/lower case**
- Shows one `<li>` per matching user, containing only their name
- Shows `No users match` when the search matches nobody

@@ starter
// Unit 4 Test: User Directory
// Read the requirements on the left, then build your hook and app below.
import { useState, useEffect } from "react";

@@ solution
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Request failed with status ${resp.status}`);
        setData(await resp.json());
      } catch (e) {
        setData(null);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [url]);

  return { data, loading, error };
}

function App() {
  const { data: users, loading, error } = useFetch("https://api.example.com/users");
  // Hooks must run before any early return.
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const matches = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>User Directory</h2>
      <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      {matches.length === 0 ? (
        <p>No users match</p>
      ) : (
        <ul>
          {matches.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
