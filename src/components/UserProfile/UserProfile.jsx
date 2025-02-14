import React from "react";
import { FaBell, FaEllipsisV, FaMapMarkerAlt, FaComments, FaPhone } from "react-icons/fa";

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
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#000", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "auto", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={{ background: "none", border: "none", fontSize: "20px", color: "#d32f2f", cursor: "pointer" }}>←</button>
        <div style={{ display: "flex", gap: "10px" }}>
          <FaBell style={{ fontSize: "20px", cursor: "pointer" }} />
          <FaEllipsisV style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img src="photo" alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid #d32f2f" }} />
        <h2>{user.name}</h2>
        <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: "5px", color: "#fff", backgroundColor: user.isAvailable ? "green" : "red" }}>
          {user.isAvailable ? "✅ AVAILABLE FOR DONATE" : "❌ NOT AVAILABLE"}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px", textAlign: "center" }}>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{user.bloodType}</span>
          <p>BLOOD TYPE</p>
        </div>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{user.donated}</span>
          <p>DONATED</p>
        </div>
        <div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{user.requested}</span>
          <p>REQUESTED</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <FaMapMarkerAlt style={{ marginRight: "5px" }} />
        <p>{user.location}</p>
      </div>

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
