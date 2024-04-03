import React from "react";
import { Link } from "react-router-dom";
import { currentUser } from "../../../services/hooks/CuurentUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { myAppointments } from "../../../services/api/userRoute";

const AppointmentHistoryBox = () => {
  const userId = currentUser();
  console.log("my user  id is ", userId);
  const { data: myAppointmentHistory } = useQuery({
    queryKey: ["myAppointnts", userId],
    queryFn: myAppointments,
  });
  const completedAppointments = myAppointmentHistory?.filter(
    (x) => x.status == "completed"
  );
  return (
    <div>
      <div className="w-[90%] mx-auto mt-10 ">
        <h3 className="text-2xl font-info font-semibold ml-14 mb-10">
          Appointment History
        </h3>
        {completedAppointments?.map((appointment) => (
          <div className="wrapper w-[90%]  border-[1px] border-gray-200 mx-auto shadow-md">
            <div className="user  flex  gap-5 items-center mt-7 justify-between mx-4 mb-1 border-b-[1px] border-gray-200 pb-2">
              <div className="div flex items-center justify-center gap-5">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={appointment?.doctor?.profileImage}
                  alt=""
                />
                <p className="text-lg  font-semibold capitalize">
                  {appointment?.doctor?.lastname}
                </p>
              </div>
              <div className="edit flex gap-3">
                <Link
                  to={`/appointmentHistory/${appointment?._id}`}
                  className="bg-secondary text-white  font-info px-5 py-2 rounded-md"
                >
                  {" "}
                  Details
                </Link>
                <button className="bg-[#8FE82B] text-white  font-info px-5 py-1 rounded-md  hidden md:block ">
                  {appointment?.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistoryBox;
