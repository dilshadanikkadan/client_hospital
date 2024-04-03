import React, { useState } from "react";
import { useFormik, Form, Formik, Field } from "formik";
import { ResetPasswordValidation } from "../../../services/validation/ResetPassValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../services/api/userRoute";
import VisibilityIcon from "@mui/icons-material/Visibility";

const initialValues = {
  password: "",
};
const ResetPasswordBox = () => {
  const [updated, setUpdated] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);

  const { mutate: restPasswordMuate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data.success) {
        setUpdated(true);
        setSubmit(true);
      }
    },
  });
  return (
    <div>
      <div className="wrapper w-full h-[50vh] flex flex-col ">
        <Formik
          initialValues={initialValues}
          validationSchema={ResetPasswordValidation}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            restPasswordMuate({
              email: state.email,
              password: values.password,
            });
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="form w-[70%] lg:w-[33%] m-auto  flex flex-col text-center">
              {!submit ? (
                <h3 className="text-2xl font-info font-bold text-center">
                  Enter your new Password
                </h3>
              ) : (
                ""
              )}
              {submit ? (
                <div className="flex flex-col gap-5">
                  <p className="text-2xl font-info capitalize">
                    password updated sucessfully click here
                  </p>
                  <span
                    onClick={() => navigate("/login", { replace: true })}
                    className="cursor-pointer text-black   text-center bg-base-300 py-2 w-20 m-auto"
                  >
                    Login
                  </span>
                </div>
              ) : (
                ""
              )}
              {!submit ? (
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
              ) : (
                ""
              )}
              {touched.password && (
                <p className="capitalize text-red-600 mt-1">
                  {errors.password}
                </p>
              )}
              {!submit ? (
                <input
                  type="submit"
                  className="cursor-pointer py-3 w-[50%] rounded-xl font-desc text-white bg-secondary m-auto mt-5"
                  value="Submit"
                />
              ) : (
                ""
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordBox;
