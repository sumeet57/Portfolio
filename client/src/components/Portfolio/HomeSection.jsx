// client/src/sections/HomeSection.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion"; // Framer Motion is imported but not used in this specific GSAP animation
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "../../stylesheet/glowingHeading.css";
import AnimatedWordPhrase from "./utils/AnimatedWordPhrase";
import GlowBox from "./utils/GlowBox";
import { PortfolioContext } from "../../Context/Portfolio.context";
import Button from "./utils/Button.jsx";
import InfiniteScrollingPhrase from "./utils/InfiniteScrollingPhrase.jsx";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, TorusGeometry } from "three";
import TorusScene from "./utils/TorusScene.jsx"; // Assuming you have a TorusScene component
import TorusKnot from "./utils/TorusKnot.jsx";

function HomeSection() {
  const { setCursor } = useContext(PortfolioContext);
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });

    tl.from(".part1 span", {
      y: -100,
      opacity: 0,
      ease: "power4.inout",
      stagger: 0.3,
      duration: 0.5,
    }).from(
      ".part2 h2",
      {
        rotateX: -100,
        opacity: 0,
        transformOrigin: "top",
        ease: "power4.inout",
        duration: 0.5,
      },
      "<"
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-start text-center p-2 lg:p-8 relative
                 bg-primary-bg text-text-primary shadow-xl"
    >
      <div className="w-full flex flex-col">
        <div className="part1 w-full h-fit flex justify-start text-[15vw] lg:text-[10vw] uppercase  font-secondary-style text-text-secondary">
          <span className="gh">sumeet</span>
        </div>
        <div className="part2 relative h-fit  overflow-hidden">
          <h2 className=" text-[6vw] lg:text-[3vw] capitalize font-extra-style font-light mt-2 text-left">
            Full-Stack Developer
          </h2>
        </div>
        <div className="text-[4vw] lg:text-[2vw] h-[35vh] font-primary-style tracking-wider text-text-primary w-full lg:w-[70%] text-left mt-6">
          <AnimatedWordPhrase phrase="Engineering Elegance, Building Brilliance: We Specialize in Creating Robust, Responsive, and Radically Engaging Web Platforms for the Modern Digital Frontier." />
        </div>
        {/* <div className="part4 w-full fixed bottom-0 left-0  text-text-primary text-[4vw] lg:text-[2vw] flex gap-4 justify-start items-center font-extra-style mt-4 overflow-hidden whitespace-nowrap">
          <InfiniteScrollingPhrase /> 
        </div> */}

        <div className="w-full h-[40vh]  lg:h-full flex items-center justify-between ">
          <div
            className="w-1/2 items-center gap-4
            lg:flex hidden
          "
          >
            <Button text="Resume" link="https://sumeet.codes" />
            <Button text="Connect" link="https://github.com/sumeet57" />
          </div>
          <div className="w-full h-full justify-center items-center lg:hidden flex">
            {window.innerWidth < 768 && <TorusKnot />}
          </div>
        </div>
      </div>
    </section>
  );
}
export default HomeSection;
