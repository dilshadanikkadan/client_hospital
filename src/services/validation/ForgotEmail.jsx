import * as Yup from "yup";

export const ForgotEmail = Yup.object({
  email: Yup.string()
    .email("please enter a valid email")
    .required("please enter email"),
});
