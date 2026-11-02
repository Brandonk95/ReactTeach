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
Build a notepad that remembers what you typed, even after a reload.

1. Create `note` state whose starting value comes from `localStorage`:
   `useState(() => localStorage.getItem("note") || "")`
   The function form reads storage only once, on the first render. `|| ""` handles the case where nothing is saved yet.
2. Make the `<textarea>` controlled with `note`: `value={note}`, plus an `onChange` that calls `setNote(event.target.value)`.
3. Add a `useEffect` that runs `localStorage.setItem("note", note)` whenever `note` changes, with `[note]` as the dependency array.

To try it: type something, press **Run** again, and your note should still be there.

@@ starter
import { useState, useEffect } from "react";

function App() {
  // 1. note state, starting from localStorage.getItem("note") || ""

  // 3. useEffect: save note to localStorage when it changes

  return (
    <div>
      <h2>Notepad</h2>
      {/* 2. make this controlled with value and onChange */}
      <textarea rows={6} cols={40} />
    </div>
  );
}

@@ solution
import { useState, useEffect } from "react";

function App() {
  const [note, setNote] = useState(() => localStorage.getItem("note") || "");

  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  return (
    <div>
      <h2>Notepad</h2>
      <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={6} cols={40} />
    </div>
  );
}

@@ hint
The effect is one line, `localStorage.setItem("note", note);`, with `[note]` as the dependency array.
