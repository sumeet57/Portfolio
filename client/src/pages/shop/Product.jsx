import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${backendUrl}/api/products/${productId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Could not find the requested product.");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, backendUrl]);

  const handleBuyNow = () => {
    // naviagate and send state
    navigate("checkout", { state: { productId } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-xl text-slate-500">Loading Product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const correctedImageUrl = product.imageUrl
    ? product.imageUrl.replace(/\\/g, "/")
    : "";

  return (
    <>
      {location.pathname === `/shop/${productId}` ? (
        <>
          <div className="bg-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="aspect-square w-full rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={`${backendUrl}/${correctedImageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-block bg-teal-100 text-zinc-900 text-sm font-semibold px-3 py-1 rounded-full uppercase">
                      {product.category}
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-400">
                    {product.name}
                  </h1>
                  <div className="mt-4">
                    <p className="text-4xl font-bold text-slate-200">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="mt-6 flex-grow">
                    <h2 className="text-lg font-semibold text-slate-100 mb-2">
                      Description
                    </h2>
                    <p className="text-base text-slate-50 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <p className="text-sm font-medium text-slate-50">
                      {product.stock > 0 ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>
                    <button
                      onClick={handleBuyNow}
                      disabled={product.stock === 0}
                      className="mt-4 w-full rounded-lg bg-slate-500 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-teal-600 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Product;
