import React from "react";
import SideBar from "../../components/admin/SideBar";
import LicenseList from "../../components/admin/LicenseList";

const LicensePage = () => {
  return (
    <div className="w-full flex">
      <SideBar />
      <div className="div w-[80%]">
        <LicenseList />
      </div>
    </div>
  );
};

export default LicensePage;
