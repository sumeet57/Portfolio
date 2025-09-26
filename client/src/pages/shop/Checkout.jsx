import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/User.context";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const productId = params.productId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const product = location.state.product;
  const isIotProduct = product?.category?.toLowerCase() === "iot";

  const { user } = React.useContext(UserContext);

  const [formData, setFormData] = useState({
    userId: null,
    userName: "Guest",
    userEmail: "",
    productId: productId,
    userAddress: "",
    userPhone: "",
    userMessage: "",
    userPincode: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user._id || null,
        userName: user.name || "Guest",
        userEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "userAddress" || name === "userMessage") {
      value = value.substring(0, 300);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBuyNow = async () => {
    try {
      const checkoutData = {
        ...formData,
        productDetails: {
          name: product.name,
          price: product.price,
          category: product.category,
        },
      };

      const res = await fetch(`${backendUrl}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
        credentials: "include",
      });

      if (res.status === 200) {
        navigate("/shop/dashboard");
      } else {
        console.error("Failed to complete checkout");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8 pt-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Details Card */}
        <div className="lg:col-span-1 h-fit">
          {product && (
            <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl border-t-4 border-teal-500">
              <h3 className="text-2xl font-bold mb-4 text-teal-400">
                Order Summary
              </h3>
              <div className="space-y-3">
                <p className="text-xl font-semibold">{product.name}</p>
                <p className="text-sm text-zinc-400">
                  <span className="font-medium text-teal-300">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-sm text-zinc-400">
                  <span className="font-medium text-teal-300">Context:</span>{" "}
                  {product.projectContext}
                </p>
                <p className="text-lg font-bold text-green-400">
                  Price: ${product.price}
                </p>
                <p className="text-sm text-zinc-400">
                  Stock Remaining:{" "}
                  <span className="font-semibold">{product.stock}</span>
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-700">
                {isIotProduct ? (
                  <>
                    <p className="text-sm font-semibold text-yellow-400">
                      Estimated Delivery: 2 - 3 business days.
                    </p>
                    <p className="text-xs text-red-400 mt-1">
                      *Note: This IOT product is currently deliverable only in
                      Mumbai.
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-semibold text-yellow-400">
                    Standard Delivery: 3 - 5 business days.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-zinc-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">
            Shipping Information
          </h2>
          <div className="space-y-4">
            {/* ReadOnly Fields */}
            <input
              className="w-full border border-zinc-700 bg-zinc-700 p-3 rounded text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Name"
              type="text"
              name="userName"
              id="name"
              value={formData.userName}
              readOnly={!user}
            />
            <input
              placeholder="Email"
              className="w-full border border-zinc-700 bg-zinc-700 p-3 rounded text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="email"
              name="userEmail"
              id="email"
              value={formData.userEmail}
              readOnly={!user}
            />

            {/* Editable Fields */}
            <input
              placeholder="Phone Number"
              className="w-full border border-zinc-700 bg-zinc-700 p-3 rounded text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="tel"
              name="userPhone"
              id="phone"
              value={formData.userPhone}
              onChange={handleInputChange}
            />
            <input
              placeholder="Pincode"
              className="w-full border border-zinc-700 bg-zinc-700 p-3 rounded text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              name="userPincode"
              id="pincode"
              value={formData.userPincode}
              onChange={handleInputChange}
            />
            <div className="relative">
              <textarea
                placeholder="Shipping Address (Max 300 characters)"
                className="w-full border border-zinc-700 bg-zinc-700 p-3 rounded text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[100px]"
                name="userAddress"
                id="address"
                value={formData.userAddress}
                onChange={handleInputChange}
              />
              <span className="absolute bottom-2 right-3 text-xs text-zinc-400">
                {formData.userAddress.length}/300
              </span>
            </div>
            <div className="relative">
              <textarea
                placeholder="Message/Notes (e.g., delivery instructions - Max 300 characters)"
                className="w-full border border-zinc-700 bg-zinc-700 p-3 rounded text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[100px]"
                name="userMessage"
                id="message"
                value={formData.userMessage}
                onChange={handleInputChange}
              />
              <span className="absolute bottom-2 right-3 text-xs text-zinc-400">
                {formData.userMessage.length}/300
              </span>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01]"
            // onClick={handleBuyNow}
          >
            Not accepting orders currently
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
