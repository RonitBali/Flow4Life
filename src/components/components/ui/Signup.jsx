import React, { useState } from 'react';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../Firebase";

const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

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
            setUsernameColor('border-green-500 bg-green-100');
        } else {
            setErrorUsername('Username must be at least 8 characters long');
            setUsernameColor('border-red-500 bg-red-100');
            isValid = false;
        }

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

        // Password validation
        if (password.length >= 6) {
            setErrorPassword('');
            setPasswordColor('border-green-500 bg-green-100');
        } else {
            setErrorPassword('Password must be at least 6 characters');
            setPasswordColor('border-red-500 bg-red-100');
            isValid = false;
        }

        // Confirm password validation
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
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center text-gray-800 transition-transform transform duration-300 ease-in-out hover:scale-105'>
            <div className="card-image">
                <form onSubmit={validate} className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder='Username' 
                        className={`border-2 p-2 rounded ${usernameColor}`} 
                        value={username} 
                        onChange={handleInputChange(setUsername)} 
                    />
                    <p className='text-red-500 text-sm text-left pl-1 mt-[-10px]'>{errorUsername}</p>
    
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
    
                    <input 
                        type="password" 
                        placeholder='Confirm Password' 
                        className={`border-2 p-2 rounded ${confirmPasswordColor}`} 
                        value={confirmPassword} 
                        onChange={handleInputChange(setConfirmPassword)} 
                    />
                    <p className='text-red-500 text-sm text-left pl-1 mt-[-10px]'>{errorConfirmPassword}</p>
                    <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded font-bold transition-transform duration-300 ease-in-out transform hover:scale-105" type="submit">Submit</button>
                    <br />
                    <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded font-bold transition-transform duration-300 ease-in-out transform hover:scale-105" onClick={signupWithGoogle}>Sign With Google</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
