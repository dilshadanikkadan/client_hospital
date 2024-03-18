import { getRequest, postRequest } from "../axios"





export const signUp = async (user) => {
   try {
      const res = await postRequest("api/user/SignUp", user)
      if (res.status == 200) {

         return { success: true }
      }
   } catch (error) {
      return { errorMsg: error.response.data.message }

   }
}


export const verifyEmail = async (user) => {
   try {
      const res = await postRequest("api/user/verify_email", user)
      if (res.status == 200) {
         console.log(res.headers);
         return res.data
      }
   } catch (error) {
      throw new error

   }
}

export const userLogout = async () => {
   try {
      const res = await postRequest("api/user/logout")
      return res.data

   } catch (error) {

   }
}


export const login = async (user) => {
   try {
      const res = await postRequest("/api/user/login", user)
      if (res.status == 200) {
         return { success: true, user: res.data.token }
      }

   } catch (error) {
      return { errorMsg: error.response.data.message }

   }
}

export const forgotEmail = async (email) => {
   try {
      const res = await postRequest("api/user/forgot_password", email)
      if (res.status === 200) {
         return { success: true }
      }
   } catch (error) {
      return { errorMsg: error.response.data.message }
   }
}

export const verifyForgotOtp = async (data) => {
   try {
      const res = await postRequest("api/user/verifyForgotOtp", data)
      if (res.status === 200) {
         return { success: true }
      }
   } catch (error) {
      throw new error

   }
}


export const resetPassword = async (data) => {
   try {
      const res = await postRequest("api/user/resetPassword", data)
      if (res.status === 200) {
         return { success: true }
      }
   } catch (error) {
      throw new error
   }
}

export const applyDoctorApplication = async (data) => {
   try {
      const res = await postRequest("api/user/apply_doctorApplication", data)
      if (res.status === 200) {
         return { success: true }
      }
   } catch (error) {

   }
}


export const checkApplied = async (id) => {
   const userId = id.queryKey[1]
   try {
      const res = await getRequest(`api/user/checkApplied/${userId}`)
      if (res.status === 200) {
         console.log(res.data);
         return res.data
      }
   } catch (error) {

   }
}

export const getAllNotification = async (id) => {
   const userId = id.queryKey[1]
   try {
      const res = await getRequest(`api/user/get_allNotification/${userId}`)
      if (res.status === 200) {
         return res.data
      }
   } catch (error) {

   }
}

export const makePayment = async (data) => {
   try {
      const res = await postRequest("api/user/order", data)

      return res.data
   } catch (error) {
      console.log(error);

   }
}

export const validateMakePayment = async (data) => {
   try {
      const res = await postRequest("api/user/order/validate", data)

      return res.data
   } catch (error) {
      console.log(error);

   }
}


export const getAllDoctors = async (data) => {
   try {
      const res = await getRequest("api/user/get_allDoctor")

      return res.data
   } catch (error) {

   }
}

export const makeAppointment = async (data) => {
   try {
      const res = await postRequest("api/user/make_appointment", data)

      if (res.status === 200) {
         return { success: true }
      }
   } catch (error) {

   }
}



export const viewAppointment = async (id) => {
   const userId = id.queryKey[1];
   try {
      const res = await getRequest(`api/user/view_appointment/${userId}`)
      if (res.status === 200) {
         return res.data
      }
   } catch (error) {

   }
}



export const cancelAppointment = async (data) => {
   try {
      const res = await postRequest("api/user/cancel_Appointment", data);

      if (res.status === 200) {
         return { success: true }
      }
   } catch (error) {

   }
}

export const viewDoctorSingle = async (id) => {
   const userId = id.queryKey[1];

   try {
      const res = await getRequest(`api/user/view_doctor/${userId}`)
      if (res.status === 200) {
         return res.data
      }
   } catch (error) {

   }
}

export const validatePatientPayment = async (data) => {
   try {
      const res = await postRequest("api/user/order/validatePatientPayment", data)

      return {
         success: true,
         data: res.data
      }
   } catch (error) {
      console.log(error);

   }
}

export const reScheduleAppointment = async (date) => {
   try {
      const res = await postRequest("api/user/reScheduleAppointment", date)
      if (res.status === 200) {
         return {
            success: true,
            msg: res.data
         }
      }
   } catch (error) {

   }
}

export const getConversation = async (id) => {
   const userId = id.queryKey[1];

   try {
      const res = await getRequest(`api/chat/getRoom/${userId}`)
      if (res.status == 200) {
         return {
            success: true,
            result: res.data
         }
      }
   } catch (error) {
      console.log(error);
   }
}

export const getAllMessage = async (id) => {
   const userId = id.queryKey[1];

   try {
      const res = await getRequest(`api/chat/getMessages/${userId}`);
      if (res.status == 200) {
        return res.data
      }

   } catch (error) {
      console.log(error);
   }

}

export const sendMessage =async (data)=>{
   console.log(data);
   try {
      const res = await postRequest("api/chat/createMessage",data);
      if(res.status == 200){
         return {
            success :true,
            // result:res.data
         }
      }
   } catch (error) {
      
   }
}