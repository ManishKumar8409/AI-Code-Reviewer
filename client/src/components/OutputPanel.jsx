import { useState } from "react";

const OutputPanel = ({ output }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>

      {/* Copy Button */}
      
      {/* Output */}
      <pre style={{
        marginTop: "30px",
        color: "#cbd5f5",
        fontSize: "14px",
        lineHeight: "1.5"
      }}>
        {output || "AI output will appear here..."}
      </pre>
    </div>
  );
};

export default OutputPanel;