// client/src/sections/HomeSection.jsx
import React from "react";
import { motion } from "framer-motion"; // Framer Motion is imported but not used in this specific GSAP animation
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function HomeSection() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });

    tl.from(".part1 span", {
      // x: -300,
      opacity: 0,
      ease: "power2.out",
      stagger: 0.1,
    })
      .from(".part2", {
        width: 0,
        ease: "power4.in",
        delay: -0.7,
      })
      .from(
        ".part3 span",
        {
          y: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "power2.out",
          duration: 0.2,
        },
        "<" // Aligns with the end of the previous animation
      );

    return () => tl.kill();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-start text-center p-8
                 bg-primary-bg text-text-primary shadow-xl"
    >
      <div className="w-full flex flex-col">
        <div className="part1 w-full flex justify-start text-[15vw] lg:text-[10vw] uppercase  font-extra-style text-text-secondary">
          <span className="leading-[9vw]">s</span>
          <span className="leading-[9vw]">u</span>
          <span className="leading-[9vw]">m</span>
          <span className="leading-[9vw]">e</span>
          <span className="leading-[9vw]">e</span>
          <span className="leading-[9vw]">t</span>
        </div>
        <div className="part3 w-full flex justify-start gap-2 text-[2vw] leading-none font-secondary-style text-text-secondary">
          <span>F</span>
          <span>U</span>
          <span>L</span>
          <span>L</span>
          <span>S</span>
          <span>T</span>
          <span>A</span>
          <span>C</span>
          <span>K</span>
          <span> </span>
          <span>D</span>
          <span>E</span>
          <span>V</span>
        </div>
      </div>
      <div className="w-full h-screen bg-accent-1"></div>
    </section>
  );
}
export default HomeSection;
