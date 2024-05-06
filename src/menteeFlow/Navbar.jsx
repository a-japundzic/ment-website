import React, {useState} from 'react'

import LOGO from '../assets/logo.png'
import Hamburger from 'hamburger-react'

import '../css/hamburger.css'
import { useNavigate } from 'react-router-dom'

import '../css/navbar.css'

const MenteeNavbar = () => {
    const [isOpen, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!isOpen);
    };

    const navigate = useNavigate();

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
    )
}

export default MenteeNavbar
