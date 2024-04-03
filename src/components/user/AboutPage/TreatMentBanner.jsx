import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getBanners } from "../../../services/api/adminRoute";
import { useQuery } from "@tanstack/react-query";
const TreatMentBanner = () => {
  const { inView, ref } = useInView();
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ x: -300 });
    }
  }, [inView, controls]);

  const { data: Allbanners } = useQuery({
    queryKey: ["all banners"],
    queryFn: getBanners,
  });
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={controls}
      ref={ref}
      transition={{ duration: 1.5 }}
    >
      {Allbanners?.filter((x) => x.type === "treatment banner").map(
        (item, i) => (
          <div key={i} className="wrapper w-[80%] m-auto mt-10 mb-10">
            <div className="info w-[60%]">
              <h3 className="uppercase text-3xl font-info font-semibold ">
                {item?.title}
              </h3>
            </div>
            <div
              className={`banne mt-10 rounded-2xl w-full h-[40vh] md:h-[60vh] bg-cover bg-center `}
            >
              <img
                src={item?.image}
                className="w-full h-full object-cover rounded-xl"
                alt=""
              />
            </div>
          </div>
        )
      )}
    </motion.div>
  );
};

export default TreatMentBanner;
