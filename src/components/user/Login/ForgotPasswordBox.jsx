import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  forgotEmail,
  signUp,
  verifyEmail,
} from "../../../services/api/userRoute";
import { useDispatch } from "react-redux";
import { loginSucess } from "../../../store/redux/slices/userSlice";
import { useFormik, Form, Formik, Field } from "formik";
import { LoginValidation } from "../../../services/validation/LoginValidation";
import { ForgotEmail } from "../../../services/validation/ForgotEmail";

const initialValues = {
  email: "",
};

const ForgotPasswordBox = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { mutate: forgotEmailSend } = useMutation({
    mutationFn: forgotEmail,
    onSuccess: (data) => {
      data.success ? navigate("/verifyOtp", { state: email }) : "";
      data.errorMsg ? setErrorMsg(data.errorMsg) : "";
    },
  });

  return (
    <>
      <div className="wrapper w-full  h-[50vh] flex flex-col ">
        <Formik
          initialValues={initialValues}
          validationSchema={ForgotEmail}
          onSubmit={(values) => {
            setEmail(values);
            forgotEmailSend(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form w-[80%] lg:w-[28%] m-auto  flex flex-col ">
              <h3 className="text-2xl font-info font-bold text-center">
                Enter your Email
              </h3>
              {errorMsg && <p className="text-red-500"> Email not Found </p>}
              <label className="input input-bordered flex items-center gap-2 mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <Field
                  type="text"
                  className="grow"
                  placeholder="Email"
                  name="email"
                />
              </label>
              {touched.email && (
                <p className="capitalize text-red-600 mt-1">{errors.email}</p>
              )}
              <input
                type="submit"
                className="cursor-pointer py-3 w-[50%] rounded-xl font-desc text-white bg-secondary m-auto mt-5"
                value="Send Otp"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPasswordBox;
