import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import Profile from "./pages/Profile";
import "./index.css";

function App() {
  const user = localStorage.getItem("user"); // 🔥 check login
  
  return (
    <BrowserRouter>
      <Routes>
       {/* profile */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Home (Protected) */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* History (Protected) */}
        <Route
          path="/history"
          element={user ? <History /> : <Navigate to="/login" />}
        />
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;