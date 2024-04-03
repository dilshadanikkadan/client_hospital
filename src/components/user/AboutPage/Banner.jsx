import React from "react";
const Banner = () => {
  return (
    <div>
      <div
        className={`banner  flex flex-col justify-center relative h-[50vh] bg-cover bg-center  bg-[url(/images/breadcamb.jpg)]`}
      >
        <h3 className="text-4xl text-white font-info uppercase font-semibold  ml-[7%] z-10">
          About us
        </h3>
        <p className="text-xl text-white font-info uppercase font-normal  ml-[7%] z-10">
          Home | About
        </p>
        <div className="bg absolute top-0 w-full h-full bg-[rgba(27,166,212,0.20)]"></div>
      </div>
    </div>
  );
};

export default Banner;
