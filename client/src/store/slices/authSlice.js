import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers:{
        setUser : (state, action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        removeUser : (state)=>{
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})
export const { setUser, removeUser } = AuthSlice.actions;   
export default AuthSlice.reducer;