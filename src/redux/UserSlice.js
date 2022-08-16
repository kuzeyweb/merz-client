import {createSlice} from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
    name: "user",
    initialState:{
        currentUser: null,
        error: false,
        loginStatus: false,
    },
    reducers: {
        loginSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loginStatus = true;
            state.error = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.loginStatus = false;
            state.currentUser = null;
            state.error = false;
        },
    }
}) 

export const { loginSuccess, loginFailure, logOut } = LoginSlice.actions;
export default LoginSlice.reducer;