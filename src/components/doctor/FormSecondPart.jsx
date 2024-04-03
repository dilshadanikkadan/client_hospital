import React, { useState } from "react";
import { applicationTwoValidation } from "../../services/validation/ApplicationTwoValidation";
import { useFormik, Form, Formik, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  qualification: "",
  licenseNo: "",
};
const doctors = [
  { id: 1, specialty: "Cardiology" },
  { id: 2, specialty: "Dermatology" },
  { id: 3, specialty: "Pediatrics" },
  { id: 4, specialty: "Neurology" },
];
const FormSecondPart = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { state } = useLocation();

  const history = console.log(state);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const selectedDoctorId = e.target.value;
    setSelectedDoctor(selectedDoctorId);
    setSpeciality(doctors[selectedDoctorId - 1].specialty);
  };
  console.log(speciality);
  return (
    <div>
      {state ? (
        <Formik
          initialValues={initialValues}
          validationSchema={applicationTwoValidation}
          onSubmit={(values) => {
            let data = { speciality, ...values, ...state };
            // console.log();
            navigate("_3", { state: data, replace: true });
          }}
        >
          {({ errors, touched }) => (
            <Form className="form w-[60%] md:w-[28%] m-auto mt-10 flex flex-col relative">
              <h3 className="text-2xl font-info font-bold ">
                Apply For your Service{" "}
              </h3>
              <div className="mt-4">
                <label
                  htmlFor="doctorSelect"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select a Doctor:
                </label>
                <select
                  id="doctorSelect"
                  value={selectedDoctor}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a specialty</option>
                  {doctors.map((doctor, i) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <label className="border-[1px] border-gray-200 rounded-lg flex items-center gap-2 mt-5">
                <Field
                  as="textarea"
                  className="grow pt-2  pl-2 "
                  placeholder="Qualification"
                  name="qualification"
                />
              </label>
              {touched.qualification && (
                <p className="capitalize text-red-600 mt-1">
                  {errors.qualification}
                </p>
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
                  type="text"
                  className="grow"
                  placeholder="License No"
                  name="licenseNo"
                />
              </label>
              {touched.licenseNo && (
                <p className="capitalize text-red-600 mt-1">
                  {errors.licenseNo}
                </p>
              )}

              <input
                type="submit"
                className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary  ml-[50%] mt-5"
                value="next"
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div className="info w-[50%] m-auto mt-10 flex flex-col items-center gap-10">
          <p className="text-center text-2xl">Please Fill Form First</p>
          <button
            onClick={() => navigate("/application_1", { replace: true })}
            className="py-3  px-6 rounded-lg text-black bg-base-200 m-auto"
          >
            Return to Form
          </button>
        </div>
      )}
    </div>
  );
};

export default FormSecondPart;
