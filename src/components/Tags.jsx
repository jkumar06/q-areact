/**
 * Tags Component
 * Displays tags as colorful badges with icons
 */

const TAG_CONFIG = {
  'react': { bg: '#e8f5ff', border: '#61dafb', text: '#0099cc', icon: '⚛️', label: 'React' },
  'hooks': { bg: '#ffe8f0', border: '#ff6b6b', text: '#cc0033', icon: '🪝', label: 'Hooks' },
  'usestate': { bg: '#e0f8f7', border: '#4ecdc4', text: '#008080', icon: '📦', label: 'useState' },
  'state': { bg: '#e8f9f6', border: '#95e1d3', text: '#00695c', icon: '🎯', label: 'State' },
  'useeffect': { bg: '#ffe8e8', border: '#f38181', text: '#c00000', icon: '⏱️', label: 'useEffect' },
  'lifecycle': { bg: '#f0e8ff', border: '#aa96da', text: '#5a3aaa', icon: '🔄', label: 'Lifecycle' },
  'side effects': { bg: '#ffe8f5', border: '#fcbad3', text: '#cc007f', icon: '✨', label: 'Side Effects' },
  'javascript': { bg: '#fffaeb', border: '#f7df1e', text: '#cc6600', icon: '📜', label: 'JavaScript' },
  'component': { bg: '#e8f5ff', border: '#61dafb', text: '#0099cc', icon: '🧩', label: 'Component' },
  'props': { bg: '#fffde8', border: '#ffd93d', text: '#cc9900', icon: '📨', label: 'Props' },
  'performance': { bg: '#e8f8f0', border: '#6bcf7f', text: '#006600', icon: '⚡', label: 'Performance' },
  'optimization': { bg: '#e8f1ff', border: '#4a90e2', text: '#003d99', icon: '🚀', label: 'Optimization' },
  'context': { bg: '#ffe8fc', border: '#ff85c0', text: '#cc0066', icon: '🌐', label: 'Context' },
  'api': { bg: '#e8f5f5', border: '#a8dadc', text: '#006666', icon: '🔌', label: 'API' },
  'async': { bg: '#fff3e8', border: '#f4a261', text: '#cc5500', icon: '⏳', label: 'Async' },
  'promise': { bg: '#ffe8e0', border: '#e76f51', text: '#990033', icon: '🤝', label: 'Promise' },
};

function Tags({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tags-container">
      {tags.map((tag, idx) => {
        const config = TAG_CONFIG[tag.toLowerCase()] || {
          bg: '#f0f0f0',
          border: '#cccccc',
          text: '#666666',
          icon: '🏷️',
          label: tag
        };
        return (
          <span
            key={idx}
            className="tag"
            style={{
              backgroundColor: config.bg,
              borderColor: config.border,
              color: config.text
            }}
            title={config.label}
          >
            <span className="tag-icon">{config.icon}</span>
            <span className="tag-text">{tag}</span>
          </span>
        );
      })}
    </div>
  );
}

export default Tags;
