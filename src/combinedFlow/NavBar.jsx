import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import LOGO from '../assets/logo.png'
import Hamburger from 'hamburger-react'
import { listMenteeProfiles } from '../graphql/queries';

import '../css/hamburger.css'
import '../css/navbar.css'
import { useNavigate } from 'react-router-dom';


const client = generateClient();

const NavBar = ({ focused }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!isOpen);
    };

    const [username, setUsername] = useState('');
    const [isOpen, setOpen] = useState(false);
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
        data: profileImg,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["profileImg"],
        queryFn: async () => {
            const variables = {
                filter: {
                    owner: {
                        contains: username
                    }
                }
            };

            const response = await client.graphql({
                query: listMenteeProfiles,
                variables: variables
            });

            let completeProfile = response?.data?.listMenteeProfiles?.items;

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
                <a className="navbar-brand" href="/">
                    <img className="align-middle" src={LOGO} alt=""/>
                </a>
                <button className="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span onClick={handleClick} className="">
                        <Hamburger toggled={isOpen} size={30} duration={0.5} color={"#5685C9"} rounded toggle={setOpen} />
                    </span>
                </button>
                <div className="collapse navbar-collapse text-end justify-content-end" id="navbarTogglerDemo02">
                    {( focused == "home" && 
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item active hover:tw-text-blue">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" aria-current="page" href="/menteeHome">Home</a>
                        </li>
                        <li className="nav-item">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Bookings</a>
                        </li>
                        <li className="nav-item">
                        <a  className="nav-link mx-3" href="/profileSettings">
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
                    {( focused == "bookings" && 
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item ">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3"  href="/menteeHome">Home</a>
                        </li>
                        <li className="nav-item active hover:tw-text-blue">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" aria-current="page" href="/">Bookings</a>
                        </li>
                        <li className="nav-item">
                        <a  className="nav-link mx-3" href="/profileSettings">
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
                    {( focused == "profile" && 
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3"  href="/menteeHome">Home</a>
                        </li>
                        <li className="nav-item">
                            <a style={{fontSize: "120%"}} className="nav-link tw-font-oceanwide mx-3" href="/">Bookings</a>
                        </li>
                        <li className="nav-item">
                        <a  className="nav-link mx-3" href="/profileSettings">
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

export default NavBar