// All interview Q&A data
// tags: used for keyword matching (e.g. searching "hooks" matches tag "hooks")
// experience: 'junior' (0-2 yrs), 'mid' (3-6 yrs), 'senior' (7+ yrs)

export const QA_DATA = [
  // ── REACT / HOOKS ──────────────────────────────────────────────────────
  {
    id: 1,
    experience: 'junior',
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
    experience: 'mid',
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
    experience: 'senior',
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
    experience: 'senior',
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
    experience: 'mid',
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
    experience: 'mid',
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
    experience: 'mid',
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
    experience: 'mid',
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
    experience: 'junior',
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
    experience: 'junior',
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
    experience: 'mid',
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
    experience: 'senior',
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
    experience: 'junior',
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
    experience: 'junior',
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
    experience: 'junior',
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
    experience: 'mid',
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
    experience: 'mid',
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
    experience: 'senior',
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
    experience: 'mid',
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
    experience: 'senior',
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
    experience: 'mid',
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
    experience: 'senior',
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
    experience: 'mid',
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
    experience: 'senior',
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
    experience: 'senior',
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

  // ── MORE ADVANCED TOPICS ────────────────────────────────────────────────
  {
    id: 26,
    experience: 'junior',
    tags: ['react', 'components', 'props', 'composition'],
    question: 'What is component composition and prop drilling in React?',
    answer: `Component composition is building UIs by combining smaller components together.

\`\`\`jsx
// Composition
function Page() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Main />
    </Layout>
  );
}

// Prop drilling — passing props through many levels
function Parent({ theme }) {
  return <Child theme={theme} />;
}

function Child({ theme }) {
  return <GrandChild theme={theme} />;
}

function GrandChild({ theme }) {
  return <div className={theme}>Content</div>;
}
\`\`\`

Problem with prop drilling:
- Hard to maintain — don't know which child needs which prop
- Refactoring breaks everything — adding/removing props affects all levels

Solution: Use Context or state management for shared data.`
  },
  {
    id: 27,
    experience: 'mid',
    tags: ['react', 'state', 'lifting state', 'patterns'],
    question: 'What is "lifting state up" in React?',
    answer: `Lifting state up means moving state from a child component to a common parent so multiple children can share it.

\`\`\`jsx
// Before — each input has its own state
function Input1() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// After — state in parent, passed to children
function Form() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  return (
    <>
      <input value={input1} onChange={e => setInput1(e.target.value)} />
      <input value={input2} onChange={e => setInput2(e.target.value)} />
      <p>{input1} {input2}</p>
    </>
  );
}
\`\`\`

When to lift state:
- Multiple components need the same state
- You need to sync values across siblings
- Parent needs to coordinate children behavior`
  },
  {
    id: 28,
    experience: 'mid',
    tags: ['javascript', 'dom', 'event handling', 'delegation'],
    question: 'What is event delegation and why use it?',
    answer: `Event delegation means attaching one listener to a parent instead of many listeners to children. The event bubbles up from the child that triggered it.

\`\`\`js
// Without delegation — listener on each button (inefficient)
buttons.forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// With delegation — one listener on parent (efficient)
parent.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    handleClick(e.target);
  }
});

// In React (it's automatic)
<ul onClick={e => {
  if (e.target.tagName === 'LI') handleItemClick(e.target);
}}>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
\`\`\`

Benefits:
- Fewer event listeners = lower memory usage
- Dynamically added children automatically work
- Cleaner code for lists with many items`
  },
  {
    id: 29,
    experience: 'senior',
    tags: ['react', 'performance', 'rendering', 'optimization'],
    question: 'Explain concurrent rendering and Suspense in React 18+.',
    answer: `Concurrent rendering lets React pause and resume rendering to keep the app responsive, even with heavy updates.

\`\`\`jsx
// Suspense + lazy loading
const HeavyComponent = React.lazy(() => import('./Heavy'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Transition — marks update as low priority
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [isPending, startTransition] = useTransition();

const handleSearch = (value) => {
  setQuery(value);
  startTransition(() => {
    // This heavy update won't block urgent updates
    setResults(expensiveSearch(value));
  });
};

return (
  <>
    <input onChange={e => handleSearch(e.target.value)} />
    {isPending && <span>Loading results...</span>}
  </>
);
\`\`\`

Key: React can interrupt lower-priority work for high-priority updates (like typing).`
  },
  {
    id: 30,
    experience: 'junior',
    tags: ['javascript', 'arrays', 'methods', 'map', 'filter', 'reduce'],
    question: 'Explain map, filter, and reduce array methods.',
    answer: `These are essential functional programming patterns for arrays.

\`\`\`js
const numbers = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — keep only matching elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce — combine into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Chaining them
const result = numbers
  .filter(n => n > 2)           // [3, 4, 5]
  .map(n => n * 2)              // [6, 8, 10]
  .reduce((sum, n) => sum + n); // 24
\`\`\`

Common patterns:
- Group objects: \`data.reduce((groups, item) => ({...groups, [item.category]: [...]}))\`
- Flatten nested arrays: \`nested.reduce((flat, arr) => flat.concat(arr))\`
- Count occurrences: \`.reduce((counts, item) => ({...counts, [item]: (counts[item] ?? 0) + 1}))\``
  },
  {
    id: 31,
    experience: 'mid',
    tags: ['javascript', 'operators', 'spread', 'destructuring'],
    question: 'What are spread operator and destructuring? How are they used?',
    answer: `Spread operator (...) expands iterables. Destructuring extracts values.

\`\`\`js
// Spread operator — unpacking
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];       // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };     // { a: 1, b: 2, c: 3 }

// Destructuring arrays
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Destructuring objects
const { name, age, ...other } = { name: 'Ali', age: 30, city: 'NYC', role: 'Dev' };
// name='Ali', age=30, other={ city, role }

// Rename properties
const { title: heading } = { title: 'My Page' };
// heading='My Page'

// Default values
const { count = 0 } = {};
// count=0
\`\`\`

Use cases:
- Immutably update arrays/objects
- Extract specific values from responses
- Pass arguments to functions
- Clone objects (shallow copy)`
  },
  {
    id: 32,
    experience: 'junior',
    tags: ['css', 'pseudo-classes', 'selectors', 'states'],
    question: 'What are CSS pseudo-classes and pseudo-elements?',
    answer: `Pseudo-classes select elements in a special state. Pseudo-elements style specific parts of an element.

\`\`\`css
/* Pseudo-classes — state selectors */
a:hover            { color: red; }         /* mouse over */
a:focus            { outline: 2px solid; } /* has focus */
input:checked      { margin: 10px; }       /* checkbox is checked */
li:first-child     { font-weight: bold; }  /* first child */
p:nth-child(3n+2)  { color: blue; }        /* pattern matching */
input:disabled     { opacity: 0.5; }       /* disabled input */

/* Pseudo-elements — style parts */
::before           { content: '✓'; }       /* insert before element */
::after            { content: ''; }        /* insert after element */
p::first-line      { font-weight: bold; }  /* first line of text */
p::first-letter    { font-size: 2em; }     /* first letter */
input::placeholder { color: gray; }        /* placeholder text */
\`\`\`

Key difference:
- Pseudo-class (:) — element in a state
- Pseudo-element (::) — part of an element (single colon works in browsers)`
  },
  {
    id: 33,
    experience: 'senior',
    tags: ['javascript', 'memory', 'garbage collection', 'performance'],
    question: 'What is memory leaking in JavaScript and how to prevent it?',
    answer: `Memory leak: allocated memory that's never freed, growing until performance degrades.

Common causes:

\`\`\`js
// 1. Detached DOM nodes
const div = document.querySelector('div');
div.remove();  // element removed from DOM
let ref = div; // but reference still held — memory not freed

// Fix: clear the reference
ref = null;

// 2. Accidental globals
function bad() {
  data = [1,2,3];  // creates global window.data
}

// Fix: use 'const' or 'let'
function good() {
  const data = [1,2,3];
}

// 3. Unreachable event listeners
button.addEventListener('click', () => console.log('clicked'));
button.remove();  // listener still in memory!

// Fix: remove listener before removing element
button.removeEventListener('click', handler);
button.remove();

// 4. setInterval without clearing
const timer = setInterval(() => doSomething(), 1000);
// if never cleared, runs forever

// Fix: clearInterval when done
clearInterval(timer);

// 5. React useEffect without cleanup
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);  // cleanup!
}, []);
\`\`\`

Prevention:
- Always clean up: event listeners, timers, subscriptions
- Remove circular references
- Nullify references to large objects when done
- Profile with Chrome DevTools Memory tab`
  },
  {
    id: 34,
    experience: 'mid',
    tags: ['react', 'forms', 'controlled components', 'validation'],
    question: 'What are controlled vs uncontrolled components in React forms?',
    answer: `Controlled component: value managed by React state.
Uncontrolled component: value managed by the DOM.

\`\`\`jsx
// Controlled — React controls the value
function ControlledForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

// Uncontrolled — DOM controls the value
function UncontrolledForm() {
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} />
      <button>Submit</button>
    </form>
  );
}
\`\`\`

When to use:
- Controlled: validation, conditional rendering, multiple field logic
- Uncontrolled: simple forms, file inputs, integration with non-React code`
  },
  {
    id: 35,
    experience: 'senior',
    tags: ['design patterns', 'singleton', 'factory', 'observer'],
    question: 'Explain common JavaScript design patterns.',
    answer: `Design patterns are reusable solutions to common problems.

\`\`\`js
// Singleton — one instance only
class Logger {
  static instance = null;
  static getInstance() {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
}
const log1 = Logger.getInstance();
const log2 = Logger.getInstance();
console.log(log1 === log2); // true

// Factory — create objects without specifying exact classes
function vehicleFactory(type) {
  if (type === 'car') return new Car();
  if (type === 'bike') return new Bike();
}
const myCar = vehicleFactory('car');

// Observer/Pub-Sub — notify multiple listeners of changes
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, fn) { this.events[event] = fn; }
  emit(event, data) { this.events[event]?.(data); }
}

// Module Pattern — encapsulation with closures
const Counter = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
})();
\`\`\`

Popular patterns:
- MVC/MVVM — architecture
- Observer — event systems
- Decorator — adding behavior
- Middleware — processing pipelines`
  },
  {
    id: 36,
    experience: 'junior',
    tags: ['react', 'testing', 'jest', 'react testing library'],
    question: 'How do you write tests for React components?',
    answer: `Use React Testing Library (RTL) and Jest. Test behavior, not implementation.

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  // Test rendering
  it('renders button with text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Test interaction
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test async
  it('displays data after fetching', async () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await screenWaitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
\`\`\`

Best practices:
- Query by role, label, or text (not by class/id)
- Test user behavior, not component state
- Avoid mocking unless necessary
- Keep tests independent`
  },
  {
    id: 37,
    experience: 'mid',
    tags: ['security', 'xss', 'csrf', 'attacks'],
    question: 'What is XSS and CSRF? How to prevent them?',
    answer: `XSS (Cross-Site Scripting): attacker injects malicious scripts.
CSRF (Cross-Site Request Forgery): attacker tricks user into unwanted actions.

XSS Prevention:

\`\`\`js
// Bad — renders user input as HTML
function Comment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

// Good — escapes HTML automatically
function Comment({ text }) {
  return <div>{text}</div>;  // React escapes by default
}

// Sanitize if you need HTML
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
\`\`\`

CSRF Prevention:

\`\`\`html
<!-- Server sends CSRF token -->
<form method="POST" action="/transfer">
  <input type="hidden" name="csrf" value="token_xyz" />
  <input type="number" name="amount" />
  <button>Transfer</button>
</form>

<!-- Server validates token on receive -->
\`\`\`

Rules:
- Never trust user input
- Always escape output
- Use Content Security Policy (CSP) headers
- Use same-site cookies: \`Set-Cookie: SameSite=Strict\`
- Validate requests with CSRF tokens`
  },
  {
    id: 38,
    experience: 'senior',
    tags: ['optimization', 'caching', 'cdn', 'performance'],
    question: 'How do caching and CDN improve performance?',
    answer: `Caching stores data locally to avoid repeated work. CDN distributes content globally.

Caching layers:

\`\`\`js
// Browser cache
// Headers control it
Cache-Control: max-age=3600  // cache for 1 hour
Cache-Control: no-cache       // always revalidate
Cache-Control: public         // can be cached everywhere

// In-memory cache (Node/React)
const cache = {};
function getData(id) {
  if (cache[id]) return cache[id];  // cache hit
  const data = expensiveOperation(id);
  cache[id] = data;
  return data;
}

// HTTP Cache-Control headers
ETag              // if unchanged, return 304 Not Modified
Last-Modified     // only fetch if modified
If-None-Match     // send ETag, server responds 304
\`\`\`

CDN (Content Delivery Network):

\`\`\`
User in Tokyo → CDN edge server in Tokyo (fast!)
↓ (not)
User in Tokyo → Main server in USA (slow)
\`\`\`

Popular CDNs: Cloudflare, AWS CloudFront, Fastly

Strategy:
- Static assets (JS, CSS, images) → CDN + long cache
- API responses → short cache or invalidate on demand
- HTML → don't cache (or very short)
- User-specific data → no cache`
  },
  {
    id: 39,
    experience: 'junior',
    tags: ['json', 'api', 'rest', 'http'],
    question: 'What is REST API and HTTP methods?',
    answer: `REST (Representational State Transfer) uses HTTP methods to operate on resources (URLs).

HTTP Methods:

\`\`\`js
// GET — retrieve (safe, idempotent)
GET /api/users/123
// Response: { id: 123, name: 'Ali' }

// POST — create (not safe, not idempotent)
POST /api/users
Body: { name: 'Bob' }
// Response: 201 Created, { id: 124, name: 'Bob' }

// PUT — replace entire resource (idempotent)
PUT /api/users/123
Body: { name: 'Albert', email: 'al@ex.com' }

// PATCH — partial update (not idempotent by default)
PATCH /api/users/123
Body: { name: 'Albert' }

// DELETE — remove (idempotent)
DELETE /api/users/123
// Response: 204 No Content
\`\`\`

Status codes:
- 2xx: Success (200 OK, 201 Created, 204 No Content)
- 3xx: Redirect (301 Permanent, 302 Temporary)
- 4xx: Client error (400 Bad Request, 404 Not Found, 401 Unauthorized)
- 5xx: Server error (500 Internal Server Error)

REST principles:
- Resources identified by URLs (/users, /users/123)
- Stateless — each request is independent
- Standard methods — GET, POST, PUT, DELETE`
  },
  {
    id: 40,
    experience: 'mid',
    tags: ['database', 'sql', 'nosql', 'comparison'],
    question: 'What\'s the difference between SQL and NoSQL databases?',
    answer: `SQL (Relational): structured tables with relationships.
NoSQL: flexible, unstructured data stores.

SQL:

\`\`\`sql
-- Structured schema
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- ACID transactions (Atomicity, Consistency, Isolation, Durability)
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Relationships
SELECT users.name, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id;
\`\`\`

NoSQL types:

\`\`\`js
// Document (MongoDB)
const user = { _id: 1, name: 'Ali', emails: ['a@ex.com', 'b@ex.com'] };

// Key-value (Redis)
SET user:1:name 'Ali'
GET user:1:name

// Graph (Neo4j)
(UserA)-[:FOLLOWS]->(UserB)

// Column-family (Cassandra)
user:1 | name: 'Ali' | email: 'a@ex.com'
\`\`\`

SQL pros: ACID, complex queries, structured data
SQL cons: rigid schema, scaling hard, slower writes

NoSQL pros: flexible, scales horizontally, fast writes
NoSQL cons: no ACID, eventual consistency, complex queries harder`
  },
  {
    id: 41,
    experience: 'mid',
    tags: ['nodejs', 'async', 'callbacks', 'promises'],
    question: 'Explain callbacks and the callback hell problem.',
    answer: `Callback: function passed to another to execute later (continuation).

Simple example:

\`\`\`js
function getData(callback) {
  setTimeout(() => callback(null, 'data'), 1000);
}

getData((err, data) => {
  console.log(data);
});
\`\`\`

Callback Hell (Pyramid of Doom):

\`\`\`js
getUser(userId, (err, user) => {
  if (err) console.error(err);
  else {
    getPosts(user.id, (err, posts) => {
      if (err) console.error(err);
      else {
        getComments(posts[0].id, (err, comments) => {
          if (err) console.error(err);
          else {
            console.log(comments);  // deeply nested!
          }
        });
      }
    });
  }
});
\`\`\`

Problems:
- Hard to read
- Error handling duplicated at each level
- Difficult to test
- Hard to debug (stack traces are misleading)

Solutions:

\`\`\`js
// Promises
getUser(userId)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));

// async/await
async function getAll() {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    console.log(comments);
  } catch (err) {
    console.error(err);
  }
}
\`\`\``
  },
  {
    id: 42,
    experience: 'senior',
    tags: ['architecture', 'microservices', 'monolith', 'scalability'],
    question: 'Monolith vs Microservices architecture — when to use each?',
    answer: `Monolith: single codebase, deployed together.
Microservices: independent services, deployed separately.

Monolith:

\`\`\`
Frontend → API Gateway → [All Business Logic] → Database
            (one deployment)
\`\`\`

Pros:
- Simpler to start
- Easier debugging (centralized logs)
- Atomic transactions
- Single database

Cons:
- Hard to scale specific features
- Tech stack locked in
- One bug can crash everything
- Large teams struggle with conflicts

Microservices:

\`\`\`
         ┌─ User Service → User DB
API → ├─ Order Service → Order DB
         └─ Payment Service → Payment DB
         (separate deployments)
\`\`\`

Pros:
- Scale individual services
- Choose best tech for each service
- Independent deployments
- Team autonomy

Cons:
- Distributed system complexity
- Eventual consistency (hard transactions)
- Network latency
- Monitoring is harder

When to use:
- Monolith: startups, simple apps, small teams
- Microservices: large apps, multiple teams, different scaling needs`
  },
  {
    id: 43,
    experience: 'junior',
    tags: ['git', 'version control', 'branching', 'merge'],
    question: 'What are Git branches and how do you use them?',
    answer: `Branch: independent line of development. Default is 'main'.

Common workflow:

\`\`\`bash
# Create a new branch
git branch feature/login
git checkout feature/login
# or in one command
git checkout -b feature/login

# Make changes
git add .
git commit -m 'add login form'

# Push to remote
git push origin feature/login

# Create pull request for review
# Once approved, merge via GitHub UI

# Delete the branch
git branch -d feature/login
git push origin --delete feature/login
\`\`\`

Branching strategies:

\`\`\`
Main branch model:
main (production) ← pull requests ← feature branches
                                   feature/login
                                   feature/register
\`\`\`

\`\`\`
Git Flow (for releases):
main (production)
  ↑
develop (staging)
  ↑
feature/*, bugfix/*, release/*, hotfix/*
\`\`\`

Best practices:
- Keep branches focused (one feature per branch)
- Branch name: feature/what-it-does
- Push frequently
- Delete merged branches
- Merge back to main before major commits`
  },
  {
    id: 44,
    experience: 'mid',
    tags: ['typescript', 'types', 'interfaces', 'generics'],
    question: 'What are TypeScript interfaces and generics?',
    answer: `Interface: defines shape of objects.
Generics: type-safe reusable templates.

Interfaces:

\`\`\`ts
interface User {
  id: number;
  name: string;
  email?: string;  // optional
  readonly createdAt: Date;
  (name: string): void;  // can define methods
}

const user: User = {
  id: 1,
  name: 'Ali',
  createdAt: new Date()
};

// Extending interfaces
interface Admin extends User {
  role: 'admin';
  canDelete: boolean;
}
\`\`\`

Generics:

\`\`\`ts
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

identity<string>('hello');
identity<number>(42);

// Generic class
class Container<T> {
  constructor(private value: T) {}
  getValue(): T { return this.value; }
}

const strContainer = new Container<string>('data');
const numContainer = new Container<number>(100);

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
\`\`\`

Use cases:
- Reusable components (generics)
- Type safety across modules (interfaces)
- API responses (interfaces)
- Collections/arrays (generics)`
  },
  {
    id: 45,
    experience: 'senior',
    tags: ['performance', 'profiling', 'monitoring', 'observability'],
    question: 'How do you monitor and optimize application performance?',
    answer: `Performance monitoring involves collecting metrics to identify bottlenecks.

Metrics:

\`\`\`js
// Core Web Vitals
- LCP (Largest Contentful Paint) — when biggest element renders
- FID (First Input Delay) — delay from user input to response
- CLS (Cumulative Layout Shift) — unexpected layout changes

// Field data (real users)
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.renderTime || entry.loadTime);
  }
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });

// Lab data (synthetic tests)
Lighthouse in DevTools
WebPageTest.org
\`\`\`

Optimization techniques:

\`\`\`
1. Code splitting — lazy load routes/components
2. Image optimization — WebP, responsive sizes
3. Caching — browser, CDN, API (Redis)
4. Tree shaking — remove unused code
5. Minification — reduce JS/CSS size
6. Compression — gzip, brotli
7. Reduce third-party scripts
8. Database query optimization
9. Use load balancing for APIs
10. Monitor with APM (Application Performance Monitoring)
\`\`\`

Tools:
- Chrome DevTools Performance tab
- Lighthouse
- WebPageTest
- New Relic, DataDog (APM)
- Sentry (error tracking)`
  },
  {
    id: 46,
    experience: 'mid',
    tags: ['http', 'cors', 'headers', 'security'],
    question: 'What is CORS and how does it work?',
    answer: `CORS (Cross-Origin Resource Sharing): mechanism to allow requests from different domains.

Problem:

\`\`\`
Frontend: https://example.com
API: https://api.example.com

Browser blocks: "blocked by CORS policy"
\`\`\`

Solution — Server sends CORS headers:

\`\`\`js
// Server (Express example)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Or use cors package
const cors = require('cors');
app.use(cors({
  origin: 'https://example.com',
  credentials: true
}));
\`\`\`

Preflight request:

\`\`\`js
// Browser automatically sends OPTIONS first
OPTIONS /api/data HTTP/1.1
Origin: https://example.com

// Server responds with CORS headers
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET,POST

// Only then browser allows actual request
POST /api/data
\`\`\`

Common headers:
- Access-Control-Allow-Origin: which domains allowed
- Access-Control-Allow-Methods: allowed HTTP methods
- Access-Control-Allow-Headers: allowed headers
- Access-Control-Max-Age: how long to cache preflight`
  },
  {
    id: 47,
    experience: 'junior',
    tags: ['regex', 'patterns', 'validation'],
    question: 'Basic regex patterns and validation.',
    answer: `Regex (Regular Expressions): pattern matching strings.

Common patterns:

\`\`\`js
const patterns = {
  email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
  phone: /^\\+?1?\\d{9,15}$/,
  url: /^https?:\\/\\/[^\\s]+$/,
  password: /^(?=.*[A-Z])(?=.*\\d)[\\w]{8,}$/,  // 8+ chars, 1 uppercase, 1 digit
  zipcode: /^\\d{5}(-\\d{4})?$/,
  username: /^[a-zA-Z0-9_]{3,16}$/
};

// Test
if (patterns.email.test('user@example.com')) {
  console.log('valid email');
}

// Match and extract
const url = 'https://example.com/path?id=123';
const match = url.match(/\\?id=(\\d+)/);
console.log(match[1]); // '123'

// Replace
'hello world'.replace(/world/, 'there');
// 'hello there'

// Split
'apple,banana,orange'.split(/,/);
// ['apple', 'banana', 'orange']
\`\`\`

Modifiers:
- i: case insensitive
- g: global (all matches)
- m: multiline

Common characters:
- . : any character
- \\d : digit
- \\w : word (letter/digit/underscore)
- \\s : whitespace
- ^ : start
- $ : end
- [...] : character set
- {n,m} : min n, max m repetitions`
  },
  {
    id: 48,
    experience: 'senior',
    tags: ['testing', 'tdd', 'coverage', 'ci', 'cd'],
    question: 'What is TDD, testing strategies, and CI/CD pipelines?',
    answer: `TDD (Test-Driven Development): write tests before code.

TDD cycle:

\`\`\`
1. Red: write failing test
2. Green: write code to pass test
3. Refactor: improve code while tests pass
(repeat)
\`\`\`

Example:

\`\`\`ts
// 1. Red — test fails
test('should double a number', () => {
  expect(double(5)).toBe(10);
});

// 2. Green — minimal code to pass
function double(n: number) {
  return n * 2;
}

// 3. Refactor
// (no changes needed for this one)
\`\`\`

Testing pyramid:

\`\`\`
        / \\ Unit (70%)
       /   \\
      /-----\\ Integration (20%)
     /       \\
    /         \\ E2E (10%)
   /-----------\\
\`\`\`

CI/CD Pipeline:

\`\`\`
1. Commit code
   ↓
2. Run tests (Jest, Vitest)
   ↓
3. Lint (ESLint)
   ↓
4. Build
   ↓
5. Deploy to staging
   ↓
6. E2E tests
   ↓
7. Deploy to production
\`\`\`

Tools:
- GitHub Actions, GitLab CI, Jenkins
- Codecov for coverage%
- Sentry for error tracking
- Datadog for monitoring`
  },
  {
    id: 49,
    experience: 'mid',
    tags: ['nodejs', 'express', 'middleware', 'routing'],
    question: 'What are middleware and routing in Express.js?',
    answer: `Middleware: functions that process requests. Routing: mapping URLs to handlers.

Middleware:

\`\`\`js
// Logger middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();  // pass to next middleware
});

// Auth middleware
const isAuth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Route with middleware
app.get('/profile', isAuth, (req, res) => {
  res.json({ name: 'Ali' });
});
\`\`\`

Routing:

\`\`\`js
// GET route
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id, name: 'Ali' });
});

// POST route
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

// Router for grouping
const usersRouter = express.Router();
usersRouter.get('/', (req, res) => res.json([]));
usersRouter.get('/:id', (req, res) => res.json({ id: req.params.id }));
app.use('/api/users', usersRouter);
\`\`\`

Middleware order matters:

\`\`\`js
app.use(express.json());           // parse JSON
app.use(loggerMiddleware);          // log everything
app.use(isAuth);                    // check auth
app.get('/admin', adminOnly);       // route
\`\`\``
  },
  {
    id: 50,
    experience: 'senior',
    tags: ['scalability', 'load balancing', 'clustering', 'distributed systems'],
    question: 'How do you scale applications for high traffic?',
    answer: `Scaling: handling more users/requests without degrading performance.

Vertical scaling: bigger server (limited by hardware).
Horizontal scaling: more servers (infinite potential).

Horizontal scaling strategy:

\`\`\`
                ┌─ Server 1 (App)
Client ← Load Balancer ─┼─ Server 2 (App)
                └─ Server 3 (App)
                      ↓
                Shared Database
                Shared Cache (Redis)
\`\`\`

Techniques:

\`\`\`js
// 1. Clustering (Node.js)
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  // Worker runs app
  app.listen(3000);
}

// 2. Load balancing (Nginx)
upstream backend {
  server 192.168.1.1:3000;
  server 192.168.1.2:3000;
  server 192.168.1.3:3000;
}

// 3. Caching
Redis for sessions, API responses

// 4. Database optimization
Read replicas for queries
Write to primary

// 5. Message queues
RabbitMQ, Redis for async tasks
\`\`\`

Monitoring:

\`\`\`
- Request rate (req/s)
- Response time (latency)
- Error rate
- CPU/Memory usage
- Database query time
- Cache hit rate
\`\`\`

Tools: AWS Auto Scaling, Kubernetes, Docker Compose, PM2`
  },
];

