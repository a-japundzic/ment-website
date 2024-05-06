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

const client = generateClient();

const MentorProfileSetup2 = () => {
    // ************************* Fetch current user profile if it exists, and define appropriate variables ************************
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // Profile picture url
    const [profileImgUrl, setProfileImgUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [state, setAppState] = useAppState();

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

            if(completeProfile[0]?.profilePicKey) {
                // Format image url
                const signedURL = await getUrl({ key: completeProfile[0].profilePicKey });
                setProfileImgUrl(signedURL.url.toString());
            } else {
                setProfileImgUrl("");
            }
        
            return completeProfile;
        }
    })

    // ****************************************************************

    // Handles the submission of the form
    const { handleSubmit, 
        register,
        control,
        formState: { errors },
        reset
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
                // Simplify the formatting of the user's ethnicity input
                let valueArr = [];
                var valueArrLen = data.mentorValues.length;
                for (var i = 0; i < valueArrLen; i++) {
                    valueArr.push(data.mentorValues[i].value);
                }
    
                const mentorDetails = {
                    id: userProfile[0].id,
                    values: valueArr,
                    instagram: data.mentorInstagram,
                    facebook: data.mentorFacebook,
                    linkedin: data.LinkedIn,
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
            navigate("/mentorBackground ", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })

    // If the page is refreshed, and state is cleared, set default values from the query (this took forever, but got it done)
    useEffect(() => {
        if (isSuccess && !state && userProfile[0].length > 0) {
            reset({
                mentorValues: formatValues().map(ele => ele),
                mentorInstagram: userProfile[0].instagram,
                mentorFacebook: userProfile[0].facebook,
                mentorLinkedIn: userProfile[0].linkedin,
            })
        }
    }, [])

    // Formats the multiple select questions to settable default values
    function formatValues() {
        let valueArrFormatted = [];
        if (userProfile[0].values) {
            var valueArrLen = userProfile[0].values.length;

            for (var i = 0; i < valueArrLen; ++i) {
                valueArrFormatted.push(valueOptions.find(op => {
                    return op.value === userProfile[0].values[i]
                }));
            }
        }

        return valueArrFormatted;
    }
    

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 42,
            borderColor: '#E9ECEF',
            boxShadow: state.isFocused ? '0 0 0px 4px #C2DAFF' : 'none',
        })
    };

    const valueOptions = [
        { value: 'Authenticity', label: 'Authenticity' },
        { value: 'Achievement', label: 'Achievement' },
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Authority', label: 'Authority' },
        { value: 'Autonomy', label: 'Autonomy' },
        { value: 'Balance', label: 'Balance' },
        { value: 'Beauty', label: 'Beauty' },
        { value: 'Boldness', label: 'Boldness' },
        { value: 'Compassion', label: 'Compassion' },
        { value: 'Challenge', label: 'Challenge' },
        { value: 'Citizenship', label: 'Citizenship' },
        { value: 'Community', label: 'Community' },
        { value: 'Competency', label: 'Competency' },
        { value: 'Contribution', label: 'Contribution' },
        { value: 'Creativity', label: 'Creativity' },
        { value: 'Curiosity', label: 'Curiosity' },
        { value: 'Determination', label: 'Determination' },
        { value: 'Fairness', label: 'Fairness' },
        { value: 'Faith', label: 'Faith' },
        { value: 'Fame', label: 'Fame' },
        { value: 'Friendships', label: 'Friendships' },
        { value: 'Fun', label: 'Fun' },
        { value: 'Growth', label: 'Growth' },
        { value: 'Happiness', label: 'Happiness' },
        { value: 'Honesty', label: 'Honesty' },
        { value: 'Humor', label: 'Humor' },
        { value: 'Influence', label: 'Influence' },
        { value: 'Inner Harmony', label: 'Inner Harmony' },
        { value: 'Justice', label: 'Justice' },
        { value: 'Kindness', label: 'Kindness' },
        { value: 'Knowledge', label: 'Knowledge' },
        { value: 'Leadership', label: 'Leadership' },
        { value: 'Learning', label: 'Learning' },
        { value: 'Love', label: 'Love' },
        { value: 'Loyalty', label: 'Loyalty' },
        { value: 'Meaningful Work', label: 'Meaningful Work' },
        { value: 'Openness', label: 'Openness' },
        { value: 'Optimism', label: 'Optimism' },
        { value: 'Peace', label: 'Peace' },
        { value: 'Pleasure', label: 'Pleasure' },
        { value: 'Poise', label: 'Poise' },
        { value: 'Popularity', label: 'Popularity' },
        { value: 'Recognition', label: 'Recognition' },
        { value: 'Religion', label: 'Religion' },
        { value: 'Reputation', label: 'Reputation' },
        { value: 'Respect', label: 'Respect' },
        { value: 'Responsibility', label: 'Responsibility' },
        { value: 'Security', label: 'Security' },
        { value: 'Self-Respect', label: 'Self-Respect' },
        { value: 'Service', label: 'Service' },
        { value: 'Spirituality', label: 'Spirituality' },
        { value: 'Stability', label: 'Stability' },
        { value: 'Success', label: 'Success' },
        { value: 'Status', label: 'Status' },
        { value: 'Trustworthiness', label: 'Trustworthiness' },
        { value: 'Wealth', label: 'Wealth' },
        { value: 'Wisdom', label: 'Wisdom' },
    ]

    // const personalityOptions = [
    //     { value: 'ISTJ', label: 'ISTJ - Introverted, Sensing, Thinking, Judging' },
    //     { value: 'ISFJ', label: 'ISFJ - Introverted, Sensing, Feeling, Judging' },
    //     { value: 'INFJ', label: 'INFJ - Introverted, Intuitive, Feeling, Judging' },
    //     { value: 'INTJ', label: 'INTJ - Introverted, Intuitive, Thinking, Judging' },
    //     { value: 'ISTP', label: 'ISTP - Introverted, Sensing, Thinking, Perceiving' },
    //     { value: 'ISFP', label: 'ISFP - Introverted, Sensing, Feeling, Perceiving' },
    //     { value: 'INFP', label: 'INFP - Introverted, Intuitive, Feeling, Perceiving' },
    //     { value: 'INTP', label: 'INTP - Introverted, Intuitive, Thinking, Perceiving' },
    //     { value: 'ESTP', label: 'ESTP - Extraverted, Sensing, Thinking, Perceiving' },
    //     { value: 'ESFP', label: 'ESFP - Extraverted, Sensing, Feeling, Perceiving' },
    //     { value: 'ENFP', label: 'ENFP - Extraverted, Intuitive, Feeling, Perceiving' },
    //     { value: 'ENTP', label: 'ENTP - Extraverted, Intuitive, Thinking, Perceiving' },
    //     { value: 'ESTJ', label: 'ESTJ - Extraverted, Sensing, Thinking, Judging' },
    //     { value: 'ESFJ', label: 'ESFJ - Extraverted, Sensing, Feeling, Judging' },
    //     { value: 'ENFJ', label: 'ENFJ - Extraverted, Intuitive, Feeling, Judging' },
    //     { value: 'ENTJ', label: 'ENTJ - Extraverted, Intuitive, Thinking, Judging' },
    // ]


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
                                <div className="progress-bar" style={{width: "25%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5 mt-5">
                        <div className="col">
                            <h1 className="tw-font-oceanwide">Hi! Let’s set up your profile.</h1>
                        </div>
                        <div className="col">
                            <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                                {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                {!loading && ("Next")}
                            </button>
                            <button onClick={() => {navigate('/mentorPersonalInfo', {replace: true})}}  className="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                        </div>
                       
                        <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Help us get to know you better.</p>
                    </div>
                    <div className="row gx-5 gy-5 align-items-center mt-2">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="mentorValues" className="form-label tw-font-dmsans">I value
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer Required",
                                            }}
                                            defaultValue={(userProfile.length > 0) ? formatValues().map(ele => ele) : null}
                                            name="mentorValues"
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#9EC5FE',
                                                        neutral10: '#E9ECEF',
                                                    }
                                                    })} 
                                                    isMulti
                                                    styles={customStyles} 
                                                    options={valueOptions}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            )}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="mentorValues"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorPersonalityType" className="form-label tw-font-dmsans">My personality type</label>
                                        <Controller
                                            control={control}
                                            name="mentorPersonalityType"
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#9EC5FE',
                                                        neutral10: '#E9ECEF',
                                                    }
                                                    })} 
                                                    styles={customStyles} 
                                                    options={personalityOptions}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            )}
                                        />
                            
                                </div>
                            </div> */}

                            <div className="row mt-4">
                                <div className="col">
                                    <hr className="hr" /> 
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorInstagram" className="form-label tw-font-dmsans">Find me on Instagram</label>
                                    <div className="">
                                        <input 
                                            {...register("mentorInstagram", { 
                                                pattern: {
                                                    value: /^https:\/\/www.instagram.com\/*/,
                                                    message: "Please enter a valid Instagram URL",
                                                 },
                                            })}
                                            type="social" 
                                            className="form-control tw-font-dmsans py-2" 
                                            id="mentorInstagram" 
                                            placeholder="https://www.instagram.com/username/" 
                                            defaultValue={(userProfile.length > 0) ? userProfile[0].instagram : ""}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="mentorInstagram"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorFacebook" className="form-label tw-font-dmsans">Find me on Facebook</label>
                                    <div className="">
                                        <input 
                                            {...register("mentorFacebook", { 
                                                pattern: {
                                                    value: /^https:\/\/www.facebook.com\/*/,
                                                    message: "Please enter a valid Facebook URL",
                                                 },
                                            })}
                                            type="social" 
                                            className="form-control tw-font-dmsans py-2" 
                                            id="mentorFacebook" 
                                            placeholder="https://www.facebook.com/username/" 
                                            defaultValue={(userProfile.length > 0) ? userProfile[0].facebook : ""}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="mentorFacebook"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorLinkedIn" className="form-label tw-font-dmsans">Find me on LinkedIn</label>
                                    <div className="">
                                        <input 
                                            {...register("mentorLinkedIn", { 
                                                pattern: {
                                                    value: /^https:\/\/www.linkedin.com\/in\/*/,
                                                    message: "Please enter a valid LinkedIn profile URLK",
                                                 },
                                            })}
                                            type="location" 
                                            className="form-control tw-font-dmsans py-2" 
                                            id="mentorLinkedIn" 
                                            placeholder="https://www.linkedin.com/in/username/" 
                                            defaultValue={(userProfile.length > 0) ? userProfile[0].linkedin : ""}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="mentorLinkedIn"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col offset-md-1">
                            <div className="row">
                                <div className="col d-flex justify-content-center align-items-center">
                                    <div className="border border-primary-subtle border-4 tw-h-96 tw-w-96 rounded-circle">
                                        <img 
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            src={profileImgUrl}
                                            alt="Loading..."
                                            className="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row text-center mt-4">
                                <div className="col">
                                    <p className="tw-font-dmsans tw-font-bold">{(userProfile.length > 0) ? userProfile[0].firstName : ""} {(userProfile.length > 0) ? userProfile[0].lastName : ""}</p> 
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
                )}
            </form>
        </div>
    )
}

export default MentorProfileSetup2
