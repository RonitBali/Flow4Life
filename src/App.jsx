import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './Firebase';
import Otp from './components/OTP/Otp';
function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    
  }, []);

  if(user === null){
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </Router>
    )
  }
  return (
<button onClick={()=>signOut(auth)}>Logout</button>
  )
}

export default App