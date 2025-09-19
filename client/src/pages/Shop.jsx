import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Shop/Header.jsx";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const ProjectCard = ({ project, backendUrl }) => {
  const correctedImageUrl = project.imageUrl
    ? project.imageUrl.replace(/\\/g, "/")
    : "";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="flex-shrink-0">
        <div className="h-56 w-full bg-slate-200 flex items-center justify-center overflow-hidden">
          {project.imageUrl ? (
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={`${backendUrl}/${correctedImageUrl}`}
              alt={project.name}
            />
          ) : (
            <span className="text-slate-500 font-semibold">No Image</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-800 capitalize">
            {project.name}
          </p>
          <p className="mt-2 text-base text-slate-500 line-clamp-3">
            {project.description}
          </p>
        </div>
        <div className="mt-6">
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-sm font-semibold text-slate-500 mb-2">
              What's Included:
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {project.includes?.map((item) => (
                <span key={item} className="text-sm text-teal-700 font-medium">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-3xl font-extrabold text-slate-900">
              ₹{project.price.toLocaleString("en-IN")}
            </p>
            <span className="rounded-full bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-teal-600">
              View Project
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("iot");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === activeCategory
  );

  return (
    <div className="bg-zinc-900 text-slate-50">
      <Header />
      {location.pathname === "/shop" ? (
        <>
          <section
            id="projects"
            className="py-16 sm:py-20 bg-zinc-900 text-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold tracking-tight">
                  Explore Our Projects
                </h2>
                <p className="mt-4 text-lg text-zinc-400">
                  Select a category to find the perfect project for your needs.
                </p>
              </div>
              <div className="flex justify-center border-b border-zinc-700 mb-12">
                <button
                  onClick={() => setActiveCategory("iot")}
                  className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
                    activeCategory === "iot"
                      ? "border-b-2 border-teal-500 text-teal-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  IoT Projects
                </button>
                <button
                  onClick={() => setActiveCategory("web dev")}
                  className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
                    activeCategory === "web dev"
                      ? "border-b-2 border-teal-500 text-teal-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Web Dev Projects
                </button>
              </div>
              <div>
                {isLoading && (
                  <p className="text-center text-zinc-400">
                    Loading projects...
                  </p>
                )}
                {error && (
                  <p className="text-center text-red-500">Error: {error}</p>
                )}
                {!isLoading && !error && (
                  <div className="space-y-8 max-w-4xl mx-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((project) => (
                        <Link
                          to={`/shop/${project._id}`}
                          key={project._id}
                          className="block group"
                        >
                          <div className="relative bg-zinc-800 rounded-2xl p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-teal-900/50 overflow-hidden flex items-center gap-6">
                            {project.stock <= 0 && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                                <span className="bg-red-600 text-white font-bold py-1 px-4 rounded-md text-sm tracking-wider">
                                  OUT OF STOCK
                                </span>
                              </div>
                            )}

                            <div className="flex-shrink-0">
                              <img
                                src={`${backendUrl}/${project.imageUrl}`}
                                alt={project.name}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-zinc-700"
                              />
                            </div>

                            <div className="flex-grow flex flex-col self-stretch">
                              <h3 className="text-xl md:text-2xl font-bold text-teal-400">
                                {project.name}
                              </h3>
                              <p className="text-zinc-400 text-sm md:text-base mt-2 flex-grow">
                                {project.projectContext}
                              </p>
                              <div className="mt-4 flex justify-between items-center">
                                <p className="text-lg md:text-xl font-semibold text-white">
                                  ₹{project.price}
                                </p>
                                <span className="hidden sm:inline-block bg-teal-600/80 text-white py-2 px-5 rounded-lg text-sm font-semibold transition-colors group-hover:bg-teal-600">
                                  View Project
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="col-span-full text-center text-zinc-500">
                        No projects found in this category.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
};

export default Shop;
