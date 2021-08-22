import './App.css';
// import React from "react";
import React, { useEffect } from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getQuizzes} from './features/quizzes/quizSlice';

import TheNavbar from "./features/_shared/TheNavbar";
import TheFooter from "./features/_shared/TheFooter";

import { ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// render routes
import {RenderRoutes} from './routes';
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';

// Create a `GlobalStyles` component to pass variable for styled-components.
const GlobalStyles = createGlobalStyle`
  html {
	--black: #121014;
	--light: #FFF7ED;
	--primary: #FB923C;
	--primary-dark: #EA580C;
	--accent: #9333EA;
	--dark: #292524;
	--gray: #78716C;
	--gray-light: #D6D3D1;
	
	--card-bg: #fff;
	--border-radius: 0.5rem;
  }
`;

function App() {
	const navigate = useNavigate();
	const authState = useSelector((state: RootStateOrAny) => state.authentication);
	const quizState = useSelector((state: RootStateOrAny) => state.quizzes);
	const dispatch = useDispatch();


	useEffect(() => {
        // console.log('app token: ', authState.token);
        if(!authState.token){
            navigate('/login');
        }
		else{
			// get quiz data for user
			(async () => {
				// get all quizzes
				if(quizState.status === "Idle"){
					(async()=> {
						await dispatch(getQuizzes());
					})();
				}
			})();
		}
        
    }, [authState.token, navigate, dispatch, quizState.status])

	return (
		<div className="App">
			<GlobalStyles />
			
			{
				authState.token &&
				<TheNavbar	/>
			}

			<main className="app-container">	
				<RenderRoutes />				
			</main>

			<TheFooter />

			<ToastContainer pauseOnHover={false} autoClose={3000} transition={Slide}/>
		</div>
	);
}

export default App;
