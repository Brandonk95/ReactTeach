## Fetching Data

Most apps load data from a server. In JavaScript, anything that takes time (network, timers, files) is **asynchronous**: it returns a **Promise**, a placeholder for a value that will arrive later.

### async / await: you already know this!

If you've used Python's `asyncio`, JavaScript's `async`/`await` will feel familiar:

```compare
import aiohttp

async def get_users():
    async with aiohttp.ClientSession() as s:
        resp = await s.get(URL)
        return await resp.json()
////
async function getUsers() {
  const resp = await fetch(URL);
  return await resp.json();
}
```

- `fetch(url)` is built into the browser (think `requests.get`, but async).
- `await resp.json()` parses the body (JSON parsing is async too).
- `resp.ok` is `true` for 2xx status codes.

### Fetching in a component

Fetching is a side effect, so it goes in `useEffect`. The pattern:

1. Keep the data in state (start with an empty value).
2. Start the fetch in an effect with `[]`, so it runs once on mount.
3. When data arrives, put it in state, and React re-renders.

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const resp = await fetch("https://api.example.com/users");
      const data = await resp.json();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

> Why the inner `load` function? The effect function itself **can't** be `async`, because React expects it to return either nothing or a cleanup function, not a Promise.

### Handling errors

Use `try/catch`, which is the JavaScript `try/except`:

```compare
try:
    data = await fetch_data()
except Exception as e:
    error = str(e)
////
try {
  const data = await fetchData();
} catch (e) {
  setError(e.message);
}
```

### 🧪 The practice API

This course has a fake API built in, so you'll get predictable results:

| URL | Returns |
|---|---|
| `https://api.example.com/users` | a list of 3 users `{ id, name, email }` |
| `https://api.example.com/users/1` | one user |
| `https://api.example.com/todos` | a list of todos `{ id, title, done }` |
| `https://api.example.com/error` | a 500 error, for practicing error handling |

@@ instructions
Make `App` load users from `https://api.example.com/users`:

1. While loading, show `<p>Loading...</p>`.
2. Once the data arrives, show a `<ul>` with one `<li>` per user, showing their `name`.
3. Do the fetch inside `useEffect` with an empty dependency array.

**Bonus (not graded):** handle errors with `try/catch` and try the `/error` URL.

@@ starter
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch https://api.example.com/users on mount

  return (
    <div>
      <h2>Users</h2>
      {/* Loading... or the list */}
    </div>
  );
}

@@ solution
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetch("https://api.example.com/users");
        if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
        setUsers(await resp.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

@@ hint
Inside `useEffect(() => { ... }, [])`, define `async function load() { ... }` and call `load();`

@@ hint
In `load`: `const resp = await fetch("https://api.example.com/users"); setUsers(await resp.json()); setLoading(false);`

@@ hint
In the JSX: `{loading ? <p>Loading...</p> : <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>}`
