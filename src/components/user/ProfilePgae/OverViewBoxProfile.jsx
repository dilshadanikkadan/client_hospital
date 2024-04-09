import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
const OverViewBoxProfile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[100%] lg:w-[60%] flex flex-col gap-5  max-h-[100vh] mt-[5%] relative">
        <div className="wrapper w-full border-[1px] h-[28vh] rounded-lg border-gray-200">
          <div className="ingo ml-5 mt-5 flex flex-col gap-3">
            <h3 className="text-xl text-secondary font-semibold ">Wallet</h3>
            <h3 className="text-lg  ">
              Account Balance:{" "}
              <span className="font-semibold"> {user?.accountBalance}</span>
            </h3>
          </div>
        </div>

        <div className="wrapper w-full border-[1px] lg:h-[28vh] pb-5 lg:pb-0 rounded-lg border-gray-200">
          <div className="ingo ml-5 mt-5 flex flex-col gap-3">
            <h3 className="text-xl text-secondary font-semibold ">
              Apppointment
            </h3>
            <div className="div flex flex-col lg:flex-row gap-10">
              <div
                className="w-[80%] lg:w-1/2 border-[1px] flex gap-5 items-center  h-[10vh] rounded-lg border-gray-200"
                onClick={() => navigate("/appointmentHistory")}
              >
                <ShoppingBagIcon className="text-2xl ml-5" />
                <p>Apppointment</p>
              </div>

              <div
                className="w-[80%] lg:w-1/2 border-[1px] flex gap-5 items-center  h-[10vh] rounded-lg border-gray-200 mr-10 "
                onClick={() => navigate("/Ourdoctors")}
              >
                <GroupAddIcon className="text-2xl ml-5" />
                <p>Doctors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverViewBoxProfile;
