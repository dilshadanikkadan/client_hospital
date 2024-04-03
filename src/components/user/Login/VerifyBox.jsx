import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp, verifyEmail } from "../../../services/api/userRoute";
import { useDispatch } from "react-redux";
import { loginSucess } from "../../../store/redux/slices/userSlice";

const OTP = {
  digitOne: "",
  digitTwo: "",
  digitThree: "",
  digitFour: "",
};

const VerifyBox = () => {
  const [timeLeft, setTimeLeft] = useState(50);
  const [timerRunning, setTimerRunning] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msg, Setmsg] = useState(false);
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
  }, [timerRunning]);

  const { mutate, isError, isPending, reset } = useMutation({
    mutationFn: signUp,
    onSuccess: (values) => {
      Setmsg(true);
      console.log("resend  successfully");
    },
  });

  const {
    mutate: verifyEmailMutate,
    isError: verifyEmailError,
    isPending: verifyEmailPending,
    reset: verifyEmailReset,
  } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (user) => {
      console.log(user);
      dispatch(loginSucess(user));
      navigate("/");
    },
  });
  const { state } = useLocation();
  // console.log(state.credentials.email);

  const handleResendOtp = () => {
    try {
      mutate(state.credentials);
      setTimeLeft(50);
      setTimerRunning(true);
    } catch (error) {
      throw new error();
    }
  };

  const [otpNumber, setOtpNumber] = useState(null);
  const ArrayName = Object.keys(OTP);
  // console.log(ArrayName);
  // console.log(otp);
  const otpRef = useRef({});

  const handleChange = (e, i) => {
    Setmsg(false);
    const { value, name } = e.target;
    setOtp((prev) => ({ ...prev, [name]: value }));

    if (value && i !== 3) otpRef.current[i + 1].focus();
  };
  const handleVerify = (e) => {
    let OTP = parseInt(Object.values(otp).join(""));
    console.log(OTP);
    e.preventDefault();
    // setOtpNumber(Object.values(otp).join(""))
    verifyEmailMutate({ email: state.credentials.email, otp: OTP });
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
      <div className="wrapper mt-[30%]   lg:mt-10 w-full  flex flex-col items-center justify-center ">
        <form
          className="w-[70%] m-auto lg:w-[20%]   h-full flex items-center  gap-1 flex-col "
          action=""
        >
          <p className="mt-[15%] text-2xl font-logo">
            Please Verify Your Email{" "}
          </p>
          {verifyEmailError && <p className="text-red-600">Invalid Otp</p>}
          {msg && <p>Otp has been resnd</p>}
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

          <div className="flex items-center  mt-10">
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

export default VerifyBox;
