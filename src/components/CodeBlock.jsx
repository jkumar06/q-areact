/**
 * CodeBlock
 * Renders a fenced code string (backtick-delimited) as a <pre><code> block.
 */
function CodeBlock({ code }) {
  return (
    <pre className="code-block">
      <code>{code.trim()}</code>
    </pre>
  );
}

export default CodeBlock;
