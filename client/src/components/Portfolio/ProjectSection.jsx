// client/src/sections/ProjectsSection.jsx
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../stylesheet/glowingHeading.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PortfolioContext } from "../../Context/Portfolio.context.jsx";
import Button from "./utils/Button.jsx";

const personalProjects = [
  {
    id: 1,
    title: "Tambola Multiplayer Game",
    description:
      "A multiplayer Tambola game with real-time updates, user authentication, and a leaderboard created for a client.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "https://tambolatesting.vercel.app/",
  },
  {
    id: 3.1,
    title: "Job Board",
    description:
      "A job board platform for posting and applying to jobs, with user authentication and search functionality.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/sumeet57/JobBoard-MERN",
  },
  {
    id: 5.2,
    title: "Resume Builder",
    description:
      "A web app to create and download resumes in various formats, with customizable templates.",
    tech: ["React", "Node.js", "Express", "PDFKit"],
    link: "https://sumeet57-resumebuilder.netlify.app/",
  },
];

function ProjectSection() {
  const { updateGeometryXRotate, setCursor } = useContext(PortfolioContext);
  const [activeProjectId, setActiveProjectId] = useState(
    personalProjects[0].id
  );

  const activeProject = personalProjects.find((p) => p.id === activeProjectId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  return (
    <section
      id="projects"
      className="min-h-screen flex pt-10 z-10 justify-evenly bg-primary-bg text-text-primary relative"
    >
      {/* This outer div can just be a simple container now */}
      <div className="w-full">
        {/* 👇 MOVED a few classes HERE! */}
        <motion.div
          className="p-4 flex flex-wrap justify-center gap-4" // ✅ Correct: flex properties are on the parent of the mapped items
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {personalProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout // This animates the layout changes
                onClick={() => setActiveProjectId(project.id)}
                className={`w-fit p-6 rounded-2xl cursor-pointer transition-all duration-300
                bg-secondary-bg backdrop-blur-md border`}
              >
                <h3 className="text-[5vw]  font-bold text-text-primary">
                  {project.title}
                </h3>
                <p className="text-[3.5vw] text-text-primary/80 mt-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[3vw] bg-accent-1/10 text-text-highlight font-semibold px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <div className="mt-6">
                    <Button text="View Project" link={project.link} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* The empty fragment `<></>` is not necessary here, so I've removed it */}
    </section>
  );
}
export default ProjectSection;
