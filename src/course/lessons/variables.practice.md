## 🔁 Practice: let & const

Recap:

- `const` for values that never get reassigned (your default)
- `let` for values you reassign
- Names are `camelCase` in JavaScript, not `snake_case`

@@ instructions
You're tracking a bank account. Declare each value with the right keyword: `const` if it never changes, `let` if it does.

1. Declare `taxRate` with the value `0.2`. It never changes.
2. Declare `balance` with the value `100`. It will change.
3. Subtract `30` from `balance`, then add `5` to it, on separate lines. It should end at `75`.
4. Declare `accountName` with the value `"Savings"`. It never changes. Use camelCase, not `account_name`.
5. Log `balance`. The Console should show `75`.

Don't use `var`.

@@ starter
// 1. taxRate: 0.2, never changes


// 2. balance: starts at 100, will change


// 3. subtract 30, then add 5


// 4. accountName: "Savings", never changes


// 5. log balance

@@ solution
const taxRate = 0.2;
let balance = 100;
balance -= 30;
balance += 5;
const accountName = "Savings";
console.log(balance);

@@ hint
Only `balance` gets reassigned, so it's the only one that needs `let`. Use `-=` and `+=` to update it.
