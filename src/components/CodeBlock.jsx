import { useState } from 'react';

/**
 * CodeBlock
 * Renders a fenced code string (backtick-delimited) as a <pre><code> block.
 * Includes a copy button for easy code copying.
 */
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper">
      <pre className="code-block">
        <code>{code.trim()}</code>
      </pre>
      <button
        className="code-copy-btn"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy code'}
        aria-label="Copy code to clipboard"
      >
        {copied ? '✓ Copied' : '📋 Copy'}
      </button>
    </div>
  );
}

export default CodeBlock;
