import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isDoctorMe: false,
  isShown: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSucess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isShown = false;
    },

    logoutUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    makeMeDcotor: (state) => {
      state.isDoctorMe = true;
    },
    hideModal: (state) => {
      state.isShown = true;
    },
  },
});
export const {
  loginSucess,
  hideModal,
  logoutUser,
  initializeUser,
  makeMeDcotor,
} = userSlice.actions;
export default userSlice.reducer;
