import React from "react";
import Products from "./Products";

const Layout = () => {
  const [currentLink, setCurrentLink] = React.useState("products");
  const changeLink = (link) => {
    setCurrentLink(link);
  };
  return (
    <>
      <div className="w-full flex h-screen">
        <aside className="w-[30%] h-screen bg-red-300">
          {["products", "orders", "users"].map((link, i) => (
            <button
              onClick={() => changeLink(link)}
              key={i}
              className=" px-4 py-2 border-b block w-full text-left hover:bg-gray-200"
            >
              {link}
            </button>
          ))}
        </aside>
        <div className="w-[70%] h-screen bg-blue-300">
          ({currentLink === "products" && <Products />}) (
          {currentLink === "orders" && <div>Orders Page</div>}) (
          {currentLink === "users" && <div>Users Page</div>})
        </div>
      </div>
    </>
  );
};

export default Layout;
