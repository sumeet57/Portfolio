import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { LuArchive } from "react-icons/lu";
import { FcApproval } from "react-icons/fc";

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
      setError(null);
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
    navigate("checkout", { state: { product } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="text-center">
          <p className="text-xl text-zinc-400">Loading Product...</p>
        </div>
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

  const features = Array.isArray(product.features) ? product.features : [];
  const includes = Array.isArray(product.includes) ? product.includes : [];

  return (
    <>
      {location.pathname === `/shop/${productId}` ? (
        <div className="bg-zinc-900 text-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="w-full h-fit lg:h-auto lg:aspect-square rounded-xl shadow-lg overflow-hidden lg:top-24">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full sm:object-contain object-cover"
                />
              </div>

              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="inline-block bg-zinc-800 text-teal-400 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {product.name}
                </h1>
                <div className="mt-4">
                  <p className="text-4xl font-bold text-teal-500">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>
                {product.projectContext && (
                  <div className="mt-6">
                    <p className="text-lg text-zinc-300 leading-relaxed">
                      {product.projectContext}
                    </p>
                  </div>
                )}
                <div className="mt-8 pt-8 border-t border-zinc-700 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Description
                    </h3>
                    <p className="text-base text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>

                  {features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        Features
                      </h3>
                      <ul className="space-y-3">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FcApproval className="flex-shrink-0 h-6 w-6 text-teal-500 mt-0.5 mr-3" />
                            <span className="text-zinc-300 capitalize">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {includes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <LuArchive className="flex-shrink-0 h-6 w-6 text-teal-500 mt-0.5 mr-3" />
                            <span className="text-zinc-300 capitalize">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-zinc-700">
                  <p className="text-sm font-medium mb-4">
                    {product.stock > 0 ? (
                      <span className="text-green-500 font-semibold">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </p>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="w-full rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-teal-700 disabled:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Outlet context={{ product }} />
      )}
    </>
  );
};

export default Product;
