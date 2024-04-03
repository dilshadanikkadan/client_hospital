import React from "react";
import SideBar from "../../components/admin/SideBar";
import ReviewDoctor from "../../components/admin/SingleDoctorPending/ReviewDoctor";

const SinglePendingDoctor = () => {
  return (
    <div className="flex w-full">
      <SideBar />

      <div className="div w-[80%] ">
        <ReviewDoctor />
      </div>
    </div>
  );
};

export default SinglePendingDoctor;
