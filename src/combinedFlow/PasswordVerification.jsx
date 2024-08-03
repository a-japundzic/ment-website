import React, { useState } from 'react'

import VerificationInput from "react-verification-input";

import '../css/verification.css'

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteeLogInImg.png'

import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { autoSignIn } from 'aws-amplify/auth';

import { useLocation, useNavigate } from 'react-router-dom'


const PasswordVerification = () => {
    const {state} = useLocation();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [resentCode, setResentCode] = useState(false);
    const [resendError, setResendError] = useState('');

    async function handleSignUpConfirmation(confirmationCode) {
        const username = state?.username;
        // console.log(confirmationCode);
        try {
            await confirmSignUp({
                username,
                confirmationCode
            });

            await autoSignIn();

            if (state?.role === "Mentee") {
                navigate('/personalInfo', { replace: true });
            } else if (state?.role === "Mentor") {
                navigate('/mentorPersonalInfo', { replace: true });
            }
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

    async function resendCode() {
        const username = state?.username;
        try {
            await resendSignUpCode({username});
            setResentCode(true);
        } catch (error) {
            let errorStr = error + "";

            if (errorStr.includes("LimitExceededException")) {
                setResendError("Resend limit exceeded, please try again after some time. If you are not getting the code, check that your email above is correct.")
            } else {
                setResendError(errorStr);
            }


        }

    }

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <nav className="navbar fixed-top bg-white navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="align-middle tw-w-[139px] tw-h-[70px] image-fluid" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <div className="container h-100">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="row tw-text-center">
                            <h1 className="tw-font-poppins tw-text-[#074590]">Verify your email address</h1>
                            <p className="tw-font-dmsans tw-text-[#074590]">We emailed you a six-digit code to {state?.username}. Enter the code below to confirm your email address.</p>
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
                                onComplete={value => handleSignUpConfirmation(value)}
                                
                            />
                            <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{error}</small></p>
                        </div>
                        <p className='tw-font-dmsans pt-5 tw-text-[#074590]'>Didn't get the code?
                            <button style={{background: "none", border: "none"}} className='tw-font-dmsans tw-font-bold  tw-text-[#074590]'  onClick={() => resendCode()}>Resend Code</button>
                        </p>
                        <p className="tw--mt-4 tw-font-dmsans tw-text-[#DE5840]"><small>{resendError}</small></p>
                        {(resentCode &&
                            <p className='tw-font-dmsans tw-text-[#4BB543]  tw--mt-2'>Code resent. Tip: Check your junk mail.</p>
                            
                        )}
                       
                    </div>
                    <div className="col-6 offset-md-1 d-flex align-items-center justify-content-center">
                        <img className="img-fluid" src={IMG} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordVerification
