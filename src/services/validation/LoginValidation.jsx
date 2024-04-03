import React from "react";
import * as Yup from "yup";

const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
export const LoginValidation = Yup.object({
  email: Yup.string()
    .email("please enter a valid email")
    .required("please enter email"),
  password: Yup.string()
    .matches(regex, "Password should include lettters and numbers")
    .required("please fill password"),
});
