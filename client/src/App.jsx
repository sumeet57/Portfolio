import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Your main CSS with Cosmic theme
import { PortfolioContextProvider } from "./Context/Portfolio.context.jsx";
import { UserContextProvider } from "./Context/user.context.jsx";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Product from "./pages/Product.jsx";
import TermsAndConditions from "./components/ExternalPages/TermsAndConditions.jsx";
import RefundPolicy from "./components/ExternalPages/RefundPolicy.jsx";
import Contact from "./components/ExternalPages/Contact.jsx";
import PrivacyStatement from "./components/ExternalPages/PrivacyStatement.jsx";
import Auth from "./components/Auth.jsx";
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
        <Route path="/shop" element={<Product />} />

        {/* User dashboard page - accessible at '/dashboard' */}
        <Route
          path="/dashboard"
          element={
            <UserContextProvider>
              <Dashboard />
            </UserContextProvider>
          }
        />

        {/* --- External Links --- */}
        {/* These routes will now render your policy and contact pages from their files */}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyStatement />} />

        <Route path="/auth" element={<Auth />} />

        {/* Catch-all route for any undefined paths (404 page) - This should be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
