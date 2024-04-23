import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppState } from '../state';
import Select from 'react-select'

import LOGO from '../assets/logo.png'

const ProfileSetup2 = () => {
    const [state, setState] = useAppState();
    const { handleSubmit, 
            register,
            control,
            formState: { errors },
        } = useForm({ defaultValues: state, criteriaMode: "all" });
    const navigate = useNavigate();

    const saveData = (data) => {
        setState({...state, ...data });
        navigate("/education")
    };

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

    const personalityOptions = [
        { value: 'ISTJ', label: 'ISTJ - Introverted, Sensing, Thinking, Judging' },
        { value: 'ISFJ', label: 'ISFJ - Introverted, Sensing, Feeling, Judging' },
        { value: 'INFJ', label: 'INFJ - Introverted, Intuitive, Feeling, Judging' },
        { value: 'INTJ', label: 'INTJ - Introverted, Intuitive, Thinking, Judging' },
        { value: 'ISTP', label: 'ISTP - Introverted, Sensing, Thinking, Perceiving' },
        { value: 'ISFP', label: 'ISFP - Introverted, Sensing, Feeling, Perceiving' },
        { value: 'INFP', label: 'INFP - Introverted, Intuitive, Feeling, Perceiving' },
        { value: 'INTP', label: 'INTP - Introverted, Intuitive, Thinking, Perceiving' },
        { value: 'ESTP', label: 'ESTP - Extraverted, Sensing, Thinking, Perceiving' },
        { value: 'ESFP', label: 'ESFP - Extraverted, Sensing, Feeling, Perceiving' },
        { value: 'ENFP', label: 'ENFP - Extraverted, Intuitive, Feeling, Perceiving' },
        { value: 'ENTP', label: 'ENTP - Extraverted, Intuitive, Thinking, Perceiving' },
        { value: 'ESTJ', label: 'ESTJ - Extraverted, Sensing, Thinking, Judging' },
        { value: 'ESFJ', label: 'ESFJ - Extraverted, Sensing, Feeling, Judging' },
        { value: 'ENFJ', label: 'ENFJ - Extraverted, Intuitive, Feeling, Judging' },
        { value: 'ENTJ', label: 'ENTJ - Extraverted, Intuitive, Thinking, Judging' },
    ]


    return (
        <div class="d-flex flex-column min-vh-100 justify-content-center">
            <nav class="navbar fixed-top bg-white navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img class="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <form onSubmit={handleSubmit(saveData)}>
                <div class="container h-100">
                    <div class="row">
                        <div class="col">
                            <div class="progress" role="progressbar" >
                                <div class="progress-bar" style={{width: "28%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5 mt-5">
                        <div class="col">
                            <h1 class="tw-font-oceanwide">Hi! Let’s set up your profile.</h1>
                        </div>
                        <div class="col">
                            <button type="submit" class="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">Next</button>
                            <Link to="/personalInfo">
                                <button class="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                            </Link>
                        </div>
                       
                        <p1 class="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Help us get to know you better.</p1>
                    </div>
                    <div class="row gx-5 gy-5 align-items-center mt-2">
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    <label for="menteeValues" class="form-label tw-font-dmsans">I value
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <div class="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer Required",
                                            }}
                                            name="menteeValues"
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
                                            name="menteeValues"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteePersonalityType" class="form-label tw-font-dmsans">My personality type</label>
                                        <Controller
                                            control={control}
                                            name="menteePersonalityType"
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
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <hr class="hr" /> 
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeInstagram" class="form-label tw-font-dmsans">Find me on Instagram</label>
                                    <div class="">
                                        <input 
                                            {...register("menteeInstagram", { 
                                                pattern: {
                                                    value: /^https:\/\/www.instagram.com\/*/,
                                                    message: "Please enter a valid Instagram URL",
                                                 },
                                            })}
                                            type="social" class="form-control tw-font-dmsans py-2" id="menteeInstagram" placeholder="https://www.instagram.com/username/" 
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeInstagram"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeFacebook" class="form-label tw-font-dmsans">Find me on Facebook</label>
                                    <div class="">
                                        <input 
                                            {...register("menteeFacebook", { 
                                                pattern: {
                                                    value: /^https:\/\/www.facebook.com\/*/,
                                                    message: "Please enter a valid Facebook URL",
                                                 },
                                            })}
                                            type="social" class="form-control tw-font-dmsans py-2" id="menteeFacebook" placeholder="https://www.facebook.com/username/" 
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeFacebook"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeLinkedIn" class="form-label tw-font-dmsans">Find me on LinkedIn</label>
                                    <div class="">
                                        <input 
                                            {...register("menteeLinkedIn", { 
                                                pattern: {
                                                    value: /^https:\/\/www.linkedin.com\/in\/*/,
                                                    message: "Please enter a valid LinkedIn profile URLK",
                                                 },
                                            })}
                                            type="location" class="form-control tw-font-dmsans py-2" id="menteeLinkedIn" placeholder="https://www.linkedin.com/in/username/" 
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeLinkedIn"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col offset-md-1">
                            <div class="row">
                                <div class="col d-flex justify-content-center align-items-center">
                                    <div class="border border-primary-subtle border-4 tw-h-96 tw-w-96 rounded-circle">
                                        <img 
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            src={URL.createObjectURL(state.menteeProfilePicture)}
                                            onError={(e)=>{e.target.onError = null; e.target.src = LOGO}}
                                            alt=""
                                            class="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row text-center mt-4">
                                <div class="col">
                                    <p1 class="tw-font-dmsans tw-font-bold">{state.menteeFirstName} {state.menteeLastName}</p1> 
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileSetup2
