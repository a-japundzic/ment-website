import React, {useState, useEffect} from 'react'
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import Select from 'react-select'

import LOGO from '../assets/logo.png'

import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { listMentorProfiles } from '../graphql/queries';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUrl } from 'aws-amplify/storage';
import { Oval } from 'react-loader-spinner';
import { InlineWidget } from 'react-calendly';

const client = generateClient();

const MentorSchedule = () => {
    // ************************* Fetch current user profile if it exists, and define appropriate variables ************************
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // Set loading wheel
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
        data: userProfile,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
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

            let completeProfile = response?.data?.listMentorProfiles?.items;

            if (!completeProfile) return null;
        
            return completeProfile;
        }
    })

    // ****************************************************************

    // Handles the submission of the form
    const [state, setAppState] = useAppState();
    const { handleSubmit, 
        register,
        control,
        formState: { errors },
        reset,
        watch,
        getValues
    } = useForm({defaultValues: state, criteriaMode: "all" });

    const saveData = (data) => {
        // set state
        setAppState({...state, ...data });

        // If record exists, update, else, create a new one
        updateRecord.mutate(data);
    };

    // Updates existing record
    const updateRecord = useMutation({
        mutationFn: async (data) => {
            try {
                const mentorDetails = {
                    id: userProfile[0].id,
                    calendly: data.mentorCalendly,
                };
            
                const updateMentor = await client.graphql({
                    query: mutations.updateMentorProfile,
                    variables: { input: mentorDetails }
                });
            } catch (error) {
                console.log("Error updating profile", error);
            }
        },
        onSuccess:  () => {
            navigate("/mentorExpertise", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })

    // If the page is refreshed, and state is cleared, set default values from the query (this took forever, but got it done)
    useEffect(() => {
        if (isSuccess && !state && userProfile[0].length > 0) {
            reset({
                mentorCalendly: userProfile[0].calendly,
            })
        }
    }, [])

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
                                <div className="progress-bar" style={{width: "50%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5 mt-5">
                        <div className="col">
                            <h1 className="tw-font-oceanwide">Your available schedule.</h1>
                        </div>
                        <div className="col">
                            <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                                {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                {!loading && ("Next")}
                            </button>
                            <button onClick={() => {navigate('/mentorBackground', {replace: true})}}  className="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                        </div>
                        
                        <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Enter your calendly link below! This will be how your mentees schedule meetings with you.</p>
                    </div>
                    <div className="row gx-5 gy-5 mt-2">
                        <div className="col">
                            <h6 className='tw-font-dmsans'>Follow the following steps to successfully set up your calander:</h6>
                            <p className='tw-font-dmsans mt-3'>
                                <a href='https://calendly.com/signup' target="_blank" className="tw-font-dmsans tw-font-bold tw-text-[#5685C9]">
                                    1. Sign up for a Calendly account
                                </a>
                                <br />
                                <a href='https://help.calendly.com/hc/en-us/articles/14073239908247-Create-a-new-event#create-a-new-event-0-0p' target="_blank" className="tw-font-dmsans tw-font-bold tw-text-[#5685C9]">
                                    2. Create an new event for mentoring
                                </a>
                                <br />
                                <a href='https://help.calendly.com/hc/en-us/articles/223193448-Sharing-your-scheduling-link#1' target="_blank" className="tw-font-dmsans tw-font-bold tw-text-[#5685C9]">
                                    3. Share your Calendly scheduling link
                                </a>
                            </p>
             
                            <h6 className='tw-font-dmsans mt-5'>Now simply paste your link below:</h6>
                            <label htmlFor="mentorCalendly" className="form-label tw-font-dmsans mt-2">Calendly link
                                <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                            </label>
                            <input 
                                {...register("mentorCalendly", { required: "Calendly link is required" })}
                                type="name" className="form-control tw-font-dmsans py-2" id="mentorCalendly" placeholder="https://calendly.com/your_scheduling_page" defaultValue={(userProfile[0]?.calendly) ? userProfile[0].calendly : ""}
                            />
                            <ErrorMessage 
                                errors={errors}
                                name="mentorCalendly"
                                render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                            />
                        </div>

                        <div className="col offset-md-1">
                            <h6 className="tw-font-dmsans">Preview:</h6>
                            <div className='container-fluid tw-h-[635px] border align-items-center'>

                                    { watch("mentorCalendly") && (
                                        <InlineWidget url={watch("mentorCalendly")}></InlineWidget>
                                    )}
                                    { !watch("mentorCalendly") && (userProfile[0]?.calendly) && (
                                        <InlineWidget url={(userProfile[0].calendly)}></InlineWidget>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </form>
        </div>

    )
}

export default MentorSchedule
