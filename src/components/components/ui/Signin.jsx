import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../Firebase";
import Home from '../../Home/Home';

const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [emailColor, setEmailColor] = useState('');
  const [passwordColor, setPasswordColor] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const validate = (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setErrorEmail('');
      setEmailColor('border-green-500 bg-green-100');
    } else {
      setErrorEmail('Enter a valid email address');
      setEmailColor('border-red-500 bg-red-100');
      isValid = false;
    }

    if (password.length >= 6) {
      setErrorPassword('');
      setPasswordColor('border-green-500 bg-green-100');
    } else {
      setErrorPassword('Password must be at least 6 characters');
      setPasswordColor('border-red-500 bg-red-100');
      isValid = false;
    }

    if (isValid) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setIsSignedIn(true);
        console.log('Signed in:', user);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setErrorEmail('Email not found');
          setEmailColor('border-red-500 bg-red-100');
        } else if (error.code === 'auth/wrong-password') {
          setErrorPassword('Incorrect password');
          setPasswordColor('border-red-500 bg-red-100');
        } else if (error.code === 'auth/invalid-credential') {
          setErrorEmail('Invalid credentials');
          setEmailColor('border-red-500 bg-red-100');
          setErrorPassword('Invalid credentials');
          setPasswordColor('border-red-500 bg-red-100');
        } else {
          console.error('Error signing in:', error);
        }
      });
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const signinWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider);
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center text-gray-800 transition-transform transform duration-300 ease-in-out hover:scale-105'>
      <div className="card-image">
        {isSignedIn ? (
          <Home 
            displayName={user.displayName || user.email} 
            email={user.email} 
            photoURL={user.photoURL} 
            emailVerified={user.emailVerified} 
          />
        ) : (
          <form onSubmit={validate} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder='Email'
              className={`border-2 p-2 rounded ${emailColor}`}
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            <p className='text-red-500 text-sm text-left pl-1 mt-[-10px]'>{errorEmail}</p>

            <input
              type="password"
              placeholder='Password'
              className={`border-2 p-2 rounded ${passwordColor}`}
              value={password}
              onChange={handleInputChange(setPassword)}
            />
            <p className='text-red-500 text-sm text-left pl-1 mt-[-10px]'>{errorPassword}</p>

            <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded font-bold transition-transform duration-300 ease-in-out transform hover:scale-105" type="submit">Sign In</button>
            <br />
            <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded font-bold transition-transform duration-300 ease-in-out transform hover:scale-105" onClick={signinWithGoogle}>Sign In with Google</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signin;