import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signuppage from '@components/Signuppage/Signuppage';
import Signinpage from '@components/Signinpage/Signinpage';
import Home from './components/Home/Home';
import RequestForm from '@components/RequestForm/RequestForm';
import FindDonor from '@components/FindDonor/FindDonor';
import ChatPage from './ChatPage';
import ChatList from './ChatList'; // Import the chat list component
import BloodDonationForm from '@components/Donationform/Blooddonationform';


function App() {
    return ( 
      <Router>
        <Routes>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
          <Route path="/requestform" element={<RequestForm />} />
          <Route path="/finddonor" element={<FindDonor />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/chats" element={<ChatList />} /> 
          <Route path="/donate" element={<BloodDonationForm />} /> {/* Add the new route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
}

export default App;
