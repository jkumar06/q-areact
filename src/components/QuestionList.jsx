/**
 * QuestionList
 * Renders filtered questions in a scrollable left panel.
 * Highlights the active (selected) question.
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
          {q.question}
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;
