import { deleterequest, getRequest, postRequest } from "../axios"

export const adminLogin = async (admin) => {
    try {
        const res = await postRequest("api/admin/admin_login", admin)

        if (res.status === 200) {
            return {
                success: true,
                admin: res.data.token
            }
        }
    } catch (error) {
        return { errorMsg: error.response.data.message }
    }
}

export const getAllUsers = async () => {
    try {
        const res = await getRequest("api/admin/get_users")

        if (res.status === 200) {
            return {
                success: true,
                userData: res.data
            }
        }
    } catch (error) {

    }
}

export const singleuser = async (id) => {
    const userId = id.queryKey[1]
    try {
        const res = await getRequest(`api/admin/single_user/${userId}`)
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.log(error);

    }
}


export const allPendingDoctorRequest = async () => {
    try {
        const res = await getRequest("api/admin/get_pendingDoctorRequest")

        if (res.status === 200) {
            return {
                success: true,
                DoctorsData: res.data
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const SingleDoctorPending = async (id) => {
    const doctorId = id.queryKey[1]
    try {
        const res = await getRequest(`api/admin/get_singlePedingDoctor/${doctorId}`)
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {

    }
}


export const delteUserClient = async (id) => {
    console.log("reached here");
    try {
       const res = await deleterequest(`api/admin/delete_user/${id}`)
       return id
    } catch (error) {

    }
}

export const blockUser =async (email)=>{
    try {
        const res = await postRequest("api/admin/block_user",{email:email})
        if(res.status == 200){
            return  {
                success:true
            }
        }
    } catch (error) {
        
    }
}


export const unBlockUser =async (email)=>{
    console.log(email);
    try {
        const res = await postRequest("api/admin/unblock_user",{email:email})
        if(res.status == 200){
            return  {
                success:true
            }
        }
    } catch (error) {
        
    }
}

export const getAllLicenses= async()=>{
    try {
        const res = await getRequest("api/admin/get_allLicenses")

        if(res.status == 200){
            return res.data
        }
    } catch (error) {
        
    }
}


export const deleteLicense =async(value)=>{
    try {
        const res = await postRequest("api/admin/delete_license",value)
        if(res.status === 200){
            return {success:true}
        }
    } catch (error) {
        
    }
}

export const addnewLicense =async(value)=>{
    try {
        const res = await postRequest("api/admin/add_licenses",value)
        if(res.status === 200){
            return {success:true}
        }
    } catch (error) {
        
    }
}

export const sendInvoice=async(data)=>{
    try {
        const res = await postRequest("api/admin/send_invoice",data)

        return {success:true}
    } catch (error) {
        
    }
}

export const verifyApplicationDoctor =async(userId)=>{
    console.log("userd Id is" +userId);
    try {
       const res = await postRequest("api/admin/verifyApplicationDoctor",{userId:userId})  
       
       if(res.status === 200){
        return {success:true}
       }
    } catch (error) {
        console.log(error);
        
    }
}