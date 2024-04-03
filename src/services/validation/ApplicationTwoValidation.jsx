import React from "react";
import * as Yup from "yup";
import { postRequest } from "../axios";

const regex = /^[A-Z]{2}\d{4}$/;
let data;
export const applicationTwoValidation = Yup.object({
  qualification: Yup.string().min(2).required("please fill the qulaification"),
  licenseNo: Yup.string().test(
    "checkLicense",
    `lisence number not valid or already taken`,
    async function (value) {
      try {
        const response = await postRequest(`api/user/chek_licenseIsValid`, {
          licenseNo: value,
        });
        if (response.status == 200) {
          const data = response.data;
          console.log("data", data);
          return true;
        }
      } catch (error) {
        data = error.response.data.message;
        console.error("Error:", error.response.data.message);
        return false;
      }
    }
  ),
});
