import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotEmail, verifyForgotOtp } from "../../../services/api/userRoute";

const OTP = {
  digitOne: "",
  digitTwo: "",
  digitThree: "",
  digitFour: "",
};

const ForgotOtp = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(50);
  const [timerRunning, setTimerRunning] = useState(false);
  const dispatch = useDispatch();
  const [msg, Setmsg] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const { state } = useLocation();
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
  });

  useEffect(() => {
    setTimerRunning(true);
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setTimerRunning(false);
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, state]);

  const {
    mutate: otpVerify,
    isError: verifyError,
    isPending,
  } = useMutation({
    mutationFn: verifyForgotOtp,
    onSuccess: (data) => {
      data.success
        ? navigate("/resetPassword", { state: state, replace: true })
        : setErrMsg(true);
    },
  });

  const { mutate: forgotEmailSend } = useMutation({
    mutationFn: forgotEmail,
    onSuccess: (data) => {
      if (data.success) {
        setErrMsg(false);
        setEmailSend(true);
      }
    },
  });

  const handleResendOtp = () => {
    try {
      forgotEmailSend({ email: state.email });
      setTimeLeft(50);
      setTimerRunning(true);
    } catch (error) {
      throw new error();
    }
  };

  const ArrayName = Object.keys(OTP);

  const otpRef = useRef({});

  const handleChange = (e, i) => {
    setEmailSend(false);
    const { value, name } = e.target;
    setOtp((prev) => ({ ...prev, [name]: value }));

    if (value && i !== 3) otpRef.current[i + 1].focus();
  };
  const handleVerify = (e) => {
    let OTP = parseInt(Object.values(otp).join(""));
    console.log(OTP);
    otpVerify({ email: state.email, otp: OTP });
    e.preventDefault();
  };

  const handleBack = (e, i) => {
    if (e.key === "Backspace") {
      i > 0 ? otpRef.current[i - 1].focus() : "";
    }
  };

  useEffect(() => {
    otpRef.current[0].focus();
  }, []);
  return (
    <>
      <div className="wrapper  w-full h-[70vh] flex flex-col items-center justify-center ">
        <form
          className="w-[80%]  lg:w-[20%]   m-auto h-full flex items-center lg:items-start  gap-1 flex-col "
          action=""
        >
          <p className="mt-[15%] text-2xl font-logo">
            Please Verify Your Email{" "}
          </p>
          {verifyError && <p className="text-red-600">Invalid Otp</p>}
          {emailSend && <p>Otp has been resnd</p>}
          <div className="numbers flex  gap-3 mt-5 ">
            {[1, 2, 3, 4].map((x, i) => (
              <div key={i} className="div">
                <input
                  name={ArrayName[i]}
                  maxLength={1}
                  onKeyUp={(e) => handleBack(e, i)}
                  ref={(el) => (otpRef.current[i] = el)}
                  onChange={(e) => handleChange(e, i)}
                  className="text-center rounded-md border-2 w-14 py-2 border-slate-900"
                />
              </div>
            ))}
          </div>

          <span className="">
            <span className="">
              {" "}
              Time left: {timeLeft == 0 ? "otp Expired" : timeLeft}
            </span>
          </span>

          <div className="flex items-center  mt-5">
            <button
              onClick={handleVerify}
              className="bg-secondary hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Verify
            </button>
            <p
              onClick={handleResendOtp}
              className="cursor-pointer inline-block align-baseline font-bold text-sm text-secondary hover:text-teal-800 ml-4"
              href="#"
            >
              Resend OTP
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotOtp;
