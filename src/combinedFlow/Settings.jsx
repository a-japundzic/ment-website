import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LOGO from "../assets/logo.png";
import default_profile_pic from "../assets/Mentor1.png";
import Hamburger from "hamburger-react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import NavBar from "./NavBar";
import ProfileSetup1 from "../menteeFlow/ProfileSetup1";
import ProfileSetup2 from "../menteeFlow/ProfileSetup2";
import Education from "../menteeFlow/Education";
import MenteePreferences from "../menteeFlow/MenteePreferences";
import MenteePreferences2 from "../menteeFlow/MenteePreferences2";
import MenteePreferences3 from "../menteeFlow/MenteePreferences3";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const getTabComponent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSetup1 settings={true} />;
      case "socials":
        return <ProfileSetup2 settings={true}/>;
      case "education":
        return <Education settings={true}/>;
      case "skills":
        return <MenteePreferences settings={true} />
      case "type":
        return <MenteePreferences2 settings={true} />
      case "goal":
        return <MenteePreferences3 settings={true}/>
      default:
        setActiveTab("profile")
        return <ProfileSetup1 settings={true} />;;
    }
  };

  return (
    <div>
      <NavBar focused={"profile"}/>

      <div className="tw-container tw-mx-auto tw-px-4 tw-py-6">
        <h1 className="tw-font-oceanwide">
          Profile Settings
        </h1>
        <p className="tw-font-dmsans mt-2 tw-text-[#5C667B]">
          Modify your profile settings and mentor preferences.
        </p>

        <div className="tw-bg-white tw-shadow tw-rounded-lg tw-p-6 tw-mt-4">
          <div className="tw-border-b tw-border-gray-200 tw-mb-4">
            <nav className="tw-flex tw-space-x-1 tw-justify-center">
              <button
                onClick={() => setActiveTab("profile")}
                className={`tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-rounded-t-lg ${
                  activeTab === "profile"
                    ? "tw-bg-white tw-font-dmsans tw-border tw-border-b-0 tw-border-gray-300"
                    : "tw-bg-[gray-100] tw-font-dmsans tw-border-b-2 tw-border-transparent hover:tw-bg-white"
                }`}
              >
              Profile
              </button>
              <button
                onClick={() => setActiveTab("socials")}
                className={`tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-rounded-t-lg ${
                  activeTab === "socials"
                    ? "tw-bg-white tw-font-dmsans tw-border tw-border-b-0 tw-border-gray-300"
                    : "tw-bg-gray-100 tw-font-dmsans tw-border-b-2 tw-border-transparent hover:tw-bg-white"
                }`}
              >
              Socials
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-rounded-t-lg ${
                  activeTab === "education"
                    ? "tw-bg-white tw-font-dmsans tw-border tw-border-b-0 tw-border-gray-300"
                    : "tw-bg-gray-100 tw-font-dmsans tw-border-b-2 tw-border-transparent hover:tw-bg-white"
                }`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-rounded-t-lg ${
                  activeTab === "skills"
                    ? "tw-bg-white tw-font-dmsans tw-border tw-border-b-0 tw-border-gray-300"
                    : "tw-bg-gray-100 tw-font-dmsans tw-border-b-2 tw-border-transparent hover:tw-bg-white"
                }`}
              >
                Skill Preferences
              </button>
              <button
                onClick={() => setActiveTab("type")}
                className={`tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-rounded-t-lg ${
                  activeTab === "type"
                    ? "tw-bg-white tw-font-dmsans tw-border tw-border-b-0 tw-border-gray-300"
                    : "tw-bg-gray-100 tw-font-dmsans tw-border-b-2 tw-border-transparent hover:tw-bg-white"
                }`}
              >
                Type/Location Preferences
              </button>
              <button
                onClick={() => setActiveTab("goal")}
                className={`tw-px-6 tw-py-2 tw-text-sm tw-font-medium tw-rounded-t-lg ${
                  activeTab === "goal"
                    ? "tw-bg-white tw-font-dmsans tw-border tw-border-b-0 tw-border-gray-300"
                    : "tw-bg-gray-100 tw-font-dmsans tw-border-b-2 tw-border-transparent hover:tw-bg-white"
                }`}
              >
                Goal Preferences
              </button>
            </nav>
          </div>
          <div className="tw-p-4">{getTabComponent()}</div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="tw-bg-white tw-shadow tw-p-6 tw-rounded-lg tw-w-full tw-mx-auto"
    >
      <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-items-start">
        <div className="tw-col-span-1 tw-text-center">
          <label
            htmlFor="profilePicture"
            className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
          >
            Profile Picture
          </label>
          <img
            src={default_profile_pic}
            alt="Profile"
            className="tw-rounded-full tw-w-24 tw-h-24 tw-mt-2"
          />
        </div>
        <div className="tw-col-span-2">
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-col-span-2">
              <label
                htmlFor="firstName"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Name
              </label>
              <div className="tw-flex">
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  {...register("firstName")}
                  className="tw-mt-1 tw-block tw-w-1/2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="tw-mt-1 tw-ml-2 tw-block tw-w-1/2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
                />
              </div>
            </div>
            <div className="tw-col-span-1">
              <label
                htmlFor="gender"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                {...register("gender")}
                className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-1">
              <label
                htmlFor="age"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Age
              </label>
              <input
                type="text"
                id="age"
                {...register("age")}
                className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="ethnicity"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Ethnicity
              </label>
              <input
                type="text"
                id="ethnicity"
                {...register("ethnicity")}
                className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="languages"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Language(s) Spoken
              </label>
              <input
                type="text"
                id="languages"
                {...register("languages")}
                className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="city"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Current City
              </label>
              <input
                type="text"
                id="city"
                {...register("city")}
                className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="tw-col-span-1 tw-flex tw-justify-end">
          <button
            type="submit"
            className="tw-mt-4 tw-bg-gray-200 tw-text-gray-800 tw-py-2 tw-px-4 tw-rounded"
          >
            Modify
          </button>
        </div>
      </div>
    </form>
  );
}

function AcademicBackgroundSection() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="tw-bg-white tw-shadow tw-p-6 tw-rounded-lg tw-w-full tw-mx-auto"
    >
      <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-items-start">
        <div className="tw-col-span-3">
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-col-span-2">
              <label
                htmlFor="school"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Education Institution
              </label>
              <input
                type="text"
                id="school"
                {...register("school")}
                className="tw-mt-1 tw-block tw-w-3/5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="major"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Program of Study - Major
              </label>
              <input
                type="text"
                id="major"
                {...register("major")}
                className="tw-mt-1 tw-block tw-w-3/5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="minor"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Program of Study - Minor
              </label>
              <input
                type="text"
                id="minor"
                {...register("minor")}
                className="tw-mt-1 tw-block tw-w-3/5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="educationLevel"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Education Level
              </label>
              <input
                type="text"
                id="educationLevel"
                {...register("educationLevel")}
                className="tw-mt-1 tw-block tw-w-3/5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
            <div className="tw-col-span-2">
              <label
                htmlFor="gradDate"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Expected Graduation
              </label>
              <input
                type="text"
                id="gradDate"
                {...register("gradDate")}
                className="tw-mt-1 tw-block tw-w-3/5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="tw-col-span-1 tw-flex tw-items-start tw-justify-end">
          <button
            type="submit"
            className="tw-bg-gray-200 tw-text-gray-800 tw-py-2 tw-px-4 tw-rounded"
          >
            Modify
          </button>
        </div>
      </div>
    </form>
  );
}

function MentorPreferencesSection() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="tw-bg-white tw-shadow tw-p-6 tw-rounded-lg tw-w-full tw-mx-auto"
    >
      <div className="tw-flex tw-justify-end tw-mb-4">
        <button
          type="submit"
          className="tw-bg-gray-200 tw-text-gray-800 tw-py-2 tw-px-4 tw-rounded"
        >
          Modify
        </button>
      </div>
      <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-items-start">
        <div className="tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
            Skills you wish to develop
          </label>
          <div className="tw-mt-2">
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Leadership and team management skills"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Leadership and team management skills
                </span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Communication and interpersonal skills"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Communication and interpersonal skills
                </span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Strategic thinking and problem-solving skills"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Strategic thinking and problem-solving skills
                </span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Technical skills related to my field"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Technical skills related to my field
                </span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Strong resume and interview skills"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Strong resume and interview skills
                </span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Cross-team collaboration"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Cross-team collaboration</span>
              </label>
            </div>
          </div>
        </div>

        <div className="tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
            Type of Mentorship Sought
          </label>
          <div className="tw-mt-2">
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("mentorshipType")}
                  value="Career mentorship"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Career mentorship</span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("mentorshipType")}
                  value="Academic mentorship"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Academic mentorship</span>
              </label>
            </div>
          </div>
        </div>

        <div className="tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
            Frequency of Mentorship Meetings
          </label>
          <div className="tw-mt-2">
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("meetingFrequency")}
                  value="Weekly"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Weekly</span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("meetingFrequency")}
                  value="Bi-weekly"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Bi-weekly</span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("meetingFrequency")}
                  value="Monthly"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Monthly</span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("meetingFrequency")}
                  value="I'm not sure yet"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">I'm not sure yet</span>
              </label>
            </div>
          </div>
        </div>

        <div className="tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
            Your Goal
          </label>
          <div className="tw-mt-2">
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("goals")}
                  value="Connect with a group of likeminded people"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Connect with a group of likeminded people
                </span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("goals")}
                  value="Gain industry context"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">Gain industry context</span>
              </label>
            </div>
            <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-mb-2">
              <label className="tw-flex tw-items-center">
                <input
                  type="checkbox"
                  {...register("goals")}
                  value="Personal growth and skill development"
                  className="tw-form-checkbox"
                />
                <span className="tw-ml-2">
                  Personal growth and skill development
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
            Additional comments about your goals
          </label>
          <textarea
            id="comments"
            {...register("comments")}
            className="tw-mt-1 tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-py-2 tw-px-3 tw-focus:tw-outline-none tw-focus:tw-ring-blue-500 tw-focus:tw-border-blue-500"
            rows="4"
          ></textarea>
        </div>
      </div>
    </form>
  );
}

export default Settings;
