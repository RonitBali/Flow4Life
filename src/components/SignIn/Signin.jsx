import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../Firebase';

const auth = getAuth(app);

const handleSubmit= () => {
    signInWithEmailAndPassword(auth, email, password)} // on click pr daldenaa

function Signin() {
  return (
    <div>Signin</div>
  )
}

export default Signin