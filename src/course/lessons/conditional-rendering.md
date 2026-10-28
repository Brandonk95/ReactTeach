## Conditional Rendering

Since components are just functions, you can use **normal JavaScript** to decide what to show. There are three common patterns.

### 1. `if` with an early return

```jsx
function Inbox({ messageCount }) {
  if (messageCount === 0) {
    return <p>All caught up!</p>;
  }
  return <p>{messageCount} unread</p>;
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
{messageCount && <p>{messageCount} messages</p>}  // shows "0" when messageCount is 0! 🐛
{messageCount > 0 && <p>{messageCount} messages</p>}  // ✅
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
Finish the `Inbox` component, which takes a `messageCount` prop:

1. If `messageCount` is `0`, render a `<p>` with exactly `No new messages`.
2. Otherwise, render `<p>You have {messageCount} new messages</p>`.
3. If `messageCount` is **10 or more**, *also* render `<strong>That's a lot!</strong>` after the paragraph.

@@ starter
function Inbox({ messageCount }) {
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
      <Inbox messageCount={0} />
      <Inbox messageCount={3} />
      <Inbox messageCount={25} />
    </div>
  );
}

@@ solution
function Inbox({ messageCount }) {
  if (messageCount === 0) {
    return <p>No new messages</p>;
  }
  return (
    <div>
      <p>You have {messageCount} new messages</p>
      {messageCount >= 10 && <strong>That's a lot!</strong>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Inbox messageCount={0} />
      <Inbox messageCount={3} />
      <Inbox messageCount={25} />
    </div>
  );
}

@@ hint
Start with an early return: `if (messageCount === 0) { return <p>No new messages</p>; }`

@@ hint
For the warning: `{messageCount >= 10 && <strong>That's a lot!</strong>}`
