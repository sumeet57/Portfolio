import React from "react";

const products = [
  {
    id: 1,
    name: "Astro-Glide Mouse",
    price: 100,
    description:
      "Experience zero-gravity precision with our flagship gaming mouse.",
    image: "https://via.placeholder.com/150/1F2937/FFFFFF?text=Product+1",
    category: "Peripherals",
    stock: 10,
  },
  {
    id: 2,
    name: "Cyber-Loom Keyboard",
    price: 200,
    description: "A mechanical keyboard with fully customizable RGB lighting.",
    image: "https://via.placeholder.com/150/1F2937/FFFFFF?text=Product+2",
    category: "Keyboards",
    stock: 20,
  },
  {
    id: 3,
    name: "Quantum Headset",
    price: 300,
    description:
      "Immersive 7.1 surround sound for the ultimate audio experience.",
    image: "https://via.placeholder.com/150/1F2937/FFFFFF?text=Product+3",
    category: "Audio",
    stock: 15,
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-left mb-8">
          Product Management
        </h1>

        {/* Product List Container */}
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            // Product List Item
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-6 shadow-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md flex-shrink-0"
              />

              {/* Product Details */}
              <div className="flex-grow text-center sm:text-left">
                <p className="text-xs text-indigo-400 font-semibold">
                  {product.category}
                </p>
                <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                <p className="text-gray-400 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex justify-center sm:justify-start items-center gap-6">
                  <p className="text-lg font-semibold text-green-400">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
                  View
                </button>
                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-sm font-medium transition-colors">
                  Update
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
