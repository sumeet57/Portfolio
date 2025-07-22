// client/src/sections/ProjectsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const personalProjects = [
  {
    id: 1,
    title: "Smart Todo App",
    description:
      "A full-stack todo application with user authentication and real-time updates.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#", // Placeholder link
  },
  {
    id: 2,
    title: "Recipe Finder",
    description:
      "A React app consuming a recipe API, with filtering and search functionalities.",
    tech: ["React", "API", "Tailwind CSS"],
    link: "#", // Placeholder link
  },
];

function ProjectSection() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center p-8 rounded-lg bg-secondary-bg shadow-xl"
    >
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-text-primary text-4xl font-bold mb-6 font-inter"
      >
        My Personal Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-primary-bg p-6 rounded-lg shadow-md border border-accent-2 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-accent-2 text-2xl font-semibold mb-2 font-inter">
                {project.title}
              </h3>
              <p className="text-text-primary mb-4 font-inter">
                {project.description}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-2 font-inter">
                **Tech:** {project.tech.join(", ")}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-accent-1 text-white rounded-md hover:bg-accent-2 transition-colors duration-300 font-inter"
              >
                View Project
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-text-secondary text-lg mb-4 font-inter">
          Looking for ready-made final year projects?
        </p>
        <Link
          to="/store"
          className="px-8 py-4 bg-accent-2 text-white rounded-full text-xl font-bold hover:bg-accent-1 transition-colors duration-300 font-inter"
        >
          Visit My Project Store
        </Link>
      </motion.div>
    </section>
  );
}
export default ProjectSection;
