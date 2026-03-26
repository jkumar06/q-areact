import CodeBlock from './CodeBlock.jsx';

/**
 * AnswerContent
 * Parses the answer string and renders:
 * - ```...``` fenced blocks as <CodeBlock>
 * - Everything else as plain paragraphs
 */
function AnswerContent({ text }) {
  // Split on triple-backtick fences
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="answer-content">
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // Strip the opening ``` and optional language tag + closing ```
          const code = part.replace(/^```[^\n]*\n?/, '').replace(/```$/, '');
          return <CodeBlock key={i} code={code} />;
        }

        // Plain text — split into paragraphs on double newline
        return part
          .split(/\n\n+/)
          .filter(p => p.trim())
          .map((para, j) => {
            // Bullet list lines starting with -
            const lines = para.split('\n');
            const isList = lines.every(l => l.trim().startsWith('-') || l.trim() === '');
            if (isList && lines.some(l => l.trim().startsWith('-'))) {
              return (
                <ul key={`${i}-${j}`} className="answer-list">
                  {lines.filter(l => l.trim().startsWith('-')).map((l, k) => (
                    <li key={k}>{l.trim().slice(1).trim()}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={`${i}-${j}`} className="answer-para">
                {para.trim()}
              </p>
            );
          });
      })}
    </div>
  );
}

export default AnswerContent;
