## 🔁 Practice: Scored Flashcards

Rebuild the flashcards as a self-check quiz that keeps score. As before, start from the **minimum state**: the current card and how many you got right.

@@ instructions
1. **State:** `index` (which card, starting `0`) and `correct` (how many you got, starting `0`). The number answered so far is just `index`, so it doesn't need its own state.
2. **`answer(gotIt)`**: if `gotIt` is true, add 1 to `correct`. Either way, add 1 to `index`.
3. **When every card is answered** (`index === cards.length`), return **only**:
   `<p className="done">Finished! You got {correct} of {cards.length}</p>`
   For example: `Finished! You got 2 of 3`.
4. **Otherwise**, render:
   - the current question in an `<h2>`: `cards[index].question`
   - a **Got it** button that calls `answer(true)`
   - a **Missed it** button that calls `answer(false)`
   - `<p className="score">Score: {correct} / {index}</p>`, which starts as `Score: 0 / 0`

@@ starter
import { useState } from "react";

const cards = [
  { question: "What does JSX compile to?", answer: "React.createElement calls" },
  { question: "Which hook stores state?", answer: "useState" },
  { question: "What prop helps React track list items?", answer: "key" },
];

function App() {
  // 1. index and correct state, both starting at 0

  function answer(gotIt) {
    // 2. add 1 to correct if gotIt, then move to the next card
  }

  // 3. if every card has been answered, return the "Finished!" paragraph

  return (
    <div className="card">
      {/* 4. question <h2>, "Got it" and "Missed it" buttons, score paragraph */}
    </div>
  );
}

@@ solution
import { useState } from "react";

const cards = [
  { question: "What does JSX compile to?", answer: "React.createElement calls" },
  { question: "Which hook stores state?", answer: "useState" },
  { question: "What prop helps React track list items?", answer: "key" },
];

function App() {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);

  function answer(gotIt) {
    if (gotIt) setCorrect(correct + 1);
    setIndex(index + 1);
  }

  if (index === cards.length) {
    return (
      <p className="done">
        Finished! You got {correct} of {cards.length}
      </p>
    );
  }

  return (
    <div className="card">
      <h2>{cards[index].question}</h2>
      <button onClick={() => answer(true)}>Got it</button>
      <button onClick={() => answer(false)}>Missed it</button>
      <p className="score">
        Score: {correct} / {index}
      </p>
    </div>
  );
}

@@ hint
When `index === cards.length`, every card has been answered. Return the finished message early.
