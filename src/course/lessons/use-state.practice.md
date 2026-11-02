## 🔁 Practice: useState

Recap:

- `const [value, setValue] = useState(initial);`
- Calling the setter stores the new value **and** re-renders
- Flip a boolean with `setValue(!value)`

@@ instructions
Build a like button:

1. Create state for whether it's liked: `const [liked, setLiked] = useState(false);`
2. The `<button>`:
   - shows `Like` when `liked` is false, and `Unlike` when it's true
   - when clicked, flips `liked`: `setLiked(!liked)`
3. The `<p>` shows `Not liked` or `Liked` to match.

Both texts come from the same state, using a ternary like `{liked ? "Unlike" : "Like"}`.

@@ starter
import { useState } from "react";

function App() {
  // 1. liked state, starting as false

  return (
    <div>
      {/* 2. button: "Like" / "Unlike", toggles liked on click */}
      <button>Like</button>
      {/* 3. "Not liked" / "Liked" */}
      <p>Not liked</p>
    </div>
  );
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
