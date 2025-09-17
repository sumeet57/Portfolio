import React, { useState } from "react";
import Products from "./Products";

// 1. Removed unused theme icons (LuSun, LuMoon)
import {
  LuLayoutDashboard,
  LuPackage,
  LuUsers,
  LuClipboardList,
} from "react-icons/lu";

// This component now has permanent dark theme styles
const MainContent = ({ currentLink }) => {
  return (
    <div className="w-full h-full p-4 md:p-8 overflow-y-auto">
      {/* REMOVE THIS LINE to prevent duplicate titles */}
      {/* <h1 className="text-2xl font-semibold text-gray-200 capitalize mb-6">{currentLink}</h1> */}

      {/* The rest of the logic stays the same */}
      {currentLink === "dashboard" && (
        <div className="text-gray-400">Dashboard Overview</div>
      )}
      {currentLink === "products" && <Products />}
      {currentLink === "orders" && (
        <div className="text-gray-400">Orders Page</div>
      )}
      {currentLink === "users" && (
        <div className="text-gray-400">Users Page</div>
      )}
    </div>
  );
};
const Layout = () => {
  const navLinks = [
    { name: "dashboard", icon: LuLayoutDashboard },
    { name: "products", icon: LuPackage },
    { name: "orders", icon: LuClipboardList },
    { name: "users", icon: LuUsers },
  ];

  const [currentLink, setCurrentLink] = useState("dashboard");

  return (
    <div className="w-full flex lg:flex-row flex-col-reverse h-screen bg-gray-900 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-gray-800 shadow-md lg:h-screen">
        {/* Sidebar Header */}

        <nav className="flex lg:flex-col justify-around lg:justify-start mt-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setCurrentLink(link.name)}
              // 5. Simplified styling for a permanent dark theme
              className={`flex items-center gap-3 px-4 py-3 m-1 rounded-lg transition-colors
                ${
                  currentLink === link.name
                    ? "bg-gray-700 text-gray-100" // Active state
                    : "text-gray-400 hover:bg-gray-700" // Inactive state
                }`}
            >
              <link.icon size={20} />
              <span className="capitalize hidden lg:block">{link.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <MainContent currentLink={currentLink} />
      </main>
    </div>
  );
};

export default Layout;
