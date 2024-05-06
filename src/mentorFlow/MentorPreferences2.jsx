import React, { useState, useEffect } from 'react'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteePreferences3.png'

import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { filterListMentorPreferences } from '../graphql/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';

import '../css/checkbox.css'

const client = generateClient();

const MentorPreferences2 = () => {
    // ************************* Fetch current user profile if it exists, and define appropriate variables ************************
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // Profile picture url
    const [loading, setLoading] = useState(false);

    // Fetches the username of the current authenticated user
    async function currentAuthenticatedUser() {
        try {
            const { username } = await getCurrentUser();
            setUsername(username);
        } catch (err) {
            console.log(err);
        }
    }

    // On every refresh, fetch the username of the current authenticated user
    useEffect(() => {
        currentAuthenticatedUser();
    }, [username]);


    // Fetches the current user based off the username given above
    const {
        data: mentorPreferences,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["mentorPreferences"],
        queryFn: async () => {
            const variables = {
                filter: {
                    owner: {
                        contains: username
                    }
                }
            };

            const response = await client.graphql({
                query: filterListMentorPreferences,
                variables: variables
            });

            // console.log(response);

            let preferences = response?.data?.listMentorPreferences?.items;

            if (preferences.length === 0) return null;

            return preferences[0];
        }
    })

    // ****************************************************************

    // Handles the submission of the form
    const [state, setAppState] = useAppState();
    const { handleSubmit, 
            register,
            formState: { errors },
        } = useForm({ defaultValues: state, criteriaMode: "all" });

    const saveData = (data) => {
        // set state
        // console.log(data)
        setAppState({...state, ...data });
        // console.log(data);  
        // If record exists, update
        updateRecord.mutate(data);
    
    };

    // Updates existing record
    const updateRecord = useMutation({
        mutationFn: async (data) => {
            try {
                const mentorInput = {
                    id: mentorPreferences.id,
                    mentorshipGoal: data.mentorshipGoal,
                    comments: data.mentorComments,
                };
            
                await client.graphql({
                    query: mutations.updateMentorPreferences,
                    variables: { input: mentorInput }
                });
    
                // console.log(updateMentorPreferences);
            } catch (error) {
                console.log("Error updating profile", error);
            }
        },
        onSuccess:  () => {
            navigate("/MentorLoadingScreen", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })

    function atLeastOneGoalChecked(selected) {
        return selected.length > 0;
    }

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center">
            <nav className="navbar fixed-top bg-white navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <form onSubmit={handleSubmit(saveData)}>
                {isSuccess && !isLoading && (
                <div className="container h-100">
                    <div className="row">
                        <div className="col">
                            <div className="progress" role="progressbar" >
                                <div className="progress-bar" style={{width: "87.5%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5 mt-5">
                        <div className="col">
                            <h1 className="tw-font-oceanwide">Your mentorship preferences.</h1>
                        </div>
                        <div className="col">
                            <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                                {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                {!loading && ("Next")}
                            </button>
                            <button onClick={() => {navigate('/mentorPreferences1', {replace: true})}} className="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                        </div>
                    
                        <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Help us pair you with the right students.</p>
                    </div>
                    <div className="row gx-5 gy-5 mt-1 align-items-center">
                        <div className="col">
                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorGoalInput" className="form-label tw-font-dmsans">What's your goal?</label>
                                    <ul className="list-group mt-1" id="mentorGoalInput">
                                        <label className="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("mentorshipGoal", {
                                                    validate: atLeastOneGoalChecked,
                                                })}
                                                value={"Connect with a group of likeminded people"}
                                                type="checkbox" className="me-2 tw-font-dmsans"
                                                defaultChecked={(mentorPreferences?.mentorshipGoal && !state?.mentorshipGoal) ? mentorPreferences.mentorshipGoal.includes("Connect with a group of likeminded people") : false}
                                            />
                                            Connect with a group of likeminded people
                                        </label>
                                        <label className="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("mentorshipGoal")}
                                                value={"Gain industry context"}
                                                type="checkbox" className="me-2 tw-font-dmsans"
                                                defaultChecked={(mentorPreferences?.mentorshipGoal && !state?.mentorshipGoal) ? mentorPreferences.mentorshipGoal.includes("Gain industry context") : false}
                                            />
                                            Gain industry context
                                        </label>
                                        <label className="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("mentorshipGoal")}
                                                value={"Personal growth and skill development"}
                                                type="checkbox" className="me-2 tw-font-dmsans"
                                                defaultChecked={(mentorPreferences?.mentorshipGoal && !state?.mentorshipGoal) ? mentorPreferences.mentorshipGoal.includes("Personal growth and skill development") : false}
                                            />
                                            Personal growth and skill development
                                        </label>
                                    </ul>
                                    {errors.mentorshipGoal && (
                                        <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>At least one selection is required.</small></p>
                                    )}
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <hr className="hr" /> 
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorComments" className="form-label tw-font-dmsans">Additional comments about your goals or values?</label>
                                    <textarea 
                                        {...register("mentorComments")}
                                        className="form-control tw-font-dmsans tw-h-[125px]" id="mentorComments" 
                                        defaultValue={(mentorPreferences?.comments && !state?.mentorComments) ? mentorPreferences.comments : ""}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col offset-md-1 d-flex align-items-center justify-content-center">
                            <img className="img-fluid" src={IMG} alt=""></img>
                        </div>
                    </div>
                </div>
                )}
            </form>
        </div>
    )
}

export default MentorPreferences2
