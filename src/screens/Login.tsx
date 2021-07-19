import React, {useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';

import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {ImSpinner8} from 'react-icons/im';
import {GiUbisoftSun} from 'react-icons/gi';

import styled from 'styled-components';
import {LOGIN} from '../features/authentication/authenticationSlice';

const AppName = styled.h2`
        color: var(--primary-dark);
    `;

const LoginSection = styled.div`
        background: var(--card-bg);
        border: 1px solid var(--light);
        border-radius: var(--border-radius);
        width: 95%;
        margin: auto;

        @media(min-width: 768px){
            max-width: 1000px;
        }

    `;
const PasswordVisibilityToggler = styled.button`
        font-size: 1.25rem;
        position: absolute;
        right: 1px;
        top: 1px;
        bottom: 1px;
        padding: 0.5rem 0.5rem;
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
    `;
    
export default function Login() {

    // const authState = useSelector((state: RootStateOrAny) => state.authentication);
    const authDispatch = useDispatch();

    const initialState = {
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }
    const [loginData, setLoginData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const [processingLoginAsGuest, setProcessingLoginAsGuest] = useState(false);

    const password = useRef(null);

    let navigate = useNavigate();

    // usual login
    function loginUser(event: React.FormEvent){
        event.preventDefault();

        // loading
        setLoginData({
            ...loginData,
            isSubmitting: true,
            errorMessage: null
        }) 

        let isLoggingAsGuest = false;
        doLogin(isLoggingAsGuest, {});
    }

    // login as guest
    function loginGuestUser(){
        // loading
        let loginGuestData = {
            email:"guest@test.com",
            password:"tester",
            isSubmitting: true,
            errorMessage: null
        }

        setProcessingLoginAsGuest(true);

        let isLoggingAsGuest = true;
        doLogin(isLoggingAsGuest, loginGuestData);
    }

    // common function for login
    async function doLogin(isLoggingAsGuest: boolean, loginGuestData: { email?: string; password?: string; isSubmitting?: boolean; errorMessage?: any; }){

        // make a request and dispatch
        try{
            let loginFormData = {}
            if(isLoggingAsGuest){
                loginFormData = loginGuestData
            }
            else{
                loginFormData = {...loginData}
            }

            console.log('loginFormData: ', loginFormData);

            const response = await axios.post("https://scio-app.herokuapp.com/login", loginFormData);
            // const response = await axios.post("http://localhost:4000/login", loginData);

            console.log('login response: ', response);

            if(response.data.success){
                console.log('success response..',response.data.success);
                let userData = {
                    name: response.data.user.name,
                    id: response.data.user._id,
                    token: response.data.token,
                    avatarUrl: response.data.user.avatarUrl
                }

                authDispatch(LOGIN(userData));

                // store in local
                localStorage.setItem("name", `"${userData.name}"`);
                localStorage.setItem("userId", `"${userData.id}"`);
                localStorage.setItem("token", `"${userData.token}"`);
                localStorage.setItem("userAvatar", `"${userData.avatarUrl}"`);
                
                // reset form
                // resetFormState(isLoggingAsGuest);

                toast.info(`Welcome back, ${response.data.user.name}!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                navigate('/');
            }
            else{
                console.log('response unsuccessful: ', response.data.message);

                // reset form
                resetFormState(isLoggingAsGuest);

                toast.error(`Error: ${response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

        }
        catch(error){
            console.log('Error login: ', error.response ? error.response.data.message: error);

            // finish loading
            resetFormState(isLoggingAsGuest);

            if(error.response){
                toast.error(`Error: ${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            else{
                toast.error(`There was an error during login.`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    function resetFormState(isLoggingAsGuest: boolean){
        // console.log('while reset: ', isLoggingAsGuest);
        if(isLoggingAsGuest){
            setProcessingLoginAsGuest(false);
        }
        else{
            // finish loading
            setLoginData({
                ...loginData,
                isSubmitting: false,
            })
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <LoginSection className="displayGrid gridCols12 gridGap6">
            <div  className="gridColSpan12 md:gridColSpan6 p4">
                <AppName className="displayFlex itemsCenter mb4 textMd">
                    {/* <img src={logo} alt="Kvell" className="h-4" /> */}
                    <GiUbisoftSun className="app-logo" />
                    Scio
                </AppName>

                <h3 className="textLg fontBold mb1 textGray4">Login</h3>
                <p className="textXs textGray3 mb6">Login to use all features of app. You can use your account or use a guest account</p>

                <form onSubmit={loginUser}>
                    <label className="displayFlex flexCol mb4 textSm textGray4 mb1">
                        Email
                        <input inputMode={"email"} type="email" id="user_email" name="email" value={loginData.email} onChange={handleInputChange}
                                autoComplete="true" placeholder="abc@example.com" className="" required/>    
                    </label>

                    <label className="displayFlex flexCol mb4 textSm textGray4 mb1">
                        Password
                        <div style={{position: "relative"}}>
                            <input type={showPassword ? "text":"password"} id="user_password" name='password' ref={password}  onChange={handleInputChange}
                                    placeholder="Enter Password" className="wFull" required/>  

                            <PasswordVisibilityToggler type="button" onClick={() => setShowPassword(!showPassword)} className="borderNone cursorPointer displayFlex itemsCenter textGray4">
                                {
                                    showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                                }
                            </PasswordVisibilityToggler>
                        </div>
                    </label>
                        

                    <button type="submit" disabled={loginData.isSubmitting} className="btn-primary wFull">
                        {
                            loginData.isSubmitting ? 
                            <span className="displayFlex itemsCenter justifyCenter">
                                <ImSpinner8 className="loading-icon mr2"/> Please Wait
                            </span> 
                            : "Login"} 
                    </button>

                    <span className="mt2 mb2 displayBlock textCenter textGray3">OR</span>

                    <button type="button" onClick={loginGuestUser} disabled={processingLoginAsGuest} className="btn-outline wFull">
                        { 
                            processingLoginAsGuest ? 
                            <span className="displayFlex itemsCenter justifyCenter">
                                <ImSpinner8 className="loading-icon mr2"/> Please wait
                            </span>
                            :
                            'Login as Guest'
                        }
                    </button>
                </form>

                <p className="mt8 textCenter textSm textGray4">
                    Not a member?
                    <Link to="/signup" className="ml1">
                        Signup
                    </Link>
                </p>

            </div>

            <div className="gridColSpan12 pt12 pb12 md:gridColSpan6 displayFlex flexCol itemsCenter justifyCenter orange-gradient">
                <h3 className="textMd mb4 textWhite">A Quiz App</h3>
                <p className="textWhite textXs">Made with React & Typescript</p>
            </div>
        </LoginSection>
    )
}
