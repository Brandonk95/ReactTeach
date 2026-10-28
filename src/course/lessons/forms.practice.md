## 🔁 Practice: Controlled Inputs

Recap:

- Controlled input: `value={postText}` plus `onChange={(event) => setPostText(event.target.value)}`
- Because the text lives in state, you can calculate from it: `postText.length`

@@ instructions
Build a tweet-style box with a 50-character limit:

1. A controlled `<textarea>`.
2. `<p className="count">` showing `5 / 50` (the current length, then the limit).
3. `<p className="warning">Too long!</p>`, shown **only** when the text is longer than 50 characters.

@@ starter
import { useState } from "react";

function App() {
  return null;
}

@@ solution
import { useState } from "react";

const MAX_LENGTH = 50;

function App() {
  const [postText, setPostText] = useState("");

  return (
    <div>
      <textarea value={postText} onChange={(event) => setPostText(event.target.value)} />
      <p className="count">
        {postText.length} / {MAX_LENGTH}
      </p>
      {postText.length > MAX_LENGTH && <p className="warning">Too long!</p>}
    </div>
  );
}

@@ hint
`<textarea>` works just like `<input>`: give it `value` and `onChange`.
