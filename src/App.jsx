import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/components/ui/Signup'
import Signin from './components/components/ui/Signin'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './Firebase';
import Home from './components/Home/Home';
import BloodDonationForm from '@components/Donationform/Blooddonationform';
import Signupdetails from '@components/Signupdetails/Signupdetails';
import SignUp from './components/components/ui/Signup';
// import Otp from './components/Otp';


function App() {

    return (
  
      <Router>
        <Routes>
          <Route path="/signup" element={<Signupdetails />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="/otp" element={<Otp />} /> */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    )
  }

export default App