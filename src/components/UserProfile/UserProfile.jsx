import React from "react";
import { FaBell, FaEllipsisV, FaMapMarkerAlt, FaComments, FaPhone } from "react-icons/fa";
import "./UserProfile.css";

const UserProfile = () => {

  const user = {
    name: "Madara Uchiha",
    bloodType: "O+",
    donated: 120,
    requested: 2,
    isAvailable: true,
    location: "SEC-23 , FBD",
  };

  return (
    <div>
  
      <div >
        <button>←</button>
        <div className="icon-group">
          <FaBell className="icon" />
          <FaEllipsisV className="icon" />
        </div>
      </div>

      <div className="profile-section">
        <img
          src="photo"
          alt="Profile"
          className="profile-img"
        />
        <h2 className="user_name">{user.name}</h2>
        <span className={`status ${user.isAvailable ? "available" : "unavailable"}`}>
          {user.isAvailable ? "✅ AVAILABLE FOR DONATE" : "❌ NOT AVAILABLE"}
        </span>
      </div>

  
      <div className="details">
        <div>
          <span className="blood-type">{user.bloodType}</span>
          <p>BLOOD TYPE</p>
        </div>
        <div>
          <span className="donated-count">{user.donated}</span>
          <p>DONATED</p>
        </div>
        <div>
          <span className="requested-count">{user.requested}</span>
          <p>REQUESTED</p>
        </div>
      </div>


      <div className="address">
        <FaMapMarkerAlt className="icon" />
        <p>{user.location}</p>
      </div>

  
      <div className="buttons">
        <button className="btn chat-btn">
          <FaComments /> CHAT NOW
        </button>
        <button className="btn call-btn">
          <FaPhone /> CALL NOW
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
