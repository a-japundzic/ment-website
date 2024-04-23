import MenteeSignUp from "./menteeFlow/MenteeSignUp";
import PasswordVerification from "./menteeFlow/PasswordVerification";
import ProfileSetup1 from "./menteeFlow/ProfileSetup1"
import ProfileSetup2 from "./menteeFlow/ProfileSetup2";
import Education from "./menteeFlow/Education";
import MenteePreferences from "./menteeFlow/MenteePreferences";
import MenteePreferences2 from "./menteeFlow/MenteePreferences2";
import MenteePreferences3 from "./menteeFlow/MenteePreferences3";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./state";
import LoadingScreen from "./menteeFlow/LoadingScreen";

//  TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MenteeSignUp/>} />
              <Route path="/passwordVerification" element={<PasswordVerification/>} />
              <Route path="/personalInfo" element={<ProfileSetup1/>} />
              <Route path="/personalInfo2" element={<ProfileSetup2/>} />
              <Route path="/education" element={<Education/>} />
              <Route path="/menteePreferences" element={<MenteePreferences/>} />
              <Route path="/menteePreferences2" element={<MenteePreferences2/>} />
              <Route path="/menteePreferences3" element={<MenteePreferences3/>} />
              <Route path="/loadingScreen" element={<LoadingScreen/>} />
            </Routes>
          </Router>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;


