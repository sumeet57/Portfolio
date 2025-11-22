import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Your main CSS with Cosmic theme
import { PortfolioContextProvider } from "./Context/Portfolio.context.jsx";

import Portfolio from "./pages/Portfolio";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    // BrowserRouter wraps your entire application for routing
    <Router>
      <Routes>
        {/* Your main portfolio page - accessible at the root '/' */}
        <Route
          path="/"
          element={
            <PortfolioContextProvider>
              <Portfolio />
            </PortfolioContextProvider>
          }
        />

        {/* Your project marketplace page - accessible at '/shop' */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
