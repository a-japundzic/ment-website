import React, { useState } from 'react'
import { ErrorMessage } from "@hookform/error-message"

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteeLogInImg.png'
import { useNavigate } from 'react-router-dom'

import { useAppState } from "../state";
import { useForm } from "react-hook-form";

import { signUp } from 'aws-amplify/auth';

const MentorSignUp = () => {
    const [error, setError] = useState('');

    const [state, setState] = useAppState();
    const { handleSubmit, 
            register,
            formState: { errors },
            watch,
            getValues,
        } = useForm({ defaultValues: state, mode: "onSubmit", criteriaMode: "all" });
    const navigate = useNavigate();
    

    const saveData = (data) => {
        setState({...state, ...data });
        handleSignUp(data.mentorEmail, data.mentorEmail, data.mentorPassword);
    };

    async function handleSignUp(username, email, password) {
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email,
                        "custom:user_type": "Mentor",
                    },
                    autoSignIn: true
                }
            });

            sessionStorage.setItem("username", username);

            navigate("/mentorPasswordVerification", { replace: true });
        } catch (error) {
            error = error + '';
            error = error.substring(error.indexOf(" ") + 1);

            setError('Error signing up: ' + error);
        }
    }


    return (
        <div>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <nav className="navbar fixed-top bg-white navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img className="align-middle" src={LOGO} alt=""/>
                        </a>
                    </div>
                </nav>

                <form onSubmit={handleSubmit(saveData)}>
                    <div className="container h-100">
                        <div className="row gx-5 gy-5 align-items-center">
                            <div className="col">
                                <h1 className="tw-font-oceanwide">Welcome to Ment</h1>
                                <p className="tw-font-dmsans">Connect with a community of international students and receive personalized mentorship!</p>
                                <div className="mt-4">
                                    <label htmlFor="mentorEmail" className="form-label tw-font-dmsans">Email
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <input 
                                        {...register("mentorEmail", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        type="email" className="form-control tw-font-dmsans py-2" id="mentorEmail" placeholder="Your email address" 
                                    />

                                    <ErrorMessage 
                                        errors={errors}
                                        name="mentorEmail"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="tw--mb-3 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="mentorPassword" className="form-label tw-font-dmsans">Password
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <input 
                                        {...register("mentorPassword", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                                                message: "Should contain at least 8 characters, 1 number, and 1 special character"
                                            }
                                        })}
                                        type="password" className="form-control tw-font-dmsans py-2" id="mentorPassword" placeholder="Your password"
                                    />
                                    {/* <div id="mentorPassword" className="form-text tw-font-dmsans tw-text-[#5C667B]">
                                        Should contain at least 8 characters and 1 number
                                    </div> */}
                                    <ErrorMessage 
                                        errors={errors}
                                        name="mentorPassword"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <input 
                                        {...register("mentorPasswordRepeat", {
                                            required: "Repeat password is required",
                                        })}
                                        type="password" className="form-control tw-font-dmsans py-2" id="mentorPasswordRepeat" placeholder="Repeat password"
                                    />
                                    {/* <div id="mentorPassword" className="form-text tw-font-dmsans tw-text-[#5C667B]">
                                        Should contain at least 8 characters and 1 number
                                    </div> */}
                                    <ErrorMessage 
                                        errors={errors}
                                        name="mentorPasswordRepeat"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />

                                    { watch("mentorPasswordRepeat") !== watch("mentorPassword") && getValues("mentorPasswordRepeat") ? (
                                         <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>Passwords do not match</small></p>
                                    ) : null}
                                </div>
                                <div className="mt-4">
                                    <button type="submit" style={{fontSize: "120%"}} className="rounded w-100 tw-text-white tw-font-dmsans mt-3 tw-border-[#5685C9] tw-border-3 tw-py-1 tw-px-5 hover:tw-text-[#5685C9] tw-bg-[#5685C9] tw-border-solid hover:tw-bg-white tw-duration-300">
                                        Sign Up
                                    </button>
                                    <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{error}</small></p>
                                </div>
                                <hr className="hr mt-5" />
                                <div>
                                    <p className="tw-font-dmsans">
                                        Already have an account? 
                                        <a href='/' className="tw-font-dmsans tw-font-bold ms-1 tw-text-[#5685C9]">
                                            Log In
                                        </a>
                                    </p>    
                                </div>
                                {/* <div className="mt-5">
                                    <label htmlFor="mentorLogInLabel" className="form-label tw-font-dmsans">Already have an account?</label>
                                    <button id="mentorLogInLable" style={{fontSize: "120%"}} className="rounded w-100 tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-3 tw-py-1 tw-px-5 hover:tw-text-white tw-bg-white tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300" type="button">Log In</button>
                                </div> */}
                                {/* <div className="mt-1">
                                    <button style={{fontSize: "120%"}} className="rounded w-100 tw-text-black tw-font-dmsans mt-3 tw-border-[#5C667B] tw-border-1 tw-py-1 tw-px-5 tw-bg-white tw-border-solid" type="button">Log in with Google placeholder</button>
                                </div> */}
                            </div>
                            <div className="col offset-md-1 d-flex align-items-center justify-content-center">
                                <img className="img-fluid" src={IMG} alt=""></img>
                            </div>
                        
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MentorSignUp
