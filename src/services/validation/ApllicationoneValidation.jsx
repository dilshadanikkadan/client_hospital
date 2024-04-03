import React from "react";
import * as Yup from "yup";

const regex = /^\d{10}$/;
export const applicationOneValidation = Yup.object({
  firstname: Yup.string().min(2).required("please fill the name"),
  lastname: Yup.string().min(2).required("please fill the name"),
  email: Yup.string()
    .email("please enter a valid email")
    .required("please enter email"),
  phoneNo: Yup.string()
    .matches(regex, "Please Provide A valid Phone Number")
    .required("please fill Phone NUmber"),
});
