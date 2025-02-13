import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './Firebase';
import Home from './components/Home/Home';
// import Otp from './components/Otp';

function App() {

    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="/otp" element={<Otp />} /> */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    )
  }

export default App