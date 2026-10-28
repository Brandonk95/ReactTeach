// Practice exercises: a short follow-up after each coding lesson that applies
// the same concept in a new situation. Prose and code live in
// ./lessons/<id>.practice.md; tests live here. Keyed by the parent lesson id.

const fn = (exports, name) => {
  if (typeof exports[name] !== 'function') throw new Error(`Could not find a function named \`${name}\`. Check the spelling (names are case-sensitive).`);
  return exports[name];
};

const noVar = {
  name: 'Does not use `var`',
  run: ({ source, fail }) => {
    if (/\bvar\s/.test(source)) fail('Found `var`. Use `const` (or `let` if the value changes) instead.');
  },
};

const strictEquals = {
  name: 'Uses `===` instead of `==`',
  run: ({ source, fail }) => {
    if (/[^=!<>]==[^=]|!=[^=]/.test(source.replace(/=>/g, ''))) fail('Found `==` or `!=`. Use `===` and `!==`.');
  },
};

const isArrow = (source, name) => new RegExp(`${name}\\s*=\\s*(\\([^)]*\\)|\\w+)\\s*=>`).test(source);

const CARDS = ['What does JSX compile to?', 'Which hook stores state?', 'What prop helps React track list items?'];

export const practice = {
  // ---------------- Unit 1 ----------------
  welcome: {
    tests: [
      {
        name: 'The first line logged is "I know Python"',
        run: ({ logs, expect }) => expect(logs[0], 'your first console.log').toBe('I know Python'),
      },
      {
        name: 'Logs the result of 10 * 4',
        run: ({ logs, source, expect, fail }) => {
          expect(logs, 'your logs').toContain('40');
          if (!/10\s*\*\s*4/.test(source)) fail('Let JavaScript calculate it: log `10 * 4`.');
        },
      },
      {
        name: 'Logs "Python & JavaScript" by joining strings with +',
        run: ({ logs, source, expect, fail }) => {
          expect(logs, 'your logs').toContain('Python & JavaScript');
          if (!/["'`]\s*\+/.test(source)) fail('Build it by joining strings with `+`, like Python.');
        },
      },
    ],
  },
  variables: {
    expose: ['taxRate', 'balance', 'accountName'],
    tests: [
      {
        name: '`taxRate` is a const equal to 0.2',
        run: ({ exports, source, expect, fail }) => {
          expect(exports.taxRate, 'taxRate').toBe(0.2);
          if (!/const\s+taxRate\b/.test(source)) fail('`taxRate` never changes, so declare it with `const`.');
        },
      },
      {
        name: '`balance` is declared with let and ends at 75',
        run: ({ exports, source, expect, fail }) => {
          if (!/let\s+balance\b/.test(source)) fail('`balance` changes, so declare it with `let`.');
          expect(exports.balance, 'balance').toBe(75);
        },
      },
      {
        name: '`accountName` (camelCase) is "Savings"',
        run: ({ exports, source, expect, fail }) => {
          if (source.includes('account_name')) fail('JavaScript uses camelCase: `accountName`, not `account_name`.');
          expect(exports.accountName, 'accountName').toBe('Savings');
        },
      },
      {
        name: 'Logs the final balance',
        run: ({ logs, expect }) => expect(logs, 'your logs').toContain('75'),
      },
      noVar,
    ],
  },
  'strings-numbers': {
    expose: ['bio', 'isSenior', 'shout'],
    tests: [
      {
        name: '`bio` is "Guido was born in 1956 and is 70 years old."',
        run: ({ exports, expect }) => expect(exports.bio, 'bio').toBe('Guido was born in 1956 and is 70 years old.'),
      },
      {
        name: '`bio` is built with a template literal and calculates the age',
        run: ({ source, fail }) => {
          if (!source.includes('`') || !source.includes('${')) fail('Use a template literal with `${...}`.');
          if (/\b70\b/.test(source)) fail('Calculate the age from `currentYear - birthYear` instead of typing 70.');
        },
      },
      {
        name: '`isSenior` is the boolean true (age is 65 or more)',
        run: ({ exports, expect }) => {
          expect(exports.isSenior, 'isSenior').toBeA('boolean');
          expect(exports.isSenior, 'isSenior').toBe(true);
        },
      },
      {
        name: '`shout` is "GUIDO", made with a string method',
        run: ({ exports, source, expect, fail }) => {
          expect(exports.shout, 'shout').toBe('GUIDO');
          if (!source.includes('.toUpperCase()')) fail('Use `.toUpperCase()` (the JS version of `.upper()`).');
        },
      },
    ],
  },
  functions: {
    expose: ['double', 'describePet', 'compose'],
    tests: [
      {
        name: '`double` is an arrow function and double(4) is 8',
        run: ({ exports, source, expect, fail }) => {
          expect(fn(exports, 'double')(4), 'double(4)').toBe(8);
          if (!isArrow(source, 'double')) fail('Write `double` as an arrow function: `const double = (n) => ...`');
        },
      },
      {
        name: 'describePet("Rex", "dog") returns "Rex is a dog"',
        run: ({ exports, expect }) => expect(fn(exports, 'describePet')('Rex', 'dog'), 'describePet("Rex", "dog")').toBe('Rex is a dog'),
      },
      {
        name: 'describePet("Tom") defaults to "cat"',
        run: ({ exports, expect }) => expect(fn(exports, 'describePet')('Tom'), 'describePet("Tom")').toBe('Tom is a cat'),
      },
      {
        name: 'compose(f, g, x) returns f(g(x))',
        run: ({ exports, expect }) => {
          const compose = fn(exports, 'compose');
          expect(compose((n) => n * 2, (n) => n + 1, 3), 'compose(double, addOne, 3)').toBe(8);
          expect(compose((s) => s + '!', (s) => s.toUpperCase(), 'hi'), 'compose(addBang, upper, "hi")').toBe('HI!');
        },
      },
    ],
  },
  conditionals: {
    expose: ['fizzbuzz', 'canVote'],
    tests: [
      {
        name: 'fizzbuzz() returns "FizzBuzz", "Fizz", "Buzz" or the number as a string',
        run: ({ exports, expect }) => {
          const fizzbuzz = fn(exports, 'fizzbuzz');
          expect(fizzbuzz(15), 'fizzbuzz(15)').toBe('FizzBuzz');
          expect(fizzbuzz(30), 'fizzbuzz(30)').toBe('FizzBuzz');
          expect(fizzbuzz(9), 'fizzbuzz(9)').toBe('Fizz');
          expect(fizzbuzz(10), 'fizzbuzz(10)').toBe('Buzz');
          expect(fizzbuzz(7), 'fizzbuzz(7)').toBe('7');
        },
      },
      {
        name: 'canVote() returns "yes" for 18+ and "no" otherwise, using a ternary',
        run: ({ exports, source, expect, fail }) => {
          const canVote = fn(exports, 'canVote');
          expect(canVote(18), 'canVote(18)').toBe('yes');
          expect(canVote(40), 'canVote(40)').toBe('yes');
          expect(canVote(17), 'canVote(17)').toBe('no');
          if (!/\?[^?.]*:/.test(source)) fail('Use a ternary: `condition ? "yes" : "no"`');
        },
      },
      strictEquals,
    ],
  },
  'arrays-loops': {
    expose: ['lengths', 'longWords', 'countMatches'],
    tests: [
      {
        name: 'lengths(["hi", "hello"]) returns [2, 5] using .map',
        run: ({ exports, source, expect, fail }) => {
          expect(fn(exports, 'lengths')(['hi', 'hello']), 'lengths(["hi", "hello"])').toEqual([2, 5]);
          if (!source.includes('.map(')) fail('Use `.map()` for lengths.');
        },
      },
      {
        name: 'longWords() keeps words longer than 4 letters using .filter',
        run: ({ exports, source, expect, fail }) => {
          expect(fn(exports, 'longWords')(['tiny', 'python', 'react', 'js']), 'longWords(["tiny", "python", "react", "js"])').toEqual(['python', 'react']);
          if (!source.includes('.filter(')) fail('Use `.filter()` for longWords.');
        },
      },
      {
        name: 'countMatches(arr, target) counts with a for...of loop',
        run: ({ exports, source, expect, fail }) => {
          const countMatches = fn(exports, 'countMatches');
          expect(countMatches([1, 2, 1, 3, 1], 1), 'countMatches([1, 2, 1, 3, 1], 1)').toBe(3);
          expect(countMatches(['a', 'b'], 'z'), 'countMatches(["a", "b"], "z")').toBe(0);
          if (!/for\s*\(\s*(const|let)\s+\w+\s+of\b/.test(source)) fail('Use a `for (const item of arr)` loop in countMatches.');
        },
      },
    ],
  },
  objects: {
    expose: ['summary', 'withPages', 'merge'],
    tests: [
      {
        name: 'summary() returns "Dune by Frank Herbert", destructuring in the parameter list',
        run: ({ exports, source, expect, fail }) => {
          expect(fn(exports, 'summary')({ title: 'Dune', author: 'Frank Herbert', pages: 412 }), 'summary(book)').toBe('Dune by Frank Herbert');
          if (!/summary\s*(=\s*)?\(\s*\{/.test(source)) fail('Destructure right in the parameters: `function summary({ title, author }) { ... }`');
        },
      },
      {
        name: 'withPages(book, 500) returns a new object and leaves the original alone',
        run: ({ exports, expect, fail }) => {
          const book = { title: 'Dune', author: 'Frank Herbert', pages: 412 };
          const updated = fn(exports, 'withPages')(book, 500);
          expect(updated, 'withPages(book, 500)').toEqual({ title: 'Dune', author: 'Frank Herbert', pages: 500 });
          expect(book.pages, 'the original pages').toBe(412);
          if (updated === book) fail('Return a new object with spread instead of changing the original.');
        },
      },
      {
        name: 'merge(a, b) combines two objects, with b winning',
        run: ({ exports, expect }) => {
          const a = { x: 1, y: 2 };
          const b = { y: 3, z: 4 };
          expect(fn(exports, 'merge')(a, b), 'merge({ x: 1, y: 2 }, { y: 3, z: 4 })').toEqual({ x: 1, y: 3, z: 4 });
          expect(a, 'the first object').toEqual({ x: 1, y: 2 });
        },
      },
    ],
  },

  // ---------------- Unit 2 ----------------
  'hello-react': {
    tests: [
      {
        name: 'Renders an <h2> saying "About me"',
        run: async ({ render, $, text, expect }) => {
          const c = await render();
          expect(text($('h2', c)), 'the <h2> text').toBe('About me');
        },
      },
      {
        name: 'A <p> says "My favorite number is 21", calculated with {3 * 7}',
        run: async ({ render, $, text, source, expect, fail }) => {
          const c = await render();
          expect(text($('p', c)), 'the <p> text').toBe('My favorite number is 21');
          if (!/\{\s*3\s*\*\s*7\s*\}/.test(source)) fail('Calculate it inside the JSX: {3 * 7}');
        },
      },
      {
        name: 'Wraps the two elements in a fragment <>...</> (no extra <div>)',
        run: async ({ render, source, expect, fail }) => {
          const c = await render();
          if (!source.includes('<>') || !source.includes('</>')) fail('Use a fragment: `<>` ... `</>`.');
          expect(c.firstElementChild?.tagName, 'the first rendered element').toBe('H2');
        },
      },
    ],
  },
  'jsx-expressions': {
    tests: [
      {
        name: 'Renders an <article className="movie">',
        run: async ({ render, $, fail }) => {
          const c = await render();
          if (!$('article.movie', c)) fail('Could not find <article className="movie">.');
        },
      },
      {
        name: 'The <h2> shows "Inception (2010)" from the movie object',
        run: async ({ render, $, text, source, expect, fail }) => {
          const c = await render();
          expect(text($('h2', c)), 'the <h2> text').toBe('Inception (2010)');
          if (!/movie\.title/.test(source) || !/movie\.year/.test(source)) fail('Use {movie.title} and {movie.year} instead of typing them.');
        },
      },
      {
        name: 'A bold <p> shows "Rating: 8.8"',
        run: async ({ render, $, text, source, expect, fail }) => {
          const c = await render();
          const p = $('p', c);
          expect(text(p), 'the <p> text').toBe('Rating: 8.8');
          expect(p?.style.fontWeight, 'the <p> fontWeight').toBe('bold');
          if (!/movie\.rating/.test(source)) fail('Use {movie.rating}.');
        },
      },
    ],
  },
  components: {
    expose: ['Logo', 'NavBar'],
    tests: [
      {
        name: 'Logo renders <span className="logo">ReactTeach</span>',
        run: async ({ exports, render, h, $, text, expect }) => {
          const c = await render(h(fn(exports, 'Logo')));
          expect(text($('span.logo', c)), 'the .logo text').toBe('ReactTeach');
        },
      },
      {
        name: 'NavBar renders a <nav> with the Logo and links "Home" and "About"',
        run: async ({ exports, render, h, $, $$, text, source, expect, fail }) => {
          const c = await render(h(fn(exports, 'NavBar')));
          if (!$('nav', c)) fail('NavBar should render a <nav>.');
          if (!$('nav .logo', c) || !/<Logo\s*\/>/.test(source)) fail('Use <Logo /> inside NavBar.');
          expect($$('nav a', c).map(text), 'the links').toEqual(['Home', 'About']);
        },
      },
      {
        name: 'App renders <NavBar />',
        run: async ({ render, $, source, fail }) => {
          const c = await render();
          if (!/<NavBar\s*\/>/.test(source) || !$('nav', c)) fail('Render <NavBar /> inside App.');
        },
      },
    ],
  },
  props: {
    expose: ['Badge', 'Card'],
    tests: [
      {
        name: '<Badge label="New" /> renders a gray .badge',
        run: async ({ exports, render, h, $, text, expect }) => {
          const c = await render(h(fn(exports, 'Badge'), { label: 'New' }));
          const badge = $('span.badge', c);
          expect(text(badge), 'the badge text').toBe('New');
          expect(badge?.style.backgroundColor, 'the badge background').toBe('gray');
        },
      },
      {
        name: '<Badge label="Sale" color="green" /> uses the color prop',
        run: async ({ exports, render, h, $, expect }) => {
          const c = await render(h(fn(exports, 'Badge'), { label: 'Sale', color: 'green' }));
          expect($('span.badge', c)?.style.backgroundColor, 'the badge background').toBe('green');
        },
      },
      {
        name: '<Card title="..."> shows the title in an <h3> and renders its children',
        run: async ({ exports, render, h, $, text, expect }) => {
          const c = await render(h(fn(exports, 'Card'), { title: 'Hello' }, h('p', null, 'inside the card')));
          expect(text($('.card h3', c)), 'the card title').toBe('Hello');
          expect(text($('.card p', c)), 'the children').toBe('inside the card');
        },
      },
      {
        name: 'App renders a Card with a Badge inside it',
        run: async ({ render, $, fail }) => {
          const c = await render();
          if (!$('.card .badge', c)) fail('Put a <Badge /> inside a <Card> in App.');
        },
      },
    ],
  },
  'lists-keys': {
    tests: [
      {
        name: 'Renders an <ol> listing only players with 20+ points, like "Ana: 30"',
        run: async ({ render, $$, text, expect }) => {
          const c = await render();
          expect($$('ol li', c).map(text), 'the list items').toEqual(['Ana: 30', 'Cy: 45']);
        },
      },
      {
        name: 'Uses .filter(), .map() and a key',
        run: ({ source, fail }) => {
          if (!source.includes('.filter(')) fail('Use `.filter()` to keep players with 20 or more points.');
          if (!source.includes('.map(')) fail('Use `.map()` to turn players into <li> elements.');
          if (!/key=\{/.test(source)) fail('Give each <li> a key, e.g. key={s.id}.');
        },
      },
    ],
  },
  'conditional-rendering': {
    expose: ['Status', 'Cart'],
    tests: [
      {
        name: '<Status online /> says "Online" and <Status online={false} /> says "Offline"',
        run: async ({ exports, render, h, text, source, expect, fail }) => {
          const Status = fn(exports, 'Status');
          expect(text(await render(h(Status, { online: true }))), 'Status online').toBe('Online');
          expect(text(await render(h(Status, { online: false }))), 'Status offline').toBe('Offline');
          if (!/\?[^?.]*:/.test(source)) fail('Use a ternary to choose the text.');
        },
      },
      {
        name: '<Cart items={0} /> renders nothing at all (returns null)',
        run: async ({ exports, render, h, source, expect, fail }) => {
          const c = await render(h(fn(exports, 'Cart'), { items: 0 }));
          expect(c.innerHTML, 'the rendered HTML').toBe('');
          if (!/return\s+null/.test(source)) fail('Return `null` when the cart is empty.');
        },
      },
      {
        name: '<Cart items={2} /> says "2 items in cart"',
        run: async ({ exports, render, h, text, expect }) => {
          const c = await render(h(fn(exports, 'Cart'), { items: 2 }));
          expect(text(c), 'the rendered text').toBe('2 items in cart');
        },
      },
    ],
  },

  // ---------------- Unit 3 ----------------
  events: {
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
        name: 'Typing in the input logs what was typed (e.target.value)',
        run: async ({ render, $, type, logs, expect, fail }) => {
          const c = await render();
          const input = $('input', c);
          if (!input) fail('No <input> was rendered.');
          const before = logs.length;
          await type(input, 'abc');
          expect(logs.slice(before), 'logs after typing').toEqual(['abc']);
        },
      },
      {
        name: 'Clicking "Greet" calls greet("Ada"), which logs "Hello, Ada"',
        run: async ({ render, button, click, logs, source, expect, fail }) => {
          const c = await render();
          const before = logs.length;
          await click(button('Greet', c));
          expect(logs.slice(before), 'logs after clicking').toEqual(['Hello, Ada']);
          if (!/=>\s*greet\(/.test(source)) fail('Pass an argument by wrapping the call: onClick={() => greet("Ada")}');
        },
      },
    ],
  },
  'use-state': {
    tests: [
      {
        name: 'Starts with a "Like" button and the text "Not liked"',
        run: async ({ render, $, text, expect }) => {
          const c = await render();
          expect(text($('button', c)), 'the button').toBe('Like');
          expect(text($('p', c)), 'the <p>').toBe('Not liked');
        },
      },
      {
        name: 'Clicking toggles to "Unlike" / "Liked" and back',
        run: async ({ render, $, text, click, expect }) => {
          const c = await render();
          await click($('button', c));
          expect(text($('button', c)), 'the button after one click').toBe('Unlike');
          expect(text($('p', c)), 'the <p> after one click').toBe('Liked');
          await click($('button', c));
          expect(text($('button', c)), 'the button after two clicks').toBe('Like');
          expect(text($('p', c)), 'the <p> after two clicks').toBe('Not liked');
        },
      },
      {
        name: 'Stores a boolean with useState(false)',
        run: ({ source, fail }) => {
          if (!/useState\(\s*false\s*\)/.test(source)) fail('Store whether it is liked with useState(false).');
        },
      },
    ],
  },
  forms: {
    tests: [
      {
        name: 'Starts with "0 / 50" in .count',
        run: async ({ render, $, text, expect }) => {
          const c = await render();
          expect(text($('.count', c)), 'the .count text').toBe('0 / 50');
        },
      },
      {
        name: 'Typing "hello" into the <textarea> shows "5 / 50"',
        run: async ({ render, $, text, type, source, expect, fail }) => {
          const c = await render();
          const area = $('textarea', c);
          if (!area) fail('No <textarea> was rendered.');
          await type(area, 'hello');
          expect(text($('.count', c)), 'the .count text').toBe('5 / 50');
          if (!/value=\{/.test(source)) fail('Make the textarea controlled with value={text}.');
        },
      },
      {
        name: 'Shows <p className="warning">Too long!</p> only past 50 characters',
        run: async ({ render, $, text, type, expect }) => {
          const c = await render();
          await type($('textarea', c), 'x'.repeat(50));
          expect($('.warning', c), 'a warning at exactly 50').toBeFalsy();
          await type($('textarea', c), 'x'.repeat(51));
          expect(text($('.warning', c)), 'the warning at 51').toBe('Too long!');
        },
      },
    ],
  },
  'state-arrays': {
    tests: [
      {
        name: 'Shows the 3 items, none crossed out',
        run: async ({ render, $$, text, expect }) => {
          const c = await render();
          const items = $$('li', c);
          expect(items, 'the list items').toHaveLength(3);
          expect(items.map((li) => text(li).replace(/\s*Toggle$/, '')), 'the item names').toEqual(['Milk', 'Eggs', 'Bread']);
          expect($$('li.done', c), 'done items').toHaveLength(0);
        },
      },
      {
        name: '"Toggle" flips an item\'s className "done" on and off',
        run: async ({ render, $$, button, click, expect }) => {
          const c = await render();
          await click(button('Toggle', $$('li', c)[0]));
          expect($$('li', c)[0].classList.contains('done'), 'Milk is done').toBe(true);
          expect($$('li.done', c), 'done items').toHaveLength(1);
          await click(button('Toggle', $$('li', c)[0]));
          expect($$('li.done', c), 'done items after toggling back').toHaveLength(0);
        },
      },
      {
        name: '"Clear done" removes the finished items',
        run: async ({ render, $$, button, click, text, expect }) => {
          const c = await render();
          await click(button('Toggle', $$('li', c)[0]));
          await click(button('Toggle', $$('li', c)[2]));
          await click(button('Clear done', c));
          const items = $$('li', c);
          expect(items, 'the list items').toHaveLength(1);
          expect(text(items[0]), 'the remaining item').toContain('Eggs');
        },
      },
      {
        name: 'Updates with .map() and .filter(), never mutating',
        run: ({ source, fail }) => {
          if (/\.(push|splice|pop|shift|unshift)\(/.test(source) || /\.done\s*=[^=]/.test(source)) fail('Found a mutation. Build new arrays/objects with `.map()`, `.filter()` and spread instead.');
          if (!source.includes('.map(') || !source.includes('.filter(')) fail('Use `.map()` to toggle and `.filter()` to clear.');
        },
      },
    ],
  },
  'lifting-state': {
    expose: ['Display', 'Controls'],
    tests: [
      {
        name: '<Display count={7} /> renders "Count: 7"',
        run: async ({ exports, render, h, text, expect }) => {
          const c = await render(h(fn(exports, 'Display'), { count: 7 }));
          expect(text(c), 'the rendered text').toBe('Count: 7');
        },
      },
      {
        name: 'Controls calls onIncrement and onReset from its props',
        run: async ({ exports, render, h, button, click, expect }) => {
          const calls = [];
          const c = await render(h(fn(exports, 'Controls'), { onIncrement: () => calls.push('inc'), onReset: () => calls.push('reset') }));
          await click(button('+1', c));
          await click(button('Reset', c));
          expect(calls, 'the callbacks that were called').toEqual(['inc', 'reset']);
        },
      },
      {
        name: 'App wires them together: +1 twice shows "Count: 2", Reset shows "Count: 0"',
        run: async ({ render, $, text, button, click, expect }) => {
          const c = await render();
          await click(button('+1', c));
          await click(button('+1', c));
          expect(text($('p', c)), 'after +1 twice').toBe('Count: 2');
          await click(button('Reset', c));
          expect(text($('p', c)), 'after Reset').toBe('Count: 0');
        },
      },
      {
        name: 'Only App has state (exactly one useState)',
        run: ({ source, fail }) => {
          const n = (source.match(/useState\(/g) || []).length;
          if (n !== 1) fail(`Found ${n} useState calls. Keep the count in App only, and pass it down as props.`);
        },
      },
    ],
  },

  // ---------------- Unit 4 ----------------
  'use-effect': {
    tests: [
      {
        name: 'Starts with the note saved in localStorage',
        run: async ({ render, $, expect }) => {
          localStorage.setItem('note', 'hello there');
          try {
            const c = await render();
            expect($('textarea', c)?.value, 'the textarea').toBe('hello there');
          } finally {
            localStorage.removeItem('note');
          }
        },
      },
      {
        name: 'Starts empty when nothing is saved',
        run: async ({ render, $, expect }) => {
          localStorage.removeItem('note');
          const c = await render();
          expect($('textarea', c)?.value, 'the textarea').toBe('');
        },
      },
      {
        name: 'Typing saves the note to localStorage',
        run: async ({ render, $, type, expect }) => {
          localStorage.removeItem('note');
          try {
            const c = await render();
            await type($('textarea', c), 'buy milk');
            expect(localStorage.getItem('note'), 'localStorage "note"').toBe('buy milk');
          } finally {
            localStorage.removeItem('note');
          }
        },
      },
      {
        name: 'Saves inside useEffect',
        run: ({ source, fail }) => {
          if (!source.includes('useEffect(')) fail('Do the saving inside useEffect(() => { ... }, [text]).');
        },
      },
    ],
  },
  'fetching-data': {
    tests: [
      {
        name: 'Shows "Loading..." while waiting',
        run: async ({ render, text, expect }) => {
          const c = await render();
          expect(text(c), 'the first render').toContain('Loading...');
        },
      },
      {
        name: 'Then lists each todo title, with className "done" on finished ones',
        run: async ({ render, $$, text, wait, expect }) => {
          const c = await render();
          await wait(600);
          expect($$('li', c).map(text), 'the list items').toEqual(['Learn JavaScript', 'Learn React', 'Build something cool']);
          expect($$('li.done', c).map(text), 'the done items').toEqual(['Learn JavaScript']);
        },
      },
      {
        name: 'Fetches https://api.example.com/todos inside useEffect',
        run: ({ source, fail }) => {
          if (!source.includes('useEffect(')) fail('Fetch inside useEffect.');
          if (!source.includes('api.example.com/todos')) fail('Fetch from https://api.example.com/todos');
        },
      },
    ],
  },
  'custom-hooks': {
    expose: ['useCounter'],
    tests: [
      {
        name: 'useCounter() starts at 0; increment and decrement change it by 1',
        run: async ({ exports, render, h, button, click, $, text, expect }) => {
          const useCounter = fn(exports, 'useCounter');
          function Probe() {
            const { count, increment, decrement } = useCounter() || {};
            return h('div', null, h('output', null, String(count)), h('button', { onClick: increment }, 'inc'), h('button', { onClick: decrement }, 'dec'));
          }
          const c = await render(h(Probe));
          expect(text($('output', c)), 'the starting count').toBe('0');
          await click(button('inc', c));
          await click(button('inc', c));
          expect(text($('output', c)), 'after two increments').toBe('2');
          await click(button('dec', c));
          expect(text($('output', c)), 'after a decrement').toBe('1');
        },
      },
      {
        name: 'useCounter(10, 5) counts by 5, and reset() goes back to 10',
        run: async ({ exports, render, h, button, click, $, text, expect }) => {
          const useCounter = fn(exports, 'useCounter');
          function Probe() {
            const { count, increment, reset } = useCounter(10, 5) || {};
            return h('div', null, h('output', null, String(count)), h('button', { onClick: increment }, 'inc'), h('button', { onClick: reset }, 'reset'));
          }
          const c = await render(h(Probe));
          await click(button('inc', c));
          expect(text($('output', c)), 'after one increment').toBe('15');
          await click(button('reset', c));
          expect(text($('output', c)), 'after reset').toBe('10');
        },
      },
      {
        name: 'App shows two independent .counter boxes',
        run: async ({ render, $$, button, click, text, expect, fail }) => {
          const c = await render();
          const boxes = $$('.counter', c);
          if (boxes.length !== 2) fail(`Expected 2 elements with className="counter", found ${boxes.length}.`);
          await click(button('+', boxes[0]));
          expect(text($$('.counter p', c)[0]), 'the first counter').toBe('1');
          expect(text($$('.counter p', c)[1]), 'the second counter').toBe('0');
        },
      },
    ],
  },
  'final-project': {
    tests: [
      {
        name: 'Starts on the first question with "Score: 0 / 0"',
        run: async ({ render, $, text, expect }) => {
          const c = await render();
          expect(text($('h2', c)), 'the <h2>').toBe(CARDS[0]);
          expect(text($('.score', c)), 'the .score text').toBe('Score: 0 / 0');
        },
      },
      {
        name: '"Got it" and "Missed it" both move on and update the score',
        run: async ({ render, $, text, button, click, expect }) => {
          const c = await render();
          await click(button('Got it', c));
          expect(text($('h2', c)), 'the <h2> after "Got it"').toBe(CARDS[1]);
          expect(text($('.score', c)), 'the score').toBe('Score: 1 / 1');
          await click(button('Missed it', c));
          expect(text($('h2', c)), 'the <h2> after "Missed it"').toBe(CARDS[2]);
          expect(text($('.score', c)), 'the score').toBe('Score: 1 / 2');
        },
      },
      {
        name: 'After the last card, shows "Finished! You got 2 of 3" instead of a question',
        run: async ({ render, $, text, button, click, expect }) => {
          const c = await render();
          await click(button('Got it', c));
          await click(button('Missed it', c));
          await click(button('Got it', c));
          expect(text($('.done', c)), 'the .done text').toBe('Finished! You got 2 of 3');
          expect($('h2', c), 'a question <h2> after finishing').toBeFalsy();
        },
      },
    ],
  },
};
