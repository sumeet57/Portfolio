import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Your main CSS with Cosmic theme
import { PortfolioContextProvider } from "./Context/Portfolio.context.jsx";
import { UserContextProvider } from "./Context/User.context.jsx";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Shop from "./pages/Shop.jsx";
import TermsAndConditions from "./components/ExternalPages/TermsAndConditions.jsx";
import RefundPolicy from "./components/ExternalPages/RefundPolicy.jsx";
import Contact from "./components/ExternalPages/Contact.jsx";
import PrivacyStatement from "./components/ExternalPages/PrivacyStatement.jsx";
import Auth from "./components/Auth.jsx";
import Create from "./pages/admin/Create.jsx";
import Update from "./pages/admin/Update.jsx";
import Product from "./pages/shop/Product.jsx";
import Checkout from "./pages/shop/Checkout.jsx";
import DashboardProduct from "./pages/dashboard/DashboardProduct.jsx";
import Logout from "./pages/Logout.jsx";
import socket from "./components/Socket.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
function App() {
  useEffect(() => {
    const handleConnect = (totalUsers) => {
      console.log(totalUsers);
    };

    socket.on("totalUsers", handleConnect);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("totalUsers", handleConnect);
      socket.disconnect();
    };
  }, []);

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

        <Route
          path="/shop"
          element={
            <UserContextProvider>
              <ScrollToTop />
              <Shop />
            </UserContextProvider>
          }
          children={
            <>
              <Route
                path=":productId"
                element={
                  <>
                    <ScrollToTop />
                    <Product />
                  </>
                }
                children={
                  <>
                    <Route
                      path="checkout"
                      element={
                        <UserContextProvider>
                          <ScrollToTop />
                          <Checkout />
                        </UserContextProvider>
                      }
                    />
                  </>
                }
              />
              <Route
                path="dashboard"
                element={
                  <UserContextProvider>
                    <Dashboard />
                  </UserContextProvider>
                }
                children={
                  <>
                    <Route
                      path=":id"
                      element={
                        <UserContextProvider>
                          <DashboardProduct />
                        </UserContextProvider>
                      }
                    />
                  </>
                }
              />
              <Route
                path="admin"
                element={
                  <UserContextProvider>
                    <Admin />
                  </UserContextProvider>
                }
              />
            </>
          }
        />

        <Route
          path="/admin/create"
          element={
            <UserContextProvider>
              <Create />
            </UserContextProvider>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <UserContextProvider>
              <Update />
            </UserContextProvider>
          }
        />
        <Route
          path="/logout"
          element={
            <UserContextProvider>
              <Logout />
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
