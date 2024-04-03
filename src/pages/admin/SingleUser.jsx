import React from "react";
import SideBar from "../../components/admin/SideBar";
import UserProfile from "../../components/admin/userList/UserProfile";
import UserOverView from "../../components/admin/userList/UserOverView";
import { useQuery } from "@tanstack/react-query";
import { singleuser } from "../../services/api/adminRoute";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="div w-[80%] ">
        <UserProfile />
        <UserOverView />
      </div>
    </div>
  );
};

export default SingleUser;
