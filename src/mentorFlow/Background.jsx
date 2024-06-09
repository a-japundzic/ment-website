import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

import LOGO from '../assets/logo.png'

import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { listMentorProfiles } from '../graphql/queries';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';

const client = generateClient();

const Background = ({ settings=false }) => {
  // ************************* Fetch current user profile if it exists, and define appropriate variables ************************
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Set loading wheel state
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
      formState: { errors },
      // reset
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
              // Format the experience array
              let experienceArr = [];
              experienceArr.push(data.mentorExperience1);
              experienceArr.push(data.mentorExperience2);
              experienceArr.push(data.mentorExperience3);
              
              const mentorDetails = {
                  id: userProfile[0].id,
                  bio: data.mentorBio,
                  experience: experienceArr,
              };
          
              await client.graphql({
                  query: mutations.updateMentorProfile,
                  variables: { input: mentorDetails }
              });
          } catch (error) {
              console.log("Error updating profile", error);
          }
      },
      onSuccess:  () => {
          setLoading(false);

          if (!settings) {
            navigate("/mentorSchedule", {replace: true});
          }
      },
      onMutate: () => {
          setLoading(true);
      }
  })

  // If the page is refreshed, and state is cleared, set default values from the query (this took forever, but got it done)
  // useEffect(() => {
  //     if (isSuccess && !state && userProfile[0].length > 0) {
  //         reset({
  //           menotrBio: userProfile[0].bio,
  //           mentorExperience1: userProfile[0].experience[0] ? userProfile.experience[0] : '',
  //           mentorExperience2: userProfile[0].experience[1] ? userProfile.experience[1] : '',
  //           mentorExperience3: userProfile[0].experience[2] ? userProfile.experience[2] : '',
  //         })
  //     }
  // }, [])


  return (
    <div className={settings ? "d-flex flex-column" : "d-flex flex-column min-vh-100 justify-content-center" }>

      {(!settings &&
      <nav className="navbar fixed-top bg-white navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img className="align-middle" src={LOGO} alt="" />
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
              <div className="progress" role="progressbar">
                <div
                  className="progress-bar"
                  style={{ width: "37.5%", backgroundColor: "#7DC478" }}
                ></div>
              </div>
            </div>
          </div>
          )}

          {( !settings &&
          <div className="row gx-5 mt-5">
            <div className="col">
              <h1 className="tw-font-oceanwide">About your background</h1>
            </div>
            <div className="col">
                <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                    {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                    {!loading && ("Next")}
                </button>
                <button onClick={() => {navigate('/mentorPersonalInfo2', {replace: true})}}  className="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
            </div>

            <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">
              Help us get to know you better.
            </p>
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

          <div className="row gx-5 gy-5 align-items-center mt-2">
            <div className="col">
              <label htmlFor="mentorBio" className="form-label tw-font-dmsans">
                Your bio
                <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
              </label>
              <textarea
                {...register("mentorBio", {
                  required: "Bio is required",
                })}
                type="name"
                className="form-control tw-font-dmsans py-2 tw-h-[150px]"
                placeholder="Introduce yourself"
                defaultValue={(userProfile[0]?.bio) ? userProfile[0].bio : ""}
              />
              <ErrorMessage
                errors={errors}
                name="mentorBio"
                render={({ message }) => (
                  <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]">
                    <small>{message}</small>
                  </p>
                )}
              />

              <label
                htmlFor="Pastexperiences"
                className="form-label tw-font-dmsans mt-4"
              >
                Past experiences
              </label>

              <input
                {...register("mentorExperience1")}
                type="name"
                className="form-control tw-font-dmsans py-2"
                placeholder="Role, Company"
                defaultValue={(userProfile[0]?.experience) ? userProfile[0].experience[0] : ""}
              />

              <input
                {...register("mentorExperience2")}
                type="name"
                className="form-control tw-font-dmsans py-2 mt-4"
                placeholder="Role, Company"
                defaultValue={(userProfile[0]?.experience) ? userProfile[0].experience[1] : ""}
              />
          
              <input
                {...register("mentorExperience3")}
                type="name"
                className="form-control tw-font-dmsans py-2 mt-4"
                placeholder="Role, Company"
                defaultValue={(userProfile[0]?.experience) ? userProfile[0].experience[2] : ""}
              />
            </div> 

         
            <div className="col"></div>

          </div>
          
        </div>
        )}
      </form>
    </div>
    
  );
};

export default Background
