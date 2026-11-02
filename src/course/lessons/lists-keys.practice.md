## 🔁 Practice: Lists

Recap:

- Turn data into elements with `.map((item) => <li key={item.id}>...</li>)`
- Chain `.filter()` first to show only some items
- Every item needs a stable `key`

@@ instructions
Show a leaderboard of only the players with **20 or more** points.

1. Inside the `<ol>`, start from `leaderboard`.
2. Chain `.filter(...)` to keep entries where `entry.points >= 20`.
3. Then chain `.map(...)` to turn each entry into `<li key={entry.id}>`.
4. Each `<li>` reads `Player: points`, for example `Ana: 30`. Write it as `{entry.player}: {entry.points}`.

Expected result: two items, `Ana: 30` and `Cy: 45`. Ben is left out with 12 points.

@@ starter
const leaderboard = [
  { id: 1, player: "Ana", points: 30 },
  { id: 2, player: "Ben", points: 12 },
  { id: 3, player: "Cy", points: 45 },
];

function App() {
  return (
    <ol>
      {/* leaderboard.filter(...).map((entry) => <li key={...}>...</li>) */}
    </ol>
  );
}

@@ solution
const leaderboard = [
  { id: 1, player: "Ana", points: 30 },
  { id: 2, player: "Ben", points: 12 },
  { id: 3, player: "Cy", points: 45 },
];

function App() {
  return (
    <ol>
      {leaderboard
        .filter((entry) => entry.points >= 20)
        .map((entry) => (
          <li key={entry.id}>
            {entry.player}: {entry.points}
          </li>
        ))}
    </ol>
  );
}

@@ hint
`leaderboard.filter((entry) => entry.points >= 20).map((entry) => <li key={entry.id}>{entry.player}: {entry.points}</li>)`
