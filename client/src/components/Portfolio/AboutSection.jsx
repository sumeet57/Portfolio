// client/src/sections/AboutSection.jsx
import React from "react";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center p-8 rounded-lg bg-secondary-bg shadow-xl"
    >
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-text-primary text-4xl font-bold mb-6 font-inter"
      >
        About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-text-secondary text-lg leading-relaxed font-inter"
      >
        I'm a passionate MERN stack developer with a knack for building
        responsive and user-friendly web applications. My journey in tech began
        with a curiosity for how things work, evolving into a drive to create
        impactful digital solutions. I thrive on challenging myself with new
        technologies and constantly improving my craft.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-text-secondary text-lg leading-relaxed mt-4 font-inter"
      >
        Beyond coding, I enjoy exploring new design patterns, contributing to
        open-source projects, and staying updated with the latest industry
        trends. I believe in clean code, efficient solutions, and a
        collaborative spirit.
      </motion.p>
    </section>
  );
}
export default AboutSection;
