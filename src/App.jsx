import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  )
}

export default App