import React, { useState, useEffect } from "react";
import LOGO from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import Mentor1 from "../assets/Mentor1.png";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

import Instagram from "../assets/instagram.png"
import Facebook from "../assets/facebook.png"
import LinkedIn from "../assets/linkedin.png"
import NavBar from "../combinedFlow/NavBar";
import * as mutations from '../graphql/mutations';
import { useMutation } from "@tanstack/react-query";
import { getCurrentUser } from "aws-amplify/auth";
import { listMenteeMeetingList } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import Popup from "reactjs-popup";
import "../css/popup.css"

const client = generateClient();

const MentorProfile = ({ settings }) => {
  // const [state, setAppState] = useAppState();
  // const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const closeModal = () => setShowPopup(false);
  const closeConfirm = () => setShowConfirmPopup(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const {state} = useLocation();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const updateMeetingList = useMutation({
    mutationFn: async () => {
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

        // Get the mentees current meeting list and id
        const response = await client.graphql({
          query: listMenteeMeetingList,
          variables: variables
        });

        console.log(response);
        let menteeMeetingList = response?.data?.listMenteeProfiles?.items[0]?.meetingList;
        const menteeId = response?.data?.listMenteeProfiles?.items[0]?.id;
        console.log(menteeId);

        // Initialize list if necessary
        if (!menteeMeetingList) {
          menteeMeetingList = [];
        } 
          
        // Add new meeting to list
        if (!menteeMeetingList.includes(state?.mentor?.id)) {
          menteeMeetingList.push(state?.mentor?.id);

          // Update the meeting list
          const menteeDetails = {
            id: menteeId,
            meetingList: menteeMeetingList
          }

          const updatedMenteeList = await client.graphql({
            query: mutations.updateMenteeMeetingList,
            variables: { input: menteeDetails },
          });
          // 

          // Get the mentor meeting list
          let mentorMeetingList = state?.mentor?.meetingList;

          // Initialize if necessary
          if (!mentorMeetingList) {
            mentorMeetingList = []
          }

          mentorMeetingList.push(menteeId);

          // Upadte the meeting list
          const mentorDetails = {
            id: state?.mentor?.id,
            meetingList: mentorMeetingList,
          }

          const updatedMentorList = await client.graphql({
            query: mutations.updateMentorMeetingList,
            variables: { input: mentorDetails },
          })

          showConfirmPopup(true);
          // 

          // Print to error check (comment out as required)
          // console.log(updatedMentorList);


          // For debugging purposes
          // console.log(updatedMenteeList);
        } else {
          setShowPopup(true);
        }
      } catch (error) {
        console.log("Error updating meeting list ", error)
      }
    }
  })

  useCalendlyEventListener({
    onEventScheduled: (e) => updateMeetingList.mutate(),
  });

  return (
    <div>
      {/* Popup in case a meeting is double booked */}
      <Popup open={showPopup} modal closeOnDocumentClick onClose={closeModal}>
        <h2 className="tw-font-oceanwide tw-text-center mt-1">Heads Up!</h2>
        <p className="tw-font-dmsans tw-text-center ">
          You have already booked a meeting with this mentor. <br />
          Please avoid double booking mentors as they are
          extremely busy. If this wasn't planned, please cancel the meeting
          using the confirmation email you were sent. Thank you!
        </p> 
        <div className="d-flex justify-content-center">
          <button className="mt-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-0.5 tw-py-1 tw-px-3 hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300" onClick={closeModal}>I understand</button>
        </div>
      </Popup>

      {/* Popup in case a meeting booking is successful */}
      <Popup open={showConfirmPopup} modal closeOnDocumentClick onClose={closeConfirm}>
        <h2 className="tw-font-oceanwide tw-text-center mt-1">Next Steps</h2>
        <p className="tw-font-dmsans tw-text-center ">
          Your meeting has been booked with <b>{state.mentor.firstName}</b>.
          For a meeting link and next steps check your email. If you don't
          see the email, check your junk/spam folder.
        </p> 
        <div className="d-flex justify-content-center">
          <button className="mt-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-0.5 tw-py-1 tw-px-3 hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300" onClick={closeConfirm}>Close</button>
        </div>
      </Popup>

      <NavBar focused={"profile"} />

      <div className="container mt-5 w-100">
        <h1 className="tw-font-oceanwide mb-4">Mentor Profile</h1>
        <div className="row">
          <div className="col-lg-4">
            <div className="card w-100" >
              <img src={state.mentor.imageURL} className="card-img-top img-fluid tw-object-cover" style={{height: "22rem"}} alt="Mentor"/>
              <div className="card-body">
                <div className="row">
                  <h5 className="card-title mb-0 tw-font-semibold tw-font-dmsans">{state.mentor.firstName} {state.mentor.lastName}</h5>
                  <p className="mt-1 card-text tw-font-dmsans fw-light">{state.mentor.experience[0]}</p>
                </div>
                { (state?.mentor?.linkedin != null || state?.mentor?.instagram != null || state?.mentor?.linkedin != null) && (
                  <div className="row mt-3">
                    <h6 className="tw-font-semibold tw-font-dmsans">Socials</h6>
                  </div>
                )}
                <div className="row align-items-center">
                  { state?.mentor?.instagram != null && (
                    <div className="col-2">
                      <a href={state.mentor.instagram} target="_blank">
                        <img className="img-fluid rounded" src={Instagram}></img>
                      </a>
                    </div>
                  )}
                  { state?.mentor?.facebook != null && (
                    <div className="col-2">
                      <a href={state.mentor.facebook} target="_blank">
                        <img className="img-fluid rounded" src={Facebook}></img>
                      </a>
                    </div>
                  )}
                  { state?.mentor?.linkedin != null && (
                    <div className="col-2">
                      <a href={state.mentor.linkedin} target="_blank">
                        <img className="img-fluid rounded" src={LinkedIn}></img>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
            </div>

            <h3 className="tw-font-oceanwide mt-5">About me</h3>
            <p className="tw-font-dmsans">{state.mentor.bio}</p>
          </div>

          <div className="col-lg-2" />

          <div className="col-lg-6">
            <h3 className="tw-font-oceanwide">Book a session</h3>
            <div className="card w-100">
              <div className="card-body">
                <InlineWidget url={(state.mentor.calendly)}></InlineWidget>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-4">
              <h5 className="tw-font-oceanwide">Experience</h5>
              <ul className="list-group  tw-font-dmsans">
                {state.mentor.experience.map((job) => {
                  if (job != "") {
                    return <li className="list-group-item">{job}</li>
                  }
                })}
              </ul>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-4">
              <h5 className="tw-font-oceanwide">Values</h5>
              <ul className="list-group list-group-horizontal-md tw-font-dmsans">
                {state.mentor.values.map((value) => {
                  if (value != "") {
                    return <li className="list-group-item">{value}</li>
                  }
                })}
              </ul>
            </div>
          </div>

          <div className="row mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
