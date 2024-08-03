import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import LOGO from '../assets/logo.png'
import Hamburger from 'hamburger-react'
import { listMentorProfiles } from '../graphql/queries';

import '../css/hamburger.css'
import '../css/navbar.css'

const client = generateClient();

const MentorNavBar = ({ focused }) => {
    const handleClick = () => {
        setOpen(!isOpen);
    };
    const [isOpen, setOpen] = useState(false);

    // Fetches the current user based off the username given above
    const {
        data: profileImg,
    } = useQuery({
        queryKey: ["profileImg"],
        queryFn: async () => {
            const { username } = await getCurrentUser();

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
                return signedURL.url.toString();
            } else {
                return "";
            }
        }
    })


    return (
        <nav className="navbar bg-white navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/mentorBookings">
                    <img className="align-middle tw-w-[139px] tw-h-[70px] img-fluid" src={LOGO} alt=""/>
                </a>
                <button className="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span onClick={handleClick} className="">
                        <Hamburger toggled={isOpen} size={30} duration={0.5} color={"#5685C9"} rounded toggle={setOpen} />
                    </span>
                </button>
                <div className="collapse navbar-collapse text-end justify-content-end" id="navbarTogglerDemo02">
                    {( focused === "bookings" && 
                    <ul className="navbar-nav align-items-center">
                        {/* <li className="nav-item ">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3"  href="/menteeHome">Home</a>
                        </li> */}
                        <li className="nav-item active hover:tw-text-blue">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" aria-current="page" href="/mentorBookings">Bookings</a>
                        </li>
                        <li className="nav-item">
                        <a  className="nav-link mx-3" href="/mentorProfileSettings">
                            <div className=" tw-w-16 tw-h-16 rounded-circle">
                            <img 
                                style={{
                                    objectFit: "cover",
                                }}
                                src={profileImg}
                                alt=" "
                                className="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                            />
                            </div>
                        </a>
                        </li>
                    </ul>
                    )}
                    {( focused === "profile" && 
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/mentorBookings">Bookings</a>
                        </li>
                        <li className="nav-item">
                        <a  className="nav-link mx-3" href="/mentorProfileSettings">
                            <div className=" tw-w-16 tw-h-16 rounded-circle">
                            <img 
                                style={{
                                    objectFit: "cover",
                                }}
                                src={profileImg}
                                alt=" "
                                className="img-fluid w-100 h-100 rounded-circle tw-font-dmsans d-flex justify-content-center align-items-center text-secondary"
                            />
                            </div>
                        </a>
                        </li>
                    </ul>
                    )}
                    {/* <li className="nav-item">
                        <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Inbox</a>
                    </li>
                    <li className="nav-item">
                        <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Community</a>
                    </li> */}
                </div>
            </div>
        </nav>
    )
}

export default MentorNavBar
