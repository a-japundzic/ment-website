import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import Select from 'react-select'

import LOGO from '../assets/logo.png'

const ProfileSetup1 = () => {
    // Add this part here to every page you create, it handles submitting the data and navigating to the next page {
    const [state, setAppState] = useAppState();
    const { handleSubmit, 
            register,
            control,
            formState: { errors },
        } = useForm({ defaultValues: state, criteriaMode: "all" });
    const navigate = useNavigate();

    const saveData = (data) => {
        setAppState({...state, ...data });
        // This navigates you to the next page when the next button is clicked
        navigate("/personalInfo2") 
    };
    // }

    // This part here is for the profile picture upload which isn't needed for the rest of the pages {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    // }

    // If you need to make a drop down menu, you create the opitions like this {
    const genderOptions = [
        { value: 'woman', label: 'Woman'},
        { value: 'man', label: 'Man'},
        { value: 'transgender', label: 'Transgender'},
        { value: 'non-Binary/non-conforming', label: 'Non-Binary/Non-conforming'},
        { value: 'prefer not to respond', label: 'Prefer not to respond' }
    ]

    const ethnicityOptions = [
        { value: 'First Nation or North American Indian', label: 'First Nation or North American Indian'},
        { value: 'Alaskan Native', label: 'Alaskan Native'},
        { value: 'Inuit', label: 'Inuit'},
        { value: 'Métis', label: 'Métis'},
        { value: 'Other Aboriginal or Indigenous', label: 'Other Aboriginal or Indigenous' },
        { value: 'White', label: 'White (Caucasian)' },
        { value: 'Other European origins', label: 'Other European origins' },
        { value: 'Black/African American/African Canadian', label: 'Black/African American/African Canadian' },
        { value: 'Caribbean origins', label: 'Caribbean origins' },
        { value: 'Latin, Central and South American origins', label: 'Latin, Central and South American origins'},
        { value: 'African origins', label: 'African origins'},
        { value: 'West Central Asian and Middle Eastern origins', label: 'West Central Asian and Middle Eastern origins (e.g., Turkish, Iranian)' },
        { value: 'South Asian origins', label: 'South Asian origins (e.g., Indian, Sri Lankan)'},
        { value: 'East and Southeast Asian origins', label: 'East and Southeast Asian origins (e.g., Chinese, Filipino)' },
        { value: 'Other Asian origins', label: 'Other Asian origins' },
        { value: 'Oceania origins', label: 'Oceania origins (e.g., Hawaiian, Samoan)' },
        { value: 'Prefer not to answer', label: 'Prefer not to answer' },
    ]

    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Finnish', label: 'Finnish' },
        { value: 'Slovene', label: 'Slovene' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Bengali', label: 'Bengali' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Norwegian', label: 'Norwegian' },
        { value: 'Swedish', label: 'Swedish' },
        { value: 'French', label: 'French' },
        { value: 'Croatian', label: 'Croatian' },
        { value: 'Indonesian', label: 'Indonesian' },
        { value: 'Serbian', label: 'Serbian' },
        { value: 'Polish', label: 'Polish' },
        { value: 'Telugu', label: 'Telugu' },
        { value: 'German', label: 'German' },
        { value: 'Bulgarian', label: 'Bulgarian' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'Romanian', label: 'Romanian' },
        { value: 'Tamil', label: 'Tamil' },
        { value: 'Italian', label: 'Italian' },
        { value: 'Czech', label: 'Czech' },
        { value: 'Korean', label: 'Korean' },
        { value: 'Turkish', label: 'Turkish' },
        { value: 'Portuguese', label: 'Portuguese' },
        { value: 'Dansk', label: 'Dansk' },
        { value: 'Marathi', label: 'Marathi' },
        { value: 'Slovak', label: 'Slovak' },
        { value: 'Vietnamese', label: 'Vietnamese' },
        { value: 'Russian', label: 'Russian' },
        { value: 'Dutch', label: 'Dutch' },
        { value: 'Greek', label: 'Greek' },
        { value: 'Thai', label: 'Thai' },
        { value: 'Malay', label: 'Malay' },
        { value: 'Hebrew', label: 'Hebrew' },
        { value: 'Catalan', label: 'Catalan' },
        { value: 'Welsh', label: 'Welsh' },
        { value: 'Mandarin', label: 'Mandarin' },
        { value: 'Traditional Chinese', label: 'Traditional Chinese' },
        { value: 'Hungarian', label: 'Hungarian' },
        { value: 'Farsi', label: 'Farsi' },
    ]
    // }

    // This styles the drop down menu, so include it if you need to use a drop down menu below
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 42,
            borderColor: '#E9ECEF',
            boxShadow: state.isFocused ? '0 0 0px 4px #C2DAFF' : 'none',
        })
    };


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
                {/* This is the progres bar, change the width % to change its length */}
                <div class="container h-100">
                    <div class="row">
                        <div class="col">
                            <div class="progress" role="progressbar" >
                                <div class="progress-bar" style={{width: "14%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    {/* Here you can change title and sub title */}
                    <div class="row gx-5 mt-5">
                        <div class="col">
                            <h1 class="tw-font-oceanwide">Hi! Let’s set up your profile.</h1>
                        </div>
                        <div class="col">
                            <button type="submit" class="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">Next</button>
                        </div>
                       
                        <p1 class="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Help us get to know you better.</p1>
                    </div>

                    {/* This is the start of the two columns, this is where you can add your info*/}
                    <div class="row gx-5 gy-5 align-items-center mt-2">
                        <div class="col">
                            <div class="row">
                                <label for="menteeFirstNameInput" class="form-label tw-font-dmsans">My name is
                                    <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                </label>
                                <div class="col">
                                    <input 
                                        {...register("menteeFirstName", { required: "First name is required" })}
                                        type="name" class="form-control tw-font-dmsans py-2" id="menteeFirstNameEmail" placeholder="First Name" defaultValue="test"
                                    />
                                    <ErrorMessage 
                                        errors={errors}
                                        name="menteeFirstName"
                                        render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                    />
                                </div>
                                <div class="col">
                                    <input 
                                        {...register("menteeLastName", { required: "Last name is required" })}
                                        type="name" class="form-control tw-font-dmsans py-2" id="menteeLastNameInput" placeholder="Last Name" 
                                    />
                                    <ErrorMessage 
                                        errors={errors}
                                        name="menteeLastName"
                                        render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                    />
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeGenderInput" class="form-label tw-font-dmsans">My gender is
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <div class="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            name="menteeGender"
                                            rules={{
                                                required: "Answer required",
                                            }}
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
                                                    options={genderOptions}
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
                                            name="menteeGender"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="menteeAgeInput" class="form-label tw-font-dmsans">My age is
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <div class="">
                                        <input
                                            {...register("menteeAge", { 
                                                required: "Age is required",
                                                pattern: {
                                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                                    message: "Not a valid age"
                                                },
                                                min: {
                                                    value: 16,
                                                    message: "Must be at least 16 years old"
                                                },
                                            })}
                                            type="name" class="form-control tw-font-dmsans py-2" id="menteeAgeInput" placeholder="Age"
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeAge"
                                            render={({ messages }) => 
                                                messages &&
                                                Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                                ))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeEthnicityInput" class="form-label tw-font-dmsans">My ethnicity is
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <div class="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer Required",
                                            }}
                                            name="menteeEthnicity"
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
                                                    options={ethnicityOptions}
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
                                            name="menteeEthnicity"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeLanguage" class="form-label tw-font-dmsans">I can speak
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <div class="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            name="menteeLanguage"
                                            rules={{
                                                required: "Answer required",
                                            }}
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
                                                    options={languageOptions}
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
                                            name="menteeLanguage"
                                            render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <hr class="hr" /> 
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeLocationInput" class="form-label tw-font-dmsans">I currently live in
                                        <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                    </label>
                                    <div class="">
                                        <input 
                                            {...register("menteeLocation", { 
                                                required: "Location is required" ,
                                                pattern: {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: "Please enter a valid location",
                                                 },
                                            })}
                                            type="location" class="form-control tw-font-dmsans py-2" id="menteeLocationInput" placeholder="Enter city or country" 
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeLocation"
                                            render={({ messages }) => 
                                                messages &&
                                                Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                                ))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col offset-md-1">
                            {/* <img class="tw-float-right img-fluid" src={FILLER} alt=""></img> */}
                            <label for="menteeProfilePic" class="form-label tw-font-dmsans">Upload profile picture
                                    <p1 class="tw-font-dmans tw-text-[#DE5840]">*</p1>
                                </label>
                            <div id="menteeProfilePic" name="menteeProfilePic" class="border border-light tw-w-96 tw-h-96 d-flex justify-content-center align-items-center">
                                    <Controller
                                        control={control}
                                        name={"menteeProfilePicture"}
                                        rules={{ required: "Profile picture is required" }}
                                        render={({ field: { value, onChange, ...field } }) => {
                                        return (
                                            <input
                                                {...field}
                                                value={value?.fileName}
                                                onChange={(event) => {
                                                    handleImageUpload(event);
                                                    onChange(event.target.files[0]);
                                                }}
                                                ref={imageUploader}
                                                type="file"
                                                id="menteeProfilePicture"
                                                style={{
                                                    display: "none"
                                                }}
                                                class="w-100 h-100"
                                            />
                                        );
                                        }}
                                    />

                                <div onClick={() => imageUploader.current.click()} class="border border-primary-subtle border-4 w-75 h-75 rounded-circle d-flex justify-content-center align-items-center">
                                    <img 
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        ref={uploadedImage}
                                        alt="Click me"
                                        class="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                                    />
                                </div>
                            </div>

                            <ErrorMessage 
                                errors={errors}
                                name="menteeProfilePicture"
                                render={({ message }) => <p class="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                            />            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileSetup1
