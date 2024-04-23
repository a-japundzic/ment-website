import React, { useState } from 'react'
import { ErrorMessage } from "@hookform/error-message"

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteeLogInImg.png'
import { useNavigate } from 'react-router-dom'


import { useAppState } from "../state";
import { useForm } from "react-hook-form";

const MenteeSignUp = () => {
    const [error, setError] = useState('');

    const [state, setState] = useAppState();
    const { handleSubmit, 
            register,
            formState: { errors },
        } = useForm({ defaultValues: state, mode: "onSubmit", criteriaMode: "all" });
    const navigate = useNavigate();
    

    const saveData = (data) => {
        setState({...state, ...data });
        navigate("/passwordVerification", { replace: true });
    };


    return (
        <div>
            <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <nav class="navbar fixed-top bg-white navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            <img class="align-middle" src={LOGO} alt=""/>
                        </a>
                    </div>
                </nav>

                <form onSubmit={handleSubmit(saveData)}>
                    <div class="container h-100">
                        <div class="row gx-5 gy-5 align-items-center">
                            <div class="col">
                                <h1 class="tw-font-oceanwide">Welcome to Ment</h1>
                                <p1 class="tw-font-dmsans">Connect with a community of international students and receive personalized mentorship!</p1>
                                <div class="mt-4">
                                    <label for="menteeEmail" class="form-label tw-font-dmsans">Email
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <input 
                                        {...register("menteeEmail", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        type="email" class="form-control tw-font-dmsans py-2" id="menteeEmail" placeholder="Your email address" 
                                    />

                                    <ErrorMessage 
                                        errors={errors}
                                        name="menteeEmail"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} class="tw--mb-3 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />
                                </div>
                                <div class="mt-3">
                                    <label for="menteePassword" class="form-label tw-font-dmsans">Password
                                        <p1 class="tw-ont-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <input 
                                        {...register("menteePassword", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                                                message: "Should contain at least 8 characters, 1 number, and 1 special character"
                                            }
                                        })}
                                        type="password" class="form-control tw-font-dmsans py-2" id="menteePassword" placeholder="Your password"
                                    />
                                    {/* <div id="menteePassword" class="form-text tw-font-dmsans tw-text-[#5C667B]">
                                        Should contain at least 8 characters and 1 number
                                    </div> */}
                                    <ErrorMessage 
                                        errors={errors}
                                        name="menteePassword"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />
                                </div>
                                <div class="mt-4">
                                    <button type="submit" style={{fontSize: "120%"}} class="rounded w-100 tw-text-white tw-font-dmsans mt-3 tw-border-[#5685C9] tw-border-3 tw-py-1 tw-px-5 hover:tw-text-[#5685C9] tw-bg-[#5685C9] tw-border-solid hover:tw-bg-white tw-duration-300">
                                        Sign Up
                                    </button>
                                    <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{error}</small></p>
                                </div>
                                <hr class="hr mt-5" />
                                <div>
                                    <p1 class="tw-font-dmsans">
                                        Already have an account? 
                                        <a href='/' class="tw-font-dmsans tw-font-bold ms-1  tw-text-[#5685C9]">
                                            Log In
                                        </a>
                                    </p1>    
                                </div>
                                {/* <div class="mt-5">
                                    <label for="menteeLogInLabel" class="form-label tw-font-dmsans">Already have an account?</label>
                                    <button id="menteeLogInLable" style={{fontSize: "120%"}} class="rounded w-100 tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-3 tw-py-1 tw-px-5 hover:tw-text-white tw-bg-white tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300" type="button">Log In</button>
                                </div> */}
                                {/* <div class="mt-1">
                                    <button style={{fontSize: "120%"}} class="rounded w-100 tw-text-black tw-font-dmsans mt-3 tw-border-[#5C667B] tw-border-1 tw-py-1 tw-px-5 tw-bg-white tw-border-solid" type="button">Log in with Google placeholder</button>
                                </div> */}
                            </div>
                            <div class="col offset-md-1 d-flex align-items-center justify-content-center">
                                <img class="img-fluid" src={IMG} alt=""></img>
                            </div>
                        
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MenteeSignUp
