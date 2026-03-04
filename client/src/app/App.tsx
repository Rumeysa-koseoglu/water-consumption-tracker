import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/ui/LoginPage.js";
import Dashboard from "../pages/dashboard/ui/Dashboard.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
