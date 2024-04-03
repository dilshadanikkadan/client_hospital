import React from "react";
import Navbar from "../user/HomePage/Navbar";

const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="wrapper w-[85%] mx-auto flex flex-col md:flex-row h-[85vh]">
        <div className="left flex-[1] ">
          <div className="error flex flex-col gap-4 mt-10 ml-10">
            <img className="h-[30%] w-[50%]" src="images/404.png" alt="" />
            <p className="font-semibold capitalize ">
              Oops Sorry page does not found
            </p>
            <button className="py-2 w-[40%] md:w-[23%] bg-secondary text-white rounded-lg mt-5">
              Go Back Home
            </button>
          </div>
          <div className="cat mt-10 ml-0 md:ml-10">
            <img className="h-[10%] hidden md:block md:h-[30%]" src="images/cat404.jpg" alt="" />
          </div>
        </div>
        <div className="right flex-[1] overflow-hidden">
          <img
            className="h-[90%] object-cover"
            src="images/doctot404.jpg"
            alt="doctor"
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
