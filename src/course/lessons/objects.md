## Objects, Destructuring & Spread

Objects are key-value collections, and you'll use them for almost all data:

```js
const user = { name: "Ada", age: 36 };
user.name             // "Ada" (user["name"] works too, for dynamic keys)
user.age = 37;        // const stops reassigning user, not changing its contents
user.email            // undefined (missing keys don't throw)
"name" in user        // true
Object.keys(user)     // ["name", "age"]
Object.entries(user)  // [["name", "Ada"], ["age", 37]]
```

**Shorthand:** if a variable has the same name as the key, write it once:

```js
const name = "Grace";
const person = { name, age: 85 }; // same as { name: name, age: 85 }
```

### Destructuring

Pull values out by name (objects) or position (arrays):

```js
const { name, age } = user;
const [first, second, ...rest] = [1, 2, 3, 4];
```

It also works directly in a parameter list. React components do this all the time:

```js
function describe({ name, age }) {
  return `${name} is ${age}`;
}
```

### Spread `...`

Copies everything out of an object or array, which is how you make **updated copies** instead of changing data in place:

```js
const older = { ...user, age: 38 }; // copy, then override age (later keys win)
const combined = [...listA, ...listB];
```

The original is untouched. Spread is a **shallow** copy: nested objects are still shared.

### Arrays of objects

Most real data looks like this:

```js
const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];
const names = users.map((user) => user.name); // ["Ada", "Grace"]
```

@@ instructions
1. Write `describe(person)` that returns `"Ada (36) from London"` for `sampleUser`. Use **destructuring** to pull out `name`, `age` and `city`.
2. Write `birthday(person)` that returns a **new** object with `age` increased by 1. Use the spread operator, and **don't change** the original object.

Use the `person` parameter inside your functions, not `sampleUser`. The tests pass in their own people.

@@ starter
// Sample data for trying your functions. Don't use it inside them!
const sampleUser = { name: "Ada", age: 36, city: "London" };

function describe(person) {
  // destructure name, age, city from person

}

function birthday(person) {
  // return a NEW object with age + 1

}

console.log(describe(sampleUser));
console.log(birthday(sampleUser));
console.log(sampleUser); // should still be age 36!

@@ solution
// Sample data for trying your functions. Don't use it inside them!
const sampleUser = { name: "Ada", age: 36, city: "London" };

function describe(person) {
  const { name, age, city } = person;
  return `${name} (${age}) from ${city}`;
}

function birthday(person) {
  return { ...person, age: person.age + 1 };
}

console.log(describe(sampleUser));
console.log(birthday(sampleUser));
console.log(sampleUser);

@@ hint
`const { name, age, city } = person;` creates three variables at once. Then build the string with a template literal.

@@ hint
`return { ...person, age: person.age + 1 };` copies everything and overrides `age`.
