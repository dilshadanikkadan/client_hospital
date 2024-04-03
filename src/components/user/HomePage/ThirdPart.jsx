import React, { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ThirdPart = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 300 });
    }
  }, [inView, controls]);
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="wrapper w-full bg-primary h-[30vh] overflow-hidden mt-10  mb-10"
          ref={ref}
        >
          <motion.div
            className="w-[50%] font-info m-auto text-center flex  flex-col gap-5"
            ref={ref}
            initial={{ y: 700, opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xl ">How We help</p>
            <h3 className="text-2xl font-bold font-info md:text-4xl">
              Department And Service
            </h3>
            <p className="font-info">
              Explore our carefully curated list of verified doctors, each
              specializing in various fields of medicine. From cardiology to
              orthopedics, our team of specialists is dedicated to providing
              exceptional healthcare services tailored to your unique needs
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ThirdPart;
