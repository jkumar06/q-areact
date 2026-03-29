import { useState, useMemo } from 'react';
import { QA_DATA } from './data.js';
import useDebounce from './hooks/useDebounce.js';
import SearchBar from './components/SearchBar.jsx';
import QuestionList from './components/QuestionList.jsx';
import AnswerPanel from './components/AnswerPanel.jsx';

/**
 * Filters Q&A data by search query and experience level.
 * Matches against: question text, tags, and answer body.
 * Also filters by selected experience level.
 */
function filterQuestions(data, query, experience) {
  const q = query.toLowerCase().trim();
  
  // If no query and no specific experience selected, return empty
  if (!q && experience === 'all') return [];
  
  return data.filter(item => {
    // Must match experience level (or 'all' includes everything)
    const experienceMatch = experience === 'all' || item.experience === experience;
    
    // If no query, just check experience
    if (!q) return experienceMatch;
    
    // Check both experience and query match
    const queryMatch =
      item.question.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q)) ||
      item.answer.toLowerCase().includes(q);
    
    return experienceMatch && queryMatch;
  });
}

function App() {
  const [rawQuery, setRawQuery]     = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [experience, setExperience] = useState('all'); // 'all', 'junior', 'mid', 'senior'

  // Debounce the search — 300ms after user stops typing
  const query = useDebounce(rawQuery, 300);

  // Filtered results derived from debounced query and experience level
  const results = useMemo(() => filterQuestions(QA_DATA, query, experience), [query, experience]);

  // Selected question object
  const selectedQuestion = useMemo(
    () => results.find(q => q.id === selectedId) ?? null,
    [results, selectedId]
  );

  // Track if we're still waiting for debounce to resolve
  const isDebouncing = useMemo(() => rawQuery !== query, [rawQuery, query]);

  // When query changes, auto-select the first result
  function handleQueryChange(value) {
    setRawQuery(value);
    setSelectedId(null); // reset selection on new search
  }

  // Auto-select first result once debounce fires
  useMemo(() => {
    if (results.length > 0 && selectedId === null && !isDebouncing) {
      setSelectedId(results[0].id);
    }
  }, [results, isDebouncing]);

  const hasQuery = rawQuery.trim().length > 0;
  const noResults = hasQuery && query === rawQuery && results.length === 0;

  return (
    <div className="app">

      {/* ── Main content ── */}
      <div className="content">
        {!hasQuery && (
          <div className="empty-state" aria-live="polite">
            <p className="empty-title">Frontend Interview Q&amp;A</p>
            <p className="empty-sub">Select your experience level and search for topics</p>
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
                {isDebouncing && <span className="debounce-indicator">Searching…</span>}
                {!isDebouncing && `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
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
      <SearchBar 
        value={rawQuery} 
        onChange={handleQueryChange}
        experience={experience}
        onExperienceChange={setExperience}
      />
    </div>
  );
}

export default App;
