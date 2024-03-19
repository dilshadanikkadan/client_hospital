import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        loginSucess: (state, action) => {
            state.user= action.payload;
            state.isAuthenticated = true
        },
        
        logoutUser: (state, action) => {
            state.user=null
            state.isAuthenticated = false   
        }
      
    }

})
export const { loginSucess, logoutUser, initializeUser } = userSlice.actions;
export default userSlice.reducer;