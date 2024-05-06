import React, {useState} from 'react'

import LOGO from '../assets/logo.png'
import Hamburger from 'hamburger-react'

import '../css/hamburger.css'

const Navbar = () => {
    const [isOpen, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!isOpen);
    };

    return (
        <nav class="navbar bg-white navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    <img class="align-middle" src={LOGO} alt=""/>
                </a>
                <button class="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span onClick={handleClick} class="">
                        <Hamburger toggled={isOpen} size={30} duration={0.5} color={"#5685C9"} rounded toggle={setOpen} />
                    </span>
                </button>
                <div class="collapse navbar-collapse text-end justify-content-end" id="navbarTogglerDemo02">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a style={{color: '#1D1D1D', fontSize: "120%", fontWeight: "600"}} class="nav-link tw-font-dmsans mx-3" href="/">Our Mission</a>
                        </li>
                        <li class="nav-item">
                            <a style={{color: '#1D1D1D', fontSize: "120%", fontWeight: "600"}} class="nav-link tw-font-dmsans mx-3" href="/">Browse Mentors</a>
                        </li>
                    </ul>
                    <div>
                        <button style={{fontSize: "120%", }} class="tw-font-semibold tw-text-[#1D1D1D] tw-font-dmsans mx-3 my-2 tw-border-[#5685C9] tw-border-3 tw-px-3 tw-font hover:tw-text-white tw-bg-white tw-rounded-xl tw-py-2 tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300" type="button">Become a Mentor</button>
                    </div>
                    <div>
                        <button style={{fontSize: "120%", }} class="tw-font-semibold tw-text-white tw-font-dmsans mx-3 my-2 tw-border-[#5685C9] tw-border-3 tw-px-3 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] tw-rounded-xl tw-py-2 tw-border-solid hover:tw-bg-white tw-duration-300" type="button">Find a Mentor</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
