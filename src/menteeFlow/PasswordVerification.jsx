import React, { useState } from 'react'

import VerificationInput from "react-verification-input";

import '../css/verification.css'

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteeLogInImg.png'

import { confirmSignUp } from 'aws-amplify/auth';
import { autoSignIn } from 'aws-amplify/auth';

import { useNavigate } from 'react-router-dom'


const PasswordVerification = () => {
    const [username] = useState(sessionStorage.getItem("username"));
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSignUpConfirmation(username, confirmationCode) {
        console.log(confirmationCode);
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username,
                confirmationCode
            });

            const signInOutput = await autoSignIn();

            console.log(isSignUpComplete);
            console.log(nextStep);
            console.log(signInOutput);

            sessionStorage.clear();
            navigate('/personalInfo', { replace: true });
        } catch (error) {
            let errorStr = error + '';
            errorStr = error.substr(error.indexOf(" ") + 1);

            setError('Error confirming sign up: ' + errorStr);
            console.log('error confirming sign up', error);
        }
    }

    return (
        <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <nav class="navbar fixed-top bg-white navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img class="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <div class="container h-100">
                <div class="row gx-5 gy-5 align-items-center">
                    <div class="col">
                        <div class="row tw-text-center">
                            <h1 class="tw-font-oceanwide">Verify your email address</h1>
                            <p1 class="tw-font-dmsans">We emailed you a six-digit code to {username}. Enter the code below to confirm your email address.</p1>
                        </div>
                        <div class="row tw-font-dmsans" style={{marginTop: '100px'}}>
                            <VerificationInput 
                                validChars='0-9'
                                inputProps={{ inputMode: "numeric" }}
                                autoFocus
                                classNames={{
                                    container: "container",
                                    character: "character",
                                    characterInactive: "character--inactive",
                                    characterSelected: "character--selected",
                                    characterFilled: "character--filled",
                                }}
                                onComplete={value => handleSignUpConfirmation(username, value)}
                                
                            />
                            <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{error}</small></p>
                        </div>
                    </div>
                    <div class="col-6 offset-md-1 d-flex align-items-center justify-content-center">
                        <img class="img-fluid" src={IMG} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordVerification
