## Objects, Destructuring & Spread

JavaScript **objects** play the role of Python **dicts**, and you'll use them for almost all data in React.

```compare
user = {"name": "Ada", "age": 36}
user["name"]
user["age"] = 37
user.get("email")   # None
"name" in user
user.keys()
user.items()
////
const user = { name: "Ada", age: 36 };
user.name           // dot access! (user["name"] works too)
user.age = 37;
user.email          // undefined (no KeyError)
"name" in user
Object.keys(user)
Object.entries(user)
```

Keys don't need quotes when they're simple names, and you'll usually use **dot notation** (`user.name`).

### Destructuring = tuple unpacking, but for objects too

```compare
x, y = (3, 4)
first, *rest = [1, 2, 3]

name = user["name"]
age = user["age"]
////
const [x, y] = [3, 4];
const [first, ...rest] = [1, 2, 3];

// pull properties out by name:
const { name, age } = user;
```

You can even destructure **in the parameter list**. React components do this all the time:

```js
function describe({ name, age }) {
  return `${name} is ${age}`;
}
describe(user); // "Ada is 36"
```

### Spread `...` = `**` and `*`

The spread operator copies everything out of an object or array. This is how React code makes **updated copies** instead of changing data in place:

```compare
updated = {**user, "age": 37}
combined = [*a, *b]
////
const updated = { ...user, age: 37 };
const combined = [...a, ...b];
```

Later keys win, so `{ ...user, age: 37 }` copies everything and then overrides `age`. The original `user` is untouched. Keep this in mind; it matters a lot in React!

### Arrays of objects

Most real data looks like this:

```js
const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];
const names = users.map((u) => u.name); // ["Ada", "Grace"]
```

@@ instructions
1. Write `describe(person)` that returns `"Ada (36) from London"` for the user below. Use **destructuring** to pull out `name`, `age` and `city`.
2. Write `birthday(person)` that returns a **new** object with `age` increased by 1. Use the spread operator, and **don't change** the original object.

@@ starter
const user = { name: "Ada", age: 36, city: "London" };

function describe(person) {
  // destructure name, age, city from person

}

function birthday(person) {
  // return a NEW object with age + 1

}

console.log(describe(user));
console.log(birthday(user));
console.log(user); // should still be age 36!

@@ solution
const user = { name: "Ada", age: 36, city: "London" };

function describe(person) {
  const { name, age, city } = person;
  return `${name} (${age}) from ${city}`;
}

function birthday(person) {
  return { ...person, age: person.age + 1 };
}

console.log(describe(user));
console.log(birthday(user));
console.log(user);

@@ hint
`const { name, age, city } = person;` creates three variables at once. Then build the string with a template literal.

@@ hint
`return { ...person, age: person.age + 1 };` copies everything and overrides `age`.
