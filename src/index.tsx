import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; 
import axios from "axios";
import store from './store';
import {LOGOUT} from './features/authentication/authenticationSlice';

axios.interceptors.request.use(function(config) {
		const token = JSON.parse(String(localStorage.getItem('token')) || "");

		if(token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	}, 
	function(err) {
		console.log('general request rejected', err.response.status)
		return Promise.reject(err);
	}
);

axios.interceptors.response.use(
	(response) => response,
	(error) => {
	  	if (error?.response?.status === 401) {
			  console.log("unauthorized route")
			// dispatch to change state as well
			store.dispatch(LOGOUT());
		}
	  	return Promise.reject(error);
	}
);


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
