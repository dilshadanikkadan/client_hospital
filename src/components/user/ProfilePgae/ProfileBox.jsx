import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationIcon from "@mui/icons-material/AddLocation";

const ProfileBox = ({ user }) => {
  return (
    <div className="w-[100%]  lg:w-[30%]  lg:h-[80vh]">
      <div className="wrapper w-full mt-3">
        <h3 className="text-secondary text-3xl font-info  font-semibold">
          User Profile
        </h3>
        <div className="usercard border-[1px] border-gray-200 h-[36vh] md:h-[43vh] mt-3 w-full rounded-lg flex flex-col gap-5">
          <div className="div ml-6 flex   items-center mt-10 gap-5">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
              alt=""
            />
            <input
              disabled
              type="text"
              name=""
              className="font-semibold"
              id=""
              value={user?.username}
            />
          </div>

          <div className="info  ml-6 flex flex-col gap-3">
            <p className="font-info font-semibold">Adress</p>

            <div className="phone flex gap-4">
              <LocalPhoneIcon className="text-secondary" />
              <p className="text-secondary">+9847139243</p>
            </div>
            <div className="phone flex gap-4">
              <EmailIcon className="text-secondary" />
              <p className="text-secondary">{user?.email}</p>
            </div>
            <div className="phone flex gap-4">
              <AddLocationIcon className="text-secondary" />
              <p className="text-secondary">hosptal@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
