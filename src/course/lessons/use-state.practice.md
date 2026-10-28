## 🔁 Practice: useState

Recap:

- `const [value, setValue] = useState(initial);`
- Calling the setter stores the new value **and** re-renders
- Flip a boolean with `setValue(!value)`

@@ instructions
Build a like button:

- Store whether it's liked with `useState(false)`.
- A `<button>` says `Like` when not liked and `Unlike` when liked. Clicking it toggles.
- A `<p>` says `Not liked` or `Liked`.

@@ starter
import { useState } from "react";

function App() {
  return null;
}

@@ solution
import { useState } from "react";

function App() {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <button onClick={() => setLiked(!liked)}>{liked ? "Unlike" : "Like"}</button>
      <p>{liked ? "Liked" : "Not liked"}</p>
    </div>
  );
}

@@ hint
Both texts are ternaries on the same state: `{liked ? "Unlike" : "Like"}`
