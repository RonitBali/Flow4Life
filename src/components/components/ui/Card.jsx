import React from 'react';
import { FaUser, FaMapMarkerAlt, FaTint } from 'react-icons/fa';


function Card(props) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-slate-300 text-black rounded-3xl px-8 py-7 w-64 h-64 mx-auto">
      <FaUser size={40} />
      <h1 className="text-xl font-semibold">{props.name}</h1>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt />
        <span>{props.location}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaTint />
        <span>{props.bloodGroup}</span>
      </div>
    </div>
  );
}

export default Card;