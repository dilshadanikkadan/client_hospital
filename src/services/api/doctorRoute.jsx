import { deleterequest, getRequest, postRequest } from "../axios"



export const doctorLogin = async (data) => {
    try {
        const res = await postRequest("api/doctor/doctor_login", data)

        if (res.status === 200) {
            return {
                success: true,
                doctor: res.data.token

            }

        }
    } catch (error) {
        return { errorMsg: error.response.data.message }
    }
}

export const setDates = async (data) => {
    try {
        const res = await postRequest("api/doctor/setdates", data);

        if (res.status === 200) {
            return { success: true }
        }

    } catch (error) {

    }
}

export const getAllDates = async (id) => {
    const userId = id.queryKey[1]

    try {
        const res = await getRequest(`api/doctor/get_Alldates/${userId}`)

        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteSetDate = async (data) => {
    try {
        const res = await postRequest("api/doctor/delete_date", data)

        if (res.status == 200) {
            return { success: true }
        }
    } catch (error) {
        console.log(error);

    }
}

export const setTime = async (data) => {
    try {
        const res = await postRequest("api/doctor/add_time", data);

        if (res.status === 200) {
            return {
                success: true
            }
        }
    } catch (error) {

    }
}

export const deleteTime = async (data) => {
    try {
        const res = await postRequest("api/doctor/delete_time", data);

        if (res.status === 200) {
            return {
                success: true
            }
        }
    } catch (error) {

    }
}

export const getPendingRequest = async (id) => {
    const userId = id.queryKey[1]
    try {
        const res = await getRequest(`api/doctor/get_pendingAppointment/${userId}`);
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {

    }

}

export const approveAppointment = async (data) => {
    try {
        const res = await postRequest("api/doctor/approve_appointment", data)
        if (res.status == 200) {
            return { success: true }
        }
    } catch (error) {
        console.log(error);
    }
}

export const deletChat = async (id) => {
    try {
        const res = await deleterequest(`api/chat/delete_chat/${id}`);
        if (res.status == 200) {
            return true
        }

    } catch (error) {
        console.log(error);

    }
}

export const patientsAnalystics = async (id) => {
    const userId = id.queryKey[1];
    try {
        const res = await getRequest(`api/doctor/get_patientAnalystics/${userId}`);
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {

    }
}

export const WithDrawBalance = async (data) => {
    try {
        const res = await postRequest("api/doctor/withdraw_amount", data);
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.log(error);
    }
}