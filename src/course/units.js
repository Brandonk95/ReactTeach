// Lesson metadata, tests and quizzes. Every test receives a helper object `t`
// (see src/sandbox/testkit.js): t.exports, t.logs, t.source, t.expect, t.render,
// t.click, t.type, t.button, t.$, t.$$, t.text, t.h, t.wait, t.fail.

const noVar = {
  name: 'Does not use `var`',
  run: ({ source, fail }) => {
    if (/\bvar\s/.test(source)) fail('Found `var`. Use `const` (or `let` if the value changes) instead.');
  },
};

const strictEquals = {
  name: 'Uses `===` instead of `==`',
  run: ({ source, fail }) => {
    if (/[^=!<>]==[^=]|!=[^=]/.test(source.replace(/=>/g, ''))) fail('Found `==` or `!=`. In JavaScript, always use `===` and `!==` to avoid surprise type conversions.');
  },
};

const fn = (exports, name) => {
  if (typeof exports[name] !== 'function') throw new Error(`Could not find a function named \`${name}\`. Check the spelling (JavaScript names are case-sensitive).`);
  return exports[name];
};

export const units = [
  {
    id: 'js',
    title: 'JavaScript for Pythonistas',
    blurb: 'Everything you need from JavaScript, explained by comparing it to the Python you already know.',
    lessons: [
      {
        id: 'welcome',
        title: 'Hello, JavaScript',
        kind: 'js',
        tests: [
          {
            name: 'The first line logged is exactly "Hello, React!"',
            run: ({ logs, expect }) => expect(logs[0], 'your first console.log').toBe('Hello, React!'),
          },
          {
            name: 'Logs the result of 2 + 3',
            run: ({ logs, source, expect, fail }) => {
              expect(logs, 'your logs').toContain('5');
              if (!/2\s*\+\s*3/.test(source)) fail('Let JavaScript do the math: log `2 + 3`, not the text "5".');
            },
          },
        ],
      },
      {
        id: 'variables',
        title: 'Variables: let & const',
        kind: 'js',
        expose: ['city', 'visits'],
        tests: [
          {
            name: '`city` is a const equal to "Paris"',
            run: ({ exports, source, expect, fail }) => {
              expect(exports.city, 'city').toBe('Paris');
              if (!/const\s+city\b/.test(source)) fail('Declare `city` with `const`, since it never changes.');
            },
          },
          {
            name: '`visits` is declared with let and ends up as 2',
            run: ({ exports, source, expect, fail }) => {
              if (!/let\s+visits\b/.test(source)) fail('Declare `visits` with `let`, since you reassign it.');
              expect(exports.visits, 'visits').toBe(2);
            },
          },
          {
            name: 'Logs city, then visits',
            run: ({ logs, expect }) => {
              expect(logs, 'your logs').toContain('Paris');
              expect(logs, 'your logs').toContain('2');
            },
          },
          noVar,
        ],
      },
      {
        id: 'strings-numbers',
        title: 'Types & Template Literals',
        kind: 'js',
        expose: ['receipt', 'isExpensive'],
        tests: [
          {
            name: '`receipt` is "4 x coffee = $14"',
            run: ({ exports, expect }) => expect(exports.receipt, 'receipt').toBe('4 x coffee = $14'),
          },
          {
            name: 'Builds the receipt with a template literal',
            run: ({ source, fail }) => {
              if (!source.includes('`') || !source.includes('${')) fail('Use a template literal: backticks with ${...} inside, the JS version of an f-string.');
            },
          },
          {
            name: '`isExpensive` is the boolean true',
            run: ({ exports, expect }) => {
              expect(exports.isExpensive, 'isExpensive').toBeA('boolean');
              expect(exports.isExpensive, 'isExpensive').toBe(true);
            },
          },
          {
            name: 'Logs the receipt',
            run: ({ logs, expect }) => expect(logs, 'your logs').toContain('4 x coffee = $14'),
          },
        ],
      },
      {
        id: 'functions',
        title: 'Functions & Arrow Functions',
        kind: 'js',
        expose: ['greet', 'square', 'applyTwice'],
        tests: [
          {
            name: 'greet("Ada") returns "Hello, Ada!"',
            run: ({ exports, expect }) => expect(fn(exports, 'greet')('Ada'), 'greet("Ada")').toBe('Hello, Ada!'),
          },
          {
            name: 'greet() with no argument returns "Hello, friend!"',
            run: ({ exports, expect }) => expect(fn(exports, 'greet')(), 'greet()').toBe('Hello, friend!'),
          },
          {
            name: 'square is an arrow function and square(5) is 25',
            run: ({ exports, source, expect, fail }) => {
              expect(fn(exports, 'square')(5), 'square(5)').toBe(25);
              if (!/square\s*=\s*(\([^)]*\)|\w+)\s*=>/.test(source)) fail('Write `square` as an arrow function: `const square = (n) => ...`');
            },
          },
          {
            name: 'applyTwice(square, 3) returns 81',
            run: ({ exports, expect }) => expect(fn(exports, 'applyTwice')(fn(exports, 'square'), 3), 'applyTwice(square, 3)').toBe(81),
          },
        ],
      },
      {
        id: 'conditionals',
        title: 'Conditionals & Truthiness',
        kind: 'js',
        expose: ['grade', 'parity'],
        tests: [
          {
            name: 'grade() returns the right letter for 95, 90, 85, 72 and 40',
            run: ({ exports, expect }) => {
              const grade = fn(exports, 'grade');
              expect(grade(95), 'grade(95)').toBe('A');
              expect(grade(90), 'grade(90)').toBe('A');
              expect(grade(85), 'grade(85)').toBe('B');
              expect(grade(72), 'grade(72)').toBe('C');
              expect(grade(40), 'grade(40)').toBe('F');
            },
          },
          {
            name: 'parity() returns "even" or "odd"',
            run: ({ exports, expect }) => {
              const parity = fn(exports, 'parity');
              expect(parity(4), 'parity(4)').toBe('even');
              expect(parity(7), 'parity(7)').toBe('odd');
              expect(parity(0), 'parity(0)').toBe('even');
            },
          },
          {
            name: 'parity uses the ternary operator',
            run: ({ source, fail }) => {
              if (!/\?[^?.]*:/.test(source)) fail('Use a ternary: `condition ? "even" : "odd"`');
            },
          },
          strictEquals,
        ],
      },
      {
        id: 'arrays-loops',
        title: 'Arrays, Loops & map/filter',
        kind: 'js',
        expose: ['doubled', 'evens', 'total'],
        tests: [
          {
            name: 'doubled([1, 2, 3]) returns [2, 4, 6] using .map',
            run: ({ exports, source, expect, fail }) => {
              const input = [1, 2, 3];
              expect(fn(exports, 'doubled')(input), 'doubled([1, 2, 3])').toEqual([2, 4, 6]);
              expect(input, 'the original array').toEqual([1, 2, 3]);
              if (!source.includes('.map(')) fail('Use the `.map()` method for doubled.');
            },
          },
          {
            name: 'evens([1, 2, 3, 4, 5, 6]) returns [2, 4, 6] using .filter',
            run: ({ exports, source, expect, fail }) => {
              expect(fn(exports, 'evens')([1, 2, 3, 4, 5, 6]), 'evens([1..6])').toEqual([2, 4, 6]);
              if (!source.includes('.filter(')) fail('Use the `.filter()` method for evens.');
            },
          },
          {
            name: 'total() adds up the numbers (and returns 0 for an empty array)',
            run: ({ exports, expect }) => {
              const total = fn(exports, 'total');
              expect(total([1, 2, 3, 4]), 'total([1, 2, 3, 4])').toBe(10);
              expect(total([]), 'total([])').toBe(0);
            },
          },
        ],
      },
      {
        id: 'objects',
        title: 'Objects, Destructuring & Spread',
        kind: 'js',
        expose: ['describe', 'birthday'],
        tests: [
          {
            name: 'describe() returns "Ada (36) from London"',
            run: ({ exports, expect }) => expect(fn(exports, 'describe')({ name: 'Ada', age: 36, city: 'London' }), 'describe(user)').toBe('Ada (36) from London'),
          },
          {
            name: 'describe() uses destructuring',
            run: ({ source, fail }) => {
              if (!/(const|let)\s*\{[^}]*\}\s*=|\(\s*\{[^}]*\}\s*\)/.test(source)) fail('Pull out the fields with destructuring: `const { name, age, city } = person;`');
            },
          },
          {
            name: 'birthday() returns a new object with age + 1',
            run: ({ exports, expect }) => {
              const person = { name: 'Ada', age: 36, city: 'London' };
              const older = fn(exports, 'birthday')(person);
              expect(older, 'birthday(user)').toEqual({ name: 'Ada', age: 37, city: 'London' });
            },
          },
          {
            name: 'birthday() does not modify the original object',
            run: ({ exports, expect, fail }) => {
              const person = { name: 'Ada', age: 36, city: 'London' };
              const older = fn(exports, 'birthday')(person);
              expect(person.age, 'the original age').toBe(36);
              if (older === person) fail('You returned the same object. Return a new one with spread: `{ ...person, age: ... }`');
            },
          },
        ],
      },
      {
        id: 'quiz-js',
        title: 'Quiz: JavaScript Basics',
        kind: 'quiz',
        questions: [
          {
            q: 'Which declaration should you reach for **by default**?',
            options: ['`var`', '`let`', '`const`', 'No keyword, like Python'],
            answer: 2,
            explain: 'Use `const` unless you need to reassign the variable; then use `let`. Avoid `var`.',
          },
          {
            q: 'What is the JavaScript version of `f"Hi {name}"`?',
            options: ['`"Hi {name}"`', "`'Hi ${name}'`", '`` `Hi ${name}` ``', '`f"Hi {name}"`'],
            answer: 2,
            explain: 'Template literals use backticks. `${...}` only works inside backticks.',
          },
          {
            q: 'What does `"5" == 5` evaluate to?',
            options: ['`true`', '`false`', 'A TypeError', '`undefined`'],
            answer: 0,
            explain: '`==` converts types before comparing, so it is `true`. That is why you should use `===`, which gives `false` here.',
          },
          {
            q: 'In Python, an empty list is falsy. What about `[]` in JavaScript?',
            options: ['Falsy, same as Python', 'Truthy', 'It throws an error', 'It is `null`'],
            answer: 1,
            explain: 'Empty arrays and empty objects are **truthy** in JS. Check `arr.length === 0` instead.',
          },
          {
            q: 'Which is the JS equivalent of `[x * 2 for x in nums]`?',
            options: ['`nums.filter(x => x * 2)`', '`nums.map(x => x * 2)`', '`for x in nums: x * 2`', '`nums.forEach(x => x * 2)`'],
            answer: 1,
            explain: '`.map()` builds a new array from the return values. `.forEach()` returns `undefined`.',
          },
          {
            q: 'What does a JS function return if it has no `return` statement?',
            options: ['`None`', '`null`', '`undefined`', '`0`'],
            answer: 2,
            explain: 'It returns `undefined`, which is JavaScript\'s closest equivalent to Python\'s implicit `None`.',
          },
          {
            q: 'What does `{ ...user, age: 40 }` do?',
            options: ['Mutates `user`', 'Creates a new object copying `user`, with `age` set to 40', 'Throws a SyntaxError', 'Creates an array'],
            answer: 1,
            explain: 'Spread copies all properties into a new object (like `{**user, "age": 40}` in Python). Later keys win.',
          },
        ],
      },
    ],
  },
  {
    id: 'react',
    title: 'Thinking in Components',
    blurb: 'JSX, components, props, lists and conditional rendering: how React describes a UI.',
    lessons: [
      {
        id: 'hello-react',
        title: 'Your First Component',
        kind: 'react',
        tests: [
          {
            name: 'Renders an <h1> saying "Hello, React!"',
            run: async ({ render, $, text, expect, fail }) => {
              const c = await render();
              const h1 = $('h1', c);
              if (!h1) fail('No <h1> was rendered.');
              expect(text(h1), 'the <h1> text').toBe('Hello, React!');
            },
          },
          {
            name: 'Renders a <p> that shows the result of {2 + 2}',
            run: async ({ render, $, text, source, expect, fail }) => {
              const c = await render();
              const p = $('p', c);
              if (!p) fail('No <p> was rendered.');
              expect(text(p), 'the <p> text').toContain('4');
              if (!/\{\s*2\s*\+\s*2\s*\}/.test(source)) fail('Compute it inside JSX with curly braces: {2 + 2}');
            },
          },
        ],
      },
      {
        id: 'jsx-expressions',
        title: 'JSX: Expressions & Attributes',
        kind: 'react',
        tests: [
          {
            name: 'Wraps everything in a <div className="card">',
            run: async ({ render, $, fail }) => {
              const c = await render();
              if (!$('div.card', c)) fail('Could not find a <div> with className="card". Remember: `className`, not `class`.');
            },
          },
          {
            name: 'The <h2> shows user.name',
            run: async ({ render, $, text, source, expect, fail }) => {
              const c = await render();
              expect(text($('h2', c)), 'the <h2> text').toBe('Grace Hopper');
              if (!/\{\s*user\.name\s*\}/.test(source)) fail('Read the name from the object with {user.name} instead of typing it.');
            },
          },
          {
            name: 'The <h2> is styled with color "rebeccapurple"',
            run: async ({ render, $, expect }) => {
              const c = await render();
              expect($('h2', c)?.style.color, 'the <h2> color').toBe('rebeccapurple');
            },
          },
          {
            name: 'A <p> says "Favorite language: COBOL"',
            run: async ({ render, $$, text, expect }) => {
              const c = await render();
              expect($$('p', c).map(text), 'the paragraphs').toContain('Favorite language: COBOL');
            },
          },
        ],
      },
      {
        id: 'components',
        title: 'Composing Components',
        kind: 'react',
        expose: ['Header', 'Footer'],
        tests: [
          {
            name: 'Header renders <header> with an <h1> "My Blog"',
            run: async ({ exports, render, h, $, text, expect, fail }) => {
              const c = await render(h(fn(exports, 'Header')));
              if (!$('header', c)) fail('Header should render a <header> element.');
              expect(text($('header h1', c)), 'the <h1> inside <header>').toBe('My Blog');
            },
          },
          {
            name: 'Footer renders <footer> containing "Made with React"',
            run: async ({ exports, render, h, $, text, expect }) => {
              const c = await render(h(fn(exports, 'Footer')));
              expect(text($('footer', c)), 'the <footer> text').toContain('Made with React');
            },
          },
          {
            name: 'App uses <Header />, a <main>, and <Footer />',
            run: async ({ render, $, source, fail }) => {
              const c = await render();
              if (!/<Header\s*\/>/.test(source) || !/<Footer\s*\/>/.test(source)) fail('Use your components inside App as <Header /> and <Footer />.');
              if (!$('header', c) || !$('main', c) || !$('footer', c)) fail('App should render a header, a <main>, and a footer.');
            },
          },
        ],
      },
      {
        id: 'props',
        title: 'Props',
        kind: 'react',
        expose: ['Greeting'],
        tests: [
          {
            name: '<Greeting name="Ada" /> renders "Hello, Ada."',
            run: async ({ exports, render, h, $, text, expect }) => {
              const c = await render(h(fn(exports, 'Greeting'), { name: 'Ada' }));
              expect(text($('p', c)), 'the <p> text').toBe('Hello, Ada.');
            },
          },
          {
            name: '<Greeting name="Ada" excited /> renders "Hello, Ada!"',
            run: async ({ exports, render, h, $, text, expect }) => {
              const c = await render(h(fn(exports, 'Greeting'), { name: 'Ada', excited: true }));
              expect(text($('p', c)), 'the <p> text').toBe('Hello, Ada!');
            },
          },
          {
            name: 'App renders at least three Greetings',
            run: async ({ render, $$, expect, fail }) => {
              const c = await render();
              const ps = $$('p', c);
              if (ps.length < 3) fail(`Expected at least 3 greetings, found ${ps.length}.`);
              expect(ps.some((p) => p.textContent.trim().endsWith('!')), 'at least one excited greeting').toBe(true);
            },
          },
        ],
      },
      {
        id: 'lists-keys',
        title: 'Rendering Lists',
        kind: 'react',
        tests: [
          {
            name: 'Renders one <li> per task inside a <ul>',
            run: async ({ render, $$, text, expect }) => {
              const c = await render();
              const items = $$('ul li', c).map(text);
              expect(items, 'the list items').toEqual(['Learn JavaScript', 'Learn React', 'Build something cool']);
            },
          },
          {
            name: 'Finished tasks have className "done"',
            run: async ({ render, $$, text, expect }) => {
              const c = await render();
              expect($$('li.done', c).map(text), 'the items with className="done"').toEqual(['Learn JavaScript']);
            },
          },
          {
            name: 'Uses .map() and gives each <li> a key',
            run: ({ source, fail }) => {
              if (!source.includes('.map(')) fail('Turn the array into elements with tasks.map(...).');
              if (!/key=\{/.test(source)) fail('Each <li> needs a key prop, e.g. key={task.id}.');
            },
          },
        ],
      },
      {
        id: 'conditional-rendering',
        title: 'Conditional Rendering',
        kind: 'react',
        expose: ['Inbox'],
        tests: [
          {
            name: '<Inbox count={0} /> shows "No new messages"',
            run: async ({ exports, render, h, text, $, expect }) => {
              const c = await render(h(fn(exports, 'Inbox'), { count: 0 }));
              expect(text(c), 'the rendered text').toBe('No new messages');
              expect($('strong', c), 'a <strong> warning').toBeFalsy();
            },
          },
          {
            name: '<Inbox count={3} /> shows "You have 3 new messages"',
            run: async ({ exports, render, h, text, $, expect }) => {
              const c = await render(h(fn(exports, 'Inbox'), { count: 3 }));
              expect(text(c), 'the rendered text').toContain('You have 3 new messages');
              expect($('strong', c), 'a <strong> warning').toBeFalsy();
            },
          },
          {
            name: '<Inbox count={25} /> also shows <strong>That\'s a lot!</strong>',
            run: async ({ exports, render, h, text, $, expect }) => {
              const c = await render(h(fn(exports, 'Inbox'), { count: 25 }));
              expect(text(c), 'the rendered text').toContain('You have 25 new messages');
              expect(text($('strong', c)), 'the <strong> text').toBe("That's a lot!");
            },
          },
        ],
      },
      {
        id: 'quiz-react',
        title: 'Quiz: Components',
        kind: 'quiz',
        questions: [
          {
            q: 'What does JSX like `<h1>Hi</h1>` turn into?',
            options: ['An HTML string', 'A call like `React.createElement("h1", null, "Hi")`', 'A real DOM node immediately', 'A Python object'],
            answer: 1,
            explain: 'JSX is syntax sugar. A compiler turns each tag into a function call that returns a plain object describing the UI.',
          },
          {
            q: 'Why does React use `className` instead of `class`?',
            options: ['It is shorter', '`class` is a reserved word in JavaScript', 'HTML does not support class', 'No reason'],
            answer: 1,
            explain: 'JSX is JavaScript, and `class` is a keyword (just like in Python).',
          },
          {
            q: 'Which component name will React treat as a component instead of an HTML tag?',
            options: ['`<profileCard />`', '`<profile_card />`', '`<ProfileCard />`', 'All of them'],
            answer: 2,
            explain: 'Components must start with a capital letter. Lowercase tags are treated as built-in HTML elements.',
          },
          {
            q: 'Props are most like which Python feature?',
            options: ['Global variables', 'Keyword arguments passed to a function', 'Class inheritance', 'Decorators'],
            answer: 1,
            explain: '`<Greeting name="Ada" />` calls `Greeting({ name: "Ada" })`, much like `greeting(name="Ada")`.',
          },
          {
            q: 'What is wrong with `{count && <p>{count} messages</p>}` when `count` is 0?',
            options: ['Nothing', 'It renders the number 0 on screen', 'It throws an error', 'It renders "0 messages"'],
            answer: 1,
            explain: '`0 && ...` evaluates to `0`, and React renders numbers. Use `count > 0 && ...` instead.',
          },
          {
            q: 'Why does each item in a rendered list need a `key`?',
            options: ['For CSS styling', 'So React can tell which item is which between renders', 'Keys are required by HTML', 'To sort the list'],
            answer: 1,
            explain: 'Keys let React match items across renders so it updates, reorders and removes the right ones.',
          },
        ],
      },
    ],
  },
  {
    id: 'state',
    title: 'State & Interactivity',
    blurb: 'Make things happen: events, useState, forms, updating lists, and sharing state.',
    lessons: [
      {
        id: 'events',
        title: 'Handling Events',
        kind: 'react',
        tests: [
          {
            name: 'Nothing is logged just from rendering',
            run: async ({ render, logs, expect }) => {
              const before = logs.length;
              await render();
              expect(logs.slice(before), 'logs printed while rendering').toEqual([]);
            },
          },
          {
            name: 'Clicking "Say hi" logs "hi!"',
            run: async ({ render, button, click, logs, expect }) => {
              const c = await render();
              const before = logs.length;
              await click(button('Say hi', c));
              expect(logs.slice(before), 'logs after clicking').toEqual(['hi!']);
            },
          },
          {
            name: 'Clicking "Shout" logs "HELLO!"',
            run: async ({ render, button, click, logs, expect }) => {
              const c = await render();
              const before = logs.length;
              await click(button('Shout', c));
              expect(logs.slice(before), 'logs after clicking').toEqual(['HELLO!']);
            },
          },
        ],
      },
      {
        id: 'use-state',
        title: 'State with useState',
        kind: 'react',
        tests: [
          {
            name: 'Starts by showing "Count: 0"',
            run: async ({ render, $, text, expect }) => {
              const c = await render();
              expect(text($('p', c)), 'the <p> text').toBe('Count: 0');
            },
          },
          {
            name: '"+1" and "-1" change the count',
            run: async ({ render, $, text, button, click, expect }) => {
              const c = await render();
              await click(button('+1', c));
              await click(button('+1', c));
              expect(text($('p', c)), 'after clicking +1 twice').toBe('Count: 2');
              await click(button('-1', c));
              expect(text($('p', c)), 'then clicking -1').toBe('Count: 1');
            },
          },
          {
            name: '"Reset" sets the count back to 0',
            run: async ({ render, $, text, button, click, expect }) => {
              const c = await render();
              await click(button('+1', c));
              await click(button('Reset', c));
              expect(text($('p', c)), 'after Reset').toBe('Count: 0');
            },
          },
          {
            name: 'Uses useState',
            run: ({ source, fail }) => {
              if (!source.includes('useState(')) fail('Store the count with useState(0).');
            },
          },
        ],
      },
      {
        id: 'forms',
        title: 'Forms & Controlled Inputs',
        kind: 'react',
        tests: [
          {
            name: 'Says "Hello, stranger!" when the input is empty',
            run: async ({ render, $, text, expect }) => {
              const c = await render();
              expect(text($('p', c)), 'the greeting').toBe('Hello, stranger!');
            },
          },
          {
            name: 'Typing "Ada" updates the greeting to "Hello, Ada!"',
            run: async ({ render, $, text, type, expect, fail }) => {
              const c = await render();
              const input = $('input', c);
              if (!input) fail('No <input> was rendered.');
              await type(input, 'Ada');
              expect(text($('p', c)), 'the greeting').toBe('Hello, Ada!');
            },
          },
          {
            name: 'The input is controlled (value comes from state)',
            run: async ({ render, $, type, source, fail }) => {
              const c = await render();
              await type($('input', c), 'Grace');
              if (!/value=\{/.test(source)) fail('Give the input value={name} so React controls it.');
              if (!/onChange=\{/.test(source)) fail('Add an onChange handler that calls setName(e.target.value).');
            },
          },
          {
            name: 'Clearing the input goes back to "stranger"',
            run: async ({ render, $, text, type, expect }) => {
              const c = await render();
              await type($('input', c), 'Ada');
              await type($('input', c), '');
              expect(text($('p', c)), 'the greeting').toBe('Hello, stranger!');
            },
          },
        ],
      },
      {
        id: 'state-arrays',
        title: 'Lists in State: A Todo App',
        kind: 'react',
        tests: [
          {
            name: 'Adding "Buy milk" shows it in the list and clears the input',
            run: async ({ render, $, $$, type, click, button, expect }) => {
              const c = await render();
              await type($('input', c), 'Buy milk');
              await click(button('Add', c));
              const items = $$('li', c);
              expect(items, 'the list items').toHaveLength(1);
              expect(items[0].textContent, 'the first item').toContain('Buy milk');
              expect($('input', c).value, 'the input after adding').toBe('');
            },
          },
          {
            name: 'Can add several todos',
            run: async ({ render, $, $$, type, click, button, expect }) => {
              const c = await render();
              for (const todo of ['One', 'Two', 'Three']) {
                await type($('input', c), todo);
                await click(button('Add', c));
              }
              expect($$('li', c), 'the list items').toHaveLength(3);
            },
          },
          {
            name: 'Ignores empty todos',
            run: async ({ render, $, $$, type, click, button, expect }) => {
              const c = await render();
              await type($('input', c), '   ');
              await click(button('Add', c));
              expect($$('li', c), 'the list items').toHaveLength(0);
            },
          },
          {
            name: 'Each todo has a "Delete" button that removes it',
            run: async ({ render, $, $$, type, click, button, expect }) => {
              const c = await render();
              await type($('input', c), 'Buy milk');
              await click(button('Add', c));
              await type($('input', c), 'Walk dog');
              await click(button('Add', c));
              await click(button('Delete', $$('li', c)[0]));
              const items = $$('li', c);
              expect(items, 'the list items').toHaveLength(1);
              expect(items[0].textContent, 'the remaining item').toContain('Walk dog');
            },
          },
        ],
      },
      {
        id: 'lifting-state',
        title: 'Lifting State Up',
        kind: 'react',
        expose: ['CelsiusInput', 'Fahrenheit'],
        tests: [
          {
            name: '<Fahrenheit celsius={100} /> shows "212°F"',
            run: async ({ exports, render, h, text, expect }) => {
              const c = await render(h(fn(exports, 'Fahrenheit'), { celsius: 100 }));
              expect(text(c), 'the rendered text').toBe('212°F');
            },
          },
          {
            name: 'App starts at "32°F"',
            run: async ({ render, $, text, expect }) => {
              const c = await render();
              expect(text($('p', c)), 'the <p> text').toBe('32°F');
            },
          },
          {
            name: 'Typing in CelsiusInput updates Fahrenheit',
            run: async ({ render, $, text, type, expect }) => {
              const c = await render();
              await type($('input', c), '100');
              expect(text($('p', c)), 'after typing 100').toBe('212°F');
              await type($('input', c), '-40');
              expect(text($('p', c)), 'after typing -40').toBe('-40°F');
            },
          },
          {
            name: 'CelsiusInput gets its value and onChange from props',
            run: async ({ exports, render, h, $, type, expect }) => {
              const calls = [];
              const c = await render(h(fn(exports, 'CelsiusInput'), { celsius: 5, onChange: (v) => calls.push(v) }));
              expect($('input', c)?.value, 'the input value').toBe('5');
              await type($('input', c), '7');
              expect(calls, 'values passed to onChange').toEqual([7]);
            },
          },
        ],
      },
      {
        id: 'quiz-state',
        title: 'Quiz: State',
        kind: 'quiz',
        questions: [
          {
            q: 'Which is the correct way to attach a click handler?',
            options: ['`<button onClick={handleClick()}>`', '`<button onClick={handleClick}>`', '`<button onclick="handleClick">`', '`<button click={handleClick}>`'],
            answer: 1,
            explain: 'Pass the function itself. `handleClick()` would call it immediately during render.',
          },
          {
            q: 'Why does `let count = 0; ... count += 1` inside a component not update the screen?',
            options: [
              'Because `let` is broken',
              'Changing a local variable does not tell React to re-render, and it resets to 0 on every render',
              'You need `var` instead',
              'It does update the screen',
            ],
            answer: 1,
            explain: 'Only calling a state setter schedules a re-render, and state is the only thing that survives between renders.',
          },
          {
            q: 'What does `useState(0)` return?',
            options: ['The number 0', 'A pair: the current value and a function to update it', 'A class instance', 'A Promise'],
            answer: 1,
            explain: 'You destructure it: `const [count, setCount] = useState(0);`',
          },
          {
            q: 'How should you add `item` to a `todos` array in state?',
            options: ['`todos.push(item)`', '`setTodos(todos.push(item))`', '`setTodos([...todos, item])`', '`todos = [...todos, item]`'],
            answer: 2,
            explain: 'Always create a new array. React compares references, so mutating the old array may not trigger a re-render.',
          },
          {
            q: 'Two sibling components need the same piece of state. Where should it live?',
            options: ['In both siblings', 'In a global variable', 'In their closest common parent, passed down as props', 'In localStorage'],
            answer: 2,
            explain: 'This is "lifting state up". The parent owns the state and passes the value and a setter to its children.',
          },
        ],
      },
    ],
  },
  {
    id: 'effects',
    title: 'Effects, Data & Hooks',
    blurb: 'Talk to the outside world: useEffect, fetching data, custom hooks, and a final project.',
    lessons: [
      {
        id: 'use-effect',
        title: 'Side Effects with useEffect',
        kind: 'react',
        expose: ['ClickTitle', 'Timer'],
        tests: [
          {
            name: 'ClickTitle sets document.title to "Clicked 0 times" on mount',
            run: async ({ exports, render, h, expect }) => {
              document.title = 'Preview';
              await render(h(fn(exports, 'ClickTitle')));
              expect(document.title, 'document.title').toBe('Clicked 0 times');
            },
          },
          {
            name: 'Clicking updates the title to "Clicked 1 times"',
            run: async ({ exports, render, h, click, $, expect }) => {
              const c = await render(h(fn(exports, 'ClickTitle')));
              await click($('button', c));
              expect(document.title, 'document.title').toBe('Clicked 1 times');
            },
          },
          {
            name: 'Timer counts up once per second',
            run: async ({ exports, render, h, text, wait, expect }) => {
              const c = await render(h(fn(exports, 'Timer')));
              expect(text(c), 'the timer at the start').toBe('Seconds: 0');
              await wait(1150);
              expect(text(c), 'the timer after ~1 second').toBe('Seconds: 1');
            },
          },
          {
            name: 'Timer cleans up its interval',
            run: ({ source, fail }) => {
              if (!source.includes('clearInterval')) fail('Return a cleanup function from the effect: `return () => clearInterval(id);`');
            },
          },
        ],
      },
      {
        id: 'fetching-data',
        title: 'Fetching Data',
        kind: 'react',
        tests: [
          {
            name: 'Shows "Loading..." while waiting',
            run: async ({ render, text, expect }) => {
              const c = await render();
              expect(text(c), 'the first render').toContain('Loading...');
            },
          },
          {
            name: 'Then lists each user\'s name',
            run: async ({ render, $$, text, wait, expect }) => {
              const c = await render();
              await wait(600);
              expect($$('li', c).map(text), 'the list items').toEqual(['Ada Lovelace', 'Grace Hopper', 'Guido van Rossum']);
              expect(text(c), 'the page after loading').notToContain('Loading...');
            },
          },
          {
            name: 'Fetches inside useEffect',
            run: ({ source, fail }) => {
              if (!source.includes('useEffect(')) fail('Start the fetch inside useEffect(() => { ... }, []).');
              if (!source.includes('api.example.com/users')) fail('Fetch from https://api.example.com/users');
            },
          },
        ],
      },
      {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        kind: 'react',
        expose: ['useToggle'],
        tests: [
          {
            name: 'useToggle() starts false and flips when toggled',
            run: async ({ exports, render, h, click, $, text, expect }) => {
              const useToggle = fn(exports, 'useToggle');
              function Probe() {
                const [on, toggle] = useToggle();
                return h('button', { onClick: toggle }, on ? 'ON' : 'OFF');
              }
              const c = await render(h(Probe));
              expect(text($('button', c)), 'initially').toBe('OFF');
              await click($('button', c));
              expect(text($('button', c)), 'after one toggle').toBe('ON');
              await click($('button', c));
              expect(text($('button', c)), 'after two toggles').toBe('OFF');
            },
          },
          {
            name: 'useToggle(true) starts true',
            run: async ({ exports, render, h, $, text, expect }) => {
              const useToggle = fn(exports, 'useToggle');
              function Probe() {
                const [on] = useToggle(true);
                return h('span', null, on ? 'ON' : 'OFF');
              }
              const c = await render(h(Probe));
              expect(text($('span', c)), 'initially').toBe('ON');
            },
          },
          {
            name: 'App reveals "Secret details" with Show/Hide buttons',
            run: async ({ render, button, click, text, expect }) => {
              const c = await render();
              expect(text(c), 'before clicking').notToContain('Secret details');
              await click(button('Show details', c));
              expect(text(c), 'after Show details').toContain('Secret details');
              await click(button('Hide details', c));
              expect(text(c), 'after Hide details').notToContain('Secret details');
            },
          },
        ],
      },
      {
        id: 'final-project',
        title: 'Final Project: Flashcards',
        kind: 'react',
        tests: [
          {
            name: 'Shows the first question and "Card 1 of 3"',
            run: async ({ render, $, text, expect }) => {
              const c = await render();
              expect(text($('h2', c)), 'the <h2>').toBe('What does JSX compile to?');
              expect(text($('.progress', c)), 'the .progress text').toBe('Card 1 of 3');
              expect($('.answer', c), 'the answer (should be hidden)').toBeFalsy();
            },
          },
          {
            name: '"Show answer" reveals the answer',
            run: async ({ render, $, text, button, click, expect }) => {
              const c = await render();
              await click(button('Show answer', c));
              expect(text($('.answer', c)), 'the .answer text').toBe('React.createElement calls');
            },
          },
          {
            name: '"Next" moves to the next card and hides the answer',
            run: async ({ render, $, text, button, click, expect }) => {
              const c = await render();
              await click(button('Show answer', c));
              await click(button('Next', c));
              expect(text($('h2', c)), 'the <h2>').toBe('Which hook stores state?');
              expect(text($('.progress', c)), 'the .progress text').toBe('Card 2 of 3');
              expect($('.answer', c), 'the answer (should be hidden again)').toBeFalsy();
            },
          },
          {
            name: 'After the last card, "Next" wraps around to the first',
            run: async ({ render, $, text, button, click, expect }) => {
              const c = await render();
              for (let i = 0; i < 3; i++) await click(button('Next', c));
              expect(text($('h2', c)), 'the <h2>').toBe('What does JSX compile to?');
              expect(text($('.progress', c)), 'the .progress text').toBe('Card 1 of 3');
            },
          },
        ],
      },
    ],
  },
];
