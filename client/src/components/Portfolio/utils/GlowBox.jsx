import React from "react";
import { motion } from "framer-motion";

const GlowBox = ({ props }) => {
  return (
    <>
      <div>
        <motion.div
          initial={{ boxShadow: `0 0 100px 70px ${props?.cl}` }}
          animate={{
            boxShadow: `0 0 100px ${props?.expand}px ${props?.cl}`,
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: `${Math.random() * 2 + 1}`,
          }}
          style={{
            display: "inline-block",
            width: "1px",
            height: "1px",
            backgroundColor: "transparent",
            // boxShadow: `0 0 100px 50px ${props?.cl}`,
            borderRadius: "100%",
            border: "none",
          }}
        ></motion.div>
      </div>
    </>
  );
};

export default GlowBox;
