import React, { useState, useEffect } from "react";
import Mentor1 from "../assets/Mentor1.png";
import Mentor2 from "../assets/Mentor2.png";
import Mentor3 from "../assets/Mentor3.png";
import LOGO from '../assets/logo.png'
import Hamburger from 'hamburger-react'

import '../css/hamburger.css'
import { useNavigate } from 'react-router-dom'

import '../css/navbar.css'
import { useQuery } from "@tanstack/react-query";
import { listMenteePreferences, listMentorPreferences, menteeListMentorProfiles } from "../graphql/queries";
import { getCurrentUser, signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { getUrl } from "aws-amplify/storage";

const client = generateClient();

const Mentors = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const saveData = (data) => {
    // This navigates you to the next page when the next button is clicked
    navigate("/Top");
  };

  const handleClick = () => {
    setOpen(!isOpen);
  };

  // ************************* Fetch current user profile if it exists, and define appropriate variables ************************
  const [username, setUsername] = useState('');

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

  const [data, setData] = useState([{}]);

    // Fetches the current user based off the username given above
  const topThree = useQuery({
    queryKey: ["topThree"],
    queryFn: async () => {
      const variables = {
          filter: {
              owner: {
                  contains: username
              }
          }
      };

      const menteeResponse = await client.graphql({
          query: listMenteePreferences,
          variables: variables
      });

      let menteePreferences = menteeResponse?.data?.listMenteePreferences?.items;

      const mentorResponse = await client.graphql({
          query: listMentorPreferences,
      })

      let mentorPreferences = mentorResponse?.data?.listMentorPreferences?.items;

      fetch("/matching", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ "matchObject": menteePreferences[0], "matchList": mentorPreferences })
      }).then(
        res => res.json()
      ).then(
        data => {
            setData(data)
           // console.log(data)
        }
      )

      const filterIds = {
        filter: {
          or: [
            { id: {eq: data[0].id} }, 
            { id: {eq: data[1].id} },
            { id: {eq: data[2].id} },
          ]
        }
      }

      //console.log(filterIds)
      
      const topThreeMatches = await client.graphql({
          query: menteeListMentorProfiles,
          variables: filterIds
      });


      //console.log(topThreeMatches)

      return topThreeMatches?.data?.listMentorProfiles?.items;
    }
  })

  useEffect(() => {
    console.log(topThree.data)
  }, [topThree])

  async function formatProfilePic(profilePicKey) {
      // Format image url
      const signedURL = await getUrl({ 
        path: 'protected/us-east-1:e30584f2-b029-cb3f-2fa8-b9e71a10b32a/144bfd1b-2073-482c-aaca-0910b26059b7-David_Bowie.webp',
        data: File,
      });
      console.log(signedURL.url.toString());
      return signedURL.url.toString();
  }
 

  const mentors = [
    {
      name: "John Doe",
      rating: 4.5,
      position: "Senior Software Engineer",
      availability: "Next Availability: 5 May 2022",
      image: Mentor1,
    },
    {
      name: "Jane Smith",
      rating: 4.2,
      position: "Product Manager",
      availability: "Next Availability: 7 May 2022",
      image: Mentor2,
    },
    {
      name: "Mike Johnson",
      rating: 4.8,
      position: "UX/UI Designer",
      availability: "Next Availability: 10 May 2022",
      image: Mentor3,
    },
  ];

  return (
    <div >
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
                  <ul className="navbar-nav">
                      <li className="nav-item active hover:tw-text-blue">
                          <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" aria-current="page" href="/menteeHome">Home</a>
                      </li>
                      <li className="nav-item">
                          <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Bookings</a>
                      </li>
                      <li className="nav-item">
                          <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Inbox</a>
                      </li>
                      <li className="nav-item">
                          <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Community</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>

      <div className="container w-75 ">
        <div className="row gx-5 mt-5">
          <h1 className="tw-font-oceanwide">
            Here are your top 3 mentor matches!
          </h1>
        </div>

      {( topThree.isSuccess &&
        <div className="row  mt-4 w-100 mx-auto">
          {topThree.data.map((mentor, index) => (
            <div key={index} className="col mx-4">
              <div className="card">
                <img src={formatProfilePic(mentor.profilePicKey)} className="card-img-top img-fluid" alt="Mentor" />
                <div className="card-body">
                  <h5 className="card-title mb-0 tw-font dm-sans">{mentor.firstName}</h5>
                  <p className="card-text tw-font-dmsans fs-6 fw-light">{mentor.lastName}</p>
                  <div className="d-flex justify-content-center">
                  <button type="submit" className="tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-[85px] tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">
                    Check availability
                  </button>
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

export default Mentors;
