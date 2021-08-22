// https://scio-app.herokuapp.com/
import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './features/authentication/authenticationSlice';
import quizReducer from "./features/quizzes/quizSlice";
import resultReducer from "./features/results/resultSlice";
import userReducer from "./features/user/userSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        quizzes: quizReducer,
        user: userReducer,
        results: resultReducer
    }
})
