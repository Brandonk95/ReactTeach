// A fake REST API so data-fetching lessons work offline and give predictable results.
const API = 'https://api.example.com';

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com' },
  { id: 3, name: 'Guido van Rossum', email: 'guido@example.com' },
];

const todos = [
  { id: 1, title: 'Learn JavaScript', done: true },
  { id: 2, title: 'Learn React', done: false },
  { id: 3, title: 'Build something cool', done: false },
];

function route(path) {
  if (path === '/users') return [200, users];
  const m = /^\/users\/(\d+)$/.exec(path);
  if (m) {
    const user = users.find((u) => u.id === Number(m[1]));
    return user ? [200, user] : [404, { error: 'User not found' }];
  }
  if (path === '/todos') return [200, todos];
  if (path === '/error') return [500, { error: 'Something went wrong on the server' }];
  return [404, { error: `No route for ${path}` }];
}

export function installMockApi() {
  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.url;
    if (!url.startsWith(API)) return realFetch(input, init);
    await new Promise((r) => setTimeout(r, 250));
    const [status, body] = route(new URL(url).pathname.replace(/\/$/, ''));
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  };
}
