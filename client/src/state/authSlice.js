import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem('user')) ? true : false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loginStart: (state) => {
           state.loading = true;
           
        },
        loginSuccess: (state,action)=>{
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        loginFailure: (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})


export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;