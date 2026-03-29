/**
 * Header Component
 * Shows title, stats, theme toggle, and help
 */
import { useState } from 'react';

function Header({ 
  questionCount, 
  juniorCount, 
  midCount, 
  seniorCount, 
  isDark, 
  onThemeToggle 
}) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1 className="app-title">
            <span className="title-icon">❓</span>
            Interview Q&A
          </h1>
          <p className="header-subtitle">Master React & JavaScript interviews</p>
        </div>

        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">{questionCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">
              <span className="exp-badge exp-junior">Jr</span>
            </span>
            <span className="stat-value">{juniorCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">
              <span className="exp-badge exp-mid">Mid</span>
            </span>
            <span className="stat-value">{midCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">
              <span className="exp-badge exp-senior">Sr</span>
            </span>
            <span className="stat-value">{seniorCount}</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="header-btn"
            onClick={() => setShowHelp(!showHelp)}
            title="Show keyboard shortcuts"
            aria-label="Help and shortcuts"
          >
            ⌨️
          </button>
          <button
            className={`header-btn theme-toggle ${isDark ? 'dark' : 'light'}`}
            onClick={onThemeToggle}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {showHelp && (
        <div className="help-modal" onClick={() => setShowHelp(false)}>
          <div className="help-content" onClick={e => e.stopPropagation()}>
            <button
              className="help-close"
              onClick={() => setShowHelp(false)}
              aria-label="Close help"
            >
              ✕
            </button>
            <h2>⌨️ Keyboard Shortcuts</h2>
            <div className="shortcuts-grid">
              <div className="shortcut">
                <kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd>
                <span>Focus search</span>
              </div>
              <div className="shortcut">
                <kbd>Escape</kbd>
                <span>Clear search</span>
              </div>
              <div className="shortcut">
                <kbd>↑↓</kbd>
                <span>Navigate questions</span>
              </div>
              <div className="shortcut">
                <kbd>Enter</kbd>
                <span>Select question</span>
              </div>
              <div className="shortcut">
                <kbd>Cmd/Ctrl</kbd> + <kbd>C</kbd>
                <span>Copy answer</span>
              </div>
              <div className="shortcut">
                <kbd>Cmd/Ctrl</kbd> + <kbd>P</kbd>
                <span>Print</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
