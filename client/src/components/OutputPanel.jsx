const OutputPanel = ({ output }) => {
  return (
    <div className="output-panel">
      {output ? (
        <pre className="review-output">{output}</pre>
      ) : (
        <div className="output-placeholder">
          AI output will appear here...
        </div>
      )}
    </div>
  );
};

export default OutputPanel;