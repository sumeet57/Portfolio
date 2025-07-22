// client/src/sections/HomeSection.jsx
import React from "react";
import { motion } from "framer-motion"; // Framer Motion is imported but not used in this specific GSAP animation
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function HomeSection() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    tl.from(".part1 span", {
      y: (i) => (i % 2 === 0 ? -100 : 100), // Alternate direction for each letter
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
    })
      .from(".part2 span", {
        // y: 300,
        opacity: 0,
        // scale: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      })
      .from(".part3", {
        width: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

    return () => tl.kill();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center p-8
                 rounded-lg bg-primary-bg text-text-primary shadow-xl"
    >
      <div className="part1 w-full flex justify-between text-[10vw] font-extra-style text-text-primary">
        <span>S</span>
        <span>U</span>
        <span>M</span>
        <span>E</span>
        <span>E</span>
        <span>T</span>
      </div>
      <div className="part2 w-full flex justify-between text-[2vw] font-secondary-style text-text-secondary mt-4">
        <span>F</span>
        <span>U</span>
        <span>L</span>
        <span>L</span>
        <span>S</span>
        <span>T</span>
        <span>A</span>
        <span>C</span>
        <span>K</span>
        <span>D</span>
        <span>E</span>
        <span>V</span>
      </div>
      <hr className="part3 w-full mt-2 origin-top-left" />
      {/* Add your CTA buttons or other elements here if desired */}
      {/* For example, from the previous HomeSection suggestion: */}
      {/*
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }} // Adjust delay based on text animation duration
        className="mt-8 flex space-x-4"
      >
        <a href="#work" className="px-6 py-3 bg-accent-1 text-white rounded-full font-bold hover:bg-accent-2 transition-colors duration-300 font-inter">
          View My Work
        </a>
        <a href="#contact" className="px-6 py-3 border-2 border-accent-1 text-accent-1 rounded-full font-bold hover:bg-accent-1 hover:text-white transition-colors duration-300 font-inter">
          Get in Touch
        </a>
      </motion.div>
      */}
    </section>
  );
}
export default HomeSection;
