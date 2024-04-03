import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Boxes = () => {
  const { inView, ref } = useInView();
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ x: -300 });
    }
  }, [inView, controls]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={controls}
      ref={ref}
      transition={{ duration: 1.5 }}
    >
      <div className="cardContainer w-[80%]  md:h-[30vh] items-center justify-center m-auto flex  flex-wrap gap-5">
        <div className="card font-info rounded-xl py-8 w-[80%] md:w-[30%] bg-[#86AFCA] flex items-center justify-center flex-col gap-3">
          <p className="text-2xl font-bold">850</p>
          <p className="font-normal text-xl">Verified Physicians</p>
          <p className="font-normal">Highly verified</p>
        </div>

        <div className="card font-info rounded-xl py-8 w-[80%] md:w-[30%]  bg-[#86AFCA] flex items-center justify-center flex-col gap-3">
          <p className="text-2xl font-bold">850</p>
          <p className="font-normal text-xl">Verified Physicians</p>
          <p className="font-normal">Highly verified</p>
        </div>
        <div className="card font-info rounded-xl py-8 w-[80%] md:w-[30%]  bg-[#86AFCA] flex items-center justify-center flex-col gap-3">
          <p className="text-2xl font-bold">850</p>
          <p className="font-normal text-xl">Verified Physicians</p>
          <p className="font-normal">Highly verified</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Boxes;
