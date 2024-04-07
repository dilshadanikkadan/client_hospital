import React, { useState } from "react";
import { applicationOneValidation } from "../../../services/validation/ApllicationoneValidation";
import { useFormik, Form, Formik, Field } from "formik";
import { AppointMentOneValidation } from "../../../services/validation/AppointmentValidationOne";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  creatChatRoom,
  makeAppointment,
  makePayment,
  validatePatientPayment,
} from "../../../services/api/userRoute";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNo: "",
  reason: "",
};
const AppointmentOneBox = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const { state } = useLocation();
  console.log(state);
  const { mutate: makePaymentMutate } = useMutation({
    mutationFn: makePayment,
    onSuccess: (data) => {
      console.log(data);
      handleMakePayment(data.id);
    },
  });

  const { mutate: createRoomMutate } = useMutation({
    mutationFn: creatChatRoom,
    onSuccess: (data) => {
      if (data) {
        console.log("chat also created ");
      }
    },
  });

  const { mutate: makeAppointmentMutate } = useMutation({
    mutationFn: makeAppointment,
    onSuccess: (data) => {
      if (data.success) {
        console.log("all are done");

        navigate("/makeAppointment/_2/sucess", { replace: true });
      }
    },
  });
  const { mutate: validateMakePaymentMutate } = useMutation({
    mutationFn: validatePatientPayment,
    onSuccess: (data) => {
      console.log(data);
      makeAppointmentMutate({
        ...state,
        ...credentials,
      });
      console.log({
        ...state,
        ...credentials,
      });
      // navigate("/payment/sucess",{replace:true})
    },
  });

  const handlePaymentAppointment = () => {
    makePaymentMutate({
      amount: 799 * 100,
      currency: "INR",
      receipt: state?.patient,
    });
  };

  const handleMakePayment = (orderId) => {
    const currency = "INR";

    var options = {
      key: "rzp_test_y12CU0IJofELhC",
      currency,
      // "amount":1400,
      name: "E-care",
      description: "Approval payment",
      order_id: orderId,
      handler: function (response) {
        const body = {
          ...response,
        };
        console.log(response);
        // console.log("Amount:", options.amount);
        validateMakePaymentMutate(body);
      },
      prefill: {
        name: "dilshad",
        email: "dilshadanikkadan3312@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log("payment failed");
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AppointMentOneValidation}
        onSubmit={(values) => {
          setCredentials(values);
          handlePaymentAppointment();
          console.log({
            ...state,
            ...values,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form w-[80%] md:w-[28%] m-auto mt-10 flex flex-col relative">
            <h3 className="text-2xl font-info font-bold ">
              Make an Appointment
            </h3>
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

            <label className="border-[1px] border-gray-200 rounded-lg flex items-center gap-2 mt-5">
              <Field
                as="textarea"
                className="grow pl-2 pt-3"
                placeholder="Reason For Your Appointment"
                name="reason"
              />
            </label>
            {touched.reason && (
              <p className="capitalize text-red-600 mt-1">{errors.reason}</p>
            )}

            <input
              type="submit"
              className="py-3 w-[50%] rounded-xl font-desc text-white bg-secondary  ml-[50%] mt-5"
              value="Make Payment"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AppointmentOneBox;
