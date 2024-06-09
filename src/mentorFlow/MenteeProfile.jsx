import React from "react";
import { useLocation } from "react-router-dom";
import Instagram from "../assets/instagram.png"
import Facebook from "../assets/facebook.png"
import LinkedIn from "../assets/linkedin.png"
import "../css/popup.css"
import MentorNavBar from "./NavBar";

const MenteeProfile = () => {
  const {state} = useLocation();

  return (
    <div>
      <MentorNavBar focused={"profile"} />

      <div className="container mt-5 w-100">
        <div className="row mb-3">
         <h1 className="tw-font-oceanwide">Mentee Profile</h1>
        </div>
        <div className="row gap-5">
            <div className="col-md-4">
                <div className="card mt-2 w-100" >
                    <img src={state.mentee.imageURL} className="card-img-top img-fluid tw-object-cover" style={{height: "22rem"}} alt="Mentee"/>
                    <div className="card-body">
                        <div className="row">
                            <h5 className="card-title mb-0 tw-font-semibold tw-font-dmsans">{state.mentee.firstName} {state.mentee.lastName}</h5>
                            <p className="mt-1 card-text tw-font-dmsans tw-text-[#5685C9]">{state.mentee.schoolName}</p>
                        </div>
                        { (state?.mentee?.linkedin != null || state?.mentee?.instagram != null || state?.mentee?.linkedin != null) && (
                            <div className="row mt-3">
                            <h6 className="tw-font-semibold tw-font-dmsans">Socials</h6>
                            </div>
                        )}
                        <div className="row align-items-center">
                            { state?.mentee?.instagram != null && (
                            <div className="col-2">
                                <a href={state.mentee.instagram} target="_blank" rel="noreferrer">
                                <img className="img-fluid rounded" src={Instagram} alt=""></img>
                                </a>
                            </div>
                            )}
                            { state?.mentee?.facebook != null && (
                            <div className="col-2">
                                <a href={state.mentee.facebook} target="_blank" rel="noreferrer">
                                <img className="img-fluid rounded" src={Facebook} alt=""></img>
                                </a>
                            </div>
                            )}
                            { state?.mentee?.linkedin != null && (
                            <div className="col-2">
                                <a href={state.mentee.linkedin} target="_blank" rel="noreferrer">
                                <img className="img-fluid rounded" src={LinkedIn} alt=""></img>
                                </a>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col mt-2">
                <h3 className="tw-font-oceanwide">About me</h3>
                <h5 className="tw-font-oceanwide tw-text-[#5685C9] mt-3">Program</h5>
                <p className="tw-font-dmsans">{state.mentee.programOfStudy}, {state.mentee.graduationYear}</p>
                <h5 className="tw-font-oceanwide tw-text-[#5685C9] mt-4">Values</h5>
                <ul className="list-group list-group-horizontal-md tw-font-dmsans">
                    {state.mentee.values.map((value) => {
                        if (value !== "") {
                            return <li className="list-group-item">{value}</li>
                        } else {
                            return ""
                        }
                    })}
                </ul>
                <h5 className="tw-font-oceanwide tw-text-[#5685C9] mt-4">Learning Goals</h5>
                <p className="tw-font-dmsans">{state.mentee.learningGoals}</p>
            </div>

            {/* <p className="tw-font-dmsans">{state.mentee.bio}</p> */}
          </div>
      </div>
    </div>
  );
};

export default MenteeProfile;
