import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./components/Index"
import StockPage from "./components/Stock";
import SalePage from "./components/Sales";
import ReportPage from "./components/Report";
import PrivacyPage from "./components/Privacy";
import "./components/shared/_Layout.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
