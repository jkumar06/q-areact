import { useState } from 'react';
import AnswerContent from './AnswerContent.jsx';

/**
 * AnswerPanel
 * Right panel — shows the answer for the selected question.
 * Includes copy, print, and favorite buttons.
 */
function AnswerPanel({ question, onCopy, onPrint, onFavorite, isFavorite }) {
  const [showCopied, setShowCopied] = useState(false);

  if (!question) {
    return (
      <div className="answer-panel answer-panel--empty" aria-live="polite">
        <p className="answer-hint">← Select a question to see the answer</p>
      </div>
    );
  }

  const handleCopy = () => {
    const text = `Q: ${question.question}\n\n${question.answer}`;
    navigator.clipboard.writeText(text).then(() => {
      onCopy('Answer copied to clipboard!');
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    onPrint();
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${question.question}</title>
          <style>
            body { font-family: system-ui; padding: 20px; line-height: 1.6; color: #333; }
            h1 { font-size: 24px; margin-bottom: 20px; }
            pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>${question.question}</h1>
          <div>${question.answer.replace(/\n/g, '<br>')}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="answer-panel" role="region" aria-label="Answer">
      <div className="answer-header">
        <h2 className="answer-question">{question.question}</h2>
        <div className="answer-actions">
          <button
            className={`answer-btn ${isFavorite ? 'favorite' : ''}`}
            onClick={() => onFavorite(question.id)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Toggle favorite"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            className="answer-btn"
            onClick={handleCopy}
            title="Copy answer"
            aria-label="Copy answer to clipboard"
          >
            {showCopied ? '✓' : '📋'}
          </button>
          <button
            className="answer-btn"
            onClick={handlePrint}
            title="Print"
            aria-label="Print question and answer"
          >
            🖨️
          </button>
        </div>
      </div>
      <AnswerContent text={question.answer} />
    </div>
  );
}

export default AnswerPanel;
