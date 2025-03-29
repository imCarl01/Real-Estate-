import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser: null,
    error:null,
    loading:false
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        singInStart:(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action) =>{
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure:(state,action)=>{
            state.loading = true;
            state.error = action.payload

        }
    }

})

export const {singInStart,signInSuccess, signInFailure} = userSlice.actions

export default userSlice.reducer;