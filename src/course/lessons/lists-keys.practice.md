## 🔁 Practice: Lists

Recap:

- Turn data into elements with `.map((item) => <li key={item.id}>...</li>)`
- Chain `.filter()` first to show only some items
- Every item needs a stable `key`

@@ instructions
Show a leaderboard of only the players who scored **20 or more** points.

- Render an `<ol>`
- One `<li>` per qualifying player, with text like `Ana: 30`
- Use `.filter()`, then `.map()`, with `key={...id}`

@@ starter
const scores = [
  { id: 1, player: "Ana", points: 30 },
  { id: 2, player: "Ben", points: 12 },
  { id: 3, player: "Cy", points: 45 },
];

function App() {
  return null;
}

@@ solution
const scores = [
  { id: 1, player: "Ana", points: 30 },
  { id: 2, player: "Ben", points: 12 },
  { id: 3, player: "Cy", points: 45 },
];

function App() {
  return (
    <ol>
      {scores
        .filter((s) => s.points >= 20)
        .map((s) => (
          <li key={s.id}>
            {s.player}: {s.points}
          </li>
        ))}
    </ol>
  );
}

@@ hint
`scores.filter((s) => s.points >= 20).map((s) => <li key={s.id}>{s.player}: {s.points}</li>)`
