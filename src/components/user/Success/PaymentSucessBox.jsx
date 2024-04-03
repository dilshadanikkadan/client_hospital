import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSucessBox = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60vh] ">
      <div className="wrapper w-[40%] m-auto flex flex-col gap-5 mt-20">
        <p className="text-center text-2xl">Payment SucessFully Completed</p>
        <p className="text-center mt-1">
          You will get notification Once You Verified
        </p>
        <div className="div flex gap-5 items-center justify-center">
          <button
            className="px-12 py-3 bg-base-300 rounded-md"
            onClick={() => navigate("/")}
          >
            Return To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSucessBox;
