import React from 'react'

import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../state';

import LOGO from '../assets/logo.png'
import IMG from '../assets/menteePreferences2.png'

import '../css/checkbox.css'

const MenteePreferences2 = () => {
    const [state, setState] = useAppState();
    const { handleSubmit, 
            register,
        } = useForm({ defaultValues: state, criteriaMode: "all" });
    const navigate = useNavigate();

    const saveData = (data) => {
        setState({...state, ...data });
        navigate("/menteePreferences3")
    };

    return (
        <div class="d-flex flex-column min-vh-100 justify-content-center">
            <nav class="navbar fixed-top bg-white navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img class="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <form onSubmit={handleSubmit(saveData)}>
                <div class="container h-100">
                    <div class="row">
                        <div class="col">
                            <div class="progress" role="progressbar" >
                                <div class="progress-bar" style={{width: "74%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-5 mt-5">
                        <div class="col">
                            <h1 class="tw-font-oceanwide">Your mentorship preferences.</h1>
                        </div>
                        <div class="col">
                            <button type="submit" class="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">Next</button>
                            <Link to="/menteePreferences">
                                <button class="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                            </Link>
                        </div>
                       
                        <p1 class="tw-font-dmsans tm-text-[#5C667B] mt-2 tw-text-[#5C667B]">Help us pair you with the ideal mentor.</p1>
                    </div>
                    <div class="row gx-5 gy-5 mt-1 align-items-center">
                        <div class="col">
                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeTypeInput" class="form-label tw-font-dmsans">What mentorship are you looking for?</label>
                                    <ul class="list-group mt-1" id="menteeTypeInput">
                                        <label class="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("Career mentorship")}
                                                type="checkbox" class="me-2 tw-font-dmsans"
                                            />
                                            Career mentorship
                                        </label>
                                        <label class="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("Academic mentorship")}
                                                type="checkbox" class="me-2 tw-font-dmsans"
                                            />
                                            Academic mentorship
                                        </label>

                                    </ul>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <hr class="hr" /> 
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <label for="menteeFrequency" class="form-label tw-font-dmsans">How frequently do you want to meet your mentor?</label>
                                    <ul class="list-group mt-1" id="menteeFrequency">
                                        <label class="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("Weekly")}
                                                type="checkbox" class="me-2 tw-font-dmsans"
                                            />
                                            Weekly
                                        </label>
                                        <label class="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("Bi-weekly")}
                                                type="checkbox" class="me-2 tw-font-dmsans"
                                            />
                                            Bi-weekly
                                        </label>
                                        <label class="list-group-item tw-font-dmsans">
                                            <input 
                                                {...register("Monthly")}
                                                type="checkbox" class="me-2 tw-font-dmsans"
                                            />
                                            Monthly
                                        </label>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col offset-md-1 d-flex align-items-center justify-content-center">
                            <img class="img-fluid" src={IMG} alt=""></img>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MenteePreferences2