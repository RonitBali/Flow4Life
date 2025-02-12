import React, { useState } from 'react';
import './Signin.css';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../Firebase";

const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [emailColor, setEmailColor] = useState('');
  const [passwordColor, setPasswordColor] = useState('');

  const validate = (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setErrorEmail('');
      setEmailColor('green');
    } else {
      setErrorEmail('Enter a valid email address');
      setEmailColor('red');
      isValid = false;
    }

    if (password.length >= 6) {
      setErrorPassword('');
      setPasswordColor('green');
    } else {
      setErrorPassword('Password must be at least 6 characters');
      setPasswordColor('red');
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
        console.log('Signed in:', user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const signinWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider);
  };

  return (
    <div className='card'>
      <div className="card-image">
        <form onSubmit={validate}>
          <input
            type="email"
            placeholder='Email'
            style={{ borderColor: emailColor }}
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <p className='error'>{errorEmail}</p>

          <input
            type="password"
            placeholder='Password'
            style={{ borderColor: passwordColor }}
            value={password}
            onChange={handleInputChange(setPassword)}
          />
          <p className='error'>{errorPassword}</p>

          <button type="submit">Sign In</button>
          <br />
          <button onClick={signinWithGoogle}>Sign In with Google</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;