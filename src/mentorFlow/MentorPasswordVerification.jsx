import React, { useState } from 'react'

import VerificationInput from "react-verification-input";

import '../css/verification.css'

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteeLogInImg.png'

import { confirmSignUp } from 'aws-amplify/auth';
import { autoSignIn } from 'aws-amplify/auth';

import { useNavigate } from 'react-router-dom'


const MentorPasswordVerification = () => {
    const [username] = useState(sessionStorage.getItem("username"));
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSignUpConfirmation(username, confirmationCode) {
        // console.log(confirmationCode);
        try {
            await confirmSignUp({
                username,
                confirmationCode
            });

            await autoSignIn();

            sessionStorage.clear();
            navigate('/mentorPersonalInfo', { replace: true });
        } catch (error) {
            let errorStr = error + '';
            errorStr = errorStr.substring(errorStr.indexOf(" ") + 1);

            if (errorStr.includes("autoSignIn")) {
                navigate('/', { replace: true });
            } else {     
                setError('Error confirming sign up: ' + errorStr);
                console.log('error confirming sign up', error);
            }

        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <nav className="navbar fixed-top bg-white navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <div className="container h-100">
                <div className="row gx-5 gy-5 align-items-center">
                    <div className="col">
                        <div className="row tw-text-center">
                            <h1 className="tw-font-oceanwide">Verify your email address</h1>
                            <p className="tw-font-dmsans">We emailed you a six-digit code to {username}. Enter the code below to confirm your email address.</p>
                        </div>
                        <div className="row tw-font-dmsans" style={{marginTop: '100px'}}>
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
                            <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{error}</small></p>
                        </div>
                    </div>
                    <div className="col-6 offset-md-1 d-flex align-items-center justify-content-center">
                        <img className="img-fluid" src={IMG} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorPasswordVerification
