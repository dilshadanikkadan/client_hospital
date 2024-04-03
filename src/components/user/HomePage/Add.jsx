import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Add = () => {
  const { inView, ref } = useInView();
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ x: 300 });
    }
  }, [inView, controls]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={controls}
        ref={ref}
        transition={{ duration: 1.5 }}
      >
        <div className="wrapper  w-[83%] h-[30vh] m-auto  flex items-center justify-center">
          <div className="info w-[90%] md:w-[50%]">
            <p className="text-3xl md:text-4xl font-desc font-normal text-center capitalize">
              We have Dcotors with several With Potenital
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Add;
