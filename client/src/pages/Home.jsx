import { useState, useContext } from "react";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import LanguageSelector from "../components/LanguageSelector";
import { ThemeContext } from "../context/ThemeContext";
import { reviewCode } from "../services/reviewService";
import { Link } from "react-router-dom";

const Home = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const { dark, setDark } = useContext(ThemeContext);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 REVIEW FUNCTION
  const handleReview = async () => {
    console.log("CLICKED");

    if (!code) {
      alert("Please enter code first");
      return;
    }

    try {
      const res = await reviewCode(code, language, user?._id);

      console.log("RESPONSE:", res);

      setOutput(res?.result || "No result found");
    } catch (error) {
      console.log("ERROR:", error);
      setOutput("Error reviewing code");
    }
  };

  return (
    <div style={{ height: "100vh", background: "#020617", color: "#e2e8f0" }}>

      {/* 🔹 NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 20px",
        borderBottom: "1px solid #1f2937"
      }}>
        <h2>⚡ AI Code Reviewer</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/login" style={{ color: "white" }}>Account</Link>
          <Link to="/profile" style={{ color: "white" }}>Profile</Link>

          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* 🔹 MAIN */}
      <div style={{
        height: "calc(100vh - 50px)",
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px"
      }}>

        <div style={{
          width: "90%",
          height: "88%",
          display: "flex",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#0f172a",
          border: "1px solid #1f2937"
        }}>

          {/* LEFT */}
          <div style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #1f2937"
          }}>

            {/* TOP BAR */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              background: "#111827"
            }}>

              <LanguageSelector
                language={language}
                setLanguage={setLanguage}
              />

              <div style={{ display: "flex", gap: "6px" }}>

                <Link to="/history" style={{
                  background: "#10b981",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  color: "white",
                  textDecoration: "none"
                }}>
                  History
                </Link>

                {/* ✅ FIXED BUTTON */}
                <button
                  onClick={handleReview}
                  style={{
                    background: "#6366f1",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Review
                </button>

              </div>
            </div>

            {/* EDITOR */}
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
            />

          </div>

          {/* RIGHT */}
          <div style={{
            width: "50%",
            padding: "15px"
          }}>

            <h3>Review Output</h3>

            <div style={{
              background: "#020617",
              borderRadius: "8px",
              padding: "10px",
              height: "90%",
              overflow: "auto"
            }}>
              <OutputPanel output={output} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;