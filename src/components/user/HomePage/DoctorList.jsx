import { useQuery } from "@tanstack/react-query";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllDoctors } from "../../../services/api/userRoute";
import { Link } from "react-router-dom";

const DoctorList = ({ searchTerm }) => {
  let newSearchValue = searchTerm;
  if (newSearchValue === undefined) {
    newSearchValue = "";
  }
  // console.log( "newserch value is  :"+newSearchValue);
  const { inView, ref } = useInView();
  const controls = useAnimation();
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ x: 300 });
    }
  }, [inView, controls]);

  const { data: allDoctors } = useQuery({
    queryKey: ["allDoctors"],
    queryFn: getAllDoctors,
  });

  useEffect(() => {
    if (allDoctors) {
      const filtered = allDoctors.filter((doctor) =>
        doctor?.speciality
          ?.toLowerCase()
          .includes(newSearchValue?.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [allDoctors, searchTerm]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={controls}
        ref={ref}
        transition={{ duration: 1.5 }}
      >
        <div
          className={`${
            searchTerm === undefined ? "w-[83%]" : "w-[100%]"
          } m-auto mt-10 flex flex-col items-center pb-10`}
        >
          <div className="info w-[90%] md:w-[60%]">
            <h3 className="title text-center text-4xl">Our Doctors</h3>
            <p className="hidden md:block text-xl text-center mt-5">
              Our hospital proudly presents a curated list of verified doctors,
              each dedicated to providing exceptional healthcare services{" "}
            </p>
          </div>
          <div className="listContainer w-full flex gap-5 mt-10 flex-wrap">
            {filteredDoctors.map((doctor, i) => (
              <Link
                to={`/allDoctors/${doctor._id}`}
                key={i}
                className="card rounded-3xl w-full md:w-[28%] xl:w-[23%] h-[53vh] sm:h-[63vh] md:h-[58vh] xl:h-[62vh] bg-[#ECEFF2] gap-3 flex flex-col items-center justify-center"
              >
                <img
                  className="h-[70%] w-[85%] object-center rounded-xl object-cover"
                  src={doctor?.profileImage}
                  alt=""
                />
                <h3 className="name text-info  font-semibold text-xl font-info capitalize">
                  {doctor?.lastname}
                </h3>
                <p className="capitalize">{doctor?.speciality}</p>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DoctorList;
