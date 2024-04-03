import React from "react";
import * as Yup from "yup";

const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
export const signUpValidation = Yup.object({
  username: Yup.string().min(3).required("please fill the name"),
  email: Yup.string()
    .email("please enter a valid email")
    .required("please enter email"),
  password: Yup.string()
    .matches(regex, "Password should include lettters and numbers")
    .required("please fill password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match")
    .required("Please enter password"),
});
