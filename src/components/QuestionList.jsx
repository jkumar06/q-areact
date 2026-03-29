import Tags from './Tags.jsx';

/**
 * QuestionList
 * Renders filtered questions in a scrollable left panel as cards.
 * Highlights the active (selected) question.
 * Displays tags for each question.
 */
function QuestionList({ questions, selectedId, onSelect }) {
  if (questions.length === 0) return null;

  return (
    <ul className="question-list" role="listbox" aria-label="Matching questions">
      {questions.map(q => (
        <li
          key={q.id}
          role="option"
          aria-selected={q.id === selectedId}
          className={`question-item ${q.id === selectedId ? 'active' : ''}`}
          onClick={() => onSelect(q.id)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(q.id);
            }
          }}
          tabIndex={0}
        >
          <div className="question-item-content">
            <p className="question-item-text">{q.question}</p>
            {q.tags && q.tags.length > 0 && (
              <div className="question-item-tags">
                <Tags tags={q.tags} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
