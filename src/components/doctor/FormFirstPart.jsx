import React from "react";
import { useFormik, Form, Formik, Field } from "formik";
import { applicationOneValidation } from "../../services/validation/ApllicationoneValidation";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNo: "",
};
const FormFirstPart = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={applicationOneValidation}
        onSubmit={(values) => {
          navigate("_2", { state: values });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form w-[60%] md:w-[28%] m-auto mt-10 flex flex-col relative">
            <h3 className="text-2xl font-info font-bold ">
              Apply For your Service{" "}
            </h3>
            <p className=" mt-3">
              Thank you for your interest in volunteering with MedServe! Please
              fill out this form to apply as a pro bono doctor. This will allow
              us to verify your credentials and match you with opportunities.
            </p>
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
                placeholder="First Name"
                name="firstname"
              />
            </label>
            {touched.firstname && (
              <p className="capitalize text-red-600 mt-1">{errors.firstname}</p>
            )}

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
                placeholder="Last Name"
                name="lastname"
              />
            </label>
            {touched.lastname && (
              <p className="capitalize text-red-600 mt-1">{errors.lastname}</p>
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
                type="number"
                className="grow"
                placeholder="Phone No"
                name="phoneNo"
              />
            </label>
            {touched.phoneNo && (
              <p className="capitalize text-red-600 mt-1">{errors.phoneNo}</p>
            )}

            <input
              type="submit"
              className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary  ml-[50%] mt-5"
              value="next"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormFirstPart;
