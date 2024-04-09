import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { getSpecialities } from "../../../services/api/adminRoute";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const { ref, inView } = useInView({ threshold: 0 });
  const navigate = useNavigate();
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 1 });
    } else {
      controls.start({ x: 300 });
    }
  }, [inView, controls]);
  const { data: allSpecialities } = useQuery({
    queryKey: ["all specialities"],
    queryFn: getSpecialities,
  });
  return (
    <>
      <motion.div
        initial={{ x: 700, opacity: 0 }}
        animate={controls}
        transition={{ duration: 1.5 }}
        ref={ref}
      >
        <motion.div className=" w-full mb-10" ref={ref}>
          <div className="cardWrapper w-[85%] m-auto -500 flex flex-wrap">
            {allSpecialities?.slice(0, 3).map((item, i) => (
              <div
              key={i}
                onClick={() => navigate("/Ourdoctors")}
                className="card ml-3  cursor-pointer w-full  md:w-[31%] mt-3  rounded-lg  border-[1px] border-gray-100 flex flex-col gap-5 pb-5"
              >
                <img
                  className="flex-[1] w-[90%] m-auto mt-3"
                  src={item?.image}
                  alt=""
                />
                <div className=" flex-[1] info ml-3 flex flex-col gap-3">
                  <h3 className="text-xl font-bold font-logo">{item?.title}</h3>
                  <p className="font-info  ">{item?.description}</p>
                  <button className=" border-[1px] border-gray-500 rounded-md  w-28 py-2">
                    Read More{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Card;
