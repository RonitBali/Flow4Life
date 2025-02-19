import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/components/ui/Signup'
import Signin from './components/components/ui/Signin'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './Firebase';
import Home from './components/Home/Home';
import BloodDonationForm from '@components/Donationform/Blooddonationform';
import Signuppage from '@components/Signuppage/Signuppage';
import Signinpage from '@components/Signinpage/Signinpage';
import SignUp from './components/components/ui/Signup';
// import Otp from './components/Otp';


function App() {

    return ( 
      <Router>
        <Routes>
          <Route path ="/signup" element={<Signuppage/>}/>
          <Route path ="/form" element={<BloodDonationForm/>}/>
          <Route path="/signin" element={<Signinpage />} />
          {/* <Route path="/otp" element={<Otp />} /> */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    )
  }

export default App