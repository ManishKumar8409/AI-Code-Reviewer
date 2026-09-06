import { useState, useContext } from "react";

import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import LanguageSelector from "../components/LanguageSelector";

import { ThemeContext } from "../context/ThemeContext";
import { reviewCode } from "../services/reviewService";

const Home = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  const { dark, setDark } = useContext(ThemeContext);

  // =========================
  // REVIEW CODE
  // =========================
  const handleReview = async () => {
    console.log("🔥 REVIEW BUTTON CLICKED");
    console.log("📦 CURRENT CODE:", code);
    console.log("📏 CODE LENGTH:", code.length);
    console.log("🌐 LANGUAGE:", language);

    if (!code || !code.trim()) {
      console.log("❌ CODE IS EMPTY");
      alert("Please enter code first");
      return;
    }

    try {
      setReviewing(true);
      setCopied(false);
      setOutput("⏳ Reviewing your code...");

      console.log("🚀 CALLING REVIEW API...");

      const res = await reviewCode(code, language);

      console.log("✅ API RESPONSE:", res);

      setOutput(res?.result || "No result found");
    } catch (error) {
      console.error("❌ REVIEW ERROR:", error);
      console.error("❌ ERROR MESSAGE:", error.message);
      console.error("❌ RESPONSE:", error.response);
      console.error("❌ RESPONSE DATA:", error.response?.data);

      setOutput(
        error?.response?.data?.error ||
          error?.message ||
          "Error reviewing code. Please try again."
      );
    } finally {
      setReviewing(false);
    }
  };

  // =========================
  // CLEAR CODE + OUTPUT
  // =========================
  const handleClear = () => {
    setCode("");
    setOutput("");
    setCopied(false);
  };

  // =========================
  // COPY AI RESPONSE
  // =========================
  const handleCopy = async () => {
    if (!output || output.startsWith("⏳")) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("❌ COPY ERROR:", error);

      // Fallback for older browser situations
      try {
        const textArea = document.createElement("textarea");
        textArea.value = output;

        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackError) {
        console.error("❌ COPY FALLBACK ERROR:", fallbackError);
      }
    }
  };

  return (
    <div className="reviewer-app">
      {/* =========================
          NAVBAR
      ========================= */}
      <header className="reviewer-navbar">
        <div className="brand-section">
          <h2>⚡ AI Code Reviewer</h2>
          <span className="brand-badge">AI Powered</span>
        </div>

        <button
          className="theme-button"
          onClick={() => setDark(!dark)}
          title="Toggle theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </header>

      {/* =========================
          MAIN CONTAINER
      ========================= */}
      <main className="reviewer-main">
        <div className="reviewer-workspace">
          {/* =========================
              LEFT EDITOR SECTION
          ========================= */}
          <section className="editor-section">
            {/* EDITOR TOOLBAR */}
            <div className="editor-toolbar">
              <div className="language-wrapper">
                <LanguageSelector
                  language={language}
                  setLanguage={setLanguage}
                />
              </div>

              <div className="editor-actions">
                {/* CLEAR */}
                <button
                  className="clear-button"
                  onClick={handleClear}
                  disabled={!code && !output}
                >
                  🗑️ Clear
                </button>

                {/* REVIEW */}
                <button
                  className={`review-button ${
                    reviewing ? "reviewing" : ""
                  }`}
                  onClick={handleReview}
                  disabled={reviewing}
                >
                  {reviewing ? "⏳ Reviewing..." : "⚡ Review"}
                </button>
              </div>
            </div>

            {/* CODE EDITOR */}
            <div className="editor-container">
              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
              />
            </div>
          </section>

          {/* =========================
              RIGHT OUTPUT SECTION
          ========================= */}
          <section className="output-section">
            {/* OUTPUT HEADER */}
            <div className="output-header">
              <div>
                <h3>Review Output</h3>
                <span>AI analysis & suggestions</span>
              </div>

              <button
                className={`copy-button ${copied ? "copied" : ""}`}
                onClick={handleCopy}
                disabled={!output || output.startsWith("⏳")}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>

            {/* OUTPUT */}
            <div className="output-container">
              {output ? (
                <OutputPanel output={output} />
              ) : (
                <div className="empty-output">
                  <div className="empty-icon">🤖</div>

                  <h3>Ready to Review</h3>

                  <p>
                    Paste your code in the editor and click
                    <strong> Review</strong> to get AI-powered
                    feedback.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;