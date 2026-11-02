## 🏁 Final Project: Flashcards

Build a flashcard study app that combines components and props, state, conditional rendering and event handlers.

### Minimum state

Before writing code, ask **"what's the minimum state I need?"**

- Which card is showing → `index` (a number)
- Is the answer visible → `showAnswer` (a boolean)

Everything else is **calculated** from those two plus the `cards` array:

```jsx
const card = cards[index];
const progress = `Card ${index + 1} of ${cards.length}`;
```

Don't store anything you can calculate. Duplicated state can fall out of sync.

### Wrapping around

Use the remainder operator to go from the last card back to the first:

```jsx
setIndex((index + 1) % cards.length);
```

### Going further

Once the tests pass, try adding:

- A **Previous** button
- "Got it" / "Missed it" scoring
- Shuffling the cards
- A form for adding your own cards
- Saving the cards to `localStorage` with a `useEffect`

@@ instructions
Build the flashcard app in `App` using the `cards` array:

1. Show the current card's question in an `<h2>`.
2. Show the progress in `<p className="progress">` as `Card 1 of 3`.
3. A **Show answer** button reveals the answer in `<p className="answer">`. The answer must not be in the page until then.
4. A **Next** button moves to the next card, hides the answer again, and wraps from the last card back to the first.

You can split things into components (like a `Flashcard` component) if you'd like. It's good practice!

@@ starter
import { useState } from "react";

const cards = [
  { question: "What does JSX compile to?", answer: "React.createElement calls" },
  { question: "Which hook stores state?", answer: "useState" },
  { question: "What prop helps React track list items?", answer: "key" },
];

function App() {
  // what state do you need?

  return (
    <div className="card">
      <p className="progress">Card ? of ?</p>
      <h2>Question goes here</h2>
      <button>Show answer</button>
      <button>Next</button>
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

function Flashcard({ card, showAnswer }) {
  return (
    <>
      <h2>{card.question}</h2>
      {showAnswer && <p className="answer">{card.answer}</p>}
    </>
  );
}

function App() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  function next() {
    setIndex((index + 1) % cards.length);
    setShowAnswer(false);
  }

  return (
    <div className="card">
      <p className="progress">
        Card {index + 1} of {cards.length}
      </p>
      <Flashcard card={cards[index]} showAnswer={showAnswer} />
      <button onClick={() => setShowAnswer(true)}>Show answer</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

@@ hint
Two pieces of state: `const [index, setIndex] = useState(0);` and `const [showAnswer, setShowAnswer] = useState(false);`

@@ hint
The current card is `cards[index]`. Show its question with `<h2>{cards[index].question}</h2>`.

@@ hint
In your Next handler, do both: `setIndex((index + 1) % cards.length);` and `setShowAnswer(false);`
