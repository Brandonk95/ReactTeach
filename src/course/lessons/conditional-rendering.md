## Conditional Rendering

Since components are just functions, you can use **normal JavaScript** to decide what to show. There are three common patterns.

### 1. `if` with an early return

```jsx
function Inbox({ count }) {
  if (count === 0) {
    return <p>All caught up!</p>;
  }
  return <p>{count} unread</p>;
}
```

### 2. The ternary: "this or that"

```jsx
<p>{isLoggedIn ? "Welcome back!" : "Please sign in."}</p>

{isLoggedIn ? <Dashboard /> : <LoginForm />}
```

### 3. `&&`: "this or nothing"

```jsx
{hasError && <p className="error">Something went wrong</p>}
```

`a && b` returns `b` if `a` is truthy, otherwise `a`. React renders nothing for `false`, `null` and `undefined`.

```compare
# Python's `and` works the same way!
True and "shown"    # 'shown'
False and "shown"   # False
////
true && "shown"     // "shown"
false && "shown"    // false (renders nothing)
```

### ⚠️ The zero trap

React **does** render the number `0`. So this has a bug:

```jsx
{count && <p>{count} messages</p>}  // shows "0" when count is 0! 🐛
{count > 0 && <p>{count} messages</p>}  // ✅
```

### Returning `null`

A component can return `null` to render nothing at all:

```jsx
function Warning({ show }) {
  if (!show) return null;
  return <strong>Warning!</strong>;
}
```

@@ instructions
Finish the `Inbox` component, which takes a `count` prop:

1. If `count` is `0`, render a `<p>` with exactly `No new messages`.
2. Otherwise, render `<p>You have {count} new messages</p>`.
3. If `count` is **10 or more**, *also* render `<strong>That's a lot!</strong>` after the paragraph.

@@ starter
function Inbox({ count }) {
  // 1. no messages?

  // 2. and 3.
  return (
    <div>

    </div>
  );
}

function App() {
  return (
    <div>
      <Inbox count={0} />
      <Inbox count={3} />
      <Inbox count={25} />
    </div>
  );
}

@@ solution
function Inbox({ count }) {
  if (count === 0) {
    return <p>No new messages</p>;
  }
  return (
    <div>
      <p>You have {count} new messages</p>
      {count >= 10 && <strong>That's a lot!</strong>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Inbox count={0} />
      <Inbox count={3} />
      <Inbox count={25} />
    </div>
  );
}

@@ hint
Start with an early return: `if (count === 0) { return <p>No new messages</p>; }`

@@ hint
For the warning: `{count >= 10 && <strong>That's a lot!</strong>}`
