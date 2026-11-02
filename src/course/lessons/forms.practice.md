## 🔁 Practice: Controlled Inputs

Recap:

- Controlled input: `value={postText}` plus `onChange={(event) => setPostText(event.target.value)}`
- Because the text lives in state, you can calculate from it: `postText.length`

@@ instructions
Build a post box with a 50-character limit (`MAX_LENGTH`):

1. Create state for the text: `const [postText, setPostText] = useState("");`
2. Make the `<textarea>` **controlled**: `value={postText}` and `onChange={(event) => setPostText(event.target.value)}`.
3. In `<p className="count">`, show the current length and the limit, as in `5 / 50`. Use `{postText.length} / {MAX_LENGTH}`. It starts at `0 / 50`.
4. Show `<p className="warning">Too long!</p>` **only** when the text is longer than 50 characters (50 exactly is fine). Use `&&`.

@@ starter
import { useState } from "react";

const MAX_LENGTH = 50;

function App() {
  // 1. postText state, starting as ""

  return (
    <div>
      {/* 2. make this controlled with value and onChange */}
      <textarea />
      {/* 3. length / MAX_LENGTH */}
      <p className="count">0 / 50</p>
      {/* 4. <p className="warning">Too long!</p>, only when over MAX_LENGTH */}
    </div>
  );
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
