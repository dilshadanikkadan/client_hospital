import React from "react";
import SideBar from "../../components/admin/SideBar";
import Box from "../../components/admin/DashBoard/Box";
import Updates from "../../components/admin/DashBoard/Updates";
import UserGraph from "../../components/admin/Analaystics/UserGraph";

const Dashboard = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-[80%]">
        <Box />
        <div className="w-[65%] ml-5 ">
          <UserGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
