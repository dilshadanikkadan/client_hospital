import { createSlice } from "@reduxjs/toolkit";



const initialState={
    docotor:null,
    isDoctor:false
}

const DoctorSlice=createSlice({
    name:'doctor',
    initialState,
    reducers:{
        loginDoctor:(state,action)=>{
            state.docotor=action.payload
            state.isDoctor=true
        },
        logoutDoctor:(state)=>{
            state.docotor=null
            state.isDoctor=false
        }
    }
}) 


export const {loginDoctor,logoutDoctor} =DoctorSlice.actions
export default DoctorSlice.reducer;