## 🔁 Practice: let & const

Recap:

- `const` for values that never get reassigned (your default)
- `let` for values you reassign
- Names are `camelCase` in JavaScript, not `snake_case`

@@ instructions
You're tracking a bank account.

1. `taxRate` is `0.2` and never changes.
2. `balance` starts at `100`. Subtract `30`, then add `5`, so it ends at `75`.
3. Python code had `account_name = "Savings"`. Write the JavaScript version with a proper camelCase name.
4. Log the final `balance`.

Pick `const` or `let` correctly for each one!

@@ starter
// Bank account practice


@@ solution
const taxRate = 0.2;
let balance = 100;
balance -= 30;
balance += 5;
const accountName = "Savings";
console.log(balance);

@@ hint
Only `balance` gets reassigned, so it's the only one that needs `let`. JavaScript has `-=` just like Python.
