import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useAllQuestions } from './hooks/useQuestions.js';
import useDebounce from './hooks/useDebounce.js';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import QuestionList from './components/QuestionList.jsx';
import AnswerPanel from './components/AnswerPanel.jsx';
import ToastContainer, { useToast } from './components/Toast.jsx';

/**
 * Filters Q&A data by search query and experience level.
 * Matches against: question text, tags, and answer body.
 * Also filters by selected experience level.
 * Requires minimum 2 characters for search to trigger.
 */
function filterQuestions(data, query, experience) {
  const q = query.toLowerCase().trim();
  
  // Require at least 2 characters to search
  if (q.length < 2) return [];
  
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
  const [rawQuery, setRawQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [experience, setExperience] = useState('all');
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const searchInputRef = useRef(null);
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  // Fetch questions from API using React Query
  const { data: apiResponse, isLoading, error } = useAllQuestions();
  const qaData = apiResponse?.data ?? [];

  // Apply dark mode
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K: Focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape: Clear search
      if (e.key === 'Escape' && rawQuery) {
        setRawQuery('');
      }
      // Cmd/Ctrl + P: Print
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rawQuery]);

  // Debounce the search — 300ms after user stops typing
  const query = useDebounce(rawQuery, 300);

  // Filtered results derived from debounced query and experience level
  const results = useMemo(() => filterQuestions(qaData, query, experience), [qaData, query, experience]);

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
    setSelectedId(null);
  }

  // Auto-select first result once debounce fires
  useMemo(() => {
    if (results.length > 0 && selectedId === null && !isDebouncing) {
      setSelectedId(results[0].id);
    }
  }, [results, isDebouncing]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: qaData.length,
      junior: qaData.filter(q => q.experience === 'junior').length,
      mid: qaData.filter(q => q.experience === 'mid').length,
      senior: qaData.filter(q => q.experience === 'senior').length,
    };
  }, [qaData]);

  const hasQuery = rawQuery.trim().length > 0;
  const noResults = hasQuery && query === rawQuery && results.length === 0;

  const toggleFavorite = useCallback((questionId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
    const isFav = favorites.includes(selectedId);
    showToast(isFav ? 'Removed from favorites' : 'Added to favorites', 'info');
  }, [favorites, selectedId, showToast]);

  const handleCopy = (message) => {
    showToast(message, 'copy');
  };

  const handlePrint = () => {
    showToast('Opening print dialog...', 'info');
  };

  // Handle API loading state
  if (isLoading) {
    return (
      <div className="app">
        <Header 
          questionCount={0} 
          juniorCount={0} 
          midCount={0} 
          seniorCount={0}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
        <div className="content">
          <div className="empty-state" aria-live="polite">
            <div className="empty-icon">⏳</div>
            <p className="empty-title">Loading Questions...</p>
            <p className="empty-sub">Fetching from API</p>
          </div>
        </div>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  // Handle API error state
  if (error) {
    return (
      <div className="app">
        <Header 
          questionCount={0} 
          juniorCount={0} 
          midCount={0} 
          seniorCount={0}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
        <div className="content">
          <div className="empty-state" aria-live="polite">
            <div className="empty-icon">⚠️</div>
            <p className="empty-title">Error Loading Questions</p>
            <p className="empty-sub">{error.message}</p>
          </div>
        </div>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <Header 
        questionCount={stats.total} 
        juniorCount={stats.junior} 
        midCount={stats.mid} 
        seniorCount={stats.senior}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />

      {/* Main content */}
      <div className="content">
        {!hasQuery && (
          <div className="empty-state" aria-live="polite">
            <div className="empty-icon">👋</div>
            <p className="empty-title">Welcome to Interview Q&A</p>
            <p className="empty-sub">Select your experience level and search for topics to get started</p>
          </div>
        )}

        {hasQuery && noResults && (
          <div className="empty-state" aria-live="polite">
            <div className="empty-icon">🔍</div>
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
              <AnswerPanel 
                question={selectedQuestion}
                onCopy={handleCopy}
                onPrint={handlePrint}
                onFavorite={toggleFavorite}
                isFavorite={selectedId !== null && favorites.includes(selectedId)}
              />
            </main>
          </div>
        )}
      </div>

      {/* Bottom search bar */}
      <SearchBar 
        ref={searchInputRef}
        value={rawQuery} 
        onChange={handleQueryChange}
        experience={experience}
        onExperienceChange={setExperience}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
