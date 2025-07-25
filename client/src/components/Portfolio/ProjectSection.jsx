// client/src/sections/ProjectsSection.jsx
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TorusScene from "./utils/TorusScene";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../stylesheet/glowingHeading.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PortfolioContext } from "../../Context/Portfolio.context.jsx";

const personalProjects = [
  {
    id: 1,
    title: "Tambola Multiplayer Game",
    description:
      "A multiplayer Tambola game with real-time updates, user authentication, and a leaderboard created for a client.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "#", // Placeholder link
  },
  {
    id: 3.1,
    title: "Job Board",
    description:
      "A job board platform for posting and applying to jobs, with user authentication and search functionality.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    link: "#", // Placeholder link
  },
  {
    id: 5.2,
    title: "Resume Builder",
    description:
      "A web app to create and download resumes in various formats, with customizable templates.",
    tech: ["React", "Node.js", "Express", "PDFKit"],
    link: "#", // Placeholder link
  },
];

function ProjectSection() {
  const { updateGeometryXRotate } = useContext(PortfolioContext);
  const [activeProjectId, setActiveProjectId] = useState(
    personalProjects[0].id
  );

  const activeProject = personalProjects.find((p) => p.id === activeProjectId);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#projects div span", {
      y: -50,
      opacity: 0,
      ease: "power4.inout",
      stagger: 0.3,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#projects",
        start: "start 40%",
        end: "3% 40%",
        scrub: 4,
        // markers: true,
      },
    });

    gsap.from("#projects", {
      scrollTrigger: {
        trigger: "#projects",
        start: "start top",
        end: "100% top",
        scrub: 4,
        markers: true,
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
    });
  });
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col pt-10 justify-evenly bg-primary-bg text-text-primary shadow-xl relative"
    >
      <div className=" w-full h-fit flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              className="w-full flex flex-col p-2 lg:p-8  font-primary-style border-accent-2 text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[6vw] lg:text-[3vw] font-bold font-extra-style mb-2">
                {activeProject.title}
              </h3>
              <p className="mb-4">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-accent-1/20 text-accent-1 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full h-[70vh]">
        <TorusScene />
      </div>
    </section>
  );
}
export default ProjectSection;
