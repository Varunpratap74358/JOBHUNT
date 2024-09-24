import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
    name:"saved",
    initialState:{
        savedJob:[]
    },
    reducers:{
        setSavedJob:(state,action)=>{
            state.savedJob = action.payload
        }
    }
})

export const {setSavedJob} = savedJobSlice.actions
export default savedJobSlice.reducer