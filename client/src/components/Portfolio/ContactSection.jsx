// client/src/sections/ContactSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PortfolioContext } from "../../Context/Portfolio.context";

const MailIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);
const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function ContactSection() {
  const { setCursor } = React.useContext(PortfolioContext);
  const [status, setStatus] = useState("Send Message");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message Sent!");
      setTimeout(() => setStatus("Send Message"), 3000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-fit w-full flex items-center justify-center p-4 sm:p-8 bg-primary-bg text-text-primary font-inter relative overflow-hidden"
    >
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-center z-10">
        <motion.div
          className="lg:w-2/5 w-full flex flex-col items-center text-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mt-4">
            Contact Me
          </h2>
          <p className="text-text-primary my-4 text-lg">
            I'm currently available for freelance work and open to discussing
            new projects.
          </p>
          <a
            href="mailto:your.email@example.com"
            className="flex items-center justify-center gap-2 text-accent-1 hover:underline"
          >
            <MailIcon className="w-5 h-5" />
            <span>sum.pro57@gmail.com</span>
          </a>
          <div className="flex justify-center gap-6 mt-6">
            <a
              onMouseEnter={() => setCursor(true, 1.5)}
              onMouseLeave={() => setCursor(false, 1)}
              href="https://github.com/sumeet57"
              target="_blank"
              className="text-text-primary hover:text-accent-1 transition-colors duration-300"
            >
              <GithubIcon className="w-8 h-8" />
            </a>
            <a
              onMouseEnter={() => setCursor(true, 1.5)}
              onMouseLeave={() => setCursor(false, 1)}
              href="https://www.linkedin.com/in/sumeet-umbalkar/"
              target="_blank"
              className="text-text-primary hover:text-accent-1 transition-colors duration-300"
            >
              <LinkedinIcon className="w-8 h-8" />
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 w-full lg:w-3/5 max-w-lg p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20"
        >
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              className="peer block w-full appearance-none border-b-2 border-accent-1/50 bg-transparent py-3 px-1 text-lg text-text-primary focus:border-accent-2 focus:outline-none"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute left-1 top-3 origin-[0] transform text-lg text-text-primary/80 duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:scale-75 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-accent-2"
            >
              Your Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="peer block w-full appearance-none border-b-2 border-accent-1/50 bg-transparent py-3 px-1 text-lg text-text-primary focus:border-accent-2 focus:outline-none"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-1 top-3 origin-[0] transform text-lg text-text-primary/80 duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:scale-75 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-accent-2"
            >
              Your Email
            </label>
          </div>

          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="peer block w-full appearance-none border-b-2 border-accent-1/50 bg-transparent py-3 px-1 text-lg text-text-primary focus:border-accent-2 focus:outline-none resize-none"
              placeholder=" "
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-1 top-3 origin-[0] transform text-lg text-text-primary/80 duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:scale-75 peer-not-placeholder-shown:-translate-y-8 peer-not-placeholder-shown:scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-accent-2"
            >
              Your Message
            </label>
          </div>

          <motion.button
            onMouseEnter={() => setCursor(true, 1.5)}
            onMouseLeave={() => setCursor(false, 1)}
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(132, 94, 194, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-full bg-accent-1 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-accent-2 transition-all duration-300 text-lg shadow-lg"
          >
            {status}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactSection;
