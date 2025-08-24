// client/src/sections/ContactSection.jsx
import React, { useContext } from "react";
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

const InstagramIcon = (props) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function ContactSection() {
  const { setCursor } = useContext(PortfolioContext);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/sumeet57",
      icon: <GithubIcon className="w-6 h-6" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sumeet-umbalkar/",
      icon: <LinkedinIcon className="w-6 h-6" />,
    },
    {
      name: "Email",
      url: "mailto:sum.pro57@gmail.com",
      icon: <MailIcon className="w-6 h-6" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-text-primary text-text-secondary relative overflow-hidden rounded-t-[100px]"
    >
      <div className="w-full max-w-6xl mx-auto z-10">
        {/* Creative Layout - Diagonal Split */}
        <div className="relative">
          {/* Diagonal Background */}
          <div className="absolute inset-0 bg-secondary-bg transform -skew-y-3 -z-10 rounded-3xl"></div>

          {/* Content */}
          <div className="py-16 px-4 sm:px-12">
            {/* Section Heading */}
            <motion.div
              className="w-full mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Let's Connect
              </h2>
              <p className="text-text-primary/80 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </motion.div>

            {/* Creative Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email Card - Centered */}
              <motion.div
                className="md:col-span-3 flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.a
                  href="mailto:sum.pro57@gmail.com"
                  className="flex items-center gap-4 bg-secondary-bg px-8 py-4 rounded-2xl text-text-primary border border-text-primary/10 hover:border-accent-1/30 transition-all duration-300 group"
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  onMouseEnter={() => setCursor(true, 1.5)}
                  onMouseLeave={() => setCursor(false, 1)}
                >
                  <div className="p-3 bg-accent-1/10 rounded-full group-hover:bg-accent-1/20 transition-colors">
                    <MailIcon className="w-6 h-6 text-text-highlight" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary/60">
                      Get in touch at
                    </p>
                    <p className="font-medium">sum.pro57@gmail.com</p>
                  </div>
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="md:col-span-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-col md:flex-row justify-center gap-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="flex flex-col items-center p-6 bg-secondary-bg rounded-2xl border border-text-primary/10 hover:border-accent-1/30 transition-all duration-300 group"
                      whileHover={{
                        y: -8,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                      onMouseEnter={() => setCursor(true, 1.5)}
                      onMouseLeave={() => setCursor(false, 1)}
                    >
                      <div className="mb-4 p-4 bg-text-primary/5 rounded-full group-hover:bg-accent-1/10 transition-colors">
                        {social.icon}
                      </div>
                      <span className="text-text-primary font-medium">
                        {social.name}
                      </span>
                      <span className="text-xs text-text-primary/60 mt-2">
                        Follow me
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Creative Divider */}
            <motion.div
              className="flex justify-center items-center my-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="h-px w-24 bg-text-primary/20"></div>
              <div className="mx-4 w-2 h-2 bg-accent-1/30 rounded-full"></div>
              <div className="h-px w-24 bg-text-primary/20"></div>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              className="text-center text-text-primary/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <p>Designed and built with ❤️</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-accent-1/20 rounded-full"></div>
      <div className="absolute bottom-1/3 right-16 w-6 h-6 bg-accent-2/20 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-text-primary/10 rounded-full"></div>
    </section>
  );
}

export default ContactSection;
