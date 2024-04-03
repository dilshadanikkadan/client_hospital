import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAdmin: false,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAdmin = true;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.isAdmin = false;
    },
  },
});

export const { loginAdmin, logoutAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
