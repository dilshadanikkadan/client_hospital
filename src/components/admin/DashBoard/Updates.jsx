import React from "react";

const Updates = () => {
  return (
    <>
      <div className="wrapper w-[82%] mx-auto  mt-10">
        <h3 className="text-2xl font-semibold font-info capitalize">
          Latest Updates
        </h3>
        <div className="user flex  gap-10 items-center mt-10">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
            alt=""
          />
          <p className="text-lg  font-semibold">You Added a New Pateint</p>
        </div>
        <div className="user flex  gap-10 items-center mt-7">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
            alt=""
          />
          <p className="text-lg  font-semibold">You Added a New Pateint</p>
        </div>
      </div>
    </>
  );
};

export default Updates;
