import React, { useState } from 'react'

import { useTransition, animated } from '@react-spring/web'
import '../css/loader.css'

import LOGO from '../assets/logo.png'

import IMG1 from '../assets/loadingScreen1.png'
import IMG2 from '../assets/loadingScreen2.png'
import IMG3 from '../assets/loadingScreen3.png'

import '../css/checkbox.css'

const slides = [
    IMG1,
    IMG2,
    IMG3,
]

const MentorLoadingScreen = () => {
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
                        <h1 className="tw-font-oceanwide">We are preparing your profile</h1>
                    </div>
      
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

export default MentorLoadingScreen
