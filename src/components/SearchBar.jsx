import { useRef } from 'react';

/**
 * SearchBar
 * Fixed to the bottom of the screen.
 * Includes search input and experience level filter buttons.
 */
function SearchBar({ value, onChange, experience, onExperienceChange }) {
  const inputRef = useRef(null);

  function handleClear() {
    onChange('');
    inputRef.current?.focus();
  }

  return (
    <div className="search-dock" role="search">
      <div className="search-container">
        {/* Experience filter buttons */}
        <div className="experience-filter">
          <label htmlFor="exp-select" className="experience-label">
            Experience:
          </label>
          <div className="experience-buttons">
            {[
              { value: 'all', label: 'All Levels' },
              { value: 'junior', label: 'Junior (0-2 yrs)' },
              { value: 'mid', label: 'Mid (3-6 yrs)' },
              { value: 'senior', label: 'Senior (7+ yrs)' }
            ].map(level => (
              <button
                key={level.value}
                id={level.value === 'all' ? 'exp-select' : undefined}
                className={`exp-btn ${experience === level.value ? 'active' : ''}`}
                onClick={() => onExperienceChange(level.value)}
                aria-pressed={experience === level.value}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="search-wrap">
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Search Here...."
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
    </div>
  );
}

export default SearchBar;
