## 🏁 Final Project: Flashcards

Time to put it all together! You'll build a flashcard study app that uses:

- **Components & props** to split up the UI
- **State** to track the current card and whether the answer is showing
- **Conditional rendering** to hide and show the answer
- **Event handlers** for the buttons

### Planning it out

A good React habit is to ask **"what is the minimum state I need?"** before writing code.

- Which card are we on? → `index` (a number)
- Is the answer visible? → `showAnswer` (a boolean)

Everything else can be **calculated** from those two plus the `cards` array:

```jsx
const card = cards[index];                         // the current card
const progress = `Card ${index + 1} of ${cards.length}`;
```

> Don't store things in state that you can calculate. It's like storing both `width` and `area` on a Python object: they can fall out of sync.

### Wrapping around

To go from the last card back to the first, use the remainder operator, just like Python:

```compare
index = (index + 1) % len(cards)
////
setIndex((index + 1) % cards.length);
```

### Ideas for going further

Once the tests pass, keep building! Some ideas:

- A **Previous** button
- Track how many you got right with "Got it" / "Missed it" buttons
- Shuffle the cards
- Let the user add their own cards with a form
- Save the cards to `localStorage` with a `useEffect`

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
