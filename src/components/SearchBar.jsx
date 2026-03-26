import { useRef } from 'react';

/**
 * SearchBar
 * Fixed to the bottom of the screen.
 * Calls onChange on every keystroke — debouncing is handled by the parent.
 */
function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);

  function handleClear() {
    onChange('');
    inputRef.current?.focus();
  }

  return (
    <div className="search-dock" role="search">
      <div className="search-wrap">
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search… try 'hooks', 'useState', 'webpack', 'accessibility'…"
          aria-label="Search interview questions"
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
