// client/src/sections/AboutSection.jsx
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../stylesheet/glowingHeading.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedWordPhrase from "./utils/AnimatedWordPhrase";
import { PortfolioContext } from "../../Context/Portfolio.context.jsx";
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Interactive 3D Web Development",
    img: "./About1img.png",
  },
  {
    id: 2,
    title: "full-stack Development",
    img: "./About2img.png",
  },
  {
    id: 3,
    title: "Performance Optimization",
    img: "./About3img.png",
  },
  {
    id: 4,
    title: "Final Year Project",
    img: "./About4img.png",
  },
];

function AboutSection() {
  const { setCursor } = useContext(PortfolioContext);

  return (
    <section
      id="about"
      className="h-fit flex flex-col bg-primary-bg text-text-primary shadow-xl lg:p-8 p-2"
    >
      <div className="w-full h-fit flex  items-center leading-none uppercase font-extra-style text-text-primary">
        <motion.span
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          exit={{ opacity: 0, x: -100 }}
          className="gt capitalize text-[8vw] lg:text-[5vw] py-8"
        >
          What we Provide
        </motion.span>
      </div>
      <div
        style={{
          WebkitTextStroke: "1px white",
          textStroke: "1px #000",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          color: "transparent",
        }}
        className="w-full text-[6vw] lg:text-[2vw] flex py-0 lg:py-4 opacity-50 italic font-primary-style"
      >
        We build innovative digital products that solve real-world problems.
      </div>

      <div className="w-full h-fit flex flex-col">
        {services.map((s, key) => (
          <div
            key={key}
            onMouseEnter={() => {
              setCursor(true, 1, true, s.img);
            }}
            onMouseLeave={() => {
              setCursor(false, 1);
            }}
            className="flex justify-start items-center text-[5vw] lg:text-[3vw] border-b-2 border-accent-1 font-secondary-style hover:italic hover:text-text-highlight px-4 py-12 z-20"
          >
            {s.title}
          </div>
        ))}
      </div>
    </section>
  );
}
export default AboutSection;
