import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signuppage from './Pages/signup/Signuppage';
import Signinpage from './Pages/signin/Signinpage';
import Home from './Pages/Home/Home';
import RequestForm from './Pages/RequestForm/RequestForm';
import FindDonor from './Pages/FindDonor/FindDonor';
import BloodDonationForm from './Pages/Donationform/Blooddonationform';
import UserProfile from './Pages/UserProfile/UserProfile';
import ProfileSetup from './Pages/ProfileSetup/ProfileSetup';

function App() {
    return ( 
      <Router>
        <Routes>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/requestform" element={<RequestForm />} />
          <Route path="/finddonor" element={<FindDonor />} />
          <Route path="/profile/:userId" element={<UserProfile />} />  
          <Route path="/donate" element={<BloodDonationForm />} />
          <Route path="/profilesetup" element={<ProfileSetup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
}

export default App;
