import React from "react";
import Home from "./screens/Home.tsx";
import Login from "./screens/Login.tsx";
import Signup from "./screens/Signup.tsx";
import Profile from "./screens/Profile.tsx";
import Leaderboard from "./screens/Leaderboard.tsx";
import PageNotFound from "./screens/PageNotFound.tsx";
import Quiz from "./screens/Quiz.tsx";

import {useRoutes} from 'react-router-dom';

const ROUTES = () => [
    
    {
        path: "/quiz/:quizId",
        key: "QuizPage",
        element: <Quiz />
    },
    {
        path: "/leaderboard",
        key: "Leaderboard",
        end: true,
        element: <Leaderboard />
    },
    {
        path: "/profile",
        key: "Profile",
        end: true,
        element: <Profile />
    },
    
    {
        path: "/login",
        key: "Login",
        element: <Login />,
    },
    {
        path: "/signup",
        key: "Signup",
        element: <Signup />,
    },
    
    {
        path: "/",
        key: "Home",
        end: true,
        element: <Home />
    },
    {
        path: "*",
        key: "PageNotFound",
        element: <PageNotFound/>, 
    },  
];

export function RenderRoutes() {
    // useRoutes to render routes object - alternative to Routes & Route of react-router-dom
    let selectedRoute = useRoutes(ROUTES());
    // console.log('select: ', selectedRoute);
    return selectedRoute;
}


export default ROUTES;