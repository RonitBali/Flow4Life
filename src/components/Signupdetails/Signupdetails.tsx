import React from 'react'
import blood from "../../assets/blood.png";
import "@components/Signupdetails/Signupdetails.css"


const Signupdetails = () => {
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
        <form>
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