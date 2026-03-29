/**
 * Tags Component
 * Displays tags as colorful badges with icons
 */

const TAG_CONFIG = {
  'react': { color: '#61dafb', icon: '⚛️', label: 'React' },
  'hooks': { color: '#ff6b6b', icon: '🪝', label: 'Hooks' },
  'usestate': { color: '#4ecdc4', icon: '📦', label: 'useState' },
  'state': { color: '#95e1d3', icon: '🎯', label: 'State' },
  'useeffect': { color: '#f38181', icon: '⏱️', label: 'useEffect' },
  'lifecycle': { color: '#aa96da', icon: '🔄', label: 'Lifecycle' },
  'side effects': { color: '#fcbad3', icon: '✨', label: 'Side Effects' },
  'javascript': { color: '#f7df1e', icon: '📜', label: 'JavaScript' },
  'component': { color: '#61dafb', icon: '🧩', label: 'Component' },
  'props': { color: '#ffd93d', icon: '📨', label: 'Props' },
  'performance': { color: '#6bcf7f', icon: '⚡', label: 'Performance' },
  'optimization': { color: '#4a90e2', icon: '🚀', label: 'Optimization' },
  'context': { color: '#ff85c0', icon: '🌐', label: 'Context' },
  'api': { color: '#a8dadc', icon: '🔌', label: 'API' },
  'async': { color: '#f4a261', icon: '⏳', label: 'Async' },
  'promise': { color: '#e76f51', icon: '🤝', label: 'Promise' },
};

function Tags({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tags-container">
      {tags.map((tag, idx) => {
        const config = TAG_CONFIG[tag.toLowerCase()] || {
          color: '#' + Math.floor(Math.random()*16777215).toString(16),
          icon: '🏷️',
          label: tag
        };
        return (
          <span
            key={idx}
            className="tag"
            style={{ '--tag-color': config.color }}
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
