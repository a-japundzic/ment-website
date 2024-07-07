import SignIn from "./combinedFlow/SignIn";
import Settings from "./menteeFlow/Settings";
import PasswordVerification from "./combinedFlow/PasswordVerification";
import ProfileSetup1 from "./menteeFlow/ProfileSetup1"
import ProfileSetup2 from "./menteeFlow/ProfileSetup2";
import Education from "./menteeFlow/Education";
import MenteePreferences from "./menteeFlow/MenteePreferences";
import MenteePreferences2 from "./menteeFlow/MenteePreferences2";
import MenteePreferences3 from "./menteeFlow/MenteePreferences3";
import LoadingScreen from "./menteeFlow/LoadingScreen";
import Mentors from "./menteeFlow/Mentors";
import MentorProfileSetup1 from "./mentorFlow/MentorProfileSetup1";
import MentorProfileSetup2 from "./mentorFlow/MentorProfileSetup2";
import Background from "./mentorFlow/Background";
import MentorSchedule from "./mentorFlow/MentorSchedule";
import MentorExpertise from "./mentorFlow/MentorExpertise";
import MentorPreferences1 from "./mentorFlow/MentorPreferences1";
import MentorPreferences2 from "./mentorFlow/MentorPreferences2";
import MentorLoadingScreen from "./mentorFlow/MentorLoadingScreen";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./state";

//  TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MentorProfile from "./menteeFlow/MentorProfile";
import MenteeBookings from "./menteeFlow/Bookings";
import MentorBookings from "./mentorFlow/Bookings";
import MentorSettings from "./mentorFlow/Settings";
import MenteeProfile from "./mentorFlow/MenteeProfile";
import SignUp from "./combinedFlow/SignUp";



// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/" element={<SignIn/>} />
              <Route path="/signUp" element={<SignUp/>} />
              <Route path="/passwordVerification" element={<PasswordVerification/>} />

              <Route path="/personalInfo" element={<ProfileSetup1 settings={false} />} />
              <Route path="/personalInfo2" element={<ProfileSetup2 settings={false}/>} />
              <Route path="/education" element={<Education settings={false}/>} />
              <Route path="/menteePreferences" element={<MenteePreferences settings={false}/>} />
              <Route path="/menteePreferences2" element={<MenteePreferences2 settings={false}/>} />
              <Route path="/menteePreferences3" element={<MenteePreferences3 settings={false}/>} />
              <Route path="/loadingScreen" element={<LoadingScreen/>} />
              <Route path="/profileSettings" element={<Settings />} />
              <Route path="/mentorProfile" element={<MentorProfile />} />
              <Route path="/menteeHome" element={<Mentors />} />
              <Route path="/menteeBookings" element={<MenteeBookings />} />

              <Route path="/mentorPersonalInfo" element={<MentorProfileSetup1/>} />
              <Route path="/mentorPersonalInfo2" element={<MentorProfileSetup2/>} />
              <Route path="/mentorBackground" element={<Background/>} />
              <Route path="/mentorSchedule" element={<MentorSchedule/>} />
              <Route path="/mentorExpertise" element={<MentorExpertise/>} />
              <Route path="/mentorPreferences1" element={<MentorPreferences1/>} />
              <Route path="/mentorPreferences2" element={<MentorPreferences2/>} />
              <Route path="/mentorLoadingScreen" element={<MentorLoadingScreen/>} />  
              <Route path="/mentorBookings" element={<MentorBookings />} />
              <Route path="/mentorProfileSettings" element={<MentorSettings />} />
              <Route path="/menteeProfile" element={<MenteeProfile />} />
            </Routes>
          </Router>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;


