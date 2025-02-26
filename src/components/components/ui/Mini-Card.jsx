import React from 'react'
import { useNavigate } from 'react-router-dom';

function MiniCard(props) {
  const navigate = useNavigate();
  return (
    <div>
        <button onClick={()=>{
            navigate(props.path)
        }} className="flex flex-col gap-2 justify-center items-center bg-slate-300 text-black rounded-3xl px-8 py-7 ">
            <img src={props.img} alt="img" />
            <h1>{props.name}</h1>
        </button>
    </div>
  )
}

export default MiniCard;