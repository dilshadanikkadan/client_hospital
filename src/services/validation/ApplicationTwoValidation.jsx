import React from 'react'
import * as Yup from 'yup'
import { postRequest } from '../axios';

const regex = /^[A-Z]{2}\d{4}$/;
export const applicationTwoValidation = Yup.object({
    qualification: Yup.string().min(2).required("please fill the qulaification"),
    licenseNo: Yup.string()
    .test('checkLicense', 'License number is not valid', async function (value) {
      try {
        const response = await postRequest(`api/user/chek_licenseIsValid`,{licenseNo:value});
        if(response.status == 200){
            const data =response.data

            return true
        }
        
      } catch (error) {
        console.error('Error:', error);
        return false; 
      }
    })
})
