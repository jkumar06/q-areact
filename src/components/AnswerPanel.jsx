import AnswerContent from './AnswerContent.jsx';

/**
 * AnswerPanel
 * Right panel — shows the answer for the selected question.
 */
function AnswerPanel({ question }) {
  if (!question) {
    return (
      <div className="answer-panel answer-panel--empty" aria-live="polite">
        <p className="answer-hint">← Select a question to see the answer</p>
      </div>
    );
  }

  return (
    <div className="answer-panel" role="region" aria-label="Answer">
      <h2 className="answer-question">{question.question}</h2>
      <AnswerContent text={question.answer} />
    </div>
  );
}

export default AnswerPanel;
