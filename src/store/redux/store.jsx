import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import AdminSlice from "./slices/AdminSlice";
import DoctorSlice from "./slices/DoctorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: AdminSlice,
    doctor: DoctorSlice,
  },
});

export default store;
