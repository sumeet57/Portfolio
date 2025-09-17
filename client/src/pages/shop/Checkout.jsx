import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // take state from url
  const stat = location.state.productId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
      <h1>{stat}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          try {
            console.log("sending", backendUrl, "/api/cart/add/", stat);
            const res = await fetch(`${backendUrl}/api/cart/add/${stat}`, {
              method: "POST",
              credentials: "include",
            });

            console.log(res);
            if (res.status === 200) {
              navigate("/shop/dashboard");
            } else {
              console.error("Failed to add to cart");
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Buy now
      </button>
    </>
  );
};

export default Checkout;
