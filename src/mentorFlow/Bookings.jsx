import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "aws-amplify/auth";
import {  listMentorMeetingList, mentorListMenteeProfiles } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getUrl } from "aws-amplify/storage";
import * as mutations from '../graphql/mutations';
import Popup from "reactjs-popup";
import MentorNavBar from "./NavBar";

const client = generateClient();

const MentorBookings = () => {
  const [showMetPopup, setShowMetPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const closeMet = () => setShowMetPopup(false);
  const closeCancel = () => setShowCancelPopup(false);

  // Set index to be removed
  const [currIndex, setCurrIndex] = useState(0);
  const [currMentee, setCurrMentee] = useState(null);

  const navigate = useNavigate(); 

  const bookingsList = useQuery({
    queryKey: ["bookingsList"],
    queryFn: async () => {
      const { username } = await getCurrentUser();

      const variables = {
        filter: {
          owner: {
            contains: username
          }
        }
      };

      const mentorResponse = await client.graphql({
        query: listMentorMeetingList,
        variables: variables,
      });

      let mentorProfile = mentorResponse?.data?.listMentorProfiles?.items[0];
      const meetingList = mentorProfile?.meetingList;

      if (!meetingList) {
        return null;
      }

      const meetingListLen = meetingList.length;

      if (meetingListLen === 0) {
        return null;
      }

      let menteeIds = [];

      for (let i = 0; i < meetingListLen; ++i) {
        menteeIds.push({ id: {eq: meetingList[i] } });
      }

      const filterIds = {
        filter: {
          or: menteeIds
        }
      }

      const menteeResponse = await client.graphql({
        query: mentorListMenteeProfiles,
        variables: filterIds,
      });

      // console.log(menteeResponse);

      const menteeList = menteeResponse?.data?.listMenteeProfiles?.items;
      // console.log(menteeList[0].identityId);
      const menteeListLen = menteeList.length;

      for (var i = 0; i < menteeListLen; ++i){
        const signedURL = await getUrl({ 
          key: menteeList[i].profilePicKey,
          options: {
            accessLevel: 'protected',
            targetIdentityId: menteeList[i].identityId,
            validateObjectExistence: true,
          }
        });

        menteeList[i]["imageURL"] = signedURL.url.toString();
      }

      return menteeList;
    }
  });


  const updateBookings = useMutation({
    mutationFn: async (mentee) => {
      try {
        // Get mentee username
        const { username } = await getCurrentUser();
        const variables = {
          filter: {
            owner: {
              contains: username
            }
          }
        };

        // Get the mentors current meeting list and id
        const response = await client.graphql({
          query: listMentorMeetingList,
          variables: variables
        });

        let mentorMeetingList = response?.data?.listMentorProfiles?.items[0]?.meetingList;
        const mentorId = response?.data?.listMentorProfiles?.items[0]?.id;
          
        // Remove meeting from list
        const menteeIndex = mentorMeetingList.indexOf(mentee?.id);
        mentorMeetingList.splice(menteeIndex, 1);

        // Update the meeting list
        const mentorDetails = {
          id: mentorId,
          meetingList: mentorMeetingList
        }

        await client.graphql({
          query: mutations.updateMentorMeetingList,
          variables: { input: mentorDetails },
        });
        // 
      
      } catch (error) {
        console.log("Error updating meeting list ", error)
      }
    }
  })

  // Remove the mentor from the booking list if the meeting happened
  const confirmMet = () => {
    bookingsList.data.splice(currIndex, 1);
    updateBookings.mutate(currMentee);
    setShowMetPopup(false);
  }

    // Remove the mentor from the booking list if the meeting has been cancelled
    const confirmCancel = () => {
      bookingsList.data.splice(currIndex, 1);
      updateBookings.mutate(currMentee);
      setShowCancelPopup(false);
    }



  return (
    <div>
       {/* Popup to confirm meeting happened */}
      <Popup open={showMetPopup} modal closeOnDocumentClick onClose={closeMet}>
        <div className="py-3 px-3">
          <div className="row">
          <h2 className="tw-font-oceanwide tw-text-center mt-1">Are you sure?</h2>
          <p className="tw-font-dmsans tw-text-center ">
            Make sure you have actually met with the Mentee before confirming the meeting 
            to ensure your meetings are tracked properly. 
          </p> 
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-3 d-flex justify-content-center">
              <button className="tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-0.5 tw-py-2 tw-px-3 hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300" onClick={confirmMet}>Confirm</button>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <button className="tw-font-bold tw-text-white tw-font-dmsans tw-border-[#dc3545] tw-border-0.5 tw-py-2 tw-px-7 hover:tw-text-[#dc3545] tw-bg-[#dc3545] rounded tw-border-solid hover:tw-bg-white tw-duration-300" onClick={closeMet}>Exit</button>
            </div>
          </div>
        </div>
      </Popup>

      {/* Popup to confirm meeting was cancelled */}
       <Popup open={showCancelPopup} modal closeOnDocumentClick onClose={closeCancel}>
        <div className="py-3 px-3">
          <div className="row">
          <h2 className="tw-font-oceanwide tw-text-center mt-1">Are you sure?</h2>
          <p className="tw-font-dmsans tw-text-center ">
            Make sure you have actually cancelled the meeting with the Mentee, before confirming the meeting 
            has been cancelled to ensure your meetings are tracked properly.
          </p> 
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-3 d-flex justify-content-center">
              <button className="tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-0.5 tw-py-2 tw-px-3 hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300" onClick={confirmCancel}>Confirm</button>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <button className="tw-font-bold tw-text-white tw-font-dmsans tw-border-[#dc3545] tw-border-0.5 tw-py-2 tw-px-7 hover:tw-text-[#dc3545] tw-bg-[#dc3545] rounded tw-border-solid hover:tw-bg-white tw-duration-300" onClick={closeCancel}>Exit</button>
            </div>
          </div>
        </div>
      </Popup>

      <MentorNavBar focused={"bookings"} />
      <div className="container mt-5">
        <div className="row gx-5 mt-5">
          <div className="col">
            <h1 className="tw-font-oceanwide">My Bookings</h1>
            <p
              className="tw-font-oceanwide tm-text-[#5C667B] mt-2"
              style={{ color: "#5C667B" }}
            >
              Upcoming sessions
            </p>
          </div>
        </div>
        {( bookingsList.isSuccess && !bookingsList.isLoading  && !bookingsList.data &&
          <div className="row mt-5 w-100 h-100">
            <h2 className="tw-font-oceanwide text-center">You currently have no upcoming meetings</h2>
            <p className="tw-font-dmsans tw-text-[#5685C9] text-center">When a mentee books a meeting with you, it will appear here!</p>
          </div>
        )}
        {( bookingsList.isSuccess && !bookingsList.isLoading && bookingsList.data &&
        <div>
        {( bookingsList.data.length === 0  &&
          <div className="row mt-5 w-100 h-100">
            <h2 className="tw-font-oceanwide text-center">You currently have no upcoming meetings</h2>
            <p className="tw-font-dmsans tw-text-[#5685C9] text-center">When a mentee books a meeting with you, it will appear here!</p>
          </div>
        )}
        {bookingsList.data.map((mentee, index) => (
        <div key={index} className="row mt-4">
          <div className="card py-2 mb-4">
            <div className="card-body">
              <div className="" style={{ color: "#000" }}>
                <div className="row align-items-center float-end">
                  <div className="col-2 d-flex justify-content-center align-items-center">
                    <div className="border border-primary-subtle border-4 tw-h-40 tw-w-40 rounded-circle">
                      <img 
                          style={{
                              objectFit: "cover",
                          }}
                          src={mentee.imageURL}
                          alt="Loading..."
                          className="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                      />
                    </div>
                   </div>
                  <div className="col-4">
                    <div className="row">
                      <h5 className="tw-font-dmsans mb-1 tw--mb-[1px]">{mentee?.firstName} {mentee?.lastName}</h5>
                      <p className="tw-font-dmsans tw-text-[#5685C9] ">{mentee?.schoolName}</p> 
                      <p className="tw-font-dmsans">
                        You have an upcoming meeting with this mentee!
                        Make sure to keep them updated and let them know of any changes.
                      </p>
                    </div>
                    {/* <div className="row">
                      { mentor?.instagram != null && (
                        <div className="col-2">
                          <a href={mentor.instagram} target="_blank">
                            <img className="img-fluid rounded" src={Instagram}></img>
                          </a>
                        </div>
                      )}
                      { mentor?.facebook != null && (
                        <div className="col-2">
                          <a href={mentor.facebook} target="_blank">
                            <img className="img-fluid rounded" src={Facebook}></img>
                          </a>
                        </div>
                      )}
                      { mentor?.linkedin != null && (
                        <div className="col-2">
                          <a href={mentor.linkedin} target="_blank">
                            <img className="img-fluid rounded" src={LinkedIn}></img>
                          </a>
                        </div>
                      )}
                    </div> */}
                  </div>
        
                  <div className="col">
                    <div className="w-75 float-end ">
                      <button onClick={() => {
                          setCurrIndex(index);
                          setCurrMentee(mentee);
                          setShowMetPopup(true);
                        }}
                        className="mb-2 w-50 tw-text-lg mt-1 tw-font-bold tw-text-[#408140] tw-font-dmsans tw-border-[#408140] tw-border-2 tw-py-3 w-100 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#408140] tw-duration-300">
                        We met!
                      </button>
                      <button onClick={() => {
                          setCurrIndex(index);
                          setCurrMentee(mentee);
                          setShowCancelPopup(true);
                        }}
                        className="mb-2 w-50 tw-text-lg mt-1 tw-font-bold tw-text-[#dc3545] tw-font-dmsans tw-border-[#dc3545] tw-border-2 tw-py-3 w-100 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#dc3545] tw-duration-300">
                        Meeting was cancelled
                      </button>
                      <button onClick={() => {navigate('/menteeProfile', { state: { mentee: mentee } })}}  className="tw-text-lg mt-2 tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 w-100 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">
                        View profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default MentorBookings;
