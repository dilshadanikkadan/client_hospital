import { useQuery } from "@tanstack/react-query";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getSpecialities } from "../../../services/api/adminRoute";
import { useNavigate } from "react-router-dom";

const CardsService = () => {
  const { inView, ref } = useInView();
  const navigate = useNavigate();
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, translatex: 0, translateY: 0 });
    } else {
      controls.start({ translateX: -100 });
    }
  }, [inView, controls]);

  const { data: allSpecialities } = useQuery({
    queryKey: ["all specialities"],
    queryFn: getSpecialities,
  });
  return (
    <div>
      <motion.div ref={ref} className="w-full  mb-10 mt-10">
        <div className="cardWrapper w-full md:w-[83%]   ml-[18%] flex gap-3  flex-wrap">
          {allSpecialities?.map((item, i) => (
            <motion.div
              initial={{ opacity: 0, translateX: -100, translateY: -100 }}
              animate={controls}
              transition={{ duration: 0.7, delay: i * 0.4 }}
              key={i}
              onClick={() => navigate("/Ourdoctors")}
              className="card ml-10 w-[90%] m-auto cursor-pointer md:m-0  md:w-[32%] rounded-lg  border-[1px] border-gray-100 flex flex-col gap-5 pb-5 mt-10"
            >
              <img
                className="flex-[1] w-[90%] m-auto mt-3"
                src={item?.image}
                alt=""
              />
              <div className=" flex-[1] info ml-3 flex flex-col gap-3">
                <h3 className="text-xl font-bold font-logo">{item?.title}</h3>
                <p className="font-info">{item.description}</p>
                <button className=" border-[1px] border-gray-500 rounded-md  w-28 py-2">
                  Show Doctors{" "}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CardsService;
