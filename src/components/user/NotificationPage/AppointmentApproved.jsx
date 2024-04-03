import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentApproved = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[83%]  m-auto  mt-10 flex flex-col    ">
      <h3 className="font-info font-semibold text-3xl">Notification</h3>

      <div
        onClick={() => navigate("/viewAppointment")}
        role="alert"
        className="alert bg-primary shadow-lg mt-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">Your Appointment has been Approved</h3>
          <div className="text-xs">You have 1 unread message</div>
        </div>
        <button className="btn btn-sm">See</button>
      </div>
    </div>
  );
};

export default AppointmentApproved;
