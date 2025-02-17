import React from 'react'
function MiniCard(props) {
  return (
    <div>
        <div className="flex flex-col gap-2 justify-center items-center bg-slate-300 text-black rounded-3xl px-8 py-7 ">
            <img src={props.img} alt="img" />
            <h1>{props.name}</h1>
        </div>
    </div>
  )
}

export default MiniCard;