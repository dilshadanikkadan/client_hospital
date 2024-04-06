import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  docotor: null,
  isDoctor: false,
  isCalling: false,
  callerId: "",
  callingStatus: false,
};

const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    loginDoctor: (state, action) => {
      state.docotor = action.payload;
      state.isDoctor = true;
    },
    logoutDoctor: (state) => {
      state.docotor = null;
      state.isDoctor = false;
    },
    CallVideoCall: (state) => {
      state.isCalling = true;
    },
    setCallStatus: (state,action) => {
      state.callingStatus = action.payload;
    },
    setCallerId: (state, action) => {
      state.callerId = action.payload;
    },
  },
});

export const { loginDoctor, logoutDoctor, CallVideoCall, setCallStatus,setCallerId } =
  DoctorSlice.actions;
export default DoctorSlice.reducer;
