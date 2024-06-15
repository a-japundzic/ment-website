import React, { useState } from 'react'
import { ErrorMessage } from "@hookform/error-message"

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteeLogInImg.png'
import { useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";

import { getCurrentUser, signIn } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listMenteePreferences, listMenteeProfiles, listMentorPreferences, listMentorProfiles } from '../graphql/queries';

import { fetchUserAttributes } from 'aws-amplify/auth';

import { useMutation } from '@tanstack/react-query'
import { Oval } from 'react-loader-spinner';


const client = generateClient();

const SignIn = () => {
    // State for setting error
    const [error, setError] = useState('');
    // State for setting loading
    const [loading, setLoading] = useState(false);

    const { handleSubmit, 
            register,
            formState: { errors },
        } = useForm({ mode: "onSubmit", criteriaMode: "all" });
    const navigate = useNavigate();
    
    const saveData = (data) => {
        setError("");
        handleSignIn.mutate(data);
    };

    // Fetches the username of the current authenticated user
    async function currentAuthenticatedUser() {
        try {
            const { username } = await getCurrentUser();
            handleNavigation(username);
        } catch (err) {
            console.log(err);
        }
    }

    // Autosign in user if possible
    // useEffect(() => {
    //     currentAuthenticatedUser();
    //     // handleSignOut();
    // }, []);

    async function handleNavigation(username) {
        // Fetches the current user based off the username given above
        try {
            const userAttributes = await fetchUserAttributes();

            if (userAttributes["custom:user_type"] === "Mentee") {
                const variables = {
                    filter: {
                        owner: {
                            contains: username
                        }
                    }
                };

                const response = await client.graphql({
                    query: listMenteeProfiles,
                    variables: variables
                });

                const userProfile = response?.data?.listMenteeProfiles?.items;
                const userProfileLen = userProfile.length;

                if (userProfileLen === 0) {
                    navigate("/personalInfo", { replace: true });
                } else if (!userProfile[0].values) {
                    navigate("/personalInfo2", { replace: true });
                } else if (!userProfile[0].schoolName) {
                    navigate("education", { replace: true });
                }
                
                const preferenceResponse = await client.graphql({
                    query: listMenteePreferences,
                    variables: variables
                });

                const userPreferences = preferenceResponse?.data?.listMenteePreferences?.items;
                
                if (!userPreferences[0].mentorshipSkills) {
                    navigate("/menteePreferences", { replace: true });
                } else if (!userPreferences[0].mentorshipType) {
                    navigate("/menteePreferences2", { replace: true });
                } else if (!userPreferences[0].mentorshipGoal) {
                    navigate("/menteePreferences3", { replace: true });
                } else {
                    navigate("/menteeHome", { replace: true });
                }
            } else if (userAttributes["custom:user_type"] === "Mentor") {
                const variables = {
                    filter: {
                        owner: {
                            contains: username
                        }
                    }
                };

                const response = await client.graphql({
                    query: listMentorProfiles,
                    variables: variables
                });

                let userProfile = response?.data?.listMentorProfiles?.items;
                let userProfileLen = userProfile.length;

                if (userProfileLen === 0) {
                    navigate("/mentorPersonalInfo", { replace: true });
                } else if (!userProfile[0].values) {
                    navigate("/mentorPersonalInfo2", { replace: true });
                } else if (!userProfile[0].bio) {
                    navigate("/mentorBackground", { replace: true });
                } else if (!userProfile[0].calendly) {
                    navigate("/mentorSchedule", { replace: true });
                } 

                const preferencesResponse = await client.graphql({
                    query: listMentorPreferences,
                    variables: variables
                });

                const userPreferences = preferencesResponse?.data?.listMentorPreferences?.items;
                
                if (!userPreferences[0].mentorshipSkills) {
                    navigate("/mentorExpertise", { replace: true });
                } else if (!userPreferences[0].mentorshipType) {
                    navigate("/mentorPreferences1", {replace: true});
                } else if (!userPreferences[0].mentorshipGoal) {
                    navigate("/mentorPrferences2", {replace: true});
                } else {
                    navigate("/mentorBookings", {replace: true });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Sign in function
    const handleSignIn = useMutation({
        mutationFn: async (data) => {
            let username = data.menteeEmail;
            let password = data.menteePassword;

            try {
                const { nextStep } = await signIn({ username, password });
    
                if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
                    sessionStorage.setItem("username", username);
                    navigate("/passwordVerification", { replace: true });
                } else {
                    currentAuthenticatedUser();
                }
            } catch (error) {
                let format_error = error + '';
                format_error = format_error.substring(format_error.indexOf(" ") + 1);

                setLoading(false);
                setError('Error signing in: ' + format_error);
            }
        },
        onMutate: () => {
            setLoading(true);
        },
    });

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
                                <h1 className="tw-font-oceanwide tw-text-center">Sign In</h1>
                                <div className="mt-4">
                                    <label htmlFor="menteeEmail" className="form-label tw-font-dmsans">Email
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <input 
                                        {...register("menteeEmail", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        type="email" className="form-control tw-font-dmsans py-2" id="menteeEmail" placeholder="Your email address" 
                                    />

                                    <ErrorMessage 
                                        errors={errors}
                                        name="menteeEmail"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="tw--mb-3 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="menteePassword" className="form-label tw-font-dmsans">Password
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <input 
                                        {...register("menteePassword", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                                                message: "Should contain at least 8 characters, 1 number, and 1 special character"
                                            }
                                        })}
                                        type="password" className="form-control tw-font-dmsans py-2" id="menteePassword" placeholder="Your password"
                                    />
                                    {/* <div id="menteePassword" className="form-text tw-font-dmsans tw-text-[#5C667B]">
                                        Should contain at least 8 characters and 1 number
                                    </div> */}
                                    <ErrorMessage 
                                        errors={errors}
                                        name="menteePassword"
                                        render={({ messages }) => 
                                            messages &&
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                            ))
                                        }
                                    />
                                </div>
                                <div className="mt-4">
                                    
                                    <button type="submit" style={{fontSize: "120%"}} className="rounded tw-flex tw-justify-center w-100 tw-text-white tw-font-dmsans mt-3 tw-border-[#5685C9] tw-border-3 tw-py-1 tw-px-5 hover:tw-text-[#5685C9] tw-bg-[#5685C9] tw-border-solid hover:tw-bg-white tw-duration-300">
                                        {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                        {!loading && ("Sign In")}
                                    </button>
                                    
                                    <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{error}</small></p>
                                </div>
                                <hr className="hr mt-5" />
                                <div>
                                    <p className="tw-font-dmsans">
                                        Don't have an account? 

                                        <a href='/mentorSignUp' className="tw-font-dmsans tw-font-bold ms-1  tw-text-[#5685C9]">
                                        Mentor Sign Up
                                        </a>

                                        
                                        <a href='/menteeSignUp' className="tw-font-dmsans tw-font-bold ms-1  tw-text-[#5685C9]">
                                        Mentee Sign Up
                                        </a>
                                    </p>    
                                </div>
                                {/* <div className="mt-5">
                                    <label htmlFor="menteeLogInLabel" className="form-label tw-font-dmsans">Already have an account?</label>
                                    <button id="menteeLogInLable" style={{fontSize: "120%"}} className="rounded w-100 tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-3 tw-py-1 tw-px-5 hover:tw-text-white tw-bg-white tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300" type="button">Log In</button>
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

export default SignIn
