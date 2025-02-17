import React from 'react'
import blood from "../../assets/blood.png";
import "@components/Signupdetails/Signupdetails.css"


const Signupdetails = () => {
   const validate = (e) => {
          e.preventDefault();
          let isValid = true;
  
          if (username.length >= 4) {
              setErrorUsername('');
              setUsernameColor('border-green-500 bg-green-100');
          } else {
              setErrorUsername('Username must be at least 8 characters long');
              setUsernameColor('border-red-500 bg-red-100');
              isValid = false;
          }
  
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
  
          if (confirmPassword === password && confirmPassword.length >= 6) {
              setErrorConfirmPassword('');
              setConfirmPasswordColor('border-green-500 bg-green-100');
          } else {
              setErrorConfirmPassword('Passwords do not match');
              setConfirmPasswordColor('border-red-500 bg-red-100');
              isValid = false;
          }
      };
  
      const handleSubmit = () => {
          createUserWithEmailAndPassword(auth, email, password);
      }
  
      const handleInputChange = (setter) =>   
          (e) => setter(e.target.value);
  
      const signupWithGoogle = () => {
          signInWithPopup(auth, GoogleProvider);
      }
      
  return (
    <div className='page-container'>
      <div className="form-container">
        <div className="header">
          <h1 className='app-name'>Flow4Life</h1>
          <div className='header'>
            <img src={blood} alt="" />
          </div>
          <h2 className='form-title'>Enter Your Details</h2>

        </div>
        <form onSubmit={validate}>
          <div className="form-group">
            <input type="text" placeholder='Name' className='input-field' />
            <input type="text" placeholder='Email' className='input-field' />
            <input type="text" placeholder='Gender' className='input-field' />
            <input type="text" placeholder='Blood Group' className='input-field' />
          </div>
          <div className="form-options">
            <label htmlFor="">
              <input type="checkbox" className='checkbox' />Remember me
            </label>
            <a href="#" className='forgot'>Forgot Password?</a>
          </div>
          <button type='submit' className='submitbutton'>Create account</button>
        </form>
        <p className='footer-text'>
          Already Have an account?{" "}
          <a href="#">Sign In</a>
        </p>

      </div>
    </div>
  )
}

export default Signupdetails