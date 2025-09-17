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
          <section className="relative pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl md:text-6xl font-extrabold tracking-tighter"
                >
                  <span className="block">Ace Your Final Year With a</span>
                  <span className="block text-teal-600 mt-2">
                    Premium, Ready-Made Project.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-6 max-w-2xl mx-auto text-lg text-slate-600"
                >
                  Stop stressing and start building. Get complete source code,
                  in-depth documentation, and setup guides for your final year
                  project.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2"
                >
                  <span className="font-semibold text-slate-500">
                    ✓ Full Source Code
                  </span>
                  <span className="font-semibold text-slate-500">
                    ✓ Project Report Included
                  </span>
                  <span className="font-semibold text-slate-500">
                    ✓ Plagiarism-Free
                  </span>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="projects" className="py-16 sm:py-20 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold tracking-tight">
                  Explore Our Projects
                </h2>
                <p className="mt-4 text-lg text-slate-500">
                  Select a category to find the perfect project for your needs.
                </p>
              </div>
              <div className="flex justify-center border-b border-slate-200 mb-12">
                <button
                  onClick={() => setActiveCategory("iot")}
                  className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
                    activeCategory === "iot"
                      ? "border-b-2 border-teal-600 text-teal-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  IoT Projects
                </button>
                <button
                  onClick={() => setActiveCategory("web dev")}
                  className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
                    activeCategory === "web dev"
                      ? "border-b-2 border-teal-600 text-teal-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Web Dev Projects
                </button>
              </div>
              <div>
                {isLoading && (
                  <p className="text-center text-slate-500">
                    Loading projects...
                  </p>
                )}
                {error && (
                  <p className="text-center text-red-500">Error: {error}</p>
                )}
                {!isLoading && !error && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((project) => (
                        <Link
                          to={`/shop/${project._id}`}
                          key={project._id}
                          className="block"
                        >
                          <ProjectCard
                            project={project}
                            backendUrl={backendUrl}
                          />
                        </Link>
                      ))
                    ) : (
                      <p className="col-span-full text-center text-slate-500">
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
