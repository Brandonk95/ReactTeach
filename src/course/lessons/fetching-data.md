## Fetching Data

Anything slow (network requests, timers) is **asynchronous** in JavaScript. It returns a **Promise**: a placeholder for a value that arrives later. `async`/`await` lets you write it like normal sequential code:

```js
async function getUsers() {
  const response = await fetch("https://api.example.com/users");
  if (!response.ok) throw new Error(`Server returned ${response.status}`);
  return await response.json();
}
```

- `fetch(url)` is built into the browser and resolves to a response.
- `await response.json()` parses the body (also asynchronous).
- `response.ok` is `true` for 2xx status codes. `fetch` does **not** throw on 404 or 500, so check it yourself.
- An `async` function always returns a Promise.

### Errors

```js
try {
  const data = await fetchData();
} catch (fetchError) {
  setError(fetchError.message);
} finally {
  setLoading(false);
}
```

### Fetching in a component

Fetching is a side effect, so it goes in `useEffect`:

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch("https://api.example.com/users");
      setUsers(await response.json());
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

The effect function itself **can't** be `async`, because React expects it to return nothing or a cleanup function, not a Promise. So define an inner `async` function and call it.

### 🧪 The practice API

The course has a fake API built in, so results are predictable:

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
        const response = await fetch("https://api.example.com/users");
        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        setUsers(await response.json());
      } catch (fetchError) {
        setError(fetchError.message);
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
In `load`: `const response = await fetch("https://api.example.com/users"); setUsers(await response.json()); setLoading(false);`

@@ hint
In the JSX: `{loading ? <p>Loading...</p> : <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>}`
