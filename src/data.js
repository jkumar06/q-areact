// All interview Q&A data
// tags: used for keyword matching (e.g. searching "hooks" matches tag "hooks")

export const QA_DATA = [
  // ── REACT / HOOKS ──────────────────────────────────────────────────────
  {
    id: 1,
    tags: ['react', 'hooks', 'usestate', 'state'],
    question: 'What is useState in React and how does it work?',
    answer: `useState is a React Hook that adds state to functional components.

It returns an array with two items: the current state value, and a setter function that triggers a re-render when called.

\`\`\`jsx
const [count, setCount] = useState(0);

// Reading state
<p>{count}</p>

// Updating state
<button onClick={() => setCount(count + 1)}>+1</button>

// Functional update (when new state depends on old)
<button onClick={() => setCount(prev => prev + 1)}>+1 safe</button>
\`\`\`

Key rules:
- State updates are asynchronous and batched
- Never mutate state directly — always use the setter
- For objects/arrays, spread into a new value: setUser({ ...user, name: 'Ali' })`
  },
  {
    id: 2,
    tags: ['react', 'hooks', 'useeffect', 'lifecycle', 'side effects'],
    question: 'What is useEffect and how does it replace lifecycle methods?',
    answer: `useEffect runs side effects after render. It replaces componentDidMount, componentDidUpdate, and componentWillUnmount from class components.

\`\`\`jsx
// Runs after every render
useEffect(() => { console.log('rendered') });

// Runs once on mount (empty deps array)
useEffect(() => {
  fetchData();
}, []);

// Runs when 'id' changes
useEffect(() => {
  fetchUser(id);
}, [id]);

// Cleanup (like componentWillUnmount)
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // cleanup
}, []);
\`\`\`

Always include all values used inside useEffect in the dependency array. Use the eslint-plugin-react-hooks to catch missing deps.`
  },
  {
    id: 3,
    tags: ['react', 'hooks', 'uselayouteffect', 'useeffect', 'dom'],
    question: 'What is the difference between useEffect and useLayoutEffect?',
    answer: `Both run after render, but at different points in the browser paint cycle.

useEffect — fires asynchronously AFTER the browser has painted. Use for: data fetching, subscriptions, logging.

useLayoutEffect — fires synchronously BEFORE the browser paints. Use for: DOM measurements, preventing visual flicker.

\`\`\`jsx
useLayoutEffect(() => {
  // Measure DOM before paint — no flicker
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height);
}, []);
\`\`\`

Rule: start with useEffect. Only switch to useLayoutEffect when you see flickering caused by DOM reads/writes.`
  },
  {
    id: 4,
    tags: ['react', 'hooks', 'usereducer', 'state', 'reducer'],
    question: 'What is useReducer and when should you use it over useState?',
    answer: `useReducer manages complex state with a reducer function — the same pattern as Redux.

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return { count: 0 };
    default: throw new Error('Unknown action: ' + action.type);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
\`\`\`

Use useReducer over useState when:
- Multiple state values update together
- Next state depends on previous state in non-trivial ways
- You want transitions that are easy to test in isolation`
  },
  {
    id: 5,
    tags: ['react', 'hooks', 'usememo', 'usecallback', 'memo', 'performance'],
    question: 'Explain React.memo, useMemo, and useCallback.',
    answer: `All three are performance optimizations that prevent unnecessary work.

React.memo — wraps a component, skips re-render if props are shallowly equal.

\`\`\`jsx
const Child = React.memo(({ value }) => <div>{value}</div>);
\`\`\`

useMemo — memoizes a computed value. Recalculates only when deps change.

\`\`\`jsx
const sorted = useMemo(() => [...list].sort(), [list]);
\`\`\`

useCallback — memoizes a function reference. Stable ref across renders.

\`\`\`jsx
const handleClick = useCallback(() => doThing(id), [id]);
\`\`\`

Important: don't use these everywhere. They add overhead. Profile first with React DevTools, then optimize specific bottlenecks.`
  },
  {
    id: 6,
    tags: ['react', 'hooks', 'useref', 'ref', 'dom'],
    question: 'What is useRef and what are its use cases?',
    answer: `useRef returns a mutable object { current: value } that persists across renders without causing re-renders when changed.

Two main use cases:

1. DOM access
\`\`\`jsx
const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>
\`\`\`

2. Storing mutable values that shouldn't trigger re-render
\`\`\`jsx
const timerRef = useRef(null);

useEffect(() => {
  timerRef.current = setInterval(tick, 1000);
  return () => clearInterval(timerRef.current);
}, []);
\`\`\`

Key difference from useState: updating ref.current does NOT re-render the component.`
  },
  {
    id: 7,
    tags: ['react', 'hooks', 'usecontext', 'context', 'prop drilling'],
    question: 'What is useContext and how does it solve prop drilling?',
    answer: `useContext reads a value from React Context — letting you share data across the component tree without passing props at every level.

\`\`\`jsx
// 1. Create context
const ThemeContext = createContext('light');

// 2. Provide it high in the tree
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

// 3. Consume anywhere in the tree
function Button() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
\`\`\`

Context is good for: theme, locale, auth user, feature flags.
Not ideal for high-frequency updates — use Zustand or Redux for that.`
  },
  {
    id: 8,
    tags: ['react', 'hooks', 'custom hooks', 'usedebounce'],
    question: 'How do you build a custom hook? Example: useDebounce.',
    answer: `Custom hooks are regular functions that start with "use" and can call other hooks. They let you extract and reuse stateful logic.

\`\`\`jsx
// useDebounce.js
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // cancel on next keystroke
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// Usage in a search component
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input onChange={e => setQuery(e.target.value)} />;
}
\`\`\``
  },

  // ── JAVASCRIPT ─────────────────────────────────────────────────────────
  {
    id: 9,
    tags: ['javascript', 'debounce', 'throttle', 'performance'],
    question: 'What is debouncing in JavaScript?',
    answer: `Debouncing delays a function until a wait period has passed since the last call. It groups rapid calls into one.

\`\`\`js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  fetch('/api/search?q=' + query);
}, 300);
\`\`\`

Debounce vs Throttle:
- Debounce: fires AFTER inactivity. "Wait until they stop typing."
- Throttle: fires AT MOST once per interval. "Fire max once per 300ms."`
  },
  {
    id: 10,
    tags: ['javascript', 'promises', 'async', 'await', 'asynchronous'],
    question: 'What are Promises and how does async/await work?',
    answer: `A Promise represents an async operation that will eventually resolve or reject.

\`\`\`js
// Promise chain
fetch('/api/user')
  .then(res => res.json())
  .then(user => console.log(user))
  .catch(err => console.error(err));

// async/await — cleaner syntax, same result
async function getUser() {
  try {
    const res = await fetch('/api/user');
    const user = await res.json();
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}

// Parallel requests
const [user, posts] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
\`\`\``
  },
  {
    id: 11,
    tags: ['javascript', 'closure', 'scope'],
    question: 'What is a closure in JavaScript?',
    answer: `A closure is a function that "remembers" variables from its outer scope, even after the outer function has returned.

\`\`\`js
function makeCounter() {
  let count = 0; // this variable is "closed over"
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
\`\`\`

Closures are used for:
- Data privacy / encapsulation
- Factory functions
- Memoization
- Event handlers that remember context

In React: every function inside a component is a closure over props and state.`
  },
  {
    id: 12,
    tags: ['javascript', 'event loop', 'call stack', 'microtask', 'macrotask'],
    question: 'How does the JavaScript event loop work?',
    answer: `JavaScript is single-threaded. The event loop handles async operations without blocking.

Execution order:
1. Synchronous code runs on the Call Stack
2. Microtasks queue (Promises, queueMicrotask) — runs after each task, before painting
3. Macrotasks queue (setTimeout, setInterval, I/O) — runs one per loop tick

\`\`\`js
console.log('1 - sync');

setTimeout(() => console.log('3 - macrotask'), 0);

Promise.resolve().then(() => console.log('2 - microtask'));

console.log('4 - sync');

// Output: 1 → 4 → 2 → 3
\`\`\`

This is why: sync first, then microtasks (Promises), then macrotasks (setTimeout).`
  },

  // ── HTML ──────────────────────────────────────────────────────────────
  {
    id: 13,
    tags: ['html', 'semantic', 'accessibility', 'seo'],
    question: 'What is semantic HTML and why does it matter?',
    answer: `Semantic HTML uses elements that describe their content's meaning — not just how it looks.

\`\`\`html
<!-- Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main-content">...</div>

<!-- Semantic -->
<header>
  <nav>...</nav>
</header>
<main>...</main>
\`\`\`

Key semantic elements: header, nav, main, article, section, aside, footer, figure, time, mark.

Why it matters:
- Accessibility: screen readers announce structure correctly
- SEO: search engines understand content hierarchy
- Maintainability: code is self-documenting`
  },
  {
    id: 14,
    tags: ['html', 'forms', 'input', 'validation'],
    question: 'What are the key HTML form attributes for accessibility and validation?',
    answer: `\`\`\`html
<!-- Always link label to input -->
<label for="email">Email address</label>
<input
  id="email"
  type="email"
  name="email"
  required
  autocomplete="email"
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email.</span>

<!-- Fieldset groups related inputs -->
<fieldset>
  <legend>Shipping address</legend>
  <label for="city">City</label>
  <input id="city" type="text" />
</fieldset>
\`\`\`

Key attributes: required, pattern, minlength, maxlength, aria-describedby, aria-invalid, autocomplete.

Native validation is free accessibility — use it before reaching for JS validation.`
  },

  // ── CSS ───────────────────────────────────────────────────────────────
  {
    id: 15,
    tags: ['css', 'flexbox', 'grid', 'layout'],
    question: 'Flexbox vs CSS Grid — when to use each?',
    answer: `Flexbox is one-dimensional (row OR column). Grid is two-dimensional (rows AND columns).

\`\`\`css
/* Flexbox — distribute items along one axis */
.nav {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

/* Grid — two-dimensional layout */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Responsive card grid */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
\`\`\`

Use Flexbox for: nav bars, button groups, centering, one-axis distribution.
Use Grid for: page layouts, dashboards, any layout needing both axes.`
  },
  {
    id: 16,
    tags: ['css', 'specificity', 'cascade'],
    question: 'Explain CSS specificity.',
    answer: `Specificity determines which rule wins when multiple selectors target the same element. It's a 4-part score: (inline, ID, class/attr/pseudo, element).

\`\`\`css
p            { color: black; }  /* (0,0,0,1) */
.text        { color: blue;  }  /* (0,0,1,0) */
#title       { color: red;   }  /* (0,1,0,0) */
/* inline style="color:green"   (1,0,0,0)   */
\`\`\`

Higher specificity wins. When tied, last rule in source order wins.

!important overrides all specificity — avoid it. It breaks the cascade and makes debugging painful.

Best practice: keep specificity low and flat. Prefer class selectors. Avoid ID selectors for styling.`
  },

  // ── WEBPACK ───────────────────────────────────────────────────────────
  {
    id: 17,
    tags: ['webpack', 'bundler', 'build', 'vite'],
    question: 'What is Webpack and how does it differ from Vite?',
    answer: `Webpack is a module bundler — it takes all your source files (JS, CSS, images) and their dependency graph, then outputs one or more optimized bundles for the browser.

\`\`\`js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') },
  module: {
    rules: [
      { test: /\\.jsx?$/, use: 'babel-loader' },
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
};
\`\`\`

Vite vs Webpack:
- Vite uses native ES modules in dev — no bundling, instant HMR
- Webpack bundles everything in dev — slower startup on large apps
- Both use Rollup/esbuild for production builds
- Vite is faster for development; Webpack has more mature ecosystem and config options`
  },
  {
    id: 18,
    tags: ['webpack', 'tree shaking', 'dead code', 'bundle size'],
    question: 'What is tree shaking in Webpack?',
    answer: `Tree shaking removes unused exports from your bundle — dead code elimination.

\`\`\`js
// utils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b; // never imported → removed

// app.js — only 'add' ends up in the bundle
import { add } from './utils';
\`\`\`

Requirements:
1. Use ES module syntax (import/export) — not CommonJS require()
2. Set mode: 'production' in webpack config
3. Add "sideEffects": false in package.json

Also works in Vite automatically — Rollup (which Vite uses for prod builds) handles tree shaking natively.`
  },
  {
    id: 19,
    tags: ['webpack', 'code splitting', 'lazy loading', 'performance'],
    question: 'What is code splitting and lazy loading in Webpack?',
    answer: `Code splitting breaks your bundle into smaller chunks loaded on demand instead of one large file upfront.

\`\`\`js
// Dynamic import — webpack creates a separate chunk
button.addEventListener('click', async () => {
  const { default: Chart } = await import('./Chart');
  Chart.render();
});

// React.lazy + Suspense
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

Vendor chunk splitting (shared deps like React, lodash):
\`\`\`js
// vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: { vendor: ['react', 'react-dom'] }
    }
  }
}
\`\`\``
  },

  // ── ACCESSIBILITY ─────────────────────────────────────────────────────
  {
    id: 20,
    tags: ['accessibility', 'aria', 'screen reader', 'a11y'],
    question: 'What are ARIA roles and when should you use them?',
    answer: `ARIA (Accessible Rich Internet Applications) adds semantic meaning to elements that assistive technologies like screen readers can understand.

Golden rule: No ARIA is better than bad ARIA. Always use native HTML elements first.

\`\`\`html
<!-- Prefer native -->
<button>Submit</button>

<!-- ARIA only when native isn't possible -->
<div
  role="button"
  tabindex="0"
  aria-pressed="false"
  onclick="handleClick()"
  onkeydown="if(event.key==='Enter') handleClick()"
>
  Submit
</div>
\`\`\`

Common ARIA attributes:
- aria-label — names element (no visible text)
- aria-hidden="true" — hides from screen readers
- aria-live="polite" — announces dynamic updates
- aria-expanded — open/close state of accordions, menus
- aria-describedby — links extra description text`
  },
  {
    id: 21,
    tags: ['accessibility', 'keyboard', 'focus', 'tab', 'a11y'],
    question: 'How do you ensure keyboard accessibility?',
    answer: `All interactive elements must work without a mouse — required for motor disability users and power users.

Checklist:
- Logical tab order matching visual layout
- Visible focus indicator (never outline: none without replacement)
- Enter/Space activate buttons; arrow keys navigate menus
- Modals trap focus inside until closed
- Skip links let users jump past repeated navigation

\`\`\`css
/* Customize focus — never remove it */
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 3px;
  border-radius: 3px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
}
.skip-link:focus {
  top: 0;
}
\`\`\`

In React — manage focus manually when content changes:
\`\`\`jsx
const headingRef = useRef(null);
useEffect(() => { headingRef.current?.focus(); }, [route]);
\`\`\``
  },

  // ── SCENARIOS ─────────────────────────────────────────────────────────
  {
    id: 22,
    tags: ['scenario', 'performance', 'react', 'optimization'],
    question: 'Scenario: React app renders slowly. How do you diagnose and fix it?',
    answer: `Step 1: Profile with React DevTools Profiler
- Record an interaction, look at the flame graph
- Find components with the longest render bars
- Look for components re-rendering when they shouldn't

Step 2: Fix common causes
\`\`\`jsx
// Too many re-renders → React.memo
const Child = React.memo(({ items }) => <List items={items} />);

// New object on every render breaks memo → useMemo
const options = useMemo(() => ({ theme, lang }), [theme, lang]);

// 10,000 items in the DOM → virtualize
import { FixedSizeList } from 'react-window';
<FixedSizeList height={600} itemCount={items.length} itemSize={40}>
  {({ index, style }) => <Row style={style} item={items[index]} />}
</FixedSizeList>
\`\`\`

Step 3: Bundle size
\`\`\`js
// Lazy-load heavy routes
const Analytics = React.lazy(() => import('./Analytics'));

// Check bundle with
npx vite-bundle-visualizer
\`\`\``
  },
  {
    id: 23,
    tags: ['scenario', 'search', 'debounce', 'api', 'react'],
    question: 'Scenario: Build a debounced search that fetches from an API.',
    answer: `\`\`\`jsx
import { useState, useEffect, useRef } from 'react';

// Reusable custom hook
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function SearchBox() {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef              = useRef(null);
  const debouncedQuery        = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return; }

    // Cancel previous in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    fetch(\`/api/search?q=\${debouncedQuery}\`, {
      signal: abortRef.current.signal
    })
      .then(r => r.json())
      .then(data => { setResults(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading && <span>Searching...</span>}
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}
\`\`\``
  },
  {
    id: 24,
    tags: ['scenario', 'architecture', 'react', 'large scale', 'structure'],
    question: 'Scenario: Design a frontend architecture for a large React app.',
    answer: `Feature-based folder structure (scales to 50+ devs):

\`\`\`
src/
  features/
    auth/
      components/    LoginForm.jsx, AuthGuard.jsx
      hooks/         useAuth.js
      api/           authApi.js
      types/         auth.types.js
    dashboard/
    products/
  shared/
    ui/              Button, Input, Modal (design system)
    hooks/           useDebounce, useLocalStorage
    utils/           formatDate, cn
  store/             global state (Zustand or Redux Toolkit)
  app/               Router, App.jsx, providers
\`\`\`

State management layers:
- Server state → TanStack Query (cache, refetch, loading states)
- UI/client state → Zustand (simple) or Redux Toolkit (complex)
- Form state → React Hook Form

Quality gates:
\`\`\`
TypeScript strict mode
ESLint + Prettier → enforced via husky pre-commit
Storybook → isolated component dev + visual regression
Vitest + Testing Library → unit + integration tests
\`\`\``
  },
  {
    id: 25,
    tags: ['scenario', 'accessibility', 'audit', 'wcag', 'legacy'],
    question: 'Scenario: Make a legacy website accessible from scratch.',
    answer: `Phase 1: Audit
- Run axe DevTools, Lighthouse, WAVE — auto-catches 30–40% of issues
- Tab through every page manually — can you reach everything?
- Test with NVDA + Firefox or VoiceOver + Safari

Phase 2: Fix by priority (highest impact first)
\`\`\`html
<!-- 1. Images need alt text -->
<img src="chart.png" alt="Sales grew 40% in Q3 2024" />

<!-- 2. Inputs need labels -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- 3. Language declaration -->
<html lang="en">

<!-- 4. Logical heading order (never skip) -->
<h1>Page title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

<!-- 5. Color contrast: 4.5:1 minimum for body text -->
\`\`\`

Phase 3: Maintain
- Add axe-core to your CI pipeline to catch regressions
- Target WCAG 2.1 AA as the baseline standard`
  },
];
