import React, { useState, useEffect } from "react";

import HomeSection from "../components/Portfolio/HomeSection";
import AboutSection from "../components/Portfolio/AboutSection";
import WorkSection from "../components/Portfolio/WorkSection";
import ProjectSection from "../components/Portfolio/ProjectSection";
import ContactSection from "../components/Portfolio/ContactSection";
import CustomCursor from "../components/Portfolio/utils/CustomCursor";
import CircularText from "../components/Portfolio/utils/CircularText.jsx";
import MenuPage from "../components/Portfolio/utils/MenuPage.jsx";
import { PortfolioContext } from "../Context/Portfolio.context.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const { setCursor } = React.useContext(PortfolioContext);
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="space-y-0 bg-black">
      <div
        onMouseEnter={() => setCursor(true, 3)}
        onMouseLeave={() => setCursor(false, 1)}
        onClick={handleClick}
        className="menu top-2 right-2 fixed z-50 flex items-center justify-center rounded-2xl"
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
      {window.innerWidth > 768 && <CustomCursor />}
    </div>
  );
}

export default Portfolio;
