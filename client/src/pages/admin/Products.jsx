import React, { useEffect, useState } from "react";
// 1. Import for useNavigate is kept, but the icon import is removed.
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-200">Products</h1>
        <button
          onClick={() => navigate("/admin/create")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Create Product
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {products.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            <p className="text-xl">No products have been added yet.</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-6 shadow-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {/* ... (rest of your product card JSX remains the same) */}
              <img
                src={`${backendUrl}/${product.imageUrl}`}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md flex-shrink-0"
              />

              <div className="flex-grow text-center sm:text-left">
                <p className="text-xs text-indigo-400 font-semibold uppercase">
                  {product.category}
                </p>
                <h2 className="text-xl font-bold text-white mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  {product.productContext}
                </p>
                <div className="flex justify-center sm:justify-start items-center gap-6">
                  <p className="text-lg font-semibold text-green-400">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm font-medium transition-colors">
                  View
                </button>
                <button
                  onClick={() => navigate(`/admin/update/${product._id}`)}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-sm font-medium transition-colors"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      fetch(
                        `${backendUrl}/api/products/delete/${product._id}`,
                        {
                          method: "DELETE",
                          credentials: "include",
                        }
                      )
                        .then((res) => {
                          if (res.ok) {
                            setProducts(
                              products.filter((p) => p._id !== product._id)
                            );
                          } else {
                            alert("Failed to delete product.");
                          }
                        })
                        .catch((err) => {
                          console.error("Error deleting product:", err);
                          alert(
                            "An error occurred while deleting the product."
                          );
                        });
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
