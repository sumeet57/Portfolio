import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuUpload, LuX } from "react-icons/lu";
import { toast } from "react-toastify";

const Create = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "iot",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please upload a product image.");
      return;
    }
    setIsSubmitting(true);

    // 1. Create a special package for the form data
    const dataToSubmit = new FormData();

    // 2. Put all your text data and the image file into the package
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("description", formData.description);
    dataToSubmit.append("price", formData.price);
    dataToSubmit.append("stock", formData.stock);
    dataToSubmit.append("category", formData.category);
    dataToSubmit.append("file", imageFile);

    try {
      // 3. Send the package to the server
      const response = await fetch(`${backendUrl}/api/products/create`, {
        method: "POST",
        body: dataToSubmit,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product created successfully!");
        navigate(-1);
      } else {
        toast.error(data.message || "Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full bg-transparent border-b-2 border-zinc-700 text-zinc-200 py-2 text-base focus:outline-none focus:border-emerald-500 transition-colors duration-300";

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <header className="pb-6 mb-8 border-b border-zinc-700">
          <h1 className="text-4xl font-bold text-zinc-100">
            Create a New Product
          </h1>
          <p className="text-zinc-400 mt-2">
            Add a new item to your inventory by filling out the form below.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Product Image
              </label>
              <div className="mt-2 w-full h-80 rounded-lg border-2 border-dashed border-zinc-600 flex items-center justify-center relative bg-zinc-900 overflow-hidden">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {!imagePreview ? (
                  <div className="text-center">
                    <LuUpload className="mx-auto h-12 w-12 text-zinc-500" />
                    <p className="mt-2 text-sm text-zinc-400">
                      <span className="font-semibold text-emerald-500">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      PNG, JPG (max. 5MB)
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-zinc-900/50 rounded-full text-white hover:bg-zinc-900 transition-colors"
                    >
                      <LuX size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputStyle} mt-2`}
                  >
                    <option value="iot">IoT</option>
                    <option value="web dev">Web Dev</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={`${inputStyle} mt-2`}
                />
              </div>
            </div>
          </div>

          <footer className="mt-12 pt-6 border-t border-zinc-700 flex justify-end items-center gap-4">
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
