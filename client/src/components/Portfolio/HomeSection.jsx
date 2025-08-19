// client/src/sections/HomeSection.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "../../stylesheet/glowingHeading.css";
import AnimatedWordPhrase from "./utils/AnimatedWordPhrase";
import { PortfolioContext } from "../../Context/Portfolio.context";
import Button from "./utils/Button.jsx";
import InfiniteScrollingPhrase from "./utils/InfiniteScrollingPhrase.jsx";

function HomeSection() {
  const { setCursor } = useContext(PortfolioContext);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".part1 h1 span", {
      opacity: 0,
      filter: "blur(2px)",
      stagger: 0.2,
      ease: "power4.out", // A smooth ease-out often feels best for this
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="custom-bg-u min-h-screen flex flex-col items-center justify-center text-center p-2 lg:p-8 relative
               bg-primary-bg text-text-primary rounded-b-[100px]"
    >
      <motion.span
        initial={{ top: "-100px" }} // The starting position (hidden above)
        animate={{ top: "0px" }} // The final position (in its natural spot)
        transition={{ duration: 2, ease: "easeInOut" }}
        className="imspan absolute top-0 left-0 bg-primary-bg p-4 text-3xl uppercase font-secondary-style"
      >
        I'm
      </motion.span>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="part1 text-[2vw] capitalize text-primary-bg font-primary-style tracking-wider">
          <h1>
            <span className="spn gh text-[5vw] inline-block">S</span>
            <span className="spn gh text-[5vw] inline-block">u</span>
            <span className="spn gh text-[5vw] inline-block">m</span>
            <span className="spn gh text-[5vw] inline-block">e</span>
            <span className="spn gh text-[5vw] inline-block">e</span>
            <span className="spn gh text-[5vw] inline-block">t</span>
          </h1>
          <h2 className="text-2xl p-2 font-extra-style uppercase tracking-wider">
            a full-stack developer
          </h2>
        </div>
        <div className="text-[4vw] lg:text-[1.5vw] font-primary-style text-center p-10 text-text-highlight w-3/5">
          <AnimatedWordPhrase phrase="Engineering Elegance, Building Brilliance: We Specialize in Creating Robust, Responsive, and Radically Engaging Web Platforms for the Modern Digital Frontier." />
        </div>
      </div>
    </section>
  );
}
export default HomeSection;
