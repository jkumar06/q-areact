import { useState, useMemo } from 'react';
import { QA_DATA } from './data.js';
import useDebounce from './hooks/useDebounce.js';
import SearchBar from './components/SearchBar.jsx';
import QuestionList from './components/QuestionList.jsx';
import AnswerPanel from './components/AnswerPanel.jsx';

/**
 * Filters Q&A data by a search query.
 * Matches against: question text, tags, and answer body.
 */
function filterQuestions(data, query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return data.filter(item =>
    item.question.toLowerCase().includes(q) ||
    item.tags.some(tag => tag.toLowerCase().includes(q)) ||
    item.answer.toLowerCase().includes(q)
  );
}

function App() {
  const [rawQuery, setRawQuery]     = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Debounce the search — 300ms after user stops typing
  const query = useDebounce(rawQuery, 300);

  // Filtered results derived from debounced query
  const results = useMemo(() => filterQuestions(QA_DATA, query), [query]);

  // Selected question object
  const selectedQuestion = useMemo(
    () => results.find(q => q.id === selectedId) ?? null,
    [results, selectedId]
  );

  // When query changes, auto-select the first result
  function handleQueryChange(value) {
    setRawQuery(value);
    setSelectedId(null); // reset selection on new search
  }

  // Auto-select first result once debounce fires
  useMemo(() => {
    if (results.length > 0 && selectedId === null) {
      setSelectedId(results[0].id);
    }
  }, [results]);

  const hasQuery = rawQuery.trim().length > 0;
  const noResults = hasQuery && query === rawQuery && results.length === 0;

  return (
    <div className="app">

      {/* ── Main content ── */}
      <div className="content">
        {!hasQuery && (
          <div className="empty-state" aria-live="polite">
            <p className="empty-title">Frontend Interview Q&amp;A</p>
            <p className="empty-sub">Type in the search bar below to find questions.</p>
            <p className="empty-sub">Try: <strong>hooks</strong>, <strong>useState</strong>, <strong>webpack</strong>, <strong>accessibility</strong></p>
          </div>
        )}

        {hasQuery && noResults && (
          <div className="empty-state" aria-live="polite">
            <p className="empty-title">No results for "{rawQuery}"</p>
            <p className="empty-sub">Try a different keyword.</p>
          </div>
        )}

        {hasQuery && results.length > 0 && (
          <div className="split-view">
            {/* Left — question list */}
            <aside className="left-panel">
              <p className="result-count" aria-live="polite">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              <QuestionList
                questions={results}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </aside>

            {/* Right — answer */}
            <main className="right-panel">
              <AnswerPanel question={selectedQuestion} />
            </main>
          </div>
        )}
      </div>

      {/* ── Bottom search bar ── */}
      <SearchBar value={rawQuery} onChange={handleQueryChange} />
    </div>
  );
}

export default App;
