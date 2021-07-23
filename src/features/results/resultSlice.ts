import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {groupBy} from "../../utils";
import {ResultType} from "./resultTypes";

// get all results
export const getResults = createAsyncThunk("results/getResults", async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get("https://scio-app.herokuapp.com/results");
        console.log('fetched results: ', response.data);

        let grouped = groupBy(response.data.results, "name", "quiz");
        console.log('grouped: ', grouped);
        return grouped;
    }
    catch(err){
        console.log("Error getting results: ", err.message);
        rejectWithValue(null);
    }
})

// save the result
export const saveResult = createAsyncThunk("results/saveResult", async (resultData: ResultType, {rejectWithValue}) => {
    try{
        const response = await axios.post("https://scio-app.herokuapp.com/results", resultData);
        console.log('saved result: ', response.data);
    }
    catch(err){
        console.log("Error saving result: ", err.message);
        rejectWithValue(null);
    }
})

// slice
const initialResults = {
    allResults: {},
    status: 'Idle',
    saveResultStatus: "Idle"
};

const resultSlice = createSlice({
    name: "results",
    initialState: initialResults,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResults.pending, (state, action) => {
            state.status = "Loading";
        });
        builder.addCase(getResults.fulfilled, (state, action) => {
            console.log('action of getResults: ', action.payload);
            state.allResults = action.payload;
            state.status = "Fulfilled";
        });
        builder.addCase(getResults.rejected, (state, action) => {
            state.status = "Rejected";
        });

        // save result
        builder.addCase(saveResult.pending, (state, action) => {
            state.saveResultStatus = "Loading";
        });
        builder.addCase(saveResult.fulfilled, (state, action) => {
            state.saveResultStatus = "Fulfilled";
        });
        builder.addCase(saveResult.rejected, (state, action) => {
            state.saveResultStatus = "Rejected";
        });
        
    }
});

export default resultSlice.reducer;
