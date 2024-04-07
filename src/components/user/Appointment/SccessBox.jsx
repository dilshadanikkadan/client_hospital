import React from "react";
import { useNavigate } from "react-router-dom";

const SccessBox = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60vh] ">
      <div className="wrapper w-[90%] md:w-[40%] m-auto flex flex-col gap-5 mt-20">
        <p className="text-center text-xl">
          Apppointment has been sent You will get email once it approved
        </p>
        <div className="div flex flex-col md:flex-row gap-5">
          <button
            className="px-12 py-3 bg-base-300 rounded-md"
            onClick={() => navigate("/")}
          >
            Return To Home
          </button>
          <button
            className="px-12 py-3 bg-secondary text-white rounded-md"
            onClick={() => navigate("/viewAppointment")}
          >
            view Appointment Details{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SccessBox;
