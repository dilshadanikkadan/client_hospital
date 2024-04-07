import React, { useState } from "react";
import { useFormik, Form, Formik, Field } from "formik";
import { signUpValidation } from "../../../services/validation/SignUpValidation";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../services/api/userRoute";
import VisibilityIcon from "@mui/icons-material/Visibility";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const LoginBox = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(null);
  const [viewPass, setViewPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, isError, isPending, reset } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      data.errorMsg ? setErrorMsg(data.errorMsg) : "";
      data.success
        ? navigate("/verifyEmail", { state: { credentials: credentials } })
        : "";
    },
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidation}
        onSubmit={(values) => {
          const { confirmPassword, ...others } = values;
          setCredentials(others);
          mutate(others);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form  w-[80%] mt-[30%] lg:w-[28%] m-auto lg:mt-10 flex flex-col ">
            <h3 className="text-2xl font-info font-bold text-center">
              Sign Up
            </h3>
            {errorMsg && <p className="text-red-500">email already exits</p>}
            <label className="input input-bordered flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <Field
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
              />
            </label>
            {touched.username && (
              <p className=" text-red-600 mt-1">{errors.username}</p>
            )}

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
              <p className=" text-red-600 mt-1">{errors.email}</p>
            )}

            <label className="input input-bordered flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <Field
                type={`${viewPass ? "text" : "password"}`}
                className="grow"
                placeholder="password"
                name="password"
              />
              <VisibilityIcon
                className="cursor-pointer"
                onClick={() => setViewPass(!viewPass)}
              />
            </label>
            {touched.password && (
              <p className=" text-red-600 mt-1">{errors.password}</p>
            )}

            <label className="input input-bordered flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <Field
                type={`${viewPass ? "text" : "password"}`}
                className="grow"
                placeholder="confirm password"
                name="confirmPassword"
              />
              <VisibilityIcon
                className="cursor-pointer"
                onClick={() => setViewPass(!viewPass)}
              />
            </label>
            {touched.confirmPassword && (
              <p className=" text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}

            <p
              onClick={() => navigate("/login")}
              className="cursor-pointer text-blue-500 underline mt-2"
            >
              Already have an account?
            </p>
            <button className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary m-auto mt-5">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginBox;
