import { useEffect, useState } from "react";
import { getHistory } from "../services/reviewService";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();   // ✅ FIX
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("USER:", user);

        const data = await getHistory(user?._id);

        console.log("HISTORY DATA:", data);

        setHistory(data);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchHistory();
  }, []);

    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      alert("Copied ✅");
    };

  return (
    <div style={{ padding: "20px", color: "white" }}>

      {/* 🔥 BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "15px",
          background: "#6366f1",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        ⬅ Back
      </button>

      <h2>📜 Review History</h2>

      {history.length === 0 ? (
        <p>No history found ❌</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#1e293b",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <p><b>Language:</b> {item.language}</p>

            <pre style={{ background: "#020617", padding: "8px" }}>
              {item.code}
            </pre>

            <p><b>AI Review:</b></p>

            <p><b>AI Review:</b></p>

        <button
          onClick={() => handleCopy(item.result)}
          style={{
            marginBottom: "5px",
            background: "#2563eb",
            color: "white",
            padding: "4px 8px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          Copy Output
        </button>

<pre>{item.result}</pre>

            <pre>{item.result}</pre>
          </div>
        ))
      )}
    </div>
  );
};

export default History;