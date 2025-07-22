// client/src/sections/ContactSection.jsx
import React from "react";
import { motion } from "framer-motion";

function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center p-8 rounded-lg bg-secondary-bg shadow-xl"
    >
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-text-primary text-4xl font-bold mb-6 font-inter"
      >
        Get in Touch
      </motion.h2>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6 max-w-lg mx-auto w-full bg-primary-bg p-8 rounded-lg shadow-md border border-accent-1"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-text-secondary text-sm font-bold mb-2 font-inter"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-text-primary leading-tight focus:outline-none focus:shadow-outline bg-secondary-bg border-accent-1 focus:border-accent-2 transition-colors duration-300 font-inter"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-text-secondary text-sm font-bold mb-2 font-inter"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-text-primary leading-tight focus:outline-none focus:shadow-outline bg-secondary-bg border-accent-1 focus:border-accent-2 transition-colors duration-300 font-inter"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-text-secondary text-sm font-bold mb-2 font-inter"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-text-primary leading-tight focus:outline-none focus:shadow-outline bg-secondary-bg border-accent-1 focus:border-accent-2 transition-colors duration-300 font-inter"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-accent-1 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-accent-2 transition-colors duration-300 font-inter"
        >
          Send Message
        </button>
      </motion.form>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <p className="text-text-secondary font-inter">
          You can also reach me at:{" "}
          <a
            href="mailto:your.email@example.com"
            className="text-accent-1 hover:underline font-inter"
          >
            your.email@example.com
          </a>
        </p>
        {/* Add social media links here */}
      </motion.div>
    </section>
  );
}
export default ContactSection;
