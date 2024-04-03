import React from "react";
import SideBar from "../../components/admin/SideBar";
import AllSpecialities from "../../components/admin/Spcialities/AllSpecialities";
import SpecialityForm from "../../components/admin/Spcialities/SpecialityForm";

const SpecialitiesPage = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-[80%] flex">
        <AllSpecialities />
        <SpecialityForm />
      </div>
    </div>
  );
};

export default SpecialitiesPage;
