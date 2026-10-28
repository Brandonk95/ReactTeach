## 🔁 Practice: Scored Flashcards

Now rebuild the flashcards as a self-check quiz that keeps score. Before coding, decide on the **minimum state**. You need the current card and the number you got right. (The number answered so far is just the card index!)

@@ instructions
Using the same `cards`:

1. Show the current question in an `<h2>`.
2. Two buttons, **Got it** and **Missed it**. Both move to the next card; **Got it** also adds one to the score.
3. `<p className="score">Score: 1 / 2</p>`: correct answers so far / cards answered so far. It starts as `Score: 0 / 0`.
4. After the last card, show `<p className="done">Finished! You got 2 of 3</p>` **instead of** the question and buttons.

@@ starter
import { useState } from "react";

const cards = [
  { question: "What does JSX compile to?", answer: "React.createElement calls" },
  { question: "Which hook stores state?", answer: "useState" },
  { question: "What prop helps React track list items?", answer: "key" },
];

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
