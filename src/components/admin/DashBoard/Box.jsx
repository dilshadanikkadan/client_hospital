import React from "react";
import AccountBalance from "../Analaystics/AccountBalance";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/api/adminRoute";
import { getAllDoctors } from "../../../services/api/userRoute";

const Box = () => {
    
  const {
    data: allUsers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { data: allDoctors } = useQuery({
    queryKey: ["allDoctors"],
    queryFn: getAllDoctors,
  });
  return (
    <>
      <div className="wrapper  w-[90%] ml-auto mr-auto  h-[40vh] flex flex-col  justify-center gap-7">
        <p className="ml-10 mt-10 font-info text-xl font-semibold">Over View</p>

        <div className="flex w-full gap-7 ">
          <div className="box rounded-lg mt-10 shadow-md flex-[1] h-40  ml-10">
            <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">
              <h3 className="text-lg font-semibold">Total Patients</h3>
              <p className="text-lg font-semibold">
                {allUsers?.userData?.length}
              </p>
              <p className="text-green-500  font-semibold">+25</p>
            </div>
          </div>
          <div className="box rounded-lg shadow-md flex-[1] h-40  mt-10">
            <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">
              <h3 className="text-lg font-semibold">Total Doctors</h3>
              <p className="text-lg font-semibold">{allDoctors?.length}</p>
              <p className="text-green-500  font-semibold">+25</p>
            </div>
          </div>
          <AccountBalance />
        </div>
      </div>
    </>
  );
};

export default Box;
