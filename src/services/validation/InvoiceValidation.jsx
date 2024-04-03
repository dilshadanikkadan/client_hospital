import React from "react";
import * as Yup from "yup";

export const InvoiceValidation = Yup.object({
  message: Yup.string().required("please enter Message"),
});
