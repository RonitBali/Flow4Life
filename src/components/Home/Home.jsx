import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { app } from '../../Firebase';
import { useNavigate, Link } from 'react-router-dom';
import BloodDonationForm from '@components/Donationform/Blooddonationform';


const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const database = getDatabase();
  const messaging = getMessaging(app);

  const [user, setUser] = useState(null);
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        requestNotificationPermission();
      } else {
        navigate('/signin');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const donationRequestsRef = ref(database, 'donation_requests');
    onValue(donationRequestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDonationRequests(Object.values(data));
      }
      setLoading(false);
    });
  }, [database]);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('New notification:', payload);
      setNotifications((prev) => [...prev, payload.notification]);
    });
  }, [messaging]);

  const requestNotificationPermission = async () => {
    try {
      const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
      console.log('Notification token:', token);
    } catch (error) {
      console.error('Error getting notification token:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center bg-red-600 text-white p-4 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold">Flow4Life</h1>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/finddonor" className="hover:underline">Find Donors</Link>
            <Link to="/requestform" className="hover:underline">Request Blood</Link>
            {user ? (
              <button onClick={handleLogout} className="bg-white text-red-600 px-4 py-2 rounded-md">Sign Out</button>
            ) : (
              <Link to="/signin" className="bg-white text-red-600 px-4 py-2 rounded-md">Sign In</Link>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Find Blood Donors Near You</h2>
          <p className="text-gray-500">Register as a donor or request blood in emergencies.</p>
        </div>

        {loading ? (
          <p className="text-center text-red-600 mt-4">Loading donation requests...</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {donationRequests.map((request, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/donor/${request.userId}`)}
              >
                <h3 className="text-lg font-bold text-gray-800">{request.fullName}</h3>
                <p className="text-red-600 font-semibold">Blood Group: {request.bloodGroup}</p>
                <p className="text-gray-500">City: {request.city}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/donate")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Donate Blood
          </button>
        </div>
      </div>
      <button
  onClick={() => navigate("/chats")}
  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
>
  View Your Chats
</button>
    </section>
  );
};

export default Home;
