## 📝 Unit Test: Expense Tracker

This is the test for Unit 3. There are **no hints and no starter code** beyond an empty component. Plan what state you need, build it, try it in the Preview, and press **Check** to see which requirements you meet. You pass when you meet **all of them**.

The sample solution unlocks once you pass.

### The scenario

Build a small app for tracking what you spend. You type a description and an amount, press **Add**, and the expense joins a list with a running total. Expenses can be deleted.

Before writing any code, decide:

- What pieces of **state** do you need? (Hint: think about both inputs, and the list.)
- What can be **calculated** from that state instead of stored? (The total!)

### Useful reminders

- `event.target.value` is always a **string**. Convert amounts with `Number(...)`.
- `"  hi ".trim()` removes surrounding spaces, like Python's `.strip()`.
- `.reduce((sum, expense) => sum + expense.amount, 0)` adds up a field across an array.

@@ instructions
Your `App` must have:

1. A form with:
   - an `<input placeholder="Description">`
   - an `<input type="number" placeholder="Amount">`
   - a button that says `Add`
2. An `<li>` for each expense, containing the text `Coffee: $4` (description, colon, dollar amount) and a `Delete` button that removes that expense.
3. An element with `className="total"` that shows `Total: $14`, the sum of all expenses. It shows `Total: $0` when there are none.

Behavior:

- After adding, **both inputs are cleared**.
- Expenses with a **blank description**, or an amount that is **empty, zero or negative**, are ignored.
- Keep everything in `useState`, and **never mutate** state: no `.push`, `.splice` or `.pop`.
- Don't forget `event.preventDefault()` in your submit handler!

@@ starter
// Unit 3 Test: Expense Tracker
// Read the requirements on the left, then build your app below.
import { useState } from "react";

function App() {
  return (
    <div>
      <h2>Expense Tracker</h2>
    </div>
  );
}

@@ solution
import { useState } from "react";

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  function handleSubmit(event) {
    event.preventDefault();
    const amountNumber = Number(amount);
    if (description.trim() === "" || amount === "" || amountNumber <= 0) return;
    setExpenses([...expenses, { id: crypto.randomUUID(), description: description.trim(), amount: amountNumber }]);
    setDescription("");
    setAmount("");
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ${expense.amount} <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p className="total">Total: ${total}</p>
    </div>
  );
}
