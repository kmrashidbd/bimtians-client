import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUser } from "../actions/studentAction";

const initialState = {
    isLoading: false,
    isLoginUserError: false,
    loginUserError: '',
    loggedInStudent: {},
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        userLogOut: (state)=>{
            state.loggedInStudent = {};
            localStorage.removeItem('authToken')
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getLoggedInUser.pending, (state)=>{
                state.isLoading = true;
                state.isLoginUserError = false;
                state.loginUserError = '';
                state.loggedInStudent = {}
            })
            .addCase(getLoggedInUser.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isLoginUserError = false;
                state.loginUserError = '';
                state.loggedInStudent = action.payload;
            })
            .addCase(getLoggedInUser.rejected, (state, action)=>{
                state.isLoading = false;
                state.isLoginUserError = true;
                state.loginUserError = action.error.message;
                state.loggedInStudent = {};
                localStorage.removeItem('authToken')
            })
    }
});

export const {userLogOut} = studentSlice.actions;

export default studentSlice.reducer;