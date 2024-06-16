import React, { useEffect, useState } from 'react'

import { useTransition, animated } from '@react-spring/web'
import '../css/loader.css'

import LOGO from '../assets/logo.png'

import IMG1 from '../assets/loadingScreen1.png'
import IMG2 from '../assets/loadingScreen2.png'
import IMG3 from '../assets/loadingScreen3.png'

import '../css/checkbox.css'
import { getCurrentUser } from 'aws-amplify/auth'
import { useQuery } from '@tanstack/react-query'
import { listMenteePreferences, listMentorPreferences } from '../graphql/queries'
import { generateClient } from 'aws-amplify/api'
import { useNavigate } from 'react-router-dom'

const slides = [
    IMG1,
    IMG2,
    IMG3,
]

const client = generateClient();

const LoadingScreen = () => {
    const [index, set] = useState(0)
    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 },
        delay: 1500,
        onRest: (_a, _b, item) => {
        if (index === item) {
            set(state => (state + 1) % slides.length)
        }
        },
        exitBeforeEnter: true,
    })

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


    // Fetches the current user based off the username given above
    const {
        data: results,
        isSuccess,
    } = useQuery({
        queryKey: ["menteePreferences"],
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

            return { "matchObject": menteePreferences[0], "matchList": mentorPreferences };
        }
    })

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          navigate('/menteeHome');
        }, 3000)
    }, [navigate])

    const [returnData, setReturnData] = useState([{}]);


    useEffect(() => {
        if (isSuccess && ("matchObject" in results)) {
            // console.log(results);
            fetch("/matching", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(results)
            }).then(
                res => res.json()
            ).then(
                data => {
                    setReturnData(data)
                    // console.log(returnData)
                }
            )
        }
    }, [results, isSuccess, returnData])


    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center">
            <nav className="navbar fixed-top bg-white navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <div className="container h-100">
                <div className="row">
                    <div className="col">
                        <div className="progress" role="progressbar" >
                            <div className="progress-bar" style={{width: "100%", backgroundColor: "#7DC478"}}></div>
                        </div>
                    </div>
                </div>
                <div className="row gx-5 mt-5">
                    <div className="col">
                        <h1 className="tw-font-oceanwide">We are matching you with a mentor</h1>
                    </div>
      
                    <p className="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Sit tight! We are diligently working to pair you with the most suitable mentor based on your preferences.</p>
                </div>
                <div className="row gx-5 gy-5 align-items-center mt-5">
                    <div className="col">
                    </div>

                    <div className="col offset-md-1 c">
                        {transitions((style, i) => (
                            <animated.div
                                className='bg'
                                style={{
                                    ...style,
                                    backgroundImage: `url(${slides[i]})`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen
