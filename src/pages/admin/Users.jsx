import React from "react";
import SideBar from "../../components/admin/SideBar";
import UserSearchInput from "../../components/admin/userList/UserSearchInput";
import UserListBox from "../../components/admin/userList/UserListBox";

const Users = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="div w-[80%]">
        <UserSearchInput />
      </div>
    </div>
  );
};

export default Users;
