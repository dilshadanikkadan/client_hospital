import { useQuery } from "@tanstack/react-query";
import React from "react";
import { viewAppointment } from "../../../services/api/userRoute";
import { currentUser } from "../../../services/hooks/CuurentUser";

const TodaysAppointment = () => {
  let userId = currentUser();

  const { data: myAppointments } = useQuery({
    queryKey: ["appointment", userId],
    queryFn: viewAppointment,
  });
  const patientsPending = myAppointments?.filter((x) => x.status == "pending");
  console.log("patientsPending", patientsPending);
  return (
    <>
      <div className="wrapper w-[82%] mx-auto  mt-10">
        <h3 className="text-2xl font-semibold font-info capitalize">
          Next Appointments
        </h3>
        {patientsPending?.length > 0 ? (
          patientsPending.slice(0, 2).map((patient) => (
            <div className="user flex gap-10 items-center mt-10">
              <img
                className="w-16 h-16 object-cover rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjGnnelatTe1FbI6RHusiWG4wkbtmnjVC9uTBkSBX_g&s"
                alt=""
              />
              <p className="text-lg font-semibold capitalize">
                {patient?.lastname}
              </p>
            </div>
          ))
        ) : (
          <div className="mt-10">
            <p className="capitalize font-semibold text-xl">
              No patients For you Now
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodaysAppointment;
