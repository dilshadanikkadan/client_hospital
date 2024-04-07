import React, { useState } from "react";
import { useFormik, Form, Formik, Field, replace } from "formik";
import { LoginValidation } from "../../../services/validation/LoginValidation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/api/userRoute";
import { useDispatch } from "react-redux";
import { loginSucess } from "../../../store/redux/slices/userSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";

const initialValues = {
  email: "",
  password: "",
};

const LoginBox = ({ state }) => {
  console.log(state);
  const [errorMsg, setErrormsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewPass, setViewPass] = useState(false);

  const handleChange = () => {};

  const {
    mutate: loginMutate,
    isError,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      data.errorMsg ? setErrormsg(data.errorMsg) : "";
      if (data.success) {
        navigate("/", { replace: true });
        dispatch(loginSucess(data?.user));
      }
    },
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidation}
        onSubmit={(values) => {
          loginMutate(values);
        }}
      >
        {({ errors, touched, handleChange, setFieldTouched }) => (
          <Form className="form w-[80%]  p-5 rounded-lg loginBox   md:w-[50%] mt-[30%] lg:w-[28%] m-auto lg:mt-10 flex flex-col  ">
            <h3 className="text-2xl font-info font-bold text-center">Login</h3>

            {state?.message && <p className="text-red-500">{state.message}</p>}
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <label className="pr-3 input input-bordered flex items-center gap-2 mt-5 ">
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
                className="grow "
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                  setFieldTouched("email", true, false);
                  setErrormsg("");
                }}
              />
            </label>
            {touched.email && (
              <p className=" text-red-600 mt-1">{errors.email}</p>
            )}

            <label className="input input-bordered flex items-center gap-2 mt-5 justify-between ">
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
                onChange={(e) => {
                  handleChange(e);
                  setFieldTouched("password", true, false);
                  setErrormsg("");
                }}
              />
              <VisibilityIcon
                className="cursor-pointer"
                onClick={() => setViewPass(!viewPass)}
              />
            </label>
            {touched.password && (
              <p className=" text-red-600 mt-1">{errors.password}</p>
            )}

            <div className="div flex justify-between">
              <p
                className="text-blue-500 mt-5 underline text-xs md:text-sm cursor-pointer"
                onClick={() => navigate("/SignUp")}
              >
                Dont have any Account?
              </p>
              <p
                className="text-blue-500 mt-5 underline text-xs md:text-sm cursor-pointer"
                onClick={() => navigate("/forgotPassword")}
              >
                Forgot Password?
              </p>
            </div>

            <button className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary m-auto mt-5">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginBox;
