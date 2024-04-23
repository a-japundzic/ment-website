import React, { useState, useEffect } from 'react'

import { useTransition, animated, config } from '@react-spring/web'
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

const LoadingScreen = () => {
    const [index, set] = useState(0)
    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 },
        delay: 2000,
        onRest: (_a, _b, item) => {
        if (index === item) {
            set(state => (state + 1) % slides.length)
        }
        },
        exitBeforeEnter: true,
    })

    return (
        <div class="d-flex flex-column min-vh-100 justify-content-center">
            <nav class="navbar fixed-top bg-white navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img class="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <div class="container h-100">
                <div class="row">
                    <div class="col">
                        <div class="progress" role="progressbar" >
                            <div class="progress-bar" style={{width: "100%", backgroundColor: "#7DC478"}}></div>
                        </div>
                    </div>
                </div>
                <div class="row gx-5 mt-5">
                    <div class="col">
                        <h1 class="tw-font-oceanwide">We are matching you with a mentor</h1>
                    </div>
      
                    <p1 class="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Sit tight! We are diligently working to pair you with the most suitable mentor based on your preferences.</p1>
                </div>
                <div class="row gx-5 gy-5 align-items-center mt-5">
                    <div class="col">
                    </div>

                    <div class="col offset-md-1 c">
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
