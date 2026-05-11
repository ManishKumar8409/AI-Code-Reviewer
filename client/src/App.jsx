import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import Profile from "./pages/Profile";

import "./index.css";

function App() {

  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            user ? <Profile /> : <Navigate to="/login" />
          }
        />

        {/* History */}
        <Route
          path="/history"
          element={
            user ? <History /> : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;