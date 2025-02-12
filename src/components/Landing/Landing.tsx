import React, { useState, ChangeEvent, FormEvent} from 'react';
import './Landing.css';

const Form: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

    const [usernameColor, setUsernameColor] = useState<string>('');
    const [emailColor, setEmailColor] = useState<string>('');
    const [passwordColor, setPasswordColor] = useState<string>('');
    const [confirmPasswordColor, setConfirmPasswordColor] = useState<string>('');

    const validate = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let isValid = true;

        // Username validation
        if (username.length >= 8) {
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

        if (isValid) {
            alert('Form submitted successfully!');
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

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
    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
    
};

export default Form;
