import React, { useState } from "react";
import { useFormik, Form, Formik, Field, replace } from "formik";
import { LoginValidation } from "../../../services/validation/LoginValidation";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../../../services/api/adminRoute";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../../store/redux/slices/AdminSlice";

const initialValues = {
  email: "",
  password: "",
};

const AdminLoginBox = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const naviagate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: adminLoginmutate } = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      data.errorMsg ? setErrorMsg(data.errorMsg) : "";
      if (data.success) {
        naviagate("/admin");
        dispatch(loginAdmin(data?.admin));
      }
    },
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidation}
        onSubmit={(values) => {
          adminLoginmutate(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form max-w-[28%] m-auto mt-[10%] flex  flex-col ">
            <h3 className="text-2xl font-info font-bold text-center">Login</h3>

            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
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
                type="password"
                className="grow"
                placeholder="password"
                name="password"
              />
            </label>
            {touched.password && (
              <p className="capitalize text-red-600 mt-1">{errors.password}</p>
            )}

            <button className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary m-auto mt-5">
              Log As Admin
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AdminLoginBox;
