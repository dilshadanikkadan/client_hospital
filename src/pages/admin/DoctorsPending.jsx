import React from "react";
import SideBar from "../../components/admin/SideBar";
import DoctorSearchInput from "../../components/admin/DoctorPending/DoctorSearchInput";
import DoctorPendingList from "../../components/admin/DoctorPending/DoctorPendingList";

const DoctorsPending = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-[80%]">
        <DoctorPendingList />
      </div>
    </div>
  );
};

export default DoctorsPending;
