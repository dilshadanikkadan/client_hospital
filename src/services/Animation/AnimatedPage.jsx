import React from "react";
import { motion } from "framer-motion";

export const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
const AnimatedPage = ({ children }) => {
  console.log(children);
  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      exit={animations.exit}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
