<!-- User Profile  -->

import React, { useEffect, useState } from "react";
import { FaBell, FaEllipsisV, FaMapMarkerAlt, FaComments, FaPhone } from "react-icons/fa";
import { useParams } from "react-router-dom"; // Get userId from URL
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore functions

const UserProfile = () => {
  const { userId } = useParams(); // Extract userId from URL
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        } else {
          console.error("User not found");
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [userId, db]);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading user profile...</p>;
  }

  if (!userProfile) {
    return <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>User not found.</p>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#000", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "auto", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={{ background: "none", border: "none", fontSize: "20px", color: "#d32f2f", cursor: "pointer" }}>←</button>
        <div style={{ display: "flex", gap: "10px" }}>
          <FaBell style={{ fontSize: "20px", cursor: "pointer" }} />
          <FaEllipsisV style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
      </div>

      {/* Profile Picture & Availability */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <img 
            src={userProfile.photoURL || "https://i.pinimg.com/736x/34/b0/1a/34b01aa7a98dc4af4782bf37278bc54a.jpg"} 
            alt="Profile" 
            style={{ width: "120px", height: "120px", borderRadius: "15px", border: "3px solid #d32f2f" }}
          />
        </div>
        <h2 style={{ marginBottom: "15px" }}>{userProfile.name}</h2>
        <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: "5px", color: "#fff", backgroundColor: userProfile.isAvailable ? "green" : "red", marginBottom: "20px" }}>
          {userProfile.isAvailable ? "✅ AVAILABLE FOR DONATE" : "❌ NOT AVAILABLE"}
        </span>
      </div>

      {/* User Stats */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px", textAlign: "center" }}>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{userProfile.bloodGroup}</span>
          <p>BLOOD TYPE</p>
        </div>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{userProfile.donated}</span>
          <p>DONATED</p>
        </div>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{userProfile.requested}</span>
          <p>REQUESTED</p>
        </div>
      </div>

      {/* Location */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <FaMapMarkerAlt style={{ marginRight: "5px" }} />
        <p>{userProfile.location}</p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <button style={{ backgroundColor: "#d32f2f", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "10px" }}>
          <FaComments style={{ marginRight: "5px" }} /> CHAT NOW
        </button>
        <button style={{ backgroundColor: "#d32f2f", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", display: "flex", alignItems: "center", cursor: "pointer" }}>
          <FaPhone style={{ marginRight: "5px" }} /> CALL NOW
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

<!-- Home -->

import React, { useEffect, useState } from "react";
import { FaBell, FaEllipsisV, FaMapMarkerAlt, FaComments, FaPhone } from "react-icons/fa";
import { useParams } from "react-router-dom"; // Get userId from URL
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // Check if the logged-in user matches the requested profile
      if (authUser?.uid === userId) {
        setUser(authUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, userId]);

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading user profile...</p>;
  }

  if (!user) {
    return <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>No user found.</p>;
  }

  const userProfile = {
    name: user.displayName || "Unknown",
    bloodGroup: user.bloodType || "N/A",
    donated: 120,
    requested: 2,
    isAvailable: true,
    location: "SEC-23 , FBD",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#000", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "auto", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={{ background: "none", border: "none", fontSize: "20px", color: "#d32f2f", cursor: "pointer" }}>←</button>
        <div style={{ display: "flex", gap: "10px" }}>
          <FaBell style={{ fontSize: "20px", cursor: "pointer" }} />
          <FaEllipsisV style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
      </div>

      {/* Profile Picture & Availability */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <img 
            src={user.photoURL || "https://i.pinimg.com/736x/34/b0/1a/34b01aa7a98dc4af4782bf37278bc54a.jpg"} 
            alt="Profile" 
            style={{ width: "120px", height: "120px", borderRadius: "15px", border: "3px solid #d32f2f" }}
          />
        </div>
        <h2 style={{ marginBottom: "15px" }}>{userProfile.name}</h2>
        <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: "5px", color: "#fff", backgroundColor: userProfile.isAvailable ? "green" : "red", marginBottom: "20px" }}>
          {userProfile.isAvailable ? "✅ AVAILABLE FOR DONATE" : "❌ NOT AVAILABLE"}
        </span>
      </div>

      {/* User Stats */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px", textAlign: "center" }}>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{userProfile.bloodGroup}</span>
          <p>BLOOD TYPE</p>
        </div>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{userProfile.donated}</span>
          <p>DONATED</p>
        </div>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{userProfile.requested}</span>
          <p>REQUESTED</p>
        </div>
      </div>

      {/* Location */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <FaMapMarkerAlt style={{ marginRight: "5px" }} />
        <p>{userProfile.location}</p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <button style={{ backgroundColor: "#d32f2f", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "10px" }}>
          <FaComments style={{ marginRight: "5px" }} /> CHAT NOW
        </button>
        <button style={{ backgroundColor: "#d32f2f", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", display: "flex", alignItems: "center", cursor: "pointer" }}>
          <FaPhone style={{ marginRight: "5px" }} /> CALL NOW
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

