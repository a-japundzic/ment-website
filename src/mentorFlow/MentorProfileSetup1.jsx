import React, { useEffect, useState } from 'react'
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUrl, remove, uploadData } from 'aws-amplify/storage';
import { Oval } from 'react-loader-spinner';

const client = generateClient();

const MentorProfileSetup1 = () => {
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
        if (userProfile.length > 0) {
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
                // Simplify the formatting of the user's ethnicity input
                let mentorEthnicityArr = [];
                var ethnicityArrayLen = data.mentorEthnicity.length;
                for (var i = 0; i < ethnicityArrayLen; i++) {
                    mentorEthnicityArr.push(data.mentorEthnicity[i].value);
                }
    
                // Simplify the formatting of the user's lenguage input
                let mentorLanguageArr = [];
                var languageArrayLen = data.mentorLanguage.length;
                for (var i = 0; i < languageArrayLen; i++) {
                    mentorLanguageArr.push(data.mentorLanguage[i].value);
                }
    
                const mentorDetails = {
                    firstName: data.mentorFirstName,
                    lastName: data.mentorLastName,
                    gender: data.mentorGender.value,
                    age: data.mentorAge,
                    ethnicity: mentorEthnicityArr,
                    languages: mentorLanguageArr,
                };
            
                const newMentor = await client.graphql({
                    query: mutations.createMentorProfile,
                    variables: { input: mentorDetails }
                });

                let newMentorFormatted = newMentor?.data?.createMentorProfile
                
                // Upload the profile pic file:
                const result = await uploadData({
                    key: `${newMentorFormatted.id}-${data.mentorProfilePicture.name}`,
                    data: data.mentorProfilePicture,
                    options: {
                        contentType: 'image/png',
                        accessLevel: 'protected',
                    }
                }).result;

                const addProfilePic = {
                    id: newMentorFormatted.id,
                    profilePicKey: result?.key,
                };
            
                const updateMentor = await client.graphql({
                    query: mutations.updateMentorProfile,
                    variables: { input: addProfilePic }
                });

                // Retrieve the file's signed URL:
                const updateMentorFormatted = updateMentor?.data?.updateMentorProfile;
                const signedURL = await getUrl({ key: updateMentorFormatted.profilePicKey });
                setProfileImgUrl(signedURL.url.toString());
            } catch (error) {
                console.log("Error creating profile", error);
            }
        },
        onSuccess:  () => {
            navigate("/mentorPersonalInfo2", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })


    // Updates existing record
    const updateRecord = useMutation({
        mutationFn: async (data) => {
            try {
                // Simplify the formatting of the user's ethnicity input
                let mentorEthnicityArr = [];
                var ethnicityArrayLen = data.mentorEthnicity.length;
                for (var i = 0; i < ethnicityArrayLen; i++) {
                    mentorEthnicityArr.push(data.mentorEthnicity[i].value);
                }
    
                // Simplify the formatting of the user's lenguage input
                let mentorLanguageArr = [];
                var languageArrayLen = data.mentorLanguage.length;
                for (var i = 0; i < languageArrayLen; i++) {
                    mentorLanguageArr.push(data.mentorLanguage[i].value);
                }
    
                // Upload the profile pic file:
                if (data?.mentorProfilePicture) {
                    const result = await uploadData({
                        key: `${userProfile[0].id}-${data.mentorProfilePicture.name}`,
                        data: data.mentorProfilePicture,
                        options: {
                            contentType: 'image/png',
                            accessLevel: 'protected',
                        }
                    }).result;
        
                    if (userProfile[0]?.profilePicKey && result?.key != userProfile[0]?.profilePicKey) {
                        await remove({ key: userProfile[0]?.profilePicKey });
                    }
        
                    const mentorDetails = {
                        id: userProfile[0].id,
                        firstName: data.mentorFirstName,
                        lastName: data.mentorLastName,
                        gender: data.mentorGender.value,
                        age: data.mentorAge,
                        ethnicity: mentorEthnicityArr,
                        languages: mentorLanguageArr,
                        profilePicKey: result?.key,
                    };
                
                    const updateMentor = await client.graphql({
                        query: mutations.updateMentorProfile,
                        variables: { input: mentorDetails }
                    });
        
                    // Retrieve the file's signed URL:
                    const updatedMentor = updateMentor?.data?.updateMentorProfile;
                    const signedURL = await getUrl({ key: updatedMentor.profilePicKey });
                    setProfileImgUrl(signedURL.url.toString());
                } else {
                    const mentorDetails = {
                        id: userProfile[0].id,
                        firstName: data.mentorFirstName,
                        lastName: data.mentorLastName,
                        gender: data.mentorGender.value,
                        age: data.mentorAge,
                        ethnicity: mentorEthnicityArr,
                        languages: mentorLanguageArr,
                    };
                
                    await client.graphql({
                        query: mutations.updateMentorProfile,
                        variables: { input: mentorDetails }
                    });
                }
            } catch (error) {
                console.log("Error updating profile", error);
            }
        },
        onSuccess:  () => {
            navigate("/mentorPersonalInfo2", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })


    // Handles changing image on upload
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

    // Survey questions
    const genderOptions = [
        { value: 'Woman', label: 'Woman'},
        { value: 'Man', label: 'Man'},
        { value: 'Tansgender', label: 'Transgender'},
        { value: 'Non-Binary/Non-conforming', label: 'Non-Binary/Non-conforming'},
        { value: 'Prefer not to respond', label: 'Prefer not to respond' }
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

    // Formats the multiple select questions to settable default values
    function formatEthnicity() {
        var ethnicityArrayLen = userProfile[0].ethnicity.length;
        let ethnicityArrayFormatted = [];

        for (var i = 0; i < ethnicityArrayLen; ++i) {
            ethnicityArrayFormatted.push(ethnicityOptions.find(op => {
                return op.value === userProfile[0].ethnicity[i]
            }));
        }

        return ethnicityArrayFormatted;
    }

    // Same as above
    function formatLanguage() {
        var languageArrayLen = userProfile[0].languages.length;
        let languageArrayFormatted = [];

        for (var i = 0; i < languageArrayLen; ++i) {
            languageArrayFormatted.push(languageOptions.find(op => {
                return op.value === userProfile[0].languages[i]
            }));
        }   

        return languageArrayFormatted;
    }

    // If the page is refreshed, and state is cleared, set default values from the query (this took forever, but got it done)
    useEffect(() => {
        if (isSuccess && !state && userProfile[0].length > 0) {
            console.log("test");
            const resetMentorGender = genderOptions.find(op => {
                return op.value === userProfile[0].gender
            })

            reset({
                mentorFirstName: userProfile[0].firstName,
                mentorLastName: userProfile[0].lastName,
                mentorGender: resetMentorGender,
                mentorAge: userProfile[0].mentorAge,
                mentorEthnicity: formatEthnicity().map(ele => ele),
                mentorLanguage: formatLanguage().map(ele => ele),
            })
        }
    }, [])


    // Sets customer styles of drop down menu
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 42,
            borderColor: '#E9ECEF',
            boxShadow: state.isFocused ? '0 0 0px 4px #C2DAFF' : 'none',
        })
    };

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
                                <div className="progress-bar" style={{width: "12.5%", backgroundColor: "#7DC478"}}></div>
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
                        </div>
                       
                        <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B] ">Help us get to know you better.</p>
                    </div>
                    <div className="row gx-5 gy-5 align-items-center mt-2">
                        <div className="col">
                            <div className="row">
                                <label htmlFor="mentorFirstNameInput" className="form-label tw-font-dmsans">My name is
                                    <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                </label>
                                <div className="col">
                                    <input 
                                        {...register("mentorFirstName", { required: "First name is required" })}
                                        type="name" className="form-control tw-font-dmsans py-2" id="mentorFirstNameEmail" placeholder="First Name" defaultValue={(userProfile.length > 0) ? userProfile[0].firstName : ""}
                                    />
                                    <ErrorMessage 
                                        errors={errors}
                                        name="mentorFirstName"
                                        render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                    />
                                </div>
                                <div className="col">
                                    <input 
                                        {...register("mentorLastName", { required: "Last name is required" })}
                                        type="name" className="form-control tw-font-dmsans py-2" id="mentorLastNameInput" placeholder="Last Name" defaultValue={(userProfile.length > 0) ? userProfile[0].lastName : ""} 
                                    />
                                    <ErrorMessage 
                                        errors={errors}
                                        name="mentorLastName"
                                        render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                    />
                                </div>
                            </div>
                            

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorGenderInput" className="form-label tw-font-dmsans">My gender is
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            name="mentorGender"
                                            defaultValue={(userProfile.length > 0) ? genderOptions.find(op => {return op.value === userProfile[0].gender}) : null}
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
                                            name="mentorGender"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="mentorAgeInput" className="form-label tw-font-dmsans">My age is
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="">
                                        <input
                                            {...register("mentorAge", { 
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
                                            type="name" className="form-control tw-font-dmsans py-2" id="mentorAgeInput" placeholder="Age" defaultValue={(userProfile.length > 0) ? userProfile[0].age : ""}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="mentorAge"
                                            render={({ messages }) => 
                                                messages &&
                                                Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>
                                                ))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorEthnicityInput" className="form-label tw-font-dmsans">My ethnicity is
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer Required",
                                            }}
                                            defaultValue={(userProfile.length > 0) ? formatEthnicity().map(ele => ele) : null}
                                            name="mentorEthnicity"
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
                                            name="mentorEthnicity"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="mentorLanguage" className="form-label tw-font-dmsans">I can speak
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            name="mentorLanguage"
                                            defaultValue={(userProfile.length > 0) ? formatLanguage().map(ele => ele) : null}
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
                                            name="mentorLanguage"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

 
                        </div>
                        <div className="col offset-md-1">
                            {/* <img className="tw-float-right img-fluid" src={FILLER} alt=""></img> */}
                            <label htmlFor="mentorProfilePic" className="form-label tw-font-dmsans">Upload profile picture
                                <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                            </label>
                            <div id="mentorProfilePic" name="mentorProfilePic" className="border border-light tw-w-96 tw-h-96 d-flex justify-content-center align-items-center">
                                    <Controller
                                        control={control}
                                        {...register("mentorProfilePicture", {
                                            validate: {
                                                required: value => {
                                                    if (!value && profileImgUrl == '') {
                                                        return "Profile picture is required";
                                                    }
                                                    return true
                                                },
                                            },
                                        })}
                                        ref={null}
                                        name={"mentorProfilePicture"}
                                        // rules={{ required: "Profile picture is required" }}
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
                                                id="mentorProfilePicture"
                                                style={{
                                                    display: "none"
                                                }}
                                                className="w-100 h-100"
                                            />
                                        );
                                        }}
                                    />
                                    

                                <div onClick={() => imageUploader.current.click()} className="border border-primary-subtle border-4 w-75 h-75 rounded-circle d-flex justify-content-center align-items-center">
                                    <img 
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        src={profileImgUrl}
                                        ref={uploadedImage}
                                        alt={(userProfile.length > 0) ? "Loading..." : "Click Me"}
                                        className="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                                    />
                                </div>
                            </div>

                            <ErrorMessage 
                                errors={errors}
                                name="mentorProfilePicture"
                                render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                            />            
                        </div>
                    </div>
                </div>
                )}
            </form>
        </div>
    )
}

export default MentorProfileSetup1
