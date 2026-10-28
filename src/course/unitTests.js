// End-of-unit tests: open-ended programs written from (almost) scratch.
// Each test name is a requirement the student's program must meet; they are
// shown as a checklist in the assignment. No hints, and the sample solution
// only unlocks once every requirement passes.

const fn = (exports, name) => {
  if (typeof exports[name] !== 'function') throw new Error(`Could not find a function named \`${name}\`. Check the spelling (names are case-sensitive).`);
  return exports[name];
};

const noVar = {
  name: 'Uses `const` / `let`, never `var`',
  run: ({ source, fail }) => {
    if (/\bvar\s/.test(source)) fail('Found `var`. Use `const` (or `let` if the value changes).');
  },
};

const STUDENTS = [
  { name: 'Ada', scores: [95, 90, 98] },
  { name: 'Grace', scores: [88, 92, 79] },
  { name: 'Linus', scores: [72, 65, 70] },
  { name: 'Guido', scores: [100, 85, 91] },
];
const copy = (x) => JSON.parse(JSON.stringify(x));

// ---- Unit 3 helpers: find the expense tracker's inputs ----
function expenseInputs({ $, fail }, c) {
  const desc = $('input[placeholder="Description"]', c);
  const amount = $('input[placeholder="Amount"]', c);
  if (!desc) fail('Could not find an <input> with placeholder="Description".');
  if (!amount) fail('Could not find an <input> with placeholder="Amount".');
  return { desc, amount };
}
async function addExpense(t, c, description, amount) {
  const { desc, amount: amt } = expenseInputs(t, c);
  await t.type(desc, description);
  await t.type(amt, amount);
  await t.click(t.button('Add', c));
}
const totalText = (t, c) => {
  const el = t.$('.total', c);
  if (!el) t.fail('Could not find an element with className="total".');
  return t.text(el);
};

// ---- Unit 4 helper: render useFetch inside a tiny probe component ----
function probe({ exports, h }, url) {
  const useFetch = fn(exports, 'useFetch');
  return function Probe() {
    const result = useFetch(url) || {};
    const { data, loading, error } = result;
    return h('output', null, `${loading ? 'loading' : 'done'}|${Array.isArray(data) ? data.length : data ? 'object' : 'none'}|${error ? 'error' : 'ok'}`);
  };
}

export const unitTests = {
  js: {
    id: 'test-js',
    title: 'Unit Test: Gradebook',
    kind: 'js',
    assessment: true,
    expose: ['average', 'letterGrade', 'report', 'honorRoll'],
    tests: [
      {
        name: '`average(nums)` returns the mean, and `0` for an empty array',
        run: ({ exports, expect }) => {
          const average = fn(exports, 'average');
          expect(average([90, 80, 100]), 'average([90, 80, 100])').toBe(90);
          expect(average([1, 2]), 'average([1, 2])').toBe(1.5);
          expect(average([]), 'average([])').toBe(0);
        },
      },
      {
        name: '`letterGrade(avg)` returns A (90+), B (80+), C (70+), D (60+) or F',
        run: ({ exports, expect }) => {
          const letterGrade = fn(exports, 'letterGrade');
          const cases = [[90, 'A'], [89, 'B'], [80, 'B'], [79, 'C'], [70, 'C'], [69, 'D'], [60, 'D'], [59, 'F'], [0, 'F']];
          for (const [score, letter] of cases) expect(letterGrade(score), `letterGrade(${score})`).toBe(letter);
        },
      },
      {
        name: '`report(students)` returns lines like `"Ada: 94 (A)"` (average rounded to a whole number)',
        run: ({ exports, expect }) => {
          const report = fn(exports, 'report');
          expect(report(copy(STUDENTS)), 'report(students)').toEqual(['Ada: 94 (A)', 'Grace: 86 (B)', 'Linus: 69 (D)', 'Guido: 92 (A)']);
          expect(report([{ name: 'Zoe', scores: [50, 61] }]), 'report([{ name: "Zoe", scores: [50, 61] }])').toEqual(['Zoe: 56 (F)']);
        },
      },
      {
        name: '`honorRoll(students)` returns the names of students averaging 90 or more',
        run: ({ exports, expect }) => {
          const honorRoll = fn(exports, 'honorRoll');
          expect(honorRoll(copy(STUDENTS)), 'honorRoll(students)').toEqual(['Ada', 'Guido']);
          expect(honorRoll([{ name: 'Sam', scores: [70] }]), 'honorRoll with nobody on it').toEqual([]);
        },
      },
      {
        name: 'Uses `.map()` and `.filter()` (no manual loops needed for report/honorRoll)',
        run: ({ source, fail }) => {
          if (!source.includes('.map(')) fail('Use `.map()` somewhere, for example to build the report lines.');
          if (!source.includes('.filter(')) fail('Use `.filter()` somewhere, for example to pick the honor roll.');
        },
      },
      {
        name: 'Does not modify the `students` data',
        run: ({ exports, expect }) => {
          const data = copy(STUDENTS);
          fn(exports, 'report')(data);
          fn(exports, 'honorRoll')(data);
          expect(data, 'the students array after calling your functions').toEqual(STUDENTS);
        },
      },
      {
        name: 'Logs every report line with `console.log`',
        run: ({ logs, expect }) => {
          for (const line of ['Ada: 94 (A)', 'Grace: 86 (B)', 'Linus: 69 (D)', 'Guido: 92 (A)']) expect(logs, 'your console output').toContain(line);
        },
      },
      noVar,
    ],
  },

  react: {
    id: 'test-react',
    title: 'Unit Test: Product Catalog',
    kind: 'react',
    assessment: true,
    expose: ['ProductCard', 'ProductList'],
    tests: [
      {
        name: '`ProductCard` shows the name in an `<h3>` and the price as `$30` in `.price`',
        run: async ({ exports, render, h, $, text, expect, fail }) => {
          const c = await render(h(fn(exports, 'ProductCard'), { product: { id: 9, name: 'Lamp', price: 30, inStock: true } }));
          if (!$('.product', c)) fail('ProductCard should render an element with className="product".');
          expect(text($('.product h3', c)), 'the <h3> text').toBe('Lamp');
          expect(text($('.product .price', c)), 'the .price text').toBe('$30');
        },
      },
      {
        name: '`ProductCard` shows `<span className="sold-out">Sold out</span>` only when out of stock',
        run: async ({ exports, render, h, $, text, expect }) => {
          const Card = fn(exports, 'ProductCard');
          const inStock = await render(h(Card, { product: { id: 1, name: 'A', price: 1, inStock: true } }));
          expect($('.sold-out', inStock), 'a .sold-out label on an in-stock product').toBeFalsy();
          const soldOut = await render(h(Card, { product: { id: 2, name: 'B', price: 1, inStock: false } }));
          expect(text($('.sold-out', soldOut)), 'the .sold-out text').toBe('Sold out');
        },
      },
      {
        name: '`ProductList` renders one `ProductCard` per product',
        run: async ({ exports, render, h, $$, text, expect }) => {
          const products = [
            { id: 1, name: 'Pen', price: 2, inStock: true },
            { id: 2, name: 'Ink', price: 5, inStock: false },
          ];
          const c = await render(h(fn(exports, 'ProductList'), { products }));
          expect($$('.product h3', c).map(text), 'the product names').toEqual(['Pen', 'Ink']);
        },
      },
      {
        name: '`ProductList` shows `No products found` when the list is empty',
        run: async ({ exports, render, h, $$, text, expect }) => {
          const c = await render(h(fn(exports, 'ProductList'), { products: [] }));
          expect(text(c), 'the rendered text').toContain('No products found');
          expect($$('.product', c), 'product cards').toHaveLength(0);
        },
      },
      {
        name: '`App` shows an `<h1>Shop</h1>` and all 4 products',
        run: async ({ render, $, $$, text, expect }) => {
          const c = await render();
          expect(text($('h1', c)), 'the <h1>').toBe('Shop');
          expect($$('.product', c), 'product cards').toHaveLength(4);
        },
      },
      {
        name: '`App` shows `<p className="summary">3 of 4 in stock</p>`, calculated from the data',
        run: async ({ render, $, text, source, expect, fail }) => {
          const c = await render();
          expect(text($('.summary', c)), 'the .summary text').toBe('3 of 4 in stock');
          if (/3 of 4/.test(source)) fail('Calculate the numbers from the products array instead of typing "3 of 4".');
        },
      },
      {
        name: 'Uses `.map()` with a `key` and `className` (not `class`)',
        run: ({ source, fail }) => {
          if (!source.includes('.map(')) fail('Render the list with `.map()`.');
          if (!/key=\{/.test(source)) fail('Give each item in the list a `key` prop.');
          if (/\sclass=/.test(source)) fail('Use `className`, not `class`.');
        },
      },
    ],
  },

  state: {
    id: 'test-state',
    title: 'Unit Test: Expense Tracker',
    kind: 'react',
    assessment: true,
    tests: [
      {
        name: 'Starts with `Total: $0` in `.total` and no expenses',
        run: async (t) => {
          const c = await t.render();
          expenseInputs(t, c);
          t.expect(totalText(t, c), 'the .total text').toBe('Total: $0');
          t.expect(t.$$('li', c), 'the list items').toHaveLength(0);
        },
      },
      {
        name: 'Adding "Coffee" / 4 shows an `<li>` with `Coffee: $4` and clears both inputs',
        run: async (t) => {
          const c = await t.render();
          await addExpense(t, c, 'Coffee', '4');
          const items = t.$$('li', c);
          t.expect(items, 'the list items').toHaveLength(1);
          t.expect(t.text(items[0]), 'the first item').toContain('Coffee: $4');
          const { desc, amount } = expenseInputs(t, c);
          t.expect(desc.value, 'the Description input after adding').toBe('');
          t.expect(amount.value, 'the Amount input after adding').toBe('');
        },
      },
      {
        name: 'The total adds up every expense (4 + 10 = `Total: $14`)',
        run: async (t) => {
          const c = await t.render();
          await addExpense(t, c, 'Coffee', '4');
          await addExpense(t, c, 'Lunch', '10');
          t.expect(t.$$('li', c), 'the list items').toHaveLength(2);
          t.expect(totalText(t, c), 'the .total text').toBe('Total: $14');
        },
      },
      {
        name: 'Ignores a blank description, and amounts that are empty, zero or negative',
        run: async (t) => {
          const c = await t.render();
          await addExpense(t, c, '   ', '5');
          await addExpense(t, c, 'Free thing', '0');
          await addExpense(t, c, 'Refund', '-3');
          await addExpense(t, c, 'Nothing', '');
          t.expect(t.$$('li', c), 'the list items').toHaveLength(0);
          t.expect(totalText(t, c), 'the .total text').toBe('Total: $0');
        },
      },
      {
        name: 'Each expense has a `Delete` button that removes it and updates the total',
        run: async (t) => {
          const c = await t.render();
          await addExpense(t, c, 'Coffee', '4');
          await addExpense(t, c, 'Lunch', '10');
          await t.click(t.button('Delete', t.$$('li', c)[0]));
          const items = t.$$('li', c);
          t.expect(items, 'the list items').toHaveLength(1);
          t.expect(t.text(items[0]), 'the remaining item').toContain('Lunch: $10');
          t.expect(totalText(t, c), 'the .total text').toBe('Total: $10');
        },
      },
      {
        name: 'Uses `useState` and never mutates state (no `.push`, `.splice`, `.pop`)',
        run: ({ source, fail }) => {
          if (!source.includes('useState(')) fail('Keep the expenses and inputs in state with `useState`.');
          if (/\.(push|splice|pop|shift|unshift)\(/.test(source)) fail('Found a mutating array method. Build a new array with spread `[...]` or `.filter()` instead.');
        },
      },
    ],
  },

  effects: {
    id: 'test-effects',
    title: 'Unit Test: User Directory',
    kind: 'react',
    assessment: true,
    expose: ['useFetch'],
    tests: [
      {
        name: '`useFetch(url)` returns `{ data, loading, error }` and loads the data',
        run: async (t) => {
          const c = await t.render(t.h(probe(t, 'https://api.example.com/users')));
          t.expect(t.text(c), 'useFetch right away (loading|data|error)').toBe('loading|none|ok');
          await t.wait(600);
          t.expect(t.text(c), 'useFetch after loading (loading|data|error)').toBe('done|3|ok');
        },
      },
      {
        name: '`useFetch` sets `error` (and stops loading) when the server responds with an error',
        run: async (t) => {
          const c = await t.render(t.h(probe(t, 'https://api.example.com/error')));
          await t.wait(600);
          t.expect(t.text(c), 'useFetch for /error (loading|data|error)').toBe('done|none|error');
        },
      },
      {
        name: '`App` shows `Loading...`, then one `<li>` per user name',
        run: async ({ render, $$, text, wait, expect }) => {
          const c = await render();
          expect(text(c), 'the first render').toContain('Loading...');
          await wait(600);
          expect($$('li', c).map(text), 'the list items').toEqual(['Ada Lovelace', 'Grace Hopper', 'Guido van Rossum']);
        },
      },
      {
        name: 'Typing in the `Search` input filters names (ignoring upper/lower case)',
        run: async ({ render, $, $$, text, type, wait, expect, fail }) => {
          const c = await render();
          await wait(600);
          const search = $('input[placeholder="Search"]', c);
          if (!search) fail('Could not find an <input> with placeholder="Search".');
          await type(search, 'gr');
          expect($$('li', c).map(text), 'results for "gr"').toEqual(['Grace Hopper']);
          await type(search, 'ADA');
          expect($$('li', c).map(text), 'results for "ADA"').toEqual(['Ada Lovelace']);
          await type(search, '');
          expect($$('li', c), 'results for an empty search').toHaveLength(3);
        },
      },
      {
        name: 'Shows `No users match` when nothing matches the search',
        run: async ({ render, $, $$, text, type, wait, expect }) => {
          const c = await render();
          await wait(600);
          await type($('input[placeholder="Search"]', c), 'zzz');
          expect($$('li', c), 'the list items').toHaveLength(0);
          expect(text(c), 'the rendered text').toContain('No users match');
        },
      },
      {
        name: '`App` gets its data from your `useFetch` hook, which uses `useEffect`',
        run: ({ source, fail }) => {
          if ((source.match(/useFetch\(/g) || []).length < 2) fail('Define `useFetch` and call it from `App`.');
          if (!source.includes('useEffect(')) fail('`useFetch` should start the request inside `useEffect`.');
        },
      },
    ],
  },
};
