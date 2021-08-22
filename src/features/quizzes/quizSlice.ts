import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// get all quiz
export const getQuizzes = createAsyncThunk("quizzes/getQuizzes", async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get("https://scio-app.herokuapp.com/quiz");
        console.log('fetched quizzes: ', response.data);
        return response.data.quizList;
    }
    catch(err){
        console.log("Error getting post: ", err.message);
        rejectWithValue(null);
    }
})

// get the quiz
export const getQuiz = createAsyncThunk("quizzes/getQuiz", async (quizId: string, {rejectWithValue}) => {
    try{
        const response = await axios.get("https://scio-app.herokuapp.com/quiz/"+quizId);
        console.log('fetched quiz: ', response.data);
        return response.data.quiz;
    }
    catch(err){
        console.log("Error getting post: ", err.message);
        rejectWithValue(null);
    }
})

// slice
const initialQuizzes = {
    allQuizzes: [],
    activeQuiz: {},
    activeQuizStatus: "Idle",
    status: 'Idle',
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState: initialQuizzes,
    reducers: {
        setActiveQuiz: (state, action)=> {
            state.activeQuiz = action.payload;
            state.activeQuizStatus = "Fulfilled";
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getQuizzes.pending, (state, action) => {
            state.status = "Loading";
        });
        builder.addCase(getQuizzes.fulfilled, (state, action) => {
            console.log('action of getQuizzes: ', action.payload);
            state.allQuizzes = action.payload;
            state.status = "Fulfilled";
        });
        builder.addCase(getQuizzes.rejected, (state, action) => {
            state.status = "Rejected";
        });

        // get quiz
        builder.addCase(getQuiz.pending, (state, action) => {
            state.activeQuizStatus = "Loading";
        });
        builder.addCase(getQuiz.fulfilled, (state, action) => {
            console.log('action of getQuiz: ', action.payload);
            state.activeQuiz = action.payload;
            state.activeQuizStatus = "Fulfilled";
        });
        builder.addCase(getQuiz.rejected, (state, action) => {
            state.activeQuizStatus = "Rejected";
        });
        
    }
});

export const {setActiveQuiz} = quizSlice.actions;
export default quizSlice.reducer;
