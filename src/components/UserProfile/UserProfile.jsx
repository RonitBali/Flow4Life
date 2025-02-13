import React from "react";
import { FaBell, FaEllipsisV, FaMapMarkerAlt, FaComments, FaPhone } from "react-icons/fa";
import "./UserProfile.css"; // Importing the CSS file

const UserProfile = () => {
  return (
    <div className="container">
      <div className="card">
    
        <div className="header">
          <button>←</button>
          <div className="icon-group">
            <FaBell className="icon" />
            <FaEllipsisV className="icon" />
          </div>
        </div>

        <div className="profile-section">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-img"
          />
          <h2 className="user-name">MADARA UCHIHA</h2>
          <span className="status">✅ AVAILABLE FOR DONATE</span>
        </div>

        <div className="details">
          <div>
            <span className="blood-type">o+</span>
            <p>BLOOD TYPE</p>
          </div>
          <div>
            <span className="donated-count">120</span>
            <p>DONATED</p>
          </div>
          <div>
            <span className="requested-count">02</span>
            <p>REQUESTED</p>
          </div>
        </div>

        <div className="address">
          <FaMapMarkerAlt className="icon" />
          <p>SECTOR 23 , FBD</p>
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
    </div>
  );
};

export default UserProfile;
