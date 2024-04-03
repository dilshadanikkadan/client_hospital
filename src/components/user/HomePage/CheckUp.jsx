import { useQuery } from "@tanstack/react-query";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getBanners } from "../../../services/api/adminRoute";
const CheckUp = () => {
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
    <>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={controls}
        ref={ref}
        transition={{ duration: 1.5 }}
      >
        {Allbanners?.filter((x) => x.type === "check up banner").map((item) => (
          <div className="wrapper w-[83%] h-[100vh] md:h-[80vh] lg:h-[100vh] mt-10 flex flex-col md:flex-row m-auto">
            <div className="left flex-[1] flex h-full items-center justify-center">
              <img
                className="h-[60%]    md:h-[50%] xl:h-[60%] object-cover"
                src={item?.image}
                alt=""
              />
            </div>
            <div className="right flex-[1] flex  justify-center flex-col gap-1 ml-5">
              <p className="w-36 py-1 bg-slate-200 px-2 rounded-md text-center">
                Health Equity
              </p>
              <h3 className="font-info text-4xl">{item?.title}</h3>

              <div className="card w-[70%] font-desc hidden xl:flex flex-col  gap-5 mt-5">
                <h3 className="title text-2xl ">Medical Best Treatment</h3>
                <p>
                  With a focus on excellence, we offer a wide range of medical
                  treatments spanning various specialties, including but not
                  limited to internal medicine, surgery, pediatrics, obstetrics
                  and gynecology, dermatology, and more
                </p>
              </div>

              <div className="card w-[70%] font-desc flex flex-col  gap-5 mt-5">
                <h3 className="title text-2xl  capitalize">medical facility</h3>
                <p>
                  At our medical facility, we believe in empowering our patients
                  with knowledge and resources to make informed decisions about
                  their health.
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default CheckUp;
