import React, {useState, useEffect} from 'react'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteePreferences1.png'

import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { filterListMentorPreferences, listMentorProfiles } from '../graphql/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';

import '../css/checkbox.css'

const client = generateClient();

const MentorExpertise = ({ settings=false }) => {
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
        setAppState({...state, ...data });
        // console.log(data);  
        // If record exists, update, else, create a new one
        if (mentorPreferences) {
            // update the current record
            // updateRecord(data);
            updateRecord.mutate(data);
        } else {
            // create a new record
            createRecord.mutate(data);
        }
    
    };

    // Creates new record
    const createRecord = useMutation({
        mutationFn: async (data) => {
            try {
                // Attach the mentor id to the mentor preferences
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
    
                let completeProfile = response?.data?.listMentorProfiles?.items[0];
                // 

                const mentorInput = {
                    mentorshipSkills: data.mentorshipSkills,
                    mentorId: completeProfile.id,
                };
            
                await client.graphql({
                    query: mutations.createMentorPreferences,
                    variables: { input: mentorInput }
                });
                
                // console.log(newMenteePreferences);
            } catch (error) {
                console.log("Error creating profile", error);
            }
        },
        onSuccess:  () => {
            setLoading(false);

            if (!settings) {
                navigate("/mentorPreferences1", {replace: true});
            }
        },
        onMutate: () => {
            setLoading(true);
        }
    })


    // Updates existing record
    const updateRecord = useMutation({
        mutationFn: async (data) => {
            try {
                const mentorInput = {
                    id: mentorPreferences.id,
                    mentorshipSkills: data.mentorshipSkills,
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
            navigate("/mentorPreferences1", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })

    function atLeastOneChecked(selected) {
        return selected.length > 0;
    }

    return (
        <div className={settings ? "d-flex flex-column" : "d-flex flex-column min-vh-100 justify-content-center" }>
            {(!settings && 
            <nav className="navbar fixed-top bg-white navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>
            )}

            <form onSubmit={handleSubmit(saveData)}>
                {isSuccess && !isLoading && (
                <div className="container h-100">

                    {( !settings &&
                    <div className="row">
                        <div className="col">
                            <div className="progress" role="progressbar" >
                                <div className="progress-bar" style={{width: "62.5%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    )}

                    {(!settings && 
                    <div className="row gx-5 mt-5">
                        <div className="col">
                            <h1 className="tw-font-oceanwide">What are your areas of expertise?</h1>
                        </div>
                        <div className="col">
                            <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                                {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                {!loading && ("Next")}
                            </button>
                            <button onClick={() => {navigate('/mentorSchedule', {replace: true})}} className="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                        </div>
                       
                        <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Help us pair you with the right students.</p>
                    </div>
                    )}

                    {( settings &&
                    <div className="row gx-5 mt-5">
                        <div className='col'>
                            <p className="tw-font-dmsans">
                                Make your required changes and then press the "submit changes" button.
                            </p>
                        </div>
                        <div className="col">
                            <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                                {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                {!loading && ("Submit Changes")}
                            </button>
                        </div>
                    </div>
                    )}

                    <div className="row gx-5 gy-5 mt-1 align-items-center">
                        <div className="col">
                            <label htmlFor="mentorSkillsInput" className="form-label tw-font-dmsans">
                                What skills are in your skillset?
                                <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                            </label>
                            <ul className="list-group mt-1" id="mentorSkillsInput">
                                <label className="list-group-item tw-font-dmsans">
                                    <input 
                                        {...register("mentorshipSkills", {
                                            validate: atLeastOneChecked,
                                        })}
                                        value={"Leadership and team management"}
                                        type="checkbox" className="me-2 tw-font-dmsans" defaultChecked={(mentorPreferences?.mentorshipSkills && !state?.mentorshipSkills) ? mentorPreferences.mentorshipSkills.includes("Leadership and team management") : false}
                                    />
                                    Leadership and team management
                                </label>
                                <label className="list-group-item tw-font-dmsans">
                                    <input 
                                        {...register("mentorshipSkills")}
                                        value={"Technical skills related to my field"}
                                        type="checkbox" className="me-2 tw-font-dmsans" defaultChecked={(mentorPreferences?.mentorshipSkills && !state?.mentorshipSkills) ? mentorPreferences.mentorshipSkills.includes("Technical skills related to my field") : false}
                                    />
                                    Technical skills related to my field
                                </label>
                                <label className="list-group-item tw-font-dmsans">
                                    <input 
                                        {...register("mentorshipSkills")}
                                        value={"Communication and relationship skills"}
                                        type="checkbox" className="me-2 tw-font-dmsans" defaultChecked={(mentorPreferences?.mentorshipSkills && !state?.mentorshipSkills) ? mentorPreferences.mentorshipSkills.includes("Communication and relationship skills") : false}
                                    />
                                    Communication and relationship skills
                                </label>
                                <label className="list-group-item tw-font-dmsans">
                                    <input 
                                        {...register("mentorshipSkills")}
                                        value={"Strategic thinking and problem-solving skills"}
                                        type="checkbox" className="me-2 tw-font-dmsans" defaultChecked={(mentorPreferences?.mentorshipSkills && !state?.mentorshipSkills) ? mentorPreferences.mentorshipSkills.includes("Strategic thinking and problem-solving skills") : false}
                                    />
                                    Strategic thinking and problem-solving skills
                                </label>
                                <label className="list-group-item tw-font-dmsans">
                                    <input 
                                        {...register("mentorshipSkills")}
                                        value={"Strong resume and interview skills"}
                                        type="checkbox" className="me-2 tw-font-dmsans" defaultChecked={(mentorPreferences?.mentorshipSkills && !state?.mentorshipSkills) ? mentorPreferences.mentorshipSkills.includes("Strong resume and interview skills") : false}
                                    />
                                    Strong resume and interview skills
                                </label>
                                <label className="list-group-item tw-font-dmsans">
                                    <input 
                                        {...register("mentorshipSkills")}
                                        value={"Cross-team collaboration"}
                                        type="checkbox" className="me-2 tw-font-dmsans" defaultChecked={(mentorPreferences?.mentorshipSkills && !state?.mentorshipSkills) ? mentorPreferences.mentorshipSkills.includes("Cross-team collaboration") : false}
                                    />
                                    Cross-team collaboration
                                </label>
                            </ul>
                            {errors.mentorshipSkills && (
                                <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>At least one selection is required.</small></p>
                            )}
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

export default MentorExpertise
