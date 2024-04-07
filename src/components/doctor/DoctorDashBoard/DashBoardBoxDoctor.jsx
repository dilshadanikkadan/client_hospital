import React from "react";
import { singleuser } from "../../../services/api/adminRoute";
import { currentUser } from "../../../services/hooks/CuurentUser";
import { useQuery } from "@tanstack/react-query";
import { viewAppointment } from "../../../services/api/userRoute";
import AccountSheet from "../Analystics/AccountSheet";

const DashBoardBoxDoctor = () => {
  let userId = currentUser();
  const { data: Doctor } = useQuery({
    queryKey: ["user", userId],
    queryFn: singleuser,
  });
  const { data: myAppointments } = useQuery({
    queryKey: ["appointment", userId],
    queryFn: viewAppointment,
  });
  const patientsCompleted = myAppointments?.filter(
    (x) => x.status == "completed"
  );
  const patientsPending = myAppointments?.filter((x) => x.status == "pending");
  return (
    <>
      <div className="wrapper  w-[90%] ml-auto mr-auto mt-0 md:mt-0   md:h-[40vh] flex flex-col  justify-center gap-7">
        {/* <p className='ml-10  font-info text-xl font-semibold'>Welcome {Doctor?.username}</p> */}

        <div className="flex w-full gap-7 flex-wrap">
          <div className="box rounded-lg shadow-md w-[80%] md:w-[24%] h-40  mt-10">
            <div className="info w-[70%] m-auto flex flex-col  justify-center h-full ">
              <h3 className="text-xl font-normal subpixel-antialiased">
                Total Patients
              </h3>
              <p className="text-xl font-semibold">
                {patientsCompleted?.length}
              </p>
              <p className="text-green-500  font-semibold">+25</p>
            </div>
          </div>
          <div className="box rounded-lg shadow-md w-[80%] md:w-[24%] h-40  mt-10 ">
            <div className="info w-[70%] m-auto flex flex-col  justify-center h-full font-desc">
              <h3 className="text-lg subpixel-antialiased">Pedning Patients</h3>
              <p className="text-lg font-semibold">
                {patientsPending?.length ?? 0}
              </p>
              <p className="text-green-500  font-semibold">+25</p>
            </div>
          </div>

          <AccountSheet />
        </div>
      </div>
    </>
  );
};

export default DashBoardBoxDoctor;
