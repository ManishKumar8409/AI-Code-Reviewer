import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public AI Code Reviewer */}
        <Route path="/" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;