## 🔁 Practice: useEffect

Recap:

- `useEffect(() => { ... }, [deps])` runs after render, whenever a dependency changes
- Effects are for talking to the outside world: timers, the network, browser storage

New tool for this one: `localStorage` is a tiny key-value store in the browser that survives page reloads (a bit like a persistent `dict` of strings):

```js
localStorage.setItem("note", "hi");
localStorage.getItem("note"); // "hi" (or null if never set)
```

You can pass `useState` a **function** to compute the starting value only once: `useState(() => localStorage.getItem("note") || "")`.

@@ instructions
Build a notepad that remembers what you typed, even after a page reload:

1. A controlled `<textarea>`. Its starting value is whatever is saved under the `"note"` key in `localStorage`, or `""` if nothing is saved.
2. A `useEffect` that saves the text to `localStorage` under `"note"` whenever it changes.

Try it: type something, press **Run** again, and your note should still be there.

@@ starter
import { useState, useEffect } from "react";

function App() {
  return null;
}

@@ solution
import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState(() => localStorage.getItem("note") || "");

  useEffect(() => {
    localStorage.setItem("note", text);
  }, [text]);

  return (
    <div>
      <h2>Notepad</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} cols={40} />
    </div>
  );
}

@@ hint
The effect is one line, `localStorage.setItem("note", text);`, with `[text]` as the dependency array.
