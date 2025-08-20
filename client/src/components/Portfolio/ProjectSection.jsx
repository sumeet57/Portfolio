// client/src/sections/ProjectsSection.jsx
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../stylesheet/glowingHeading.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PortfolioContext } from "../../Context/Portfolio.context.jsx";
import Button from "./utils/Button.jsx";

const ExternalLinkIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 17L17 7M17 17H7M17 7V17" />
  </svg>
);

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

  useGSAP(() => {
    // gsap.registerPlugin(ScrollTrigger);
    // gsap.from("#projects div span", {
    //   y: -50,
    //   opacity: 0,
    //   ease: "power4.inout",
    //   stagger: 0.3,
    //   duration: 0.5,
    //   scrollTrigger: {
    //     trigger: "#projects",
    //     start: "start 40%",
    //     end: "3% 40%",
    //     scrub: 4,
    //     // markers: true,
    //   },
    // });

    window.innerWidth > 768
      ? gsap.from("#projects", {
          scrollTrigger: {
            trigger: "#projects",
            start: "start top",
            end: "100% top",
            scrub: 4,

            pin: true,
            onUpdate: (self) => {
              const smoothProgress = self.progress * 5.2;

              updateGeometryXRotate(smoothProgress);

              const targetProject = personalProjects.reduce((prev, curr) => {
                return Math.abs(curr.id - smoothProgress) <
                  Math.abs(prev.id - smoothProgress)
                  ? curr
                  : prev;
              });

              setActiveProjectId(targetProject.id);
            },
          },
        })
      : "";
  });

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
      className="min-h-screen flex flex-col pt-10 z-10 justify-evenly bg-primary-bg text-text-primary  relative"
    >
      <>
        <div className="w-full flex flex-col font-inter">
          <motion.div
            className="p-4 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {personalProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout // This animates the layout changes, e.g., when the background color changes
                  onClick={() => setActiveProjectId(project.id)}
                  className={`w-full p-6 rounded-2xl cursor-pointer transition-all duration-300
                bg-white/5 backdrop-blur-md border 
                ${
                  activeProjectId === project.id
                    ? "border-accent-1 shadow-lg shadow-accent-1/20"
                    : "border-white/10"
                }`}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-text-primary/80 mt-2 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-accent-1/10 text-accent-1 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-1 hover:underline mt-4 inline-flex items-center gap-2 font-semibold group"
                  >
                    View Project
                    <motion.div
                      transition={{ ease: "easeOut", duration: 0.2 }}
                      variants={{
                        hover: { x: 2, y: -2 },
                      }}
                      whileHover="hover"
                    >
                      <ExternalLinkIcon />
                    </motion.div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </>
    </section>
  );
}
export default ProjectSection;
