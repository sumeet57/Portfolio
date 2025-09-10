// src/pages/Product.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// This is the new, more compact card component for the grid view.
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg border border-gray-200"
    >
      {/* Image Container */}
      <div className="flex-shrink-0">
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
          {project.image ? (
            <img
              className="h-full w-full object-cover"
              src={project.image}
              alt={project.name}
            />
          ) : (
            <span className="text-gray-500 font-semibold">Project Image</span>
          )}
        </div>
      </div>
      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between bg-white p-5">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            {project.category}
          </p>
          <a href="#" className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 capitalize truncate">
              {project.name}
            </p>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">
              {project.description}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">
            ₹{project.price.toLocaleString("en-IN")}
          </p>
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            View Details &rarr;
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Product = () => {
  // Expanded list of projects with both categories
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fall Detection System",
      description:
        "An IoT device that detects falls and sends emergency alerts to loved ones, ensuring quick assistance.",
      price: 1050,
      image: "",
      category: "IOT",
    },
    {
      id: 2,
      name: "E-commerce Website",
      description:
        "A full-stack web application for an online store with features like product catalog, cart, and payments.",
      price: 1500,
      image: "",
      category: "Web Dev",
    },
    {
      id: 3,
      name: "Smart Home Automation",
      description:
        "Control your home lights, fans, and appliances from anywhere using a mobile app.",
      price: 1200,
      image: "",
      category: "IOT",
    },
    {
      id: 4,
      name: "Portfolio Builder",
      description:
        "A React-based application that allows users to easily create and deploy a professional personal portfolio.",
      price: 950,
      image: "",
      category: "Web Dev",
    },
    {
      id: 5,
      name: "Weather Monitoring Station",
      description:
        "An IoT project that collects and displays real-time weather data like temperature and humidity.",
      price: 800,
      image: "",
      category: "IOT",
    },
    {
      id: 6,
      name: "Task Management App",
      description:
        "A responsive web app to organize tasks, set deadlines, and track your productivity.",
      price: 1100,
      image: "",
      category: "Web Dev",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("IOT");

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <div className="bg-white">
      {/* Hero Section (Unchanged) */}
      <section className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="block text-gray-900">From Concept to Code:</span>
            <span className="block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mt-2">
              Your Next Project Awaits.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
          >
            Accelerate your learning with ready-to-build IoT and Web Development
            projects. We provide complete source code, documentation, and video
            guides to help you build an impressive portfolio.
          </motion.p>
        </div>
      </section>

      {/* NEW: Category Filter Section */}
      <section id="projects" className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveCategory("IOT")}
              className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                activeCategory === "IOT"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              IoT Projects
            </button>
            <button
              onClick={() => setActiveCategory("Web Dev")}
              className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                activeCategory === "Web Dev"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Web Dev Projects
            </button>
          </div>
        </div>
      </section>

      {/* UPDATED: Project Grid Section */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
          >
            <AnimatePresence>
              {filteredProducts.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Product;
