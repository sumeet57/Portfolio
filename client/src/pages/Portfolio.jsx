// client/src/pages/Portfolio.jsx
import React from "react";

// Import your individual portfolio sections
import HomeSection from "../components/Portfolio/HomeSection";
import AboutSection from "../components/Portfolio/AboutSection";
import WorkSection from "../components/Portfolio/WorkSection";
import ProjectSection from "../components/Portfolio/ProjectSection";
import ContactSection from "../components/Portfolio/ContactSection";
import CustomCursor from "../components/Portfolio/utils/CustomCursor";
import CircularText from "../components/Portfolio/utils/CircularText.jsx";
import MenuPage from "../components/Portfolio/utils/MenuPage.jsx";
import { PortfolioContext } from "../Context/Portfolio.context.jsx";

function Portfolio() {
  const { setCursor } = React.useContext(PortfolioContext);
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div className="space-y-0">
      {" "}
      {/* Add spacing between sections */}
      <div
        onMouseEnter={() => setCursor({ isOn: true, size: 2 })}
        onMouseLeave={() => setCursor({ isOn: false, size: 1 })}
        onClick={handleClick}
        className="menu w-[10vw] h-[10vw] top-2 right-2 fixed z-50 flex items-center justify-center bg-accent-1 rounded-full "
      >
        <CircularText />
      </div>
      {clicked && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 z-40">
          <MenuPage />
        </div>
      )}
      <HomeSection />
      <AboutSection />
      <ProjectSection />
      <ContactSection />
      <CustomCursor />
    </div>
  );
}

export default Portfolio;
