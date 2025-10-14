import React, { useEffect, useState } from "react";
// 1. Import for useNavigate is kept, but the icon import is removed.
import { useNavigate } from "react-router-dom";
import { Trash2, Edit3, Eye } from "lucide-react";
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
          onClick={() => navigate("/admin/add-product")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Create Product
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {products.length === 0 ? (
          <div className="text-gray-400 text-center py-12 bg-gray-800 rounded-2xl shadow-xl border border-gray-700/50">
            <p className="text-2xl font-semibold">
              No products have been added yet.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Start by creating a new product listing.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 
                       shadow-xl border border-gray-700 hover:border-indigo-600 transition-all duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-28 h-28 object-cover rounded-xl flex-shrink-0 border-2 border-gray-700 shadow-md"
              />

              <div className="flex-grow text-center md:text-left">
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <h2 className="text-xl font-extrabold text-white mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {product.productContext}
                </p>

                <div className="flex justify-center md:justify-start items-center gap-6 pt-2 border-t border-gray-700/50 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-emerald-400">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-400 font-medium">
                      Stock: <span className="text-white">{product.stock}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-white transition-colors shadow-md flex items-center justify-center gap-2">
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => navigate(`/admin/update/${product._id}`)}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium text-white transition-colors shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Edit3 size={16} />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
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
