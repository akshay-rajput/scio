import React, {useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {GiUbisoftSun} from 'react-icons/gi';
import {ImSpinner8} from 'react-icons/im';

import styled from 'styled-components';

// import logo from '../../public/logo.svg';

const AppName = styled.h2`
        color: var(--primary-dark);
    `;

const SignupSection = styled.div`
        background: var(--card-bg);
        border: 1px solid var(--light);
        border-radius: var(--border-radius);
        width: 95%;
        margin: auto;

        .app-logo{
            color: var(--primary);
        }
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

export default function Signup() {

    let navigate = useNavigate();

    const initialState = {
        name: "",
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }
    const [signupData, setSignupData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const password = useRef(null);

    async function doSignup(event: React.FormEvent){
        event.preventDefault();
        
        // loading
        setSignupData({
            ...signupData,
            isSubmitting: true,
            errorMessage: null
        })

        // console.log("formData: ", formData);
        // make a request and dispatch
        try{
            const response = await axios.post("https://scio-app.herokuapp.com/signup", signupData);
            console.log('user response: ', response);

            if(response.data.success){
                let userData = {
                    name: response.data.user.name,
                    id: response.data.user._id
                }
    
                // finish loading
                setSignupData({
                    ...signupData,
                    isSubmitting: false,
                    errorMessage: null
                })
    
                // show toast of successful signup and navigate
                console.log("signed up : ", userData);

                toast.success(`Signed up successfully`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                navigate('/login');
            }
            else{
                console.log('response unsuccessful')
                // finish loading
                setSignupData({
                    ...signupData,
                    isSubmitting: false,
                    errorMessage: response.data.message
                })

                toast.error(`Error: ${response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        catch(error){
            console.log('Error signup: ', error.response.data);

            // finish loading
            setSignupData({
                ...signupData,
                isSubmitting: false,
                errorMessage: error.response?.data.message
            })

            if(error.response){
                toast.error(`Error: ${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }else{
                toast.error(`Error during signup`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            
        }

    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <SignupSection className=" displayGrid gridCols12 gridGap6">
            <div  className="gridColSpan12 md:gridColSpan6 p4">
                <AppName className="displayFlex itemsCenter mb4 textMd">
                    {/* <img src={logo} alt="Scio" className="h-4" /> */}
                    <GiUbisoftSun className="app-logo" />
                    Scio
                </AppName>

                <h3 className="textLg fontBold mb1 textGray4">Signup</h3>
                <p className="textXs textGray3 mb6">Signup to use all features of app.</p>

                <form onSubmit={doSignup}>
                    <label className="displayFlex flexCol mb4 textSm textGray4 mb1">
                        Email
                        <input type="email" id="user_email" name="email" value={signupData.email} onChange={handleInputChange}
                                autoComplete="true" placeholder="abc@example.com" className="" required/>    
                    </label>

                    <label className="displayFlex flexCol mb4 textSm textGray4 mb1">
                        Name
                        <input type="text" id="user_name" name="name" value={signupData.name} onChange={handleInputChange}
                                autoComplete="true" placeholder="Your name" minLength={2} className="" required/>    
                    </label>

                    <label className="displayFlex flexCol mb6 textSm textGray4 mb1">
                        Password
                        <div style={{position: "relative"}}>
                            <input type={showPassword ? "text":"password"} id="user_password" minLength={6} name='password' ref={password}  onChange={handleInputChange}
                                    placeholder="Enter Password" className="wFull" required/>  

                            <PasswordVisibilityToggler type="button" onClick={() => setShowPassword(!showPassword)} className="borderNone cursorPointer displayFlex itemsCenter textGray4">
                                {
                                    showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                                }
                            </PasswordVisibilityToggler>
                        </div>
                    </label>

                    <button type="submit" disabled={signupData.isSubmitting} className="btn-primary wFull">
                        {
                            signupData.isSubmitting ? 
                            <span className="displayFlex itemsCenter justifyCenter">
                                <ImSpinner8 className="loading-icon mr2"/> Please Wait
                            </span> 
                            : "Signup"} 
                    </button>

                </form>

                <p className="mt8 textCenter textSm textGray4">
                    Already a member?
                    <Link to="/login" className="ml1">
                        Login
                    </Link>
                </p>

            </div>

            <div className="gridColSpan12 pt12 pb12 md:gridColSpan6 rounded displayFlex flexCol itemsCenter justifyCenter orange-gradient">
                <h3 className="textMd mb4 textWhite">A Quiz App</h3>
                <p className="textWhite textXs">Made with React & Typescript</p>
            </div>
        </SignupSection>
    )
}
