import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// get the post
export const getUserData = createAsyncThunk("user/getUserData", async (userId: String, {rejectWithValue}) => {
    try{
        const response = await axios.get("https://scio-app.herokuapp.com/results",{
            headers:{
                userid: userId
            }
        });
        console.log('fetched user data: ', response.data);
        return response.data.results;
    }
    catch(err){
        console.log("Error getting userdata: ", err.message);
        rejectWithValue(null);
    }
})

// slice
const initialUserData = {
    userResults: [],
    status: 'Idle',
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserData,
    reducers: {
        resetUserResults: (state, action) => initialUserData
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state, action) => {
            state.status = "Loading";
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            console.log('action of getUserData: ', action.payload);
            state.userResults = action.payload;
            state.status = "Fulfilled";
        });
        builder.addCase(getUserData.rejected, (state, action) => {
            state.status = "Rejected";
        });
        
    }
});

export const { resetUserResults } = userSlice.actions;
export default userSlice.reducer;
