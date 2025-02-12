import React, { useState } from 'react';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase";

const auth = getAuth(app);

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const [usernameColor, setUsernameColor] = useState('');
    const [emailColor, setEmailColor] = useState('');
    const [passwordColor, setPasswordColor] = useState('');
    const [confirmPasswordColor, setConfirmPasswordColor] = useState('');

    const validate = (e) => {
        e.preventDefault();
        let isValid = true;

        // Username validation
        if (username.length >= 4) {
            setErrorUsername('');
            setUsernameColor('green');
        } else {
            setErrorUsername('Username must be at least 8 characters long');
            setUsernameColor('red');
            isValid = false;
        }

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

        // Password validation
        if (password.length >= 6) {
            setErrorPassword('');
            setPasswordColor('green');
        } else {
            setErrorPassword('Password must be at least 6 characters');
            setPasswordColor('red');
            isValid = false;
        }

        // Confirm password validation
        if (confirmPassword === password && confirmPassword.length >= 6) {
            setErrorConfirmPassword('');
            setConfirmPasswordColor('green');
        } else {
            setErrorConfirmPassword('Passwords do not match');
            setConfirmPasswordColor('red');
            isValid = false;
        }

       
    };

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    const handleInputChange = (setter) => 
        (e) => setter(e.target.value);

    return (
        <div className='card'>
            <div className="card-image">
                <form onSubmit={validate}>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        style={{ borderColor: usernameColor }} 
                        value={username} 
                        onChange={handleInputChange(setUsername)} 
                    />
                    <p className='error'>{errorUsername}</p>
    
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
    
                    <input 
                        type="password" 
                        placeholder='Confirm Password' 
                        style={{ borderColor: confirmPasswordColor }} 
                        value={confirmPassword} 
                        onChange={handleInputChange(setConfirmPassword)} 
                    />
                    <p className='error'>{errorConfirmPassword}</p>
    
                    <button onClick={handleSubmit} type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
    
};

export default SignUp;
