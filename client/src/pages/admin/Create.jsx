import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "iot",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // API call logic would go here
  };

  // A reusable style for the input fields
  const inputStyle =
    "w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-200 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300";

  return (
    // Main container that takes up the full space with padding
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <header className="pb-6 mb-8 border-b border-zinc-700">
          <h1 className="text-4xl font-bold text-zinc-100">
            Create a New Product
          </h1>
          <p className="text-zinc-400 mt-2">
            Add a new item to your inventory by filling out the form below.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Name and Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Smart RGB Light Strip"
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="iot">IoT</option>
                  <option value="web dev">Web Dev</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the product's features, benefits, and specifications..."
                required
                className={inputStyle}
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 3999"
                  required
                  min="0"
                  step="0.01"
                  className={inputStyle}
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  required
                  min="0"
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Form Footer with Action Buttons */}
          <footer className="mt-10 pt-6 border-t border-zinc-700 flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg text-zinc-300 font-semibold hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/40"
            >
              Save Product
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Create;
