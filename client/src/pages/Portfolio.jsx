// client/src/pages/Portfolio.jsx
import React from "react";

// Import your individual portfolio sections
import HomeSection from "../components/Portfolio/HomeSection";
import AboutSection from "../components/Portfolio/AboutSection";
import WorkSection from "../components/Portfolio/WorkSection";
import ProjectSection from "../components/Portfolio/ProjectSection";
import ContactSection from "../components/Portfolio/ContactSection";

function Portfolio() {
  return (
    <div className="space-y-16">
      {" "}
      {/* Add spacing between sections */}
      <HomeSection />
      <AboutSection />
      <WorkSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
}

export default Portfolio;
