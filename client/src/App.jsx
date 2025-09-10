// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Your main CSS with Cosmic theme

import { PortfolioContextProvider } from "./Context/Portfolio.context.jsx";

import Portfolio from "./pages/Portfolio";
// import Marketplace from "./pages/Product.jsx";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage"; // Import the NotFoundPage component
import Product from "./pages/Product.jsx";

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

        {/* Your project marketplace page - accessible at '/store' */}
        <Route path="/product" element={<Product />} />

        {/* User dashboard page - accessible at '/dashboard' */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Catch-all route for any undefined paths (404 page) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
