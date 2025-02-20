import React, { useState } from 'react';
import blood from "../../assets/blood.png";
import { useNavigate, Link} from 'react-router-dom';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../Firebase";
import "../Signinpage/Signinpage.css";


const Signinpage = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const Google = new GoogleAuthProvider();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');


  // Validation functions
  const validateUsername = (value) => {
    if (value.length >= 4) {
      setErrorUsername('');
    } else {
      setErrorUsername('Username must be at least 4 characters long');
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setErrorEmail('');
    } else {
      setErrorEmail('Enter a valid email address');
    }
  };

  const validatePassword = (value) => {
    if (value.length >= 6) {
      setErrorPassword('');
    } else {
      setErrorPassword('Password must be at least 6 characters long');
    }
  };

  const validateConfirmPassword = (value) => {
    if (value === password && value.length >= 6) {
      setErrorConfirmPassword('');
    } else {
      setErrorConfirmPassword('Passwords do not match');
    }
  };

  // Input change handler with field-specific validation
  const handleInputChange = (setter, validator) => (e) => {
    const value = e.target.value;
    setter(value);
    if (validator) validator(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      
      !errorEmail &&
      !errorPassword &&
      email &&
      password 
      
    ) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User created:', userCredential.user);
        navigate('/home'); // Navigate to home or another page
      } catch (error) {
        console.error('Error creating user:', error.message);
      }
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, Google);
      console.log("User signed in with Google:", result.user);
      navigate('/home');
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };
  

  return (
    <div className='page-container'>
      <div className="form-container">
        <div className="header">
          <h1 className='app-name'>Flow4Life</h1>
          <div className='header'>
            <img src={blood} alt="Blood Donation Logo" />
          </div>
          <h2 className='form-title'>Sign In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            

            <input
              type="text"
              placeholder='Email'
              className={`input-field ${errorEmail ? 'border-red-500 bg-red-100' : 'border-white-500 bg-white-100'}`}
              value={email}
              onChange={handleInputChange(setEmail, validateEmail)}
            />
            <p className='text-red-500 text-sm text-left pl-1'>{errorEmail}</p>

            <input
              type="password"
              placeholder='Password'
              className={`input-field ${errorPassword ? 'border-red-500 bg-red-100' :'border-white-500 bg-white-100'}`}
              value={password}
              onChange={handleInputChange(setPassword, validatePassword)}
            />
            <p className='text-red-500 text-sm text-left pl-1'>{errorPassword}</p>

           
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" className='checkbox' />Remember me
            </label>
            <a href="#" className='forgot'>Forgot Password?</a>
          </div>
          <button type='submit' className='submitbutton'>Login</button>
        </form>
        <button className='submitbutton2' onClick={signupWithGoogle}>Sign in with Google</button>
        <p className='footer-text'>
          Don’t Have an account?{" "}
          <Link to="/signup">Sign Up</Link> {/* Navigate to sign-in page */}
        </p>
      </div>
    </div>
  );
};

export default Signinpage;
