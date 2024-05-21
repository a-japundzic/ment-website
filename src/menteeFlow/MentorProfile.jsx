import React, { useState, useEffect } from "react";
import LOGO from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import Mentor1 from "../assets/Mentor1.png";
import { InlineWidget } from "react-calendly";

import Instagram from "../assets/instagram.png"
import Facebook from "../assets/facebook.png"
import LinkedIn from "../assets/linkedin.png"

const MentorProfile = () => {
  // const [state, setAppState] = useAppState();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const saveData = (data) => {
    // setAppState({ ...state, ...data });
    // This navigates you to the next page when the next button is clicked
    navigate("/Top");
  };

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const {state} = useLocation();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const mentor = {
    name: "John Doe",
    rating: 4.5,
    position: "Senior Software Engineer",
    availability: "Next Availability: 5 May 2022",
    image: Mentor1,
  };

  return (
    <div>
      <nav className="navbar bg-white navbar-expand-lg">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                <img className="align-middle" src={LOGO} alt=""/>
            </a>
            <button className="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span onClick={handleClick} className="">
                    <Hamburger toggled={isOpen} size={30} duration={0.5} color={"#5685C9"} rounded toggle={setOpen} />
                </span>
            </button>
            <div className="collapse navbar-collapse text-end justify-content-end" id="navbarTogglerDemo02">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item hover:tw-text-blue">
                        <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/menteeHome">Home</a>
                    </li>
                    <li className="nav-item">
                        <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Bookings</a>
                    </li>
                    {/* <li className="nav-item">
                        <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Inbox</a>
                    </li>
                    <li className="nav-item">
                        <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Community</a>
                    </li> */}
                    <li className="nav-item">
                      <a  className="nav-link mx-3" href="/">
                        <div className=" tw-w-16 tw-h-16 rounded-circle">
                          <img 
                              style={{
                                  objectFit: "cover",
                              }}
                              src={state.mentor.imageURL}
                              alt="Loading..."
                              className="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                          />
                        </div>
                      </a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>

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
              <ul className="list-group list-group-horizontal-md tw-font-dmsans">
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
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
